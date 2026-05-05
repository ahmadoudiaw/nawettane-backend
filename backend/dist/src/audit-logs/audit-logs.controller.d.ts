import { AuditLogsService } from './audit-logs.service';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    findAll(dto: QueryAuditLogsDto): Promise<{
        data: ({
            user: {
                id: string;
                fullName: string;
                role: import(".prisma/client").$Enums.Role;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            action: string;
            entityType: string;
            entityId: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
