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
var AuditLogsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let AuditLogsService = AuditLogsService_1 = class AuditLogsService {
    prisma;
    logger = new common_1.Logger(AuditLogsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    log(data) {
        this.prisma.auditLog
            .create({
            data: {
                userId: data.userId ?? null,
                action: data.action,
                entityType: data.entityType,
                entityId: data.entityId,
                metadata: data.metadata ?? client_1.Prisma.JsonNull,
            },
        })
            .catch((err) => {
            this.logger.error('Failed to write audit log', err);
        });
    }
    async findAll(dto) {
        const page = Math.max(1, Number(dto.page ?? 1));
        const limit = Math.min(100, Math.max(1, Number(dto.limit ?? 50)));
        const where = {};
        if (dto.userId)
            where.userId = dto.userId;
        if (dto.entityType)
            where.entityType = dto.entityType;
        if (dto.action) {
            where.action = { contains: dto.action, mode: 'insensitive' };
        }
        if (dto.q?.trim()) {
            const q = dto.q.trim();
            where.OR = [
                { action: { contains: q, mode: 'insensitive' } },
                { entityType: { contains: q, mode: 'insensitive' } },
                { entityId: { contains: q, mode: 'insensitive' } },
                { user: { fullName: { contains: q, mode: 'insensitive' } } },
            ];
        }
        if (dto.fromDate || dto.toDate) {
            where.createdAt = {
                ...(dto.fromDate ? { gte: new Date(dto.fromDate) } : {}),
                ...(dto.toDate
                    ? { lte: new Date(new Date(dto.toDate).setHours(23, 59, 59, 999)) }
                    : {}),
            };
        }
        const [total, data] = await Promise.all([
            this.prisma.auditLog.count({ where }),
            this.prisma.auditLog.findMany({
                where,
                include: {
                    user: { select: { id: true, fullName: true, role: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
        ]);
        return { data, total, page, limit };
    }
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = AuditLogsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditLogsService);
//# sourceMappingURL=audit-logs.service.js.map