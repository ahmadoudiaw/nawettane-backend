"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const health_controller_1 = require("./health.controller");
const auth_module_1 = require("./auth/auth.module");
const roles_guard_1 = require("./common/guards/roles.guard");
const scope_guard_1 = require("./common/guards/scope.guard");
const matches_module_1 = require("./matches/matches.module");
const organizations_module_1 = require("./organizations/organizations.module");
const orders_module_1 = require("./orders/orders.module");
const payments_module_1 = require("./payments/payments.module");
const prisma_module_1 = require("./prisma/prisma.module");
const reporting_module_1 = require("./reporting/reporting.module");
const scans_module_1 = require("./scans/scans.module");
const seasons_module_1 = require("./seasons/seasons.module");
const tickets_module_1 = require("./tickets/tickets.module");
const teams_module_1 = require("./teams/teams.module");
const users_module_1 = require("./users/users.module");
const venues_module_1 = require("./venues/venues.module");
const import_module_1 = require("./import/import.module");
const admin_tickets_module_1 = require("./admin-tickets/admin-tickets.module");
const audit_logs_module_1 = require("./audit-logs/audit-logs.module");
const settings_module_1 = require("./settings/settings.module");
const territories_module_1 = require("./territories/territories.module");
const delete_preview_module_1 = require("./delete-preview/delete-preview.module");
const search_module_1 = require("./search/search.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [health_controller_1.HealthController],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            organizations_module_1.OrganizationsModule,
            seasons_module_1.SeasonsModule,
            matches_module_1.MatchesModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            tickets_module_1.TicketsModule,
            scans_module_1.ScansModule,
            reporting_module_1.ReportingModule,
            teams_module_1.TeamsModule,
            venues_module_1.VenuesModule,
            import_module_1.ImportModule,
            admin_tickets_module_1.AdminTicketsModule,
            audit_logs_module_1.AuditLogsModule,
            settings_module_1.SettingsModule,
            territories_module_1.TerritoriesModule,
            delete_preview_module_1.DeletePreviewModule,
            search_module_1.SearchModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: scope_guard_1.ScopeGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map