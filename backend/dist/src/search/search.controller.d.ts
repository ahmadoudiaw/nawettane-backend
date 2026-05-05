import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(q?: string): Promise<{
        matches: {
            id: string;
            status: import(".prisma/client").$Enums.MatchStatus;
            organization: {
                name: string;
            };
            competitionName: string;
            matchDate: Date;
            homeTeam: {
                name: string;
            };
            awayTeam: {
                name: string;
            };
        }[];
        teams: {
            name: string;
            id: string;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            category: import(".prisma/client").$Enums.AgeCategory;
        }[];
        zones: {
            name: string;
            id: string;
            status: import(".prisma/client").$Enums.OrganizationStatus;
            type: import(".prisma/client").$Enums.OrganizationType;
        }[];
        tickets: {
            id: string;
            match: {
                homeTeam: {
                    name: string;
                };
                awayTeam: {
                    name: string;
                };
            };
            status: import(".prisma/client").$Enums.TicketStatus;
            ticketCode: string;
        }[];
        users: {
            id: string;
            fullName: string;
            phone: string;
            role: import(".prisma/client").$Enums.Role;
            status: import(".prisma/client").$Enums.UserStatus;
        }[];
    }>;
}
