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
exports.OrganizationsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const scope_access_decorator_1 = require("../common/decorators/scope-access.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const create_organization_dto_1 = require("./dto/create-organization.dto");
const list_organizations_query_dto_1 = require("./dto/list-organizations-query.dto");
const update_organization_dto_1 = require("./dto/update-organization.dto");
const organizations_service_1 = require("./organizations.service");
let OrganizationsController = class OrganizationsController {
    organizationsService;
    constructor(organizationsService) {
        this.organizationsService = organizationsService;
    }
    async list(user, query) {
        return this.organizationsService.list(user, query.type);
    }
    async getTree(user) {
        return this.organizationsService.getTree(user);
    }
    async create(dto, user) {
        return this.organizationsService.create(dto, user);
    }
    async update(id, dto, user) {
        return this.organizationsService.update(id, dto, user);
    }
    async permanentDelete(id, user) {
        return this.organizationsService.permanentDelete(id, user);
    }
    async softDelete(id, user) {
        return this.organizationsService.softDelete(id, user);
    }
    async getById(id, user) {
        return this.organizationsService.getById(id, user);
    }
};
exports.OrganizationsController = OrganizationsController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'organization' }),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_organizations_query_dto_1.ListOrganizationsQueryDto]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "list", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'organization' }),
    (0, common_1.Get)('tree'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getTree", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'organization' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_organization_dto_1.CreateOrganizationDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'organization' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_organization_dto_1.UpdateOrganizationDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ODCAV_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'organization' }),
    (0, common_1.Delete)(':id/permanent'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "permanentDelete", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'organization' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "softDelete", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'organization' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getById", null);
exports.OrganizationsController = OrganizationsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('organizations'),
    __metadata("design:paramtypes", [organizations_service_1.OrganizationsService])
], OrganizationsController);
//# sourceMappingURL=organizations.controller.js.map