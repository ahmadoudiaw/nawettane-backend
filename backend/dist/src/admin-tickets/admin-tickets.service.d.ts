import { Prisma } from '@prisma/client';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { PrismaService } from '../prisma/prisma.service';
import { CancelTicketDto } from './dto/cancel-ticket.dto';
import { QueryAdminTicketsDto } from './dto/query-admin-tickets.dto';
export declare class AdminTicketsService {
    private readonly prisma;
    private readonly auditLogs;
    constructor(prisma: PrismaService, auditLogs: AuditLogsService);
    findAll(dto: QueryAdminTicketsDto): Promise<{
        data: ({
            match: {
                id: string;
                competitionName: string;
                matchDate: Date;
                homeTeam: {
                    name: string;
                };
                awayTeam: {
                    name: string;
                };
            };
            order: {
                id: string;
                reference: string;
                buyerName: string;
                buyerPhone: string;
                totalAmount: Prisma.Decimal;
            };
            ticketCategory: {
                name: string;
                id: string;
                price: Prisma.Decimal;
            };
            cancelledByAdmin: {
                id: string;
                fullName: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TicketStatus;
            matchId: string;
            orderId: string;
            ticketCategoryId: string;
            ticketCode: string;
            qrPayload: string;
            holderName: string | null;
            usedAt: Date | null;
            cancelledAt: Date | null;
            cancelledByAdminId: string | null;
            cancelReason: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    cancel(id: string, dto: CancelTicketDto, user: AuthenticatedUser): Promise<{
        match: {
            id: string;
            competitionName: string;
            matchDate: Date;
            homeTeam: {
                name: string;
            };
            awayTeam: {
                name: string;
            };
        };
        order: {
            id: string;
            reference: string;
            buyerName: string;
            buyerPhone: string;
            totalAmount: Prisma.Decimal;
        };
        ticketCategory: {
            name: string;
            id: string;
            price: Prisma.Decimal;
        };
        cancelledByAdmin: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.TicketStatus;
        matchId: string;
        orderId: string;
        ticketCategoryId: string;
        ticketCode: string;
        qrPayload: string;
        holderName: string | null;
        usedAt: Date | null;
        cancelledAt: Date | null;
        cancelledByAdminId: string | null;
        cancelReason: string | null;
    }>;
}
