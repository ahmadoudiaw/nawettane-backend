import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    list(user: AuthenticatedUser): Promise<({
        _count: {
            organization: number;
            homeMatches: number;
            awayMatches: number;
        };
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
        homeMatches: {
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
        awayMatches: {
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
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrganizationStatus;
        organizationId: string;
        category: import(".prisma/client").$Enums.AgeCategory;
    })[]>;
    getById(id: string, user: AuthenticatedUser): Promise<{
        _count: {
            organization: number;
            homeMatches: number;
            awayMatches: number;
        };
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
        homeMatches: {
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
        awayMatches: {
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
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrganizationStatus;
        organizationId: string;
        category: import(".prisma/client").$Enums.AgeCategory;
    }>;
    create(dto: CreateTeamDto, user: AuthenticatedUser): Promise<{
        _count: {
            organization: number;
            homeMatches: number;
            awayMatches: number;
        };
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
        homeMatches: {
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
        awayMatches: {
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
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrganizationStatus;
        organizationId: string;
        category: import(".prisma/client").$Enums.AgeCategory;
    }>;
    update(id: string, dto: UpdateTeamDto, user: AuthenticatedUser): Promise<{
        _count: {
            organization: number;
            homeMatches: number;
            awayMatches: number;
        };
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
        homeMatches: {
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
        awayMatches: {
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
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrganizationStatus;
        organizationId: string;
        category: import(".prisma/client").$Enums.AgeCategory;
    }>;
    delete(id: string, user: AuthenticatedUser): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrganizationStatus;
        organizationId: string;
        category: import(".prisma/client").$Enums.AgeCategory;
    }>;
}
