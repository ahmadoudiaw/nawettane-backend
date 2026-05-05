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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
const public_decorator_1 = require("../decorators/public.decorator");
const scope_access_decorator_1 = require("../decorators/scope-access.decorator");
const scope_util_1 = require("../utils/scope.util");
let ScopeGuard = class ScopeGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const scopeMetadata = this.reflector.getAllAndOverride(scope_access_decorator_1.SCOPE_ACCESS_KEY, [context.getHandler(), context.getClass()]);
        if (!scopeMetadata) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return true;
        }
        const scope = (0, scope_util_1.buildScopeContext)(user);
        request.user = { ...user, scope };
        if (scope.isGlobal) {
            return true;
        }
        if (scopeMetadata.resource === 'report') {
            return scope.organizationIds.length > 0 || scope.matchIds.length > 0;
        }
        if (user.role === client_1.Role.SUPPORTER) {
            throw new common_1.ForbiddenException('Supporter access is limited to public endpoints.');
        }
        return true;
    }
};
exports.ScopeGuard = ScopeGuard;
exports.ScopeGuard = ScopeGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ScopeGuard);
//# sourceMappingURL=scope.guard.js.map