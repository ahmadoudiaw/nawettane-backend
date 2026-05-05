"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const scope_util_1 = require("../common/utils/scope.util");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
let UsersService = class UsersService {
    prisma;
    auditLogs;
    constructor(prisma, auditLogs) {
        this.prisma = prisma;
        this.auditLogs = auditLogs;
    }
    async list(user) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        return this.prisma.user.findMany({
            where: this.buildUserScopeWhere(scope),
            include: this.defaultAdminInclude(),
            orderBy: [{ fullName: 'asc' }],
        });
    }
    async getById(id, user) {
        const targetUser = await this.prisma.user.findUnique({
            where: { id },
            include: this.defaultAdminInclude(),
        });
        if (!targetUser) {
            throw new common_1.NotFoundException('User not found.');
        }
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (!scope.isGlobal && !this.isUserInScope(targetUser, scope.organizationIds)) {
            throw new common_1.ForbiddenException('You cannot access this user.');
        }
        return targetUser;
    }
    async create(dto, actor) {
        const passwordHash = dto.password ? await bcrypt.hash(dto.password, 10) : undefined;
        const result = await this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                phone: dto.phone,
                passwordHash,
                role: dto.role,
                status: dto.status ?? client_1.UserStatus.ACTIVE,
                organizationAssignments: dto.organizationIds?.length
                    ? {
                        create: dto.organizationIds.map((organizationId, index) => ({
                            organizationId,
                            isPrimary: index === 0,
                        })),
                    }
                    : undefined,
            },
            include: this.defaultAdminInclude(),
        });
        this.auditLogs.log({
            userId: actor?.id ?? null,
            action: 'USER_CREATED',
            entityType: 'User',
            entityId: result.id,
            metadata: { fullName: result.fullName, role: result.role, phone: result.phone },
        });
        return result;
    }
    async update(id, dto, actor) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found.');
        }
        const passwordHash = dto.password ? await bcrypt.hash(dto.password, 10) : undefined;
        const result = await this.prisma.$transaction(async (tx) => {
            if (dto.organizationIds) {
                await tx.userOrganizationAssignment.deleteMany({
                    where: { userId: id },
                });
            }
            return tx.user.update({
                where: { id },
                data: {
                    fullName: dto.fullName,
                    email: dto.email,
                    phone: dto.phone,
                    passwordHash,
                    role: dto.role,
                    status: dto.status,
                    organizationAssignments: dto.organizationIds
                        ? {
                            create: dto.organizationIds.map((organizationId, index) => ({
                                organizationId,
                                isPrimary: index === 0,
                            })),
                        }
                        : undefined,
                },
                include: this.defaultAdminInclude(),
            });
        });
        this.auditLogs.log({
            userId: actor?.id ?? null,
            action: 'USER_UPDATED',
            entityType: 'User',
            entityId: id,
            metadata: {
                fullName: existingUser.fullName,
                updatedFields: Object.keys(dto).filter((k) => dto[k] !== undefined),
            },
        });
        return result;
    }
    async softDelete(id, actor) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found.');
        }
        const result = await this.prisma.user.update({
            where: { id },
            data: { status: client_1.UserStatus.INACTIVE },
            include: this.defaultAdminInclude(),
        });
        this.auditLogs.log({
            userId: actor?.id ?? null,
            action: 'USER_DEACTIVATED',
            entityType: 'User',
            entityId: id,
            metadata: {
                fullName: existingUser.fullName,
                phone: existingUser.phone,
                role: existingUser.role,
            },
        });
        return result;
    }
    async findAdminByIdentifier(identifier) {
        return this.prisma.user.findFirst({
            where: {
                OR: [{ email: identifier }, { phone: identifier }],
                role: { not: client_1.Role.SUPPORTER },
            },
        });
    }
    async buildAuthenticatedUser(userId) {
        const [user, organizations] = await Promise.all([
            this.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    organizationAssignments: {
                        include: { organization: true },
                    },
                    zoneAssignments: true,
                    matchAssignments: true,
                },
            }),
            this.prisma.organization.findMany({
                select: { id: true, parentId: true },
            }),
        ]);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const directOrganizationIds = user.organizationAssignments.map((assignment) => assignment.organizationId);
        const descendants = this.collectDescendantOrganizationIds(directOrganizationIds, organizations);
        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            role: user.role,
            assignments: user.organizationAssignments.map((assignment) => ({
                organizationId: assignment.organizationId,
                organizationType: assignment.organization.type,
            })),
            accessibleOrganizationIds: descendants,
            zoneAssignmentIds: user.zoneAssignments.map((assignment) => assignment.organizationId),
            matchAssignmentIds: user.matchAssignments.map((assignment) => assignment.matchId),
        };
    }
    collectDescendantOrganizationIds(roots, organizations) {
        const byParentId = new Map();
        for (const organization of organizations) {
            if (!organization.parentId)
                continue;
            const children = byParentId.get(organization.parentId) ?? [];
            children.push(organization.id);
            byParentId.set(organization.parentId, children);
        }
        const visited = new Set(roots);
        const queue = [...roots];
        while (queue.length > 0) {
            const currentId = queue.shift();
            if (!currentId)
                continue;
            for (const childId of byParentId.get(currentId) ?? []) {
                if (visited.has(childId))
                    continue;
                visited.add(childId);
                queue.push(childId);
            }
        }
        return [...visited];
    }
    defaultAdminInclude() {
        return {
            organizationAssignments: {
                include: { organization: true },
            },
            zoneAssignments: {
                include: { organization: true },
            },
        };
    }
    buildUserScopeWhere(scope) {
        if (scope.isGlobal) {
            return { role: { not: client_1.Role.SUPPORTER } };
        }
        return {
            role: { not: client_1.Role.SUPPORTER },
            OR: [
                {
                    organizationAssignments: {
                        some: { organizationId: { in: scope.organizationIds } },
                    },
                },
                {
                    zoneAssignments: {
                        some: { organizationId: { in: scope.organizationIds } },
                    },
                },
            ],
        };
    }
    isUserInScope(targetUser, organizationIds) {
        return (targetUser.organizationAssignments.some((assignment) => organizationIds.includes(assignment.organizationId)) ||
            targetUser.zoneAssignments.some((assignment) => organizationIds.includes(assignment.organizationId)));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_logs_service_1.AuditLogsService])
], UsersService);
//# sourceMappingURL=users.service.js.map