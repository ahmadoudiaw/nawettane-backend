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
exports.SeasonsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const create_season_dto_1 = require("./dto/create-season.dto");
const update_season_dto_1 = require("./dto/update-season.dto");
const seasons_service_1 = require("./seasons.service");
let SeasonsController = class SeasonsController {
    seasonsService;
    constructor(seasonsService) {
        this.seasonsService = seasonsService;
    }
    async list() {
        return this.seasonsService.list();
    }
    async create(dto) {
        return this.seasonsService.create(dto);
    }
    async update(id, dto) {
        return this.seasonsService.update(id, dto);
    }
    async activate(id) {
        return this.seasonsService.activate(id);
    }
    async remove(id) {
        return this.seasonsService.remove(id);
    }
};
exports.SeasonsController = SeasonsController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "list", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_season_dto_1.CreateSeasonDto]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_season_dto_1.UpdateSeasonDto]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN),
    (0, common_1.Post)(':id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "activate", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "remove", null);
exports.SeasonsController = SeasonsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('seasons'),
    __metadata("design:paramtypes", [seasons_service_1.SeasonsService])
], SeasonsController);
//# sourceMappingURL=seasons.controller.js.map