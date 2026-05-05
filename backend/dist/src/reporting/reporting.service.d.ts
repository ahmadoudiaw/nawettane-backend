import * as ExcelJS from 'exceljs';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { DashboardQueryDto } from './dto/dashboard-query.dto';
type ReportRow = {
    key: string;
    label: string;
    matchesCount: number;
    ticketsSold: number;
    revenue: Prisma.Decimal;
    ticketsScanned: number;
    ticketsUnused: number;
};
export declare class ReportingService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getDashboard(user: AuthenticatedUser, query: DashboardQueryDto): Promise<{
        reportType: string;
        filters: DashboardQueryDto;
        matchesCount: number;
        ticketsSold: number;
        revenue: Prisma.Decimal;
        ticketsScanned: number;
        ticketsUnused: number;
        rows: ReportRow[];
    }>;
    exportMatchesWorkbook(user: AuthenticatedUser, query: DashboardQueryDto): Promise<Buffer<ExcelJS.Buffer>>;
    exportSalesByMatchWorkbook(user: AuthenticatedUser, query: DashboardQueryDto): Promise<Buffer<ExcelJS.Buffer>>;
    exportTicketsWorkbook(user: AuthenticatedUser, query: DashboardQueryDto): Promise<Buffer<ExcelJS.Buffer>>;
    exportPaymentsWorkbook(user: AuthenticatedUser, query: DashboardQueryDto): Promise<Buffer<ExcelJS.Buffer>>;
    exportRevenueWorkbook(user: AuthenticatedUser, query: DashboardQueryDto): Promise<Buffer<ExcelJS.Buffer>>;
    exportDashboardWorkbook(user: AuthenticatedUser, query: DashboardQueryDto): Promise<Buffer<ExcelJS.Buffer>>;
    getAnalytics(user: AuthenticatedUser, query: DashboardQueryDto): Promise<{
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
    private getLegacyDashboard;
    private buildMatchWhere;
    private resolveFromDate;
    private resolveToDate;
    private buildRows;
    private getWeekLabel;
    private getScopedMatches;
    private getScopedPaidOrders;
    private getScopedTickets;
    private getScopedPayments;
    private createWorkbook;
    private styleWorksheet;
    private writeWorkbook;
    private resolveTicketCategory;
    private toNumber;
    private formatDateTime;
    private isMissingTicketCategoriesTableError;
}
export {};
