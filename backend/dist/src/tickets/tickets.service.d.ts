import { PrismaService } from '../prisma/prisma.service';
export declare class TicketsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(id: string): Promise<{
        match: {
            organization: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.OrganizationStatus;
                type: import(".prisma/client").$Enums.OrganizationType;
                parentId: string | null;
                regionId: string | null;
                departmentId: string | null;
                communeId: string | null;
            };
            season: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                year: number;
                active: boolean;
            };
            venue: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.OrganizationStatus;
                organizationId: string | null;
                communeId: string | null;
                address: string | null;
                capacity: number | null;
            };
            homeTeam: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.OrganizationStatus;
                organizationId: string;
                category: import(".prisma/client").$Enums.AgeCategory;
            };
            awayTeam: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.OrganizationStatus;
                organizationId: string;
                category: import(".prisma/client").$Enums.AgeCategory;
            };
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
        order: {
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
        };
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
