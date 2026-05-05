import { ScansService } from './scans.service';
import { ValidateScanDto } from './dto/validate-scan.dto';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
export declare class ScansController {
    private readonly scansService;
    constructor(scansService: ScansService);
    validate(dto: ValidateScanDto, user: AuthenticatedUser): Promise<{
        result: import(".prisma/client").$Enums.ScanResult;
        scanId: string;
        ticketId: string;
    } | {
        result: import(".prisma/client").$Enums.ScanResult;
        scanId?: undefined;
        ticketId?: undefined;
    }>;
}
