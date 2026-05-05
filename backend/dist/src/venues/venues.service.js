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
exports.VenuesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const scope_util_1 = require("../common/utils/scope.util");
const prisma_service_1 = require("../prisma/prisma.service");
let VenuesService = class VenuesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(user) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (scope.isGlobal) {
            return this.prisma.venue.findMany({
                include: this.defaultInclude(),
                orderBy: [{ name: 'asc' }],
            });
        }
        return this.prisma.venue.findMany({
            where: {
                OR: [
                    {
                        organizationId: {
                            in: [...scope.organizationIds, ...scope.zoneAssignmentIds],
                        },
                    },
                    { communeId: { not: null } },
                ],
            },
            include: this.defaultInclude(),
            orderBy: [{ name: 'asc' }],
        });
    }
    async create(dto, user) {
        if (!dto.communeId && !dto.organizationId) {
            throw new common_1.BadRequestException('communeId or organizationId is required.');
        }
        if (dto.communeId && !dto.organizationId) {
            this.assertGlobalScope(user);
            return this.prisma.venue.create({
                data: {
                    communeId: dto.communeId,
                    name: dto.name,
                    address: dto.address,
                    capacity: dto.capacity,
                    status: dto.status ?? client_1.OrganizationStatus.ACTIVE,
                },
                include: this.defaultInclude(),
            });
        }
        await this.ensureZoneOrganization(dto.organizationId);
        this.assertCanManage(user, dto.organizationId);
        return this.prisma.venue.create({
            data: {
                organizationId: dto.organizationId,
                communeId: dto.communeId,
                name: dto.name,
                address: dto.address,
                capacity: dto.capacity,
                status: dto.status ?? client_1.OrganizationStatus.ACTIVE,
            },
            include: this.defaultInclude(),
        });
    }
    async getById(id, user) {
        const venue = await this.prisma.venue.findUnique({
            where: { id },
            include: this.defaultInclude(),
        });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found.');
        }
        this.assertCanRead(user, venue.organizationId);
        return venue;
    }
    async update(id, dto, user) {
        const existing = await this.prisma.venue.findUnique({
            where: { id },
            include: { organization: true },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Venue not found.');
        }
        const newOrgId = dto.organizationId !== undefined ? dto.organizationId : existing.organizationId;
        if (newOrgId) {
            if (dto.organizationId && dto.organizationId !== existing.organizationId) {
                await this.ensureZoneOrganization(dto.organizationId);
                this.assertCanManage(user, dto.organizationId);
            }
            else {
                this.assertCanManage(user, existing.organizationId);
            }
        }
        else {
            this.assertGlobalScope(user);
        }
        return this.prisma.venue.update({
            where: { id },
            data: {
                organizationId: dto.organizationId,
                communeId: dto.communeId,
                name: dto.name,
                address: dto.address,
                capacity: dto.capacity,
                status: dto.status,
            },
            include: this.defaultInclude(),
        });
    }
    async softDelete(id, user) {
        const existing = await this.prisma.venue.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Venue not found.');
        }
        if (existing.organizationId) {
            this.assertCanManage(user, existing.organizationId);
        }
        else {
            this.assertGlobalScope(user);
        }
        return this.prisma.venue.update({
            where: { id },
            data: { status: client_1.OrganizationStatus.INACTIVE },
            include: this.defaultInclude(),
        });
    }
    async ensureZoneOrganization(organizationId) {
        const organization = await this.prisma.organization.findUnique({
            where: { id: organizationId },
        });
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found.');
        }
        if (organization.type !== client_1.OrganizationType.ZONE) {
            throw new common_1.ForbiddenException('Venues can only be assigned to zone organizations.');
        }
    }
    assertGlobalScope(user) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (!scope.isGlobal) {
            throw new common_1.ForbiddenException('Only global admins can manage commune-based venues.');
        }
    }
    assertCanManage(user, organizationId) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (scope.isGlobal)
            return;
        if (!organizationId || !scope.zoneIds.includes(organizationId)) {
            throw new common_1.ForbiddenException('You cannot manage venues outside your zone scope.');
        }
    }
    assertCanRead(user, organizationId) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (scope.isGlobal)
            return;
        if (!organizationId)
            return;
        if (!scope.organizationIds.includes(organizationId) &&
            !scope.zoneAssignmentIds.includes(organizationId)) {
            throw new common_1.ForbiddenException('You cannot access this venue.');
        }
    }
    defaultInclude() {
        return {
            organization: {
                include: { commune: true },
            },
            commune: {
                include: {
                    department: { include: { region: true } },
                },
            },
        };
    }
};
exports.VenuesService = VenuesService;
exports.VenuesService = VenuesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VenuesService);
//# sourceMappingURL=venues.service.js.map