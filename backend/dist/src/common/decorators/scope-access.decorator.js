"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeAccess = exports.SCOPE_ACCESS_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.SCOPE_ACCESS_KEY = 'scopeAccess';
const ScopeAccess = (options) => (0, common_1.SetMetadata)(exports.SCOPE_ACCESS_KEY, options);
exports.ScopeAccess = ScopeAccess;
//# sourceMappingURL=scope-access.decorator.js.map