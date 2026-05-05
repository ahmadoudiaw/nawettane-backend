import { PrismaService } from '../prisma/prisma.service';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateAppSettingsDto } from './dto/update-app-settings.dto';
import { UpdatePaymentConfigDto } from './dto/update-payment-config.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
export declare class SettingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPaymentConfig(): Promise<{
        waveEnabled: boolean;
        waveApiKey: string | null;
        waveMerchantId: string | null;
        omEnabled: boolean;
        omClientId: string | null;
        omClientSecret: string | null;
        omMerchantKey: string | null;
        sandbox: boolean;
    }>;
    updatePaymentConfig(dto: UpdatePaymentConfigDto): Promise<{
        waveEnabled: boolean;
        waveApiKey: string | null;
        waveMerchantId: string | null;
        omEnabled: boolean;
        omClientId: string | null;
        omClientSecret: string | null;
        omMerchantKey: string | null;
        sandbox: boolean;
    }>;
    testPaymentConfig(): Promise<{
        ok: boolean;
        message: string;
        mode?: undefined;
        wave?: undefined;
        om?: undefined;
    } | {
        ok: boolean;
        mode: string;
        wave: string;
        om: string;
        message?: undefined;
    }>;
    private maskSecrets;
    getAppSettings(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        applicationTitle: string;
        contactLabel: string;
        contactPhone: string;
        developerName: string;
        developerWebsite: string;
    }>;
    updateAppSettings(dto: UpdateAppSettingsDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        applicationTitle: string;
        contactLabel: string;
        contactPhone: string;
        developerName: string;
        developerWebsite: string;
    }>;
    listSuperAdmins(): Promise<{
        id: string;
        createdAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.UserStatus;
    }[]>;
    createSuperAdmin(dto: CreateSuperAdminDto): Promise<{
        id: string;
        createdAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    updateSuperAdmin(id: string, dto: UpdateSuperAdminDto): Promise<{
        id: string;
        createdAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    deactivateSuperAdmin(id: string): Promise<{
        id: string;
        createdAt: Date;
        fullName: string;
        phone: string;
        email: string | null;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    private requireSuperAdmin;
    private ensureNotLastActiveSuperAdmin;
}
