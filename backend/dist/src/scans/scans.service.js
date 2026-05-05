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
exports.ScansService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const scope_util_1 = require("../common/utils/scope.util");
let ScansService = class ScansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validate(dto, user) {
        const ticket = await this.prisma.ticket.findUnique({
            where: {
                ticketCode: dto.ticketCode,
            },
            include: {
                match: true,
            },
        });
        if (!ticket || ticket.matchId !== dto.matchId) {
            return this.createScanResult(dto.matchId, user.id, null, client_1.ScanResult.INVALID, dto.deviceLabel);
        }
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        const canAccessByOrganization = scope.isGlobal ||
            scope.organizationIds.includes(ticket.match.organizationId) ||
            scope.zoneAssignmentIds.includes(ticket.match.organizationId);
        const canAccessByMatch = scope.matchIds.includes(ticket.matchId);
        if (!canAccessByOrganization && !canAccessByMatch) {
            return this.createScanResult(ticket.matchId, user.id, ticket.id, client_1.ScanResult.OUT_OF_SCOPE, dto.deviceLabel);
        }
        if (ticket.status === client_1.TicketStatus.USED || ticket.usedAt) {
            return this.createScanResult(ticket.matchId, user.id, ticket.id, client_1.ScanResult.ALREADY_USED, dto.deviceLabel);
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.ticket.update({
                where: { id: ticket.id },
                data: {
                    status: client_1.TicketStatus.USED,
                    usedAt: new Date(),
                },
            });
            const scan = await tx.ticketScan.create({
                data: {
                    ticketId: ticket.id,
                    matchId: ticket.matchId,
                    scannedById: user.id,
                    scanResult: client_1.ScanResult.VALID,
                    deviceLabel: dto.deviceLabel,
                },
            });
            return {
                result: client_1.ScanResult.VALID,
                ticketId: ticket.id,
                scanId: scan.id,
            };
        });
    }
    async createScanResult(matchId, scannedById, ticketId, result, deviceLabel) {
        if (ticketId) {
            const scan = await this.prisma.ticketScan.create({
                data: {
                    ticketId,
                    matchId,
                    scannedById,
                    scanResult: result,
                    deviceLabel,
                },
            });
            return {
                result,
                scanId: scan.id,
                ticketId,
            };
        }
        return {
            result,
        };
    }
};
exports.ScansService = ScansService;
exports.ScansService = ScansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScansService);
//# sourceMappingURL=scans.service.js.map