"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTicketsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const admin_tickets_controller_1 = require("./admin-tickets.controller");
const admin_tickets_service_1 = require("./admin-tickets.service");
let AdminTicketsModule = class AdminTicketsModule {
};
exports.AdminTicketsModule = AdminTicketsModule;
exports.AdminTicketsModule = AdminTicketsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [admin_tickets_controller_1.AdminTicketsController],
        providers: [admin_tickets_service_1.AdminTicketsService],
    })
], AdminTicketsModule);
//# sourceMappingURL=admin-tickets.module.js.map