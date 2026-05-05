"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_ROLES = void 0;
const client_1 = require("@prisma/client");
exports.ADMIN_ROLES = [
    client_1.Role.SUPER_ADMIN,
    client_1.Role.ONCAV_ADMIN,
    client_1.Role.ORCAV_ADMIN,
    client_1.Role.ODCAV_ADMIN,
    client_1.Role.ZONE_ADMIN,
    client_1.Role.GUICHET_AGENT,
];
//# sourceMappingURL=roles.constant.js.map