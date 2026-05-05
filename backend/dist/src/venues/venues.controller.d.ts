import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { VenuesService } from './venues.service';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    list(user: AuthenticatedUser): Promise<({
        _count: {
            organization: number;
            commune: number;
            matches: number;
        };
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
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
        } | null;
        matches: {
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
        organizationId: string | null;
        communeId: string | null;
        address: string | null;
        capacity: number | null;
    })[]>;
    getById(id: string, user: AuthenticatedUser): Promise<{
        _count: {
            organization: number;
            commune: number;
            matches: number;
        };
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
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
        } | null;
        matches: {
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
        organizationId: string | null;
        communeId: string | null;
        address: string | null;
        capacity: number | null;
    }>;
    create(dto: CreateVenueDto, user: AuthenticatedUser): Promise<{
        _count: {
            organization: number;
            commune: number;
            matches: number;
        };
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
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
        } | null;
        matches: {
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
        organizationId: string | null;
        communeId: string | null;
        address: string | null;
        capacity: number | null;
    }>;
    update(id: string, dto: UpdateVenueDto, user: AuthenticatedUser): Promise<{
        _count: {
            organization: number;
            commune: number;
            matches: number;
        };
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
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
        } | null;
        matches: {
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
        organizationId: string | null;
        communeId: string | null;
        address: string | null;
        capacity: number | null;
    }>;
    softDelete(id: string, user: AuthenticatedUser): Promise<{
        _count: {
            organization: number;
            commune: number;
            matches: number;
        };
        commune: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            code: string | null;
        } | null;
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
        } | null;
        matches: {
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
        organizationId: string | null;
        communeId: string | null;
        address: string | null;
        capacity: number | null;
    }>;
}
