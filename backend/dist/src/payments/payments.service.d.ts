import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MockConfirmPaymentDto } from './dto/mock-confirm-payment.dto';
export declare class PaymentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    mockConfirm(orderId: string, dto: MockConfirmPaymentDto): Promise<({
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: string;
            paidAt: Date | null;
            provider: import(".prisma/client").$Enums.PaymentProvider;
            providerReference: string | null;
            amount: Prisma.Decimal;
            rawPayload: Prisma.JsonValue | null;
        }[];
        tickets: {
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
        }[];
        ticketCategory: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            matchId: string;
            price: Prisma.Decimal;
            quota: number | null;
            soldCount: number;
            badgeColor: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        matchId: string;
        ticketCategoryId: string;
        reference: string;
        supporterId: string | null;
        buyerName: string;
        buyerPhone: string;
        buyerEmail: string | null;
        quantity: number;
        unitPrice: Prisma.Decimal;
        totalAmount: Prisma.Decimal;
    }) | {
        order: ({
            match: {
                ticketCategories: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    matchId: string;
                    price: Prisma.Decimal;
                    quota: number | null;
                    soldCount: number;
                    badgeColor: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.MatchStatus;
                organizationId: string;
                seasonId: string;
                venueId: string;
                homeTeamId: string;
                awayTeamId: string;
                competitionName: string;
                category: import(".prisma/client").$Enums.AgeCategory;
                stage: string | null;
                matchDate: Date;
                ticketPrice: Prisma.Decimal;
                ticketQuota: number | null;
                createdById: string;
            };
            payments: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.PaymentStatus;
                orderId: string;
                paidAt: Date | null;
                provider: import(".prisma/client").$Enums.PaymentProvider;
                providerReference: string | null;
                amount: Prisma.Decimal;
                rawPayload: Prisma.JsonValue | null;
            }[];
            tickets: {
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
            }[];
            ticketCategory: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                matchId: string;
                price: Prisma.Decimal;
                quota: number | null;
                soldCount: number;
                badgeColor: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrderStatus;
            matchId: string;
            ticketCategoryId: string;
            reference: string;
            supporterId: string | null;
            buyerName: string;
            buyerPhone: string;
            buyerEmail: string | null;
            quantity: number;
            unitPrice: Prisma.Decimal;
            totalAmount: Prisma.Decimal;
        }) | null;
        payment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: string;
            paidAt: Date | null;
            provider: import(".prisma/client").$Enums.PaymentProvider;
            providerReference: string | null;
            amount: Prisma.Decimal;
            rawPayload: Prisma.JsonValue | null;
        };
    }>;
}
