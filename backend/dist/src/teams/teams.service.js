"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const scope_util_1 = require("../common/utils/scope.util");
const prisma_service_1 = require("../prisma/prisma.service");
let TeamsService = class TeamsService {
    prisma;
    auditLogs;
    constructor(prisma, auditLogs) {
        this.prisma = prisma;
        this.auditLogs = auditLogs;
    }
    async list(user) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (scope.isGlobal) {
            return this.prisma.team.findMany({
                include: this.defaultInclude(),
                orderBy: [{ name: 'asc' }],
            });
        }
        return this.prisma.team.findMany({
            where: {
                organizationId: {
                    in: [...scope.organizationIds, ...scope.zoneAssignmentIds],
                },
            },
            include: this.defaultInclude(),
            orderBy: [{ name: 'asc' }],
        });
    }
    async create(dto, user) {
        await this.ensureZoneOrganization(dto.organizationId);
        this.assertCanManage(user, dto.organizationId);
        await this.checkDuplicateTeamName(dto.organizationId, dto.name, dto.category);
        return this.prisma.team.create({
            data: {
                organizationId: dto.organizationId,
                name: dto.name,
                category: dto.category,
                status: dto.status,
            },
            include: this.defaultInclude(),
        });
    }
    async getById(id, user) {
        const team = await this.prisma.team.findUnique({
            where: { id },
            include: this.defaultInclude(),
        });
        if (!team) {
            throw new common_1.NotFoundException('Team not found.');
        }
        this.assertCanRead(user, team.organizationId);
        return team;
    }
    async update(id, dto, user) {
        const existing = await this.prisma.team.findUnique({
            where: { id },
            include: {
                organization: true,
            },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Team not found.');
        }
        this.assertCanManage(user, existing.organizationId);
        if (dto.organizationId && dto.organizationId !== existing.organizationId) {
            await this.ensureZoneOrganization(dto.organizationId);
            this.assertCanManage(user, dto.organizationId);
        }
        const effectiveOrgId = dto.organizationId ?? existing.organizationId;
        const effectiveName = dto.name ?? existing.name;
        const effectiveCategory = dto.category ?? existing.category;
        const nameChanged = dto.name !== undefined && dto.name !== existing.name;
        const orgChanged = dto.organizationId !== undefined && dto.organizationId !== existing.organizationId;
        const categoryChanged = dto.category !== undefined && dto.category !== existing.category;
        if (nameChanged || orgChanged || categoryChanged) {
            await this.checkDuplicateTeamName(effectiveOrgId, effectiveName, effectiveCategory, id);
        }
        return this.prisma.team.update({
            where: { id },
            data: {
                organizationId: dto.organizationId,
                name: dto.name,
                category: dto.category,
                status: dto.status,
            },
            include: this.defaultInclude(),
        });
    }
    async softDelete(id, user) {
        const existing = await this.prisma.team.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Team not found.');
        }
        this.assertCanManage(user, existing.organizationId);
        return this.prisma.team.update({
            where: { id },
            data: {
                status: client_1.OrganizationStatus.INACTIVE,
            },
            include: this.defaultInclude(),
        });
    }
    async delete(id, user) {
        const existing = await this.prisma.team.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Team not found.');
        }
        this.assertCanManage(user, existing.organizationId);
        const matchCount = await this.prisma.match.count({
            where: {
                OR: [{ homeTeamId: id }, { awayTeamId: id }],
            },
        });
        if (matchCount > 0) {
            throw new common_1.BadRequestException('Impossible de supprimer cette équipe car elle est liée à des matchs.');
        }
        const deleted = await this.prisma.team.delete({ where: { id } });
        this.auditLogs.log({
            userId: user.id,
            action: 'TEAM_DELETED',
            entityType: 'team',
            entityId: id,
            metadata: { name: existing.name, category: existing.category },
        });
        return deleted;
    }
    async checkDuplicateTeamName(organizationId, name, category, excludeId) {
        const duplicate = await this.prisma.team.findFirst({
            where: {
                organizationId,
                name: { equals: name, mode: 'insensitive' },
                category,
                ...(excludeId ? { id: { not: excludeId } } : {}),
            },
        });
        if (duplicate) {
            throw new common_1.BadRequestException('Une équipe avec ce nom existe déjà dans cette zone pour cette catégorie.');
        }
    }
    async ensureZoneOrganization(organizationId) {
        const organization = await this.prisma.organization.findUnique({
            where: { id: organizationId },
        });
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found.');
        }
        if (organization.type !== client_1.OrganizationType.ZONE) {
            throw new common_1.ForbiddenException('Teams can only be assigned to zone organizations.');
        }
    }
    assertCanManage(user, organizationId) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (scope.isGlobal) {
            return;
        }
        if (!scope.zoneIds.includes(organizationId)) {
            throw new common_1.ForbiddenException('You cannot manage teams outside your zone scope.');
        }
    }
    assertCanRead(user, organizationId) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (scope.isGlobal) {
            return;
        }
        if (!scope.organizationIds.includes(organizationId) &&
            !scope.zoneAssignmentIds.includes(organizationId)) {
            throw new common_1.ForbiddenException('You cannot access this team.');
        }
    }
    defaultInclude() {
        return {
            organization: {
                include: {
                    commune: {
                        include: {
                            department: {
                                include: {
                                    region: true,
                                    organizations: {
                                        where: { type: client_1.OrganizationType.ODCAV },
                                        take: 1,
                                        select: { id: true, name: true, type: true },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_logs_service_1.AuditLogsService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map