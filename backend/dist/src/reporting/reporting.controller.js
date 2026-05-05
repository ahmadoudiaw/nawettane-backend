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
exports.ReportingController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const reporting_service_1 = require("./reporting.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const dashboard_query_dto_1 = require("./dto/dashboard-query.dto");
const scope_access_decorator_1 = require("../common/decorators/scope-access.decorator");
let ReportingController = class ReportingController {
    reportingService;
    constructor(reportingService) {
        this.reportingService = reportingService;
    }
    async analytics(user, query) {
        return this.reportingService.getAnalytics(user, query);
    }
    async dashboard(user, query) {
        return this.reportingService.getDashboard(user, query);
    }
    async exportMatches(user, query, res) {
        const buffer = await this.reportingService.exportMatchesWorkbook(user, query);
        this.sendWorkbook(res, buffer, 'nawettane-matchs.xlsx');
    }
    async exportSalesByMatch(user, query, res) {
        const buffer = await this.reportingService.exportSalesByMatchWorkbook(user, query);
        this.sendWorkbook(res, buffer, 'nawettane-ventes-par-match.xlsx');
    }
    async exportTickets(user, query, res) {
        const buffer = await this.reportingService.exportTicketsWorkbook(user, query);
        this.sendWorkbook(res, buffer, 'nawettane-tickets-vendus.xlsx');
    }
    async exportPayments(user, query, res) {
        const buffer = await this.reportingService.exportPaymentsWorkbook(user, query);
        this.sendWorkbook(res, buffer, 'nawettane-paiements.xlsx');
    }
    async exportRevenue(user, query, res) {
        const buffer = await this.reportingService.exportRevenueWorkbook(user, query);
        this.sendWorkbook(res, buffer, 'nawettane-recettes.xlsx');
    }
    async exportDashboard(user, query, res) {
        const buffer = await this.reportingService.exportDashboardWorkbook(user, query);
        this.sendWorkbook(res, buffer, 'nawettane-dashboard-global.xlsx');
    }
    sendWorkbook(res, buffer, filename) {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', buffer.length.toString());
        res.send(buffer);
    }
};
exports.ReportingController = ReportingController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.GUICHET_AGENT, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'report' }),
    (0, common_1.Get)('analytics'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "analytics", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.GUICHET_AGENT, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'report' }),
    (0, common_1.Get)('dashboard'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "dashboard", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'report' }),
    (0, common_1.Get)('exports/matches'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "exportMatches", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'report' }),
    (0, common_1.Get)('exports/sales-by-match'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "exportSalesByMatch", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'report' }),
    (0, common_1.Get)('exports/tickets'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "exportTickets", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'report' }),
    (0, common_1.Get)('exports/payments'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "exportPayments", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'report' }),
    (0, common_1.Get)('exports/revenue'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "exportRevenue", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN, client_1.Role.AGENT_MAIRIE),
    (0, scope_access_decorator_1.ScopeAccess)({ resource: 'report' }),
    (0, common_1.Get)('exports/dashboard'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "exportDashboard", null);
exports.ReportingController = ReportingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reporting_service_1.ReportingService])
], ReportingController);
//# sourceMappingURL=reporting.controller.js.map