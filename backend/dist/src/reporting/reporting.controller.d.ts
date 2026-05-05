import { ReportingService } from './reporting.service';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { DashboardQueryDto } from './dto/dashboard-query.dto';
import { Response } from 'express';
export declare class ReportingController {
    private readonly reportingService;
    constructor(reportingService: ReportingService);
    analytics(user: AuthenticatedUser, query: DashboardQueryDto): Promise<{
        matchStats: {
            matchId: string;
            label: string;
            zone: string;
            matchDate: string;
            status: import(".prisma/client").$Enums.MatchStatus;
            ticketsSold: number;
            revenue: number;
            ticketsScanned: number;
            ticketQuota: number;
            fillRate: number;
        }[];
        categoryStats: {
            name: string;
            ticketsSold: number;
            revenue: number;
        }[];
        agentStats: {
            agentId: string;
            agentName: string;
            agentRole: string;
            totalScans: number;
            validScans: number;
            invalidScans: number;
            alreadyUsedScans: number;
            lastScan: string | null;
        }[];
    }>;
    dashboard(user: AuthenticatedUser, query: DashboardQueryDto): Promise<{
        reportType: string;
        filters: DashboardQueryDto;
        matchesCount: number;
        ticketsSold: number;
        revenue: import("@prisma/client/runtime/library").Decimal;
        ticketsScanned: number;
        ticketsUnused: number;
        rows: {
            key: string;
            label: string;
            matchesCount: number;
            ticketsSold: number;
            revenue: import("@prisma/client/runtime/library").Decimal;
            ticketsScanned: number;
            ticketsUnused: number;
        }[];
    }>;
    exportMatches(user: AuthenticatedUser, query: DashboardQueryDto, res: Response): Promise<void>;
    exportSalesByMatch(user: AuthenticatedUser, query: DashboardQueryDto, res: Response): Promise<void>;
    exportTickets(user: AuthenticatedUser, query: DashboardQueryDto, res: Response): Promise<void>;
    exportPayments(user: AuthenticatedUser, query: DashboardQueryDto, res: Response): Promise<void>;
    exportRevenue(user: AuthenticatedUser, query: DashboardQueryDto, res: Response): Promise<void>;
    exportDashboard(user: AuthenticatedUser, query: DashboardQueryDto, res: Response): Promise<void>;
    private sendWorkbook;
}
