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
exports.AdminTicketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const admin_tickets_service_1 = require("./admin-tickets.service");
const cancel_ticket_dto_1 = require("./dto/cancel-ticket.dto");
const query_admin_tickets_dto_1 = require("./dto/query-admin-tickets.dto");
let AdminTicketsController = class AdminTicketsController {
    adminTicketsService;
    constructor(adminTicketsService) {
        this.adminTicketsService = adminTicketsService;
    }
    findAll(query) {
        return this.adminTicketsService.findAll(query);
    }
    cancel(id, dto, user) {
        return this.adminTicketsService.cancel(id, dto, user);
    }
};
exports.AdminTicketsController = AdminTicketsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_admin_tickets_dto_1.QueryAdminTicketsDto]),
    __metadata("design:returntype", void 0)
], AdminTicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cancel_ticket_dto_1.CancelTicketDto, Object]),
    __metadata("design:returntype", void 0)
], AdminTicketsController.prototype, "cancel", null);
exports.AdminTicketsController = AdminTicketsController = __decorate([
    (0, swagger_1.ApiTags)('admin-tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN),
    (0, common_1.Controller)('admin/tickets'),
    __metadata("design:paramtypes", [admin_tickets_service_1.AdminTicketsService])
], AdminTicketsController);
//# sourceMappingURL=admin-tickets.controller.js.map