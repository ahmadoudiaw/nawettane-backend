import { OrganizationType, Prisma } from '@prisma/client';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationsService {
    private readonly prisma;
    private readonly auditLogs;
    constructor(prisma: PrismaService, auditLogs: AuditLogsService);
    getTree(user: AuthenticatedUser): Promise<({
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
    } & {
        children: ({
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
        } & any)[];
    })[]>;
    list(user: AuthenticatedUser, type?: OrganizationType): Promise<({
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        _count: {
            parent: number;
            children: number;
            region: number;
            department: number;
            commune: number;
            userAssignments: number;
            venues: number;
            teams: number;
            hostedMatches: number;
            zoneAssignments: number;
            payouts: number;
        };
        region: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string | null;
        } | null;
        department: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            regionId: string;
            code: string | null;
        } | null;
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
        parent: {
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
        } | null;
        children: {
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
        }[];
        userAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        venues: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string | null;
            communeId: string | null;
            address: string | null;
            capacity: number | null;
        }[];
        teams: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string;
            category: import(".prisma/client").$Enums.AgeCategory;
        }[];
        hostedMatches: {
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
        payouts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PayoutStatus;
            organizationId: string;
            seasonId: string | null;
            grossAmount: Prisma.Decimal;
            commissionAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
            paidAt: Date | null;
        }[];
    } & {
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
    })[]>;
    create(dto: CreateOrganizationDto, user: AuthenticatedUser): Promise<{
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        _count: {
            parent: number;
            children: number;
            region: number;
            department: number;
            commune: number;
            userAssignments: number;
            venues: number;
            teams: number;
            hostedMatches: number;
            zoneAssignments: number;
            payouts: number;
        };
        region: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string | null;
        } | null;
        department: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            regionId: string;
            code: string | null;
        } | null;
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
        parent: {
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
        } | null;
        children: {
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
        }[];
        userAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        venues: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string | null;
            communeId: string | null;
            address: string | null;
            capacity: number | null;
        }[];
        teams: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string;
            category: import(".prisma/client").$Enums.AgeCategory;
        }[];
        hostedMatches: {
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
        payouts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PayoutStatus;
            organizationId: string;
            seasonId: string | null;
            grossAmount: Prisma.Decimal;
            commissionAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
            paidAt: Date | null;
        }[];
    } & {
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
    }>;
    update(id: string, dto: UpdateOrganizationDto, user: AuthenticatedUser): Promise<{
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        _count: {
            parent: number;
            children: number;
            region: number;
            department: number;
            commune: number;
            userAssignments: number;
            venues: number;
            teams: number;
            hostedMatches: number;
            zoneAssignments: number;
            payouts: number;
        };
        region: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string | null;
        } | null;
        department: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            regionId: string;
            code: string | null;
        } | null;
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
        parent: {
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
        } | null;
        children: {
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
        }[];
        userAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        venues: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string | null;
            communeId: string | null;
            address: string | null;
            capacity: number | null;
        }[];
        teams: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string;
            category: import(".prisma/client").$Enums.AgeCategory;
        }[];
        hostedMatches: {
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
        payouts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PayoutStatus;
            organizationId: string;
            seasonId: string | null;
            grossAmount: Prisma.Decimal;
            commissionAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
            paidAt: Date | null;
        }[];
    } & {
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
    }>;
    softDelete(id: string, user: AuthenticatedUser): Promise<{
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        _count: {
            parent: number;
            children: number;
            region: number;
            department: number;
            commune: number;
            userAssignments: number;
            venues: number;
            teams: number;
            hostedMatches: number;
            zoneAssignments: number;
            payouts: number;
        };
        region: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string | null;
        } | null;
        department: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            regionId: string;
            code: string | null;
        } | null;
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
        parent: {
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
        } | null;
        children: {
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
        }[];
        userAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        venues: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string | null;
            communeId: string | null;
            address: string | null;
            capacity: number | null;
        }[];
        teams: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string;
            category: import(".prisma/client").$Enums.AgeCategory;
        }[];
        hostedMatches: {
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
        payouts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PayoutStatus;
            organizationId: string;
            seasonId: string | null;
            grossAmount: Prisma.Decimal;
            commissionAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
            paidAt: Date | null;
        }[];
    } & {
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
    }>;
    permanentDelete(id: string, user: AuthenticatedUser): Promise<void>;
    getById(id: string, user: AuthenticatedUser): Promise<{
        zoneAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            assignmentType: import(".prisma/client").$Enums.AssignmentType;
        }[];
        _count: {
            parent: number;
            children: number;
            region: number;
            department: number;
            commune: number;
            userAssignments: number;
            venues: number;
            teams: number;
            hostedMatches: number;
            zoneAssignments: number;
            payouts: number;
        };
        region: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string | null;
        } | null;
        department: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            regionId: string;
            code: string | null;
        } | null;
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
        parent: {
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
        } | null;
        children: {
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
        }[];
        userAssignments: {
            id: string;
            createdAt: Date;
            userId: string;
            organizationId: string;
            isPrimary: boolean;
        }[];
        venues: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string | null;
            communeId: string | null;
            address: string | null;
            capacity: number | null;
        }[];
        teams: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            organizationId: string;
            category: import(".prisma/client").$Enums.AgeCategory;
        }[];
        hostedMatches: {
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
        payouts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PayoutStatus;
            organizationId: string;
            seasonId: string | null;
            grossAmount: Prisma.Decimal;
            commissionAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
            paidAt: Date | null;
        }[];
    } & {
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
    }>;
    private validateZoneInput;
    private defaultInclude;
}
