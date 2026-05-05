import { AgeCategory } from '@prisma/client';
import { MatchTicketCategoryDto } from './match-ticket-category.dto';
export declare class CreateMatchDto {
    seasonId: string;
    organizationId: string;
    venueId: string;
    homeTeamId: string;
    awayTeamId: string;
    competitionName: string;
    category: AgeCategory;
    stage?: string;
    matchDate: string;
    ticketQuota: number;
    ticketPrice: string;
    ticketCategories?: MatchTicketCategoryDto[];
}
