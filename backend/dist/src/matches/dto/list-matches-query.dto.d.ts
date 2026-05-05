import { MatchStatus } from '@prisma/client';
export declare class ListMatchesQueryDto {
    q?: string;
    regionId?: string;
    departmentId?: string;
    communeId?: string;
    zoneId?: string;
    seasonId?: string;
    status?: MatchStatus;
    fromDate?: string;
    toDate?: string;
}
