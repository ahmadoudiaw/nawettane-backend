import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto';
export declare class AuditLogsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    log(data: {
        userId?: string | null;
        action: string;
        entityType: string;
        entityId: string;
        metadata?: Record<string, unknown>;
    }): void;
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
            metadata: Prisma.JsonValue | null;
            userId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
