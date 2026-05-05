"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const PAYMENT_CONFIG_ID = 'singleton';
const APP_SETTINGS_ID = 'singleton';
const SUPER_ADMIN_SELECT = {
    id: true,
    fullName: true,
    email: true,
    phone: true,
    status: true,
    createdAt: true,
};
let SettingsService = class SettingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPaymentConfig() {
        const config = await this.prisma.paymentConfig.upsert({
            where: { id: PAYMENT_CONFIG_ID },
            create: { id: PAYMENT_CONFIG_ID },
            update: {},
        });
        return this.maskSecrets(config);
    }
    async updatePaymentConfig(dto) {
        await this.prisma.paymentConfig.upsert({
            where: { id: PAYMENT_CONFIG_ID },
            create: { id: PAYMENT_CONFIG_ID },
            update: {},
        });
        const data = {};
        if (dto.waveEnabled !== undefined)
            data.waveEnabled = dto.waveEnabled;
        if (dto.waveMerchantId !== undefined && dto.waveMerchantId.trim() !== '')
            data.waveMerchantId = dto.waveMerchantId;
        if (dto.waveApiKey !== undefined && dto.waveApiKey.trim() !== '')
            data.waveApiKey = dto.waveApiKey;
        if (dto.omEnabled !== undefined)
            data.omEnabled = dto.omEnabled;
        if (dto.omClientId !== undefined && dto.omClientId.trim() !== '')
            data.omClientId = dto.omClientId;
        if (dto.omClientSecret !== undefined && dto.omClientSecret.trim() !== '')
            data.omClientSecret = dto.omClientSecret;
        if (dto.omMerchantKey !== undefined && dto.omMerchantKey.trim() !== '')
            data.omMerchantKey = dto.omMerchantKey;
        if (dto.sandbox !== undefined)
            data.sandbox = dto.sandbox;
        data.updatedAt = new Date();
        const updated = await this.prisma.paymentConfig.update({
            where: { id: PAYMENT_CONFIG_ID },
            data,
        });
        return this.maskSecrets(updated);
    }
    async testPaymentConfig() {
        const config = await this.prisma.paymentConfig.findUnique({
            where: { id: PAYMENT_CONFIG_ID },
        });
        if (!config) {
            return { ok: false, message: 'Configuration non initialisée.' };
        }
        const waveStatus = config.waveEnabled
            ? config.waveApiKey && config.waveMerchantId
                ? 'configured'
                : 'incomplete'
            : 'disabled';
        const omStatus = config.omEnabled
            ? config.omClientId && config.omClientSecret && config.omMerchantKey
                ? 'configured'
                : 'incomplete'
            : 'disabled';
        const ok = (!config.waveEnabled || waveStatus === 'configured') &&
            (!config.omEnabled || omStatus === 'configured');
        return {
            ok,
            mode: config.sandbox ? 'sandbox' : 'production',
            wave: waveStatus,
            om: omStatus,
        };
    }
    maskSecrets(config) {
        return {
            waveEnabled: config.waveEnabled,
            waveApiKey: config.waveApiKey ? '***' : null,
            waveMerchantId: config.waveMerchantId ? '***' : null,
            omEnabled: config.omEnabled,
            omClientId: config.omClientId ? '***' : null,
            omClientSecret: config.omClientSecret ? '***' : null,
            omMerchantKey: config.omMerchantKey ? '***' : null,
            sandbox: config.sandbox,
        };
    }
    async getAppSettings() {
        return this.prisma.appSettings.upsert({
            where: { id: APP_SETTINGS_ID },
            create: { id: APP_SETTINGS_ID },
            update: {},
        });
    }
    async updateAppSettings(dto) {
        await this.prisma.appSettings.upsert({
            where: { id: APP_SETTINGS_ID },
            create: { id: APP_SETTINGS_ID },
            update: {},
        });
        const data = {};
        if (dto.applicationTitle !== undefined)
            data.applicationTitle = dto.applicationTitle;
        if (dto.contactLabel !== undefined)
            data.contactLabel = dto.contactLabel;
        if (dto.contactPhone !== undefined)
            data.contactPhone = dto.contactPhone;
        if (dto.developerName !== undefined)
            data.developerName = dto.developerName;
        if (dto.developerWebsite !== undefined)
            data.developerWebsite = dto.developerWebsite;
        return this.prisma.appSettings.update({
            where: { id: APP_SETTINGS_ID },
            data,
        });
    }
    async listSuperAdmins() {
        return this.prisma.user.findMany({
            where: { role: client_1.Role.SUPER_ADMIN },
            select: SUPER_ADMIN_SELECT,
            orderBy: { fullName: 'asc' },
        });
    }
    async createSuperAdmin(dto) {
        const passwordHash = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                phone: dto.phone,
                passwordHash,
                role: client_1.Role.SUPER_ADMIN,
                status: client_1.UserStatus.ACTIVE,
            },
            select: SUPER_ADMIN_SELECT,
        });
    }
    async updateSuperAdmin(id, dto) {
        await this.requireSuperAdmin(id);
        if (dto.status === client_1.UserStatus.INACTIVE) {
            await this.ensureNotLastActiveSuperAdmin(id);
        }
        const passwordHash = dto.password ? await bcrypt.hash(dto.password, 10) : undefined;
        return this.prisma.user.update({
            where: { id },
            data: {
                fullName: dto.fullName,
                email: dto.email,
                phone: dto.phone,
                ...(passwordHash ? { passwordHash } : {}),
                status: dto.status,
            },
            select: SUPER_ADMIN_SELECT,
        });
    }
    async deactivateSuperAdmin(id) {
        await this.requireSuperAdmin(id);
        await this.ensureNotLastActiveSuperAdmin(id);
        return this.prisma.user.update({
            where: { id },
            data: { status: client_1.UserStatus.INACTIVE, updatedAt: new Date() },
            select: SUPER_ADMIN_SELECT,
        });
    }
    async requireSuperAdmin(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user || user.role !== client_1.Role.SUPER_ADMIN) {
            throw new common_1.NotFoundException('Super Admin introuvable.');
        }
        return user;
    }
    async ensureNotLastActiveSuperAdmin(excludeId) {
        const activeCount = await this.prisma.user.count({
            where: {
                role: client_1.Role.SUPER_ADMIN,
                status: client_1.UserStatus.ACTIVE,
                id: { not: excludeId },
            },
        });
        if (activeCount === 0) {
            throw new common_1.ForbiddenException('Impossible de désactiver le dernier Super Admin actif.');
        }
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map