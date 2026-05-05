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
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const scope_util_1 = require("../common/utils/scope.util");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
let MatchesService = class MatchesService {
    prisma;
    auditLogs;
    constructor(prisma, auditLogs) {
        this.prisma = prisma;
        this.auditLogs = auditLogs;
    }
    async checkVenueAvailability(params) {
        const duration = params.durationMinutes ?? 120;
        const buffer = params.bufferMinutes ?? 30;
        const windowStart = new Date(params.matchDate.getTime() - buffer * 60_000);
        const windowEnd = new Date(params.matchDate.getTime() + (duration + buffer) * 60_000);
        console.log('[AVAILABILITY] check:', {
            venueId: params.venueId,
            matchDate: params.matchDate.toISOString(),
            excludeMatchId: params.excludeMatchId ?? null,
            durationMinutes: duration,
            bufferMinutes: buffer,
            windowStart: windowStart.toISOString(),
            windowEnd: windowEnd.toISOString(),
        });
        const conflict = await this.prisma.match.findFirst({
            where: {
                venueId: params.venueId,
                status: { in: [client_1.MatchStatus.DRAFT, client_1.MatchStatus.PUBLISHED] },
                matchDate: { gte: windowStart, lte: windowEnd },
                ...(params.excludeMatchId ? { id: { not: params.excludeMatchId } } : {}),
            },
            include: {
                homeTeam: { select: { id: true, name: true } },
                awayTeam: { select: { id: true, name: true } },
            },
            orderBy: { matchDate: 'asc' },
        });
        console.log('[AVAILABILITY] result:', conflict
            ? { conflictFound: true, id: conflict.id, status: conflict.status, matchDate: conflict.matchDate.toISOString(), label: `${conflict.homeTeam.name} vs ${conflict.awayTeam.name}` }
            : { conflictFound: false });
        if (!conflict) {
            return { available: true, message: 'Stade disponible sur ce créneau.' };
        }
        const conflictTime = conflict.matchDate.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return {
            available: false,
            conflict: {
                id: conflict.id,
                label: `${conflict.homeTeam.name} vs ${conflict.awayTeam.name}`,
                homeTeam: conflict.homeTeam.name,
                awayTeam: conflict.awayTeam.name,
                matchDate: conflict.matchDate.toISOString(),
                status: conflict.status,
            },
            message: `Ce stade est déjà occupé par ${conflict.homeTeam.name} vs ${conflict.awayTeam.name} à ${conflictTime}.`,
        };
    }
    async list(user, query) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        const filters = this.buildMatchFilters(query);
        const scopeWhere = scope.isGlobal ? undefined : this.buildScopeWhere(scope);
        return this.findMatches({
            where: {
                AND: [scopeWhere, filters].filter((value) => value !== undefined),
            },
        });
    }
    async create(dto, user) {
        const organization = await this.prisma.organization.findUnique({
            where: { id: dto.organizationId },
        });
        if (!organization) {
            throw new common_1.NotFoundException('Target organization not found.');
        }
        if (organization.type !== client_1.OrganizationType.ZONE) {
            throw new common_1.ForbiddenException('Matches can only be created for a zone organization.');
        }
        const season = await this.prisma.season.findUnique({
            where: { id: dto.seasonId },
        });
        if (!season) {
            throw new common_1.NotFoundException('Season not found.');
        }
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (!scope.isGlobal && !scope.zoneIds.includes(dto.organizationId)) {
            throw new common_1.ForbiddenException('You cannot create a match outside your zone scope.');
        }
        console.log('[CREATE] availability pre-check:', { venueId: dto.venueId, matchDate: dto.matchDate });
        const venueAvailability = await this.checkVenueAvailability({
            venueId: dto.venueId,
            matchDate: new Date(dto.matchDate),
        });
        console.log('[CREATE] availability result:', venueAvailability.available ? 'OK' : `CONFLICT: ${venueAvailability.message}`);
        if (!venueAvailability.available) {
            this.auditLogs.log({
                userId: user.id,
                action: 'MATCH_CREATE_BLOCKED',
                entityType: 'Match',
                entityId: venueAvailability.conflict.id,
                metadata: {
                    venueId: dto.venueId,
                    requestedDate: dto.matchDate,
                    conflictMatchId: venueAvailability.conflict.id,
                    conflictLabel: venueAvailability.conflict.label,
                },
            });
            throw new common_1.ConflictException(venueAvailability.message);
        }
        const categoryInput = this.resolveCategoryInput(dto);
        let created;
        try {
            created = await this.prisma.match.create({
                data: {
                    seasonId: dto.seasonId,
                    organizationId: dto.organizationId,
                    venueId: dto.venueId,
                    homeTeamId: dto.homeTeamId,
                    awayTeamId: dto.awayTeamId,
                    competitionName: dto.competitionName,
                    stage: dto.stage,
                    matchDate: new Date(dto.matchDate),
                    status: client_1.MatchStatus.DRAFT,
                    ticketQuota: categoryInput.totalQuota,
                    ticketPrice: categoryInput.minPrice,
                    createdById: user.id,
                    ticketCategories: {
                        create: categoryInput.items,
                    },
                },
                include: this.defaultMatchInclude(),
            });
        }
        catch (error) {
            if (!this.isMissingTicketCategoriesTableError(error)) {
                throw error;
            }
            const legacyMatch = await this.prisma.match.create({
                data: {
                    seasonId: dto.seasonId,
                    organizationId: dto.organizationId,
                    venueId: dto.venueId,
                    homeTeamId: dto.homeTeamId,
                    awayTeamId: dto.awayTeamId,
                    competitionName: dto.competitionName,
                    stage: dto.stage,
                    matchDate: new Date(dto.matchDate),
                    status: client_1.MatchStatus.DRAFT,
                    ticketQuota: categoryInput.totalQuota,
                    ticketPrice: categoryInput.minPrice,
                    createdById: user.id,
                },
                include: this.legacyMatchInclude(),
            });
            created = this.attachLegacyTicketCategory(legacyMatch, {
                name: categoryInput.primaryCategory.name,
                price: categoryInput.primaryCategory.price,
                quota: categoryInput.totalQuota,
                soldCount: 0,
                badgeColor: categoryInput.primaryCategory.badgeColor,
            });
        }
        this.auditLogs.log({
            userId: user.id,
            action: 'MATCH_CREATED',
            entityType: 'Match',
            entityId: created.id,
            metadata: {
                homeTeam: created.homeTeam?.name,
                awayTeam: created.awayTeam?.name,
                competitionName: dto.competitionName,
                matchDate: dto.matchDate,
            },
        });
        return created;
    }
    async getById(id, user) {
        const match = await this.findMatchOrThrow(id);
        if (user) {
            this.assertCanAccessMatch(user, match.organizationId, match.id);
        }
        return match;
    }
    async update(id, dto, user) {
        const existingMatch = await this.findMatchOrThrow(id);
        this.assertCanManageMatch(user, existingMatch.organizationId);
        if (dto.organizationId && dto.organizationId !== existingMatch.organizationId) {
            const organization = await this.prisma.organization.findUnique({
                where: { id: dto.organizationId },
            });
            if (!organization || organization.type !== client_1.OrganizationType.ZONE) {
                throw new common_1.ForbiddenException('Target organization must be an existing zone.');
            }
            this.assertCanManageMatch(user, dto.organizationId);
        }
        if (dto.seasonId) {
            const season = await this.prisma.season.findUnique({
                where: { id: dto.seasonId },
            });
            if (!season) {
                throw new common_1.NotFoundException('Season not found.');
            }
        }
        if (dto.venueId || dto.matchDate) {
            const venueToCheck = dto.venueId ?? existingMatch.venueId;
            const dateToCheck = dto.matchDate ? new Date(dto.matchDate) : existingMatch.matchDate;
            console.log('[UPDATE] availability pre-check:', { venueToCheck, dateToCheck: dateToCheck.toISOString(), excludeMatchId: id });
            const updateAvailability = await this.checkVenueAvailability({
                venueId: venueToCheck,
                matchDate: dateToCheck,
                excludeMatchId: id,
            });
            console.log('[UPDATE] availability result:', updateAvailability.available ? 'OK' : `CONFLICT: ${updateAvailability.message}`);
            if (!updateAvailability.available) {
                throw new common_1.ConflictException(updateAvailability.message);
            }
        }
        const data = {
            season: dto.seasonId ? { connect: { id: dto.seasonId } } : undefined,
            organization: dto.organizationId
                ? { connect: { id: dto.organizationId } }
                : undefined,
            venue: dto.venueId ? { connect: { id: dto.venueId } } : undefined,
            homeTeam: dto.homeTeamId ? { connect: { id: dto.homeTeamId } } : undefined,
            awayTeam: dto.awayTeamId ? { connect: { id: dto.awayTeamId } } : undefined,
            competitionName: dto.competitionName,
            stage: dto.stage,
            matchDate: dto.matchDate ? new Date(dto.matchDate) : undefined,
            status: dto.status,
        };
        if (dto.ticketCategories) {
            const paidOrdersCount = await this.prisma.order.count({
                where: {
                    matchId: id,
                    status: {
                        in: [client_1.OrderStatus.PAID, client_1.OrderStatus.PENDING],
                    },
                },
            });
            if (paidOrdersCount > 0) {
                throw new common_1.BadRequestException('Ticket categories cannot be changed once orders already exist for the match.');
            }
            const normalizedCategories = this.normalizeTicketCategories(dto.ticketCategories);
            data.ticketQuota = normalizedCategories.totalQuota;
            data.ticketPrice = normalizedCategories.minPrice;
            data.ticketCategories = {
                deleteMany: {},
                create: normalizedCategories.items,
            };
        }
        else {
            if (dto.ticketQuota !== undefined) {
                data.ticketQuota = dto.ticketQuota;
            }
            if (dto.ticketPrice) {
                data.ticketPrice = new client_1.Prisma.Decimal(dto.ticketPrice);
            }
        }
        const result = await this.updateMatchWithLegacyFallback(id, data);
        this.auditLogs.log({
            userId: user.id,
            action: 'MATCH_UPDATED',
            entityType: 'Match',
            entityId: id,
            metadata: {
                homeTeam: existingMatch.homeTeam?.name,
                awayTeam: existingMatch.awayTeam?.name,
                updatedFields: Object.keys(dto).filter((k) => dto[k] !== undefined),
            },
        });
        return result;
    }
    async publish(id, user) {
        const existingMatch = await this.findMatchOrThrow(id);
        this.assertCanManageMatch(user, existingMatch.organizationId);
        if (existingMatch.ticketCategories.length === 0) {
            throw new common_1.BadRequestException('Match must have at least one ticket category before publish.');
        }
        const result = await this.updateMatchWithLegacyFallback(id, {
            status: client_1.MatchStatus.PUBLISHED,
        });
        this.auditLogs.log({
            userId: user.id,
            action: 'MATCH_PUBLISHED',
            entityType: 'Match',
            entityId: id,
            metadata: {
                homeTeam: existingMatch.homeTeam?.name,
                awayTeam: existingMatch.awayTeam?.name,
            },
        });
        return result;
    }
    async deactivate(id, user) {
        const existingMatch = await this.findMatchOrThrow(id);
        this.assertCanManageMatch(user, existingMatch.organizationId);
        const result = await this.updateMatchWithLegacyFallback(id, {
            status: client_1.MatchStatus.CANCELLED,
        });
        this.auditLogs.log({
            userId: user.id,
            action: 'MATCH_DEACTIVATED',
            entityType: 'Match',
            entityId: id,
            metadata: {
                homeTeam: existingMatch.homeTeam?.name,
                awayTeam: existingMatch.awayTeam?.name,
            },
        });
        return result;
    }
    async permanentDelete(id, user) {
        const existingMatch = await this.findMatchOrThrow(id);
        this.assertCanManageMatch(user, existingMatch.organizationId);
        const [ticketCount, orderCount] = await Promise.all([
            this.prisma.ticket.count({ where: { matchId: id } }),
            this.prisma.order.count({ where: { matchId: id } }),
        ]);
        if (ticketCount > 0 || orderCount > 0) {
            throw new common_1.BadRequestException(`Impossible de supprimer ce match : ${ticketCount} billet${ticketCount !== 1 ? 's' : ''} et ${orderCount} commande${orderCount !== 1 ? 's' : ''} y sont liés. Désactivez-le à la place.`);
        }
        try {
            const deleted = await this.prisma.match.delete({ where: { id } });
            this.auditLogs.log({
                userId: user.id,
                action: 'MATCH_DELETED',
                entityType: 'Match',
                entityId: id,
                metadata: {
                    homeTeam: existingMatch.homeTeam?.name,
                    awayTeam: existingMatch.awayTeam?.name,
                },
            });
            return deleted;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2003') {
                throw new common_1.BadRequestException('Impossible de supprimer ce match car des données liées existent. Désactivez-le à la place.');
            }
            throw error;
        }
    }
    async findMatches(args) {
        try {
            const matches = await this.prisma.match.findMany({
                ...args,
                include: this.defaultMatchInclude(),
                orderBy: { matchDate: 'asc' },
            });
            return this.sortMatchesByNearestDate(matches);
        }
        catch (error) {
            if (this.isMissingTicketCategoriesTableError(error)) {
                const matches = await this.prisma.match.findMany({
                    ...args,
                    include: this.legacyMatchInclude(),
                    orderBy: { matchDate: 'asc' },
                });
                return this.sortMatchesByNearestDate(matches.map((match) => this.attachLegacyTicketCategory(match)));
            }
            throw error;
        }
    }
    async findMatchOrThrow(id) {
        let match;
        try {
            match = await this.prisma.match.findUnique({
                where: { id },
                include: this.defaultMatchInclude(),
            });
        }
        catch (error) {
            if (!this.isMissingTicketCategoriesTableError(error)) {
                throw error;
            }
            const legacyMatch = await this.prisma.match.findUnique({
                where: { id },
                include: this.legacyMatchInclude(),
            });
            match = legacyMatch ? this.attachLegacyTicketCategory(legacyMatch) : null;
        }
        if (!match) {
            throw new common_1.NotFoundException('Match not found.');
        }
        return match;
    }
    async updateMatchWithLegacyFallback(id, data) {
        try {
            return await this.prisma.match.update({
                where: { id },
                data,
                include: this.defaultMatchInclude(),
            });
        }
        catch (error) {
            if (!this.isMissingTicketCategoriesTableError(error)) {
                throw error;
            }
            const legacyData = { ...data };
            delete legacyData.ticketCategories;
            const legacyMatch = await this.prisma.match.update({
                where: { id },
                data: legacyData,
                include: this.legacyMatchInclude(),
            });
            return this.attachLegacyTicketCategory(legacyMatch);
        }
    }
    assertCanManageMatch(user, organizationId) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (scope.isGlobal) {
            return;
        }
        if (!scope.zoneIds.includes(organizationId)) {
            throw new common_1.ForbiddenException('You cannot manage this match.');
        }
    }
    assertCanAccessMatch(user, organizationId, matchId) {
        const scope = user.scope ?? (0, scope_util_1.buildScopeContext)(user);
        if (scope.isGlobal) {
            return;
        }
        const canAccessByOrganization = scope.organizationIds.includes(organizationId) ||
            scope.zoneAssignmentIds.includes(organizationId);
        const canAccessByMatch = scope.matchIds.includes(matchId);
        if (!canAccessByOrganization && !canAccessByMatch) {
            throw new common_1.ForbiddenException('You cannot access this match.');
        }
    }
    defaultMatchInclude() {
        return {
            season: true,
            organization: {
                include: {
                    region: true,
                    department: true,
                    commune: true,
                },
            },
            venue: true,
            homeTeam: true,
            awayTeam: true,
            ticketCategories: {
                orderBy: [{ price: 'asc' }, { name: 'asc' }],
            },
        };
    }
    legacyMatchInclude() {
        return {
            season: true,
            organization: {
                include: {
                    region: true,
                    department: true,
                    commune: true,
                },
            },
            venue: true,
            homeTeam: true,
            awayTeam: true,
        };
    }
    attachLegacyTicketCategory(match, categoryOverride) {
        return {
            ...match,
            ticketCategories: [
                {
                    id: `legacy-${match.id}`,
                    matchId: match.id,
                    name: categoryOverride?.name ?? 'Populaire',
                    price: categoryOverride?.price ?? match.ticketPrice,
                    quota: categoryOverride?.quota ?? match.ticketQuota,
                    soldCount: categoryOverride?.soldCount ?? 0,
                    badgeColor: categoryOverride?.badgeColor ?? '#0F766E',
                    createdAt: match.createdAt,
                    updatedAt: match.updatedAt,
                },
            ],
        };
    }
    isMissingTicketCategoriesTableError(error) {
        return (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2021');
    }
    buildScopeWhere(scope) {
        return {
            OR: [
                {
                    organizationId: {
                        in: [...scope.organizationIds, ...scope.zoneAssignmentIds],
                    },
                },
                {
                    id: {
                        in: scope.matchIds,
                    },
                },
            ],
        };
    }
    buildMatchFilters(query) {
        const and = [];
        if (query.q?.trim()) {
            const keyword = query.q.trim();
            and.push({
                OR: [
                    {
                        competitionName: {
                            contains: keyword,
                            mode: 'insensitive',
                        },
                    },
                    {
                        homeTeam: {
                            is: {
                                name: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                    {
                        awayTeam: {
                            is: {
                                name: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                    {
                        organization: {
                            is: {
                                name: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                ],
            });
        }
        if (query.zoneId) {
            and.push({
                organizationId: query.zoneId,
            });
        }
        if (query.regionId || query.departmentId || query.communeId) {
            and.push({
                organization: {
                    is: {
                        regionId: query.regionId,
                        departmentId: query.departmentId,
                        communeId: query.communeId,
                    },
                },
            });
        }
        if (query.seasonId) {
            and.push({
                seasonId: query.seasonId,
            });
        }
        if (query.status) {
            and.push({
                status: query.status,
            });
        }
        if (query.status === client_1.MatchStatus.PUBLISHED && !query.fromDate) {
            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);
            and.push({ matchDate: { gte: startOfToday } });
        }
        if (query.fromDate || query.toDate) {
            and.push({
                matchDate: {
                    gte: query.fromDate ? new Date(query.fromDate) : undefined,
                    lte: query.toDate ? new Date(query.toDate) : undefined,
                },
            });
        }
        return and.length > 0 ? { AND: and } : undefined;
    }
    sortMatchesByNearestDate(matches) {
        const now = Date.now();
        return [...matches].sort((left, right) => {
            const leftDistance = Math.abs(left.matchDate.getTime() - now);
            const rightDistance = Math.abs(right.matchDate.getTime() - now);
            if (leftDistance === rightDistance) {
                return left.matchDate.getTime() - right.matchDate.getTime();
            }
            return leftDistance - rightDistance;
        });
    }
    normalizeTicketCategories(categories) {
        if (!categories || categories.length === 0) {
            throw new common_1.BadRequestException('At least one ticket category is required.');
        }
        const items = categories.map((category) => ({
            name: category.name.trim(),
            price: new client_1.Prisma.Decimal(category.price),
            quota: category.quota ?? null,
            soldCount: 0,
            badgeColor: category.badgeColor,
        }));
        const uniqueNames = new Set(items.map((item) => item.name.toLowerCase()));
        if (uniqueNames.size !== items.length) {
            throw new common_1.BadRequestException('Ticket category names must be unique within a match.');
        }
        const totalQuota = items.some((item) => item.quota === null)
            ? null
            : items.reduce((sum, item) => sum + item.quota, 0);
        const minPrice = items.reduce((lowest, item) => (item.price.lessThan(lowest) ? item.price : lowest), items[0].price);
        return {
            items,
            totalQuota,
            minPrice,
        };
    }
    resolveCategoryInput(dto) {
        if (dto.ticketCategories && dto.ticketCategories.length > 0) {
            const normalized = this.normalizeTicketCategories(dto.ticketCategories);
            return {
                ...normalized,
                primaryCategory: normalized.items[0],
            };
        }
        if (dto.ticketPrice && dto.ticketQuota !== undefined) {
            const primaryCategory = {
                name: 'Populaire',
                price: new client_1.Prisma.Decimal(dto.ticketPrice),
                quota: dto.ticketQuota,
                soldCount: 0,
                badgeColor: '#0F766E',
            };
            return {
                items: [primaryCategory],
                totalQuota: dto.ticketQuota,
                minPrice: primaryCategory.price,
                primaryCategory,
            };
        }
        throw new common_1.BadRequestException('Either ticketCategories or legacy ticketPrice/ticketQuota fields are required.');
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_logs_service_1.AuditLogsService])
], MatchesService);
//# sourceMappingURL=matches.service.js.map