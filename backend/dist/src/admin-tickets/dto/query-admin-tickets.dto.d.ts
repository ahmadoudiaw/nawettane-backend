export declare class QueryAdminTicketsDto {
    q?: string;
    matchId?: string;
    ticketCategoryId?: string;
    status?: 'GENERATED' | 'USED' | 'CANCELLED';
    fromDate?: string;
    toDate?: string;
    page?: string;
    limit?: string;
}
