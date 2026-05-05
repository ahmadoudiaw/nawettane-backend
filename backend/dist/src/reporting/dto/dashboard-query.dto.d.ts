declare const REPORT_TYPES: readonly ["match", "journee", "poule", "zone", "semaine"];
export declare class DashboardQueryDto {
    reportType?: (typeof REPORT_TYPES)[number];
    seasonId?: string;
    regionId?: string;
    departmentId?: string;
    communeId?: string;
    zoneId?: string;
    matchId?: string;
    pool?: string;
    fromDate?: string;
    toDate?: string;
    week?: string;
}
export {};
