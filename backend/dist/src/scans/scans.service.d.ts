import { PrismaService } from '../prisma/prisma.service';
import { ValidateScanDto } from './dto/validate-scan.dto';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
export declare class ScansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(dto: ValidateScanDto, user: AuthenticatedUser): Promise<{
        result: import(".prisma/client").$Enums.ScanResult;
        scanId: string;
        ticketId: string;
    } | {
        result: import(".prisma/client").$Enums.ScanResult;
        scanId?: undefined;
        ticketId?: undefined;
    }>;
    private createScanResult;
}
