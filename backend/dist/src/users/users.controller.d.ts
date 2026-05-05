import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(user: AuthenticatedUser): Promise<({
        organizationAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        matchAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
            matchId: string;
        }[];
        scans: {
            id: string;
            matchId: string;
            ticketId: string;
            scannedById: string;
            scanResult: import(".prisma/client").$Enums.ScanResult;
            scannedAt: Date;
            deviceLabel: string | null;
        }[];
        createdMatches: {
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
        }[];
        cancelledTickets: {
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
        auditLogs: {
            id: string;
            createdAt: Date;
            action: string;
            entityType: string;
            entityId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        }[];
        supporterProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            userId: string;
        } | null;
        _count: {
            organizationAssignments: number;
            zoneAssignments: number;
            matchAssignments: number;
            scans: number;
            createdMatches: number;
            cancelledTickets: number;
            auditLogs: number;
            supporterProfile: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        passwordHash: string | null;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.UserStatus;
    })[]>;
    getById(id: string, user: AuthenticatedUser): Promise<{
        organizationAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        matchAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
            matchId: string;
        }[];
        scans: {
            id: string;
            matchId: string;
            ticketId: string;
            scannedById: string;
            scanResult: import(".prisma/client").$Enums.ScanResult;
            scannedAt: Date;
            deviceLabel: string | null;
        }[];
        createdMatches: {
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
        }[];
        cancelledTickets: {
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
        auditLogs: {
            id: string;
            createdAt: Date;
            action: string;
            entityType: string;
            entityId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        }[];
        supporterProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            userId: string;
        } | null;
        _count: {
            organizationAssignments: number;
            zoneAssignments: number;
            matchAssignments: number;
            scans: number;
            createdMatches: number;
            cancelledTickets: number;
            auditLogs: number;
            supporterProfile: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        passwordHash: string | null;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    create(dto: CreateUserDto, actor: AuthenticatedUser): Promise<{
        organizationAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        matchAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
            matchId: string;
        }[];
        scans: {
            id: string;
            matchId: string;
            ticketId: string;
            scannedById: string;
            scanResult: import(".prisma/client").$Enums.ScanResult;
            scannedAt: Date;
            deviceLabel: string | null;
        }[];
        createdMatches: {
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
        }[];
        cancelledTickets: {
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
        auditLogs: {
            id: string;
            createdAt: Date;
            action: string;
            entityType: string;
            entityId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        }[];
        supporterProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            userId: string;
        } | null;
        _count: {
            organizationAssignments: number;
            zoneAssignments: number;
            matchAssignments: number;
            scans: number;
            createdMatches: number;
            cancelledTickets: number;
            auditLogs: number;
            supporterProfile: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        passwordHash: string | null;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    update(id: string, dto: UpdateUserDto, actor: AuthenticatedUser): Promise<{
        organizationAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        matchAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
            matchId: string;
        }[];
        scans: {
            id: string;
            matchId: string;
            ticketId: string;
            scannedById: string;
            scanResult: import(".prisma/client").$Enums.ScanResult;
            scannedAt: Date;
            deviceLabel: string | null;
        }[];
        createdMatches: {
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
        }[];
        cancelledTickets: {
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
        auditLogs: {
            id: string;
            createdAt: Date;
            action: string;
            entityType: string;
            entityId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        }[];
        supporterProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            userId: string;
        } | null;
        _count: {
            organizationAssignments: number;
            zoneAssignments: number;
            matchAssignments: number;
            scans: number;
            createdMatches: number;
            cancelledTickets: number;
            auditLogs: number;
            supporterProfile: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        passwordHash: string | null;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    softDelete(id: string, actor: AuthenticatedUser): Promise<{
        organizationAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        matchAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
            matchId: string;
        }[];
        scans: {
            id: string;
            matchId: string;
            ticketId: string;
            scannedById: string;
            scanResult: import(".prisma/client").$Enums.ScanResult;
            scannedAt: Date;
            deviceLabel: string | null;
        }[];
        createdMatches: {
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
        }[];
        cancelledTickets: {
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
        auditLogs: {
            id: string;
            createdAt: Date;
            action: string;
            entityType: string;
            entityId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        }[];
        supporterProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            phone: string;
            email: string | null;
            userId: string;
        } | null;
        _count: {
            organizationAssignments: number;
            zoneAssignments: number;
            matchAssignments: number;
            scans: number;
            createdMatches: number;
            cancelledTickets: number;
            auditLogs: number;
            supporterProfile: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        passwordHash: string | null;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
}
