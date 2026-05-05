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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const scope_util_1 = require("../common/utils/scope.util");
const prisma_service_1 = require("../prisma/prisma.service");
let OrganizationsService = class OrganizationsService {
    prisma;
    auditLogs;
    constructor(prisma, auditLogs) {
        this.prisma = prisma;
        this.auditLogs = auditLogs;
    }
    async getTree(user) {
        const organizations = await this.prisma.organization.findMany({
            orderBy: [{ type: 'asc' }, { name: 'asc' }],
        });
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        const allowedIds = scope.isGlobal
            ? new Set(organizations.map((organization) => organization.id))
            : new Set(scope.organizationIds);
        const byParentId = new Map();
        for (const organization of organizations) {
            if (!allowedIds.has(organization.id)) {
                continue;
            }
            const key = organization.parentId ?? null;
            const siblings = byParentId.get(key) ?? [];
            siblings.push(organization);
            byParentId.set(key, siblings);
        }
        const buildNode = (parentId) => (byParentId.get(parentId) ?? []).map((organization) => ({
            ...organization,
            children: buildNode(organization.id),
        }));
        if (scope.isGlobal) {
            return buildNode(null);
        }
        const assignedRootIds = user.assignments
            .map((assignment) => assignment.organizationId)
            .filter((organizationId) => allowedIds.has(organizationId));
        return assignedRootIds.map((organizationId) => {
            const organization = organizations.find((item) => item.id === organizationId);
            if (!organization) {
                return null;
            }
            return {
                ...organization,
                children: buildNode(organization.id),
            };
        }).filter((node) => node !== null);
    }
    async list(user, type) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        const where = {};
        if (type) {
            where.type = type;
        }
        if (!scope.isGlobal) {
            where.id = { in: scope.organizationIds };
        }
        return this.prisma.organization.findMany({
            where,
            include: this.defaultInclude(),
            orderBy: [{ name: 'asc' }],
        });
    }
    async create(dto, user) {
        if (dto.type === client_1.OrganizationType.ZONE) {
            await this.validateZoneInput(dto.communeId, dto.parentId, dto.name);
        }
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (!scope.isGlobal && dto.parentId && !scope.organizationIds.includes(dto.parentId)) {
            throw new common_1.ForbiddenException('You cannot create an organization outside your scope.');
        }
        return this.prisma.organization.create({
            data: {
                name: dto.name,
                type: dto.type,
                parentId: dto.parentId,
                regionId: dto.regionId,
                departmentId: dto.departmentId,
                communeId: dto.communeId,
                status: dto.status ?? client_1.OrganizationStatus.ACTIVE,
            },
            include: this.defaultInclude(),
        });
    }
    async update(id, dto, user) {
        const existing = await this.prisma.organization.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Organization not found.');
        }
        if (existing.type === client_1.OrganizationType.ZONE) {
            const effectiveCommuneId = dto.communeId !== undefined ? dto.communeId : existing.communeId ?? undefined;
            const effectiveParentId = dto.parentId !== undefined ? dto.parentId : existing.parentId ?? undefined;
            const effectiveName = dto.name !== undefined ? dto.name : existing.name;
            const communeChanged = dto.communeId !== undefined && dto.communeId !== existing.communeId;
            const parentChanged = dto.parentId !== undefined && dto.parentId !== existing.parentId;
            const nameChanged = dto.name !== undefined && dto.name !== existing.name;
            if (communeChanged || parentChanged || nameChanged) {
                await this.validateZoneInput(effectiveCommuneId, effectiveParentId, effectiveName, id);
            }
        }
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (!scope.isGlobal && !scope.organizationIds.includes(id)) {
            throw new common_1.ForbiddenException('You cannot modify this organization.');
        }
        return this.prisma.organization.update({
            where: { id },
            data: {
                name: dto.name,
                parentId: dto.parentId,
                regionId: dto.regionId,
                departmentId: dto.departmentId,
                communeId: dto.communeId,
                status: dto.status,
            },
            include: this.defaultInclude(),
        });
    }
    async softDelete(id, user) {
        const existing = await this.prisma.organization.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Organization not found.');
        }
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (!scope.isGlobal && !scope.organizationIds.includes(id)) {
            throw new common_1.ForbiddenException('You cannot modify this organization.');
        }
        return this.prisma.organization.update({
            where: { id },
            data: { status: client_1.OrganizationStatus.INACTIVE },
            include: this.defaultInclude(),
        });
    }
    async permanentDelete(id, user) {
        const existing = await this.prisma.organization.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Organization not found.');
        }
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (!scope.isGlobal && !scope.organizationIds.includes(id)) {
            throw new common_1.ForbiddenException('You cannot modify this organization.');
        }
        const [teamCount, venueCount, matchCount] = await Promise.all([
            this.prisma.team.count({ where: { organizationId: id } }),
            this.prisma.venue.count({ where: { organizationId: id } }),
            this.prisma.match.count({ where: { organizationId: id } }),
        ]);
        if (teamCount > 0 || venueCount > 0 || matchCount > 0) {
            throw new common_1.BadRequestException('Impossible de supprimer cette zone car elle est liée à des équipes, stades ou matchs.');
        }
        await this.prisma.organization.delete({ where: { id } });
        this.auditLogs.log({
            userId: user.id,
            action: 'ZONE_DELETED',
            entityType: 'organization',
            entityId: id,
            metadata: { name: existing.name, type: existing.type },
        });
    }
    async getById(id, user) {
        const organization = await this.prisma.organization.findUnique({
            where: { id },
            include: {
                ...this.defaultInclude(),
                children: true,
            },
        });
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found.');
        }
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (!scope.isGlobal && !scope.organizationIds.includes(id)) {
            throw new common_1.ForbiddenException('You cannot access this organization.');
        }
        return organization;
    }
    async validateZoneInput(communeId, parentId, name, excludeId) {
        if (!communeId) {
            throw new common_1.BadRequestException('Une zone doit être rattachée à une commune.');
        }
        const commune = await this.prisma.commune.findUnique({
            where: { id: communeId },
        });
        if (!commune) {
            throw new common_1.NotFoundException('Commune introuvable.');
        }
        if (name) {
            const duplicate = await this.prisma.organization.findFirst({
                where: {
                    communeId,
                    type: client_1.OrganizationType.ZONE,
                    name: { equals: name, mode: 'insensitive' },
                    ...(excludeId ? { id: { not: excludeId } } : {}),
                },
            });
            if (duplicate) {
                throw new common_1.BadRequestException('Une zone avec ce nom existe déjà dans cette commune.');
            }
        }
        if (parentId) {
            const parent = await this.prisma.organization.findUnique({ where: { id: parentId } });
            if (!parent)
                throw new common_1.NotFoundException('Organisation parente introuvable.');
            if (parent.type !== client_1.OrganizationType.ODCAV) {
                throw new common_1.BadRequestException("Le parent d'une zone doit être un ODCAV.");
            }
            if (parent.departmentId && parent.departmentId !== commune.departmentId) {
                throw new common_1.BadRequestException("Incohérence territoriale : l'ODCAV et la commune ne sont pas dans le même département.");
            }
        }
    }
    defaultInclude() {
        return {
            parent: true,
            commune: {
                include: {
                    department: { include: { region: true } },
                },
            },
        };
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_logs_service_1.AuditLogsService])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map