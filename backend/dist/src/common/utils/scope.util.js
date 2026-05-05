"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildScopeContext = buildScopeContext;
const client_1 = require("@prisma/client");
function buildScopeContext(user) {
    const organizationIds = user.accessibleOrganizationIds;
    const zoneIds = user.assignments
        .filter((assignment) => assignment.organizationType === 'ZONE')
        .map((assignment) => assignment.organizationId);
    const isGlobal = user.role === client_1.Role.SUPER_ADMIN || user.role === client_1.Role.ONCAV_ADMIN;
    return {
        isGlobal,
        organizationIds,
        zoneIds,
        zoneAssignmentIds: user.zoneAssignmentIds,
        matchIds: user.matchAssignmentIds,
    };
}
//# sourceMappingURL=scope.util.js.map