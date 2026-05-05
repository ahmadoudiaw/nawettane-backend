import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
export declare class UsersService {
    private readonly prisma;
    private readonly auditLogs;
    constructor(prisma: PrismaService, auditLogs: AuditLogsService);
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
            ticketPrice: Prisma.Decimal;
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
            metadata: Prisma.JsonValue | null;
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
            ticketPrice: Prisma.Decimal;
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
            metadata: Prisma.JsonValue | null;
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
    create(dto: CreateUserDto, actor?: AuthenticatedUser): Promise<{
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
            ticketPrice: Prisma.Decimal;
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
            metadata: Prisma.JsonValue | null;
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
    update(id: string, dto: UpdateUserDto, actor?: AuthenticatedUser): Promise<{
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
            ticketPrice: Prisma.Decimal;
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
            metadata: Prisma.JsonValue | null;
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
    softDelete(id: string, actor?: AuthenticatedUser): Promise<{
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
            ticketPrice: Prisma.Decimal;
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
            metadata: Prisma.JsonValue | null;
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
    findAdminByIdentifier(identifier: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        passwordHash: string | null;
        role: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.UserStatus;
    } | null>;
    buildAuthenticatedUser(userId: string): Promise<AuthenticatedUser>;
    private collectDescendantOrganizationIds;
    private defaultAdminInclude;
    private buildUserScopeWhere;
    private isUserInScope;
}
