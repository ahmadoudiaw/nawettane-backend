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
exports.ImportController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const import_service_1 = require("./import.service");
const FILE_OPTS = { limits: { fileSize: 10 * 1024 * 1024 } };
const IMPORT_ROLES = [
    client_1.Role.SUPER_ADMIN,
    client_1.Role.ONCAV_ADMIN,
    client_1.Role.ORCAV_ADMIN,
    client_1.Role.ODCAV_ADMIN,
];
let ImportController = class ImportController {
    importService;
    constructor(importService) {
        this.importService = importService;
    }
    importRegions(file, user) {
        return this.importService.importRegions(file, user);
    }
    importDepartments(file, user) {
        return this.importService.importDepartments(file, user);
    }
    importCommunes(file, user) {
        return this.importService.importCommunes(file, user);
    }
    importOdcav(file, user) {
        return this.importService.importOdcav(file, user);
    }
    importZones(file, user) {
        return this.importService.importZones(file, user);
    }
    importVenues(file, user) {
        return this.importService.importVenues(file, user);
    }
    importTeams(file, user) {
        return this.importService.importTeams(file, user);
    }
    async templateRegions(res) {
        const buffer = await this.importService.generateRegionsTemplate();
        this.sendTemplate(res, buffer, 'modele_import_regions.xlsx');
    }
    async templateDepartments(res) {
        const buffer = await this.importService.generateDepartmentsTemplate();
        this.sendTemplate(res, buffer, 'modele_import_departements.xlsx');
    }
    async templateCommunes(res) {
        const buffer = await this.importService.generateCommunesTemplate();
        this.sendTemplate(res, buffer, 'modele_import_communes.xlsx');
    }
    async templateOdcav(res) {
        const buffer = await this.importService.generateOdcavTemplate();
        this.sendTemplate(res, buffer, 'modele_import_odcav.xlsx');
    }
    async templateZones(res) {
        const buffer = await this.importService.generateZonesTemplate();
        this.sendTemplate(res, buffer, 'modele_import_zones.xlsx');
    }
    async templateVenues(res) {
        const buffer = await this.importService.generateVenuesTemplate();
        this.sendTemplate(res, buffer, 'modele_import_stades.xlsx');
    }
    async templateTeams(res) {
        const buffer = await this.importService.generateTeamsTemplate();
        this.sendTemplate(res, buffer, 'modele_import_equipes.xlsx');
    }
    sendTemplate(res, buffer, filename) {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', buffer.length.toString());
        res.send(buffer);
    }
};
exports.ImportController = ImportController;
__decorate([
    (0, common_1.Post)('regions'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FILE_OPTS)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importRegions", null);
__decorate([
    (0, common_1.Post)('departments'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FILE_OPTS)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importDepartments", null);
__decorate([
    (0, common_1.Post)('communes'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FILE_OPTS)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importCommunes", null);
__decorate([
    (0, common_1.Post)('odcav'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FILE_OPTS)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importOdcav", null);
__decorate([
    (0, common_1.Post)('zones'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FILE_OPTS)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importZones", null);
__decorate([
    (0, common_1.Post)('venues'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FILE_OPTS)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importVenues", null);
__decorate([
    (0, common_1.Post)('teams'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FILE_OPTS)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importTeams", null);
__decorate([
    (0, common_1.Get)('templates/regions'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "templateRegions", null);
__decorate([
    (0, common_1.Get)('templates/departments'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "templateDepartments", null);
__decorate([
    (0, common_1.Get)('templates/communes'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "templateCommunes", null);
__decorate([
    (0, common_1.Get)('templates/odcav'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "templateOdcav", null);
__decorate([
    (0, common_1.Get)('templates/zones'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "templateZones", null);
__decorate([
    (0, common_1.Get)('templates/venues'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "templateVenues", null);
__decorate([
    (0, common_1.Get)('templates/teams'),
    (0, roles_decorator_1.Roles)(...IMPORT_ROLES),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImportController.prototype, "templateTeams", null);
exports.ImportController = ImportController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('import'),
    __metadata("design:paramtypes", [import_service_1.ImportService])
], ImportController);
//# sourceMappingURL=import.controller.js.map