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
exports.AdminTicketsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const prisma_service_1 = require("../prisma/prisma.service");
const TICKET_INCLUDE = {
    order: {
        select: {
            id: true,
            reference: true,
            buyerName: true,
            buyerPhone: true,
            totalAmount: true,
        },
    },
    match: {
        select: {
            id: true,
            matchDate: true,
            competitionName: true,
            homeTeam: { select: { name: true } },
            awayTeam: { select: { name: true } },
        },
    },
    ticketCategory: {
        select: { id: true, name: true, price: true },
    },
    cancelledByAdmin: {
        select: { id: true, fullName: true },
    },
};
let AdminTicketsService = class AdminTicketsService {
    prisma;
    auditLogs;
    constructor(prisma, auditLogs) {
        this.prisma = prisma;
        this.auditLogs = auditLogs;
    }
    async findAll(dto) {
        const page = Math.max(1, Number(dto.page ?? 1));
        const limit = Math.min(100, Math.max(1, Number(dto.limit ?? 50)));
        const where = {};
        if (dto.q?.trim()) {
            const q = dto.q.trim();
            where.OR = [
                { ticketCode: { contains: q, mode: 'insensitive' } },
                { order: { buyerPhone: { contains: q, mode: 'insensitive' } } },
                { order: { buyerName: { contains: q, mode: 'insensitive' } } },
            ];
        }
        if (dto.matchId)
            where.matchId = dto.matchId;
        if (dto.ticketCategoryId)
            where.ticketCategoryId = dto.ticketCategoryId;
        if (dto.status)
            where.status = dto.status;
        if (dto.fromDate || dto.toDate) {
            where.createdAt = {
                ...(dto.fromDate ? { gte: new Date(dto.fromDate) } : {}),
                ...(dto.toDate
                    ? { lte: new Date(new Date(dto.toDate).setHours(23, 59, 59, 999)) }
                    : {}),
            };
        }
        const [total, data] = await Promise.all([
            this.prisma.ticket.count({ where }),
            this.prisma.ticket.findMany({
                where,
                include: TICKET_INCLUDE,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
        ]);
        return { data, total, page, limit };
    }
    async cancel(id, dto, user) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id } });
        if (!ticket) {
            throw new common_1.NotFoundException('Billet introuvable.');
        }
        if (ticket.status === client_1.TicketStatus.USED) {
            throw new common_1.BadRequestException("Ce billet a déjà été scanné et utilisé. L'annulation est impossible.");
        }
        if (ticket.status === client_1.TicketStatus.CANCELLED) {
            throw new common_1.BadRequestException('Ce billet est déjà annulé.');
        }
        const updated = await this.prisma.ticket.update({
            where: { id },
            data: {
                status: client_1.TicketStatus.CANCELLED,
                cancelledAt: new Date(),
                cancelledByAdminId: user.id,
                cancelReason: dto.cancelReason,
            },
            include: TICKET_INCLUDE,
        });
        this.auditLogs.log({
            userId: user.id,
            action: 'TICKET_CANCELLED',
            entityType: 'Ticket',
            entityId: id,
            metadata: {
                ticketCode: updated.ticketCode,
                cancelReason: dto.cancelReason,
                matchLabel: `${updated.match.homeTeam.name} vs ${updated.match.awayTeam.name}`,
            },
        });
        return updated;
    }
};
exports.AdminTicketsService = AdminTicketsService;
exports.AdminTicketsService = AdminTicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_logs_service_1.AuditLogsService])
], AdminTicketsService);
//# sourceMappingURL=admin-tickets.service.js.map