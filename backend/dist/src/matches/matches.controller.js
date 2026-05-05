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
exports.MatchesController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const matches_service_1 = require("./matches.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const scope_access_decorator_1 = require("../common/decorators/scope-access.decorator");
const create_match_dto_1 = require("./dto/create-match.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const update_match_dto_1 = require("./dto/update-match.dto");
const list_matches_query_dto_1 = require("./dto/list-matches-query.dto");
const check_availability_query_dto_1 = require("./dto/check-availability-query.dto");
let MatchesController = class MatchesController {
    matchesService;
    constructor(matchesService) {
        this.matchesService = matchesService;
    }
    async list(user, query) {
        return this.matchesService.list(user, query);
    }
    async create(dto, user) {
        return this.matchesService.create(dto, user);
    }
    async checkAvailability(query) {
        return this.matchesService.checkVenueAvailability({
            venueId: query.venueId,
            matchDate: new Date(query.matchDate),
            durationMinutes: query.durationMinutes ? Number(query.durationMinutes) : undefined,
            bufferMinutes: query.bufferMinutes ? Number(query.bufferMinutes) : undefined,
            excludeMatchId: query.excludeMatchId,
        });
    }
    async getById(id, user) {
        return this.matchesService.getById(id, user);
    }
    async update(id, dto, user) {
        return this.matchesService.update(id, dto, user);
    }
    async publish(id, user) {
        return this.matchesService.publish(id, user);
    }
    async deactivate(id, user) {
        return this.matchesService.deactivate(id, user);
    }
    async permanentDelete(id, user) {
        return this.matchesService.permanentDelete(id, user);
    }
};
exports.MatchesController = MatchesController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.GUICHET_AGENT, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'match' }),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_matches_query_dto_1.ListMatchesQueryDto]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "list", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ZONE_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'match' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_match_dto_1.CreateMatchDto, Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.GUICHET_AGENT, client_1.Role.AGENT_MAIRIE),
    (0, common_1.Get)('availability'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_availability_query_dto_1.CheckAvailabilityQueryDto]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "checkAvailability", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.GUICHET_AGENT),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'match' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "getById", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ZONE_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'match' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_match_dto_1.UpdateMatchDto, Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ZONE_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'match' }),
    (0, common_1.Post)(':id/publish'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "publish", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ZONE_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'match' }),
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "deactivate", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ZONE_ADMIN),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'match' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "permanentDelete", null);
exports.MatchesController = MatchesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('matches'),
    __metadata("design:paramtypes", [matches_service_1.MatchesService])
], MatchesController);
//# sourceMappingURL=matches.controller.js.map