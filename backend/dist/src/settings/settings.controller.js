"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const create_super_admin_dto_1 = require("./dto/create-super-admin.dto");
const update_app_settings_dto_1 = require("./dto/update-app-settings.dto");
const update_payment_config_dto_1 = require("./dto/update-payment-config.dto");
const update_super_admin_dto_1 = require("./dto/update-super-admin.dto");
const settings_service_1 = require("./settings.service");
let SettingsController = class SettingsController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    getPaymentConfig() {
        return this.settingsService.getPaymentConfig();
    }
    updatePaymentConfig(dto) {
        return this.settingsService.updatePaymentConfig(dto);
    }
    testPaymentConfig() {
        return this.settingsService.testPaymentConfig();
    }
    getAppSettings() {
        return this.settingsService.getAppSettings();
    }
    updateAppSettings(dto) {
        return this.settingsService.updateAppSettings(dto);
    }
    listSuperAdmins() {
        return this.settingsService.listSuperAdmins();
    }
    createSuperAdmin(dto) {
        return this.settingsService.createSuperAdmin(dto);
    }
    updateSuperAdmin(id, dto) {
        return this.settingsService.updateSuperAdmin(id, dto);
    }
    deactivateSuperAdmin(id) {
        return this.settingsService.deactivateSuperAdmin(id);
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, common_1.Get)('payments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "getPaymentConfig", null);
__decorate([
    (0, common_1.Put)('payments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_payment_config_dto_1.UpdatePaymentConfigDto]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "updatePaymentConfig", null);
__decorate([
    (0, common_1.Post)('payments/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "testPaymentConfig", null);
__decorate([
    (0, common_1.Get)('app'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "getAppSettings", null);
__decorate([
    (0, common_1.Put)('app'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_app_settings_dto_1.UpdateAppSettingsDto]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "updateAppSettings", null);
__decorate([
    (0, common_1.Get)('super-admins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "listSuperAdmins", null);
__decorate([
    (0, common_1.Post)('super-admins'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_super_admin_dto_1.CreateSuperAdminDto]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "createSuperAdmin", null);
__decorate([
    (0, common_1.Patch)('super-admins/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_super_admin_dto_1.UpdateSuperAdminDto]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "updateSuperAdmin", null);
__decorate([
    (0, common_1.Delete)('super-admins/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "deactivateSuperAdmin", null);
exports.SettingsController = SettingsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN),
    (0, common_1.Controller)('admin/settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map