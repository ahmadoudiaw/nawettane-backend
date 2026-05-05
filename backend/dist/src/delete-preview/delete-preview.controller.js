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
exports.DeletePreviewController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const delete_preview_service_1 = require("./delete-preview.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let DeletePreviewController = class DeletePreviewController {
    service;
    constructor(service) {
        this.service = service;
    }
    getPreview(entity, id) {
        return this.service.getPreview(entity, id);
    }
};
exports.DeletePreviewController = DeletePreviewController;
__decorate([
    (0, common_1.Get)(':entity/:id'),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DeletePreviewController.prototype, "getPreview", null);
exports.DeletePreviewController = DeletePreviewController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ONCAV_ADMIN, client_1.Role.ORCAV_ADMIN, client_1.Role.ODCAV_ADMIN, client_1.Role.ZONE_ADMIN),
    (0, common_1.Controller)('admin/delete-preview'),
    __metadata("design:paramtypes", [delete_preview_service_1.DeletePreviewService])
], DeletePreviewController);
//# sourceMappingURL=delete-preview.controller.js.map