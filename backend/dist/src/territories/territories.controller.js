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
exports.TerritoriesController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const create_commune_dto_1 = require("./dto/create-commune.dto");
const create_department_dto_1 = require("./dto/create-department.dto");
const create_region_dto_1 = require("./dto/create-region.dto");
const update_commune_dto_1 = require("./dto/update-commune.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const update_region_dto_1 = require("./dto/update-region.dto");
const territories_service_1 = require("./territories.service");
const READ_ROLES = [
    client_1.Role.SUPER_ADMIN,
    client_1.Role.ONCAV_ADMIN,
    client_1.Role.ORCAV_ADMIN,
    client_1.Role.ODCAV_ADMIN,
    client_1.Role.ZONE_ADMIN,
    client_1.Role.AGENT_MAIRIE,
];
const WRITE_ROLES = [client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN];
let TerritoriesController = class TerritoriesController {
    territoriesService;
    constructor(territoriesService) {
        this.territoriesService = territoriesService;
    }
    listRegions() {
        return this.territoriesService.listRegions();
    }
    createRegion(dto) {
        return this.territoriesService.createRegion(dto);
    }
    updateRegion(id, dto) {
        return this.territoriesService.updateRegion(id, dto);
    }
    deleteRegion(id) {
        return this.territoriesService.deleteRegion(id);
    }
    listDepartments(regionId) {
        return this.territoriesService.listDepartments(regionId);
    }
    createDepartment(dto) {
        return this.territoriesService.createDepartment(dto);
    }
    updateDepartment(id, dto) {
        return this.territoriesService.updateDepartment(id, dto);
    }
    deleteDepartment(id) {
        return this.territoriesService.deleteDepartment(id);
    }
    listCommunes(departmentId) {
        return this.territoriesService.listCommunes(departmentId);
    }
    createCommune(dto) {
        return this.territoriesService.createCommune(dto);
    }
    updateCommune(id, dto) {
        return this.territoriesService.updateCommune(id, dto);
    }
    deleteCommune(id) {
        return this.territoriesService.deleteCommune(id);
    }
};
exports.TerritoriesController = TerritoriesController;
__decorate([
    (0, roles_decorator_1.Roles)(...READ_ROLES),
    (0, common_1.Get)('regions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "listRegions", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Post)('regions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_region_dto_1.CreateRegionDto]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "createRegion", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Patch)('regions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_region_dto_1.UpdateRegionDto]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "updateRegion", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Delete)('regions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "deleteRegion", null);
__decorate([
    (0, roles_decorator_1.Roles)(...READ_ROLES),
    (0, common_1.Get)('departments'),
    __param(0, (0, common_1.Query)('regionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "listDepartments", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Post)('departments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "createDepartment", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Patch)('departments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "updateDepartment", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Delete)('departments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "deleteDepartment", null);
__decorate([
    (0, roles_decorator_1.Roles)(...READ_ROLES),
    (0, common_1.Get)('communes'),
    __param(0, (0, common_1.Query)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "listCommunes", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Post)('communes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_commune_dto_1.CreateCommuneDto]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "createCommune", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Patch)('communes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_commune_dto_1.UpdateCommuneDto]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "updateCommune", null);
__decorate([
    (0, roles_decorator_1.Roles)(...WRITE_ROLES),
    (0, common_1.Delete)('communes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerritoriesController.prototype, "deleteCommune", null);
exports.TerritoriesController = TerritoriesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('territories'),
    __metadata("design:paramtypes", [territories_service_1.TerritoriesService])
], TerritoriesController);
//# sourceMappingURL=territories.controller.js.map