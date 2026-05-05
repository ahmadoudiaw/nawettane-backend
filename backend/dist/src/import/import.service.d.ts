import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
export interface ImportRowError {
    row: number;
    message: string;
}
export interface ImportResult {
    total: number;
    created: number;
    skipped: number;
    errors: ImportRowError[];
}
export declare class ImportService {
    private readonly prisma;
    private readonly auditLogs;
    private readonly logger;
    constructor(prisma: PrismaService, auditLogs: AuditLogsService);
    importRegions(file: Express.Multer.File, user: AuthenticatedUser): Promise<ImportResult>;
    importDepartments(file: Express.Multer.File, user: AuthenticatedUser): Promise<ImportResult>;
    importCommunes(file: Express.Multer.File, user: AuthenticatedUser): Promise<ImportResult>;
    importOdcav(file: Express.Multer.File, user: AuthenticatedUser): Promise<ImportResult>;
    importZones(file: Express.Multer.File, user: AuthenticatedUser): Promise<ImportResult>;
    importVenues(file: Express.Multer.File, user: AuthenticatedUser): Promise<ImportResult>;
    private normalizeAgeCategory;
    importTeams(file: Express.Multer.File, user: AuthenticatedUser): Promise<ImportResult>;
    private resolveRegion;
    private resolveDepartment;
    private resolveCommune;
    private resolveOdcav;
    private resolveZone;
    private parseFile;
    generateRegionsTemplate(): Promise<Buffer>;
    generateDepartmentsTemplate(): Promise<Buffer>;
    generateCommunesTemplate(): Promise<Buffer>;
    generateOdcavTemplate(): Promise<Buffer>;
    generateZonesTemplate(): Promise<Buffer>;
    generateVenuesTemplate(): Promise<Buffer>;
    generateTeamsTemplate(): Promise<Buffer>;
    private str;
    private validStatus;
    private isUniqueViolation;
    private errMsg;
    private assertFile;
    private templateWorkbook;
    private styleTemplateHeader;
    private styleExampleRow;
    private toBuffer;
}
