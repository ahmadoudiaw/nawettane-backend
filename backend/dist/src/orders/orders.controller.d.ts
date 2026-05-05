import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dto: CreateOrderDto): Promise<{
        match: {
            ticketCategories: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                matchId: string;
                price: import("@prisma/client/runtime/library").Decimal;
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
            ticketPrice: import("@prisma/client/runtime/library").Decimal;
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
            amount: import("@prisma/client/runtime/library").Decimal;
            rawPayload: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        ticketCategory: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            matchId: string;
            price: import("@prisma/client/runtime/library").Decimal;
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
        unitPrice: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
    }>;
}
