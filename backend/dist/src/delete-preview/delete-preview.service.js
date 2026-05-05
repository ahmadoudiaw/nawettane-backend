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
exports.DeletePreviewService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let DeletePreviewService = class DeletePreviewService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPreview(entity, id) {
        switch (entity) {
            case 'zone': return this.previewZone(id);
            case 'team': return this.previewTeam(id);
            case 'venue': return this.previewVenue(id);
            case 'match': return this.previewMatch(id);
            case 'user': return this.previewUser(id);
            case 'ticket': return this.previewTicket(id);
            default: throw new common_1.NotFoundException(`Entité inconnue : ${entity}`);
        }
    }
    async previewZone(id) {
        const zone = await this.prisma.organization.findUnique({ where: { id } });
        if (!zone)
            throw new common_1.NotFoundException('Zone introuvable.');
        const [teamCount, venueCount, matchCount] = await Promise.all([
            this.prisma.team.count({ where: { organizationId: id } }),
            this.prisma.venue.count({ where: { organizationId: id } }),
            this.prisma.match.count({ where: { organizationId: id } }),
        ]);
        const deps = [];
        if (teamCount > 0)
            deps.push({ label: teamCount === 1 ? 'équipe' : 'équipes', count: teamCount });
        if (venueCount > 0)
            deps.push({ label: venueCount === 1 ? 'stade' : 'stades', count: venueCount });
        if (matchCount > 0)
            deps.push({ label: matchCount === 1 ? 'match' : 'matchs', count: matchCount });
        return {
            entityName: zone.name,
            actionType: 'DEACTIVATE',
            allowDelete: false,
            allowDeactivate: true,
            dependencies: deps,
            warningMessage: deps.length > 0
                ? `Cette zone sera désactivée. Ses équipes et stades resteront dans le système mais ne seront plus actifs dans les listes.`
                : `Cette zone sera désactivée et n'apparaîtra plus dans les listes actives.`,
        };
    }
    async previewTeam(id) {
        const team = await this.prisma.team.findUnique({ where: { id } });
        if (!team)
            throw new common_1.NotFoundException('Équipe introuvable.');
        const [homeCount, awayCount] = await Promise.all([
            this.prisma.match.count({ where: { homeTeamId: id } }),
            this.prisma.match.count({ where: { awayTeamId: id } }),
        ]);
        const matchCount = homeCount + awayCount;
        const deps = [];
        if (matchCount > 0)
            deps.push({ label: matchCount === 1 ? 'match' : 'matchs', count: matchCount });
        return {
            entityName: team.name,
            actionType: 'DEACTIVATE',
            allowDelete: false,
            allowDeactivate: true,
            dependencies: deps,
            warningMessage: `Cette équipe sera désactivée et ne pourra plus être assignée à de nouveaux matchs.`,
        };
    }
    async previewVenue(id) {
        const venue = await this.prisma.venue.findUnique({ where: { id } });
        if (!venue)
            throw new common_1.NotFoundException('Stade introuvable.');
        const matchCount = await this.prisma.match.count({ where: { venueId: id } });
        const deps = [];
        if (matchCount > 0)
            deps.push({ label: matchCount === 1 ? 'match' : 'matchs', count: matchCount });
        return {
            entityName: venue.name,
            actionType: 'DEACTIVATE',
            allowDelete: false,
            allowDeactivate: true,
            dependencies: deps,
            warningMessage: `Ce stade sera désactivé et ne pourra plus être sélectionné pour de nouveaux matchs.`,
        };
    }
    async previewMatch(id) {
        const match = await this.prisma.match.findUnique({
            where: { id },
            include: {
                homeTeam: { select: { name: true } },
                awayTeam: { select: { name: true } },
            },
        });
        if (!match)
            throw new common_1.NotFoundException('Match introuvable.');
        const [ticketCount, orderCount] = await Promise.all([
            this.prisma.ticket.count({ where: { matchId: id, status: { not: client_1.TicketStatus.CANCELLED } } }),
            this.prisma.order.count({ where: { matchId: id, status: client_1.OrderStatus.PAID } }),
        ]);
        const entityName = `${match.homeTeam.name} vs ${match.awayTeam.name}`;
        const isBlocked = ticketCount > 0 || orderCount > 0;
        const deps = [];
        if (ticketCount > 0)
            deps.push({ label: ticketCount === 1 ? 'billet vendu' : 'billets vendus', count: ticketCount });
        if (orderCount > 0)
            deps.push({ label: orderCount === 1 ? 'commande payée' : 'commandes payées', count: orderCount });
        if (isBlocked) {
            return {
                entityName,
                actionType: 'BLOCKED',
                allowDelete: false,
                allowDeactivate: true,
                dependencies: deps,
                warningMessage: `La suppression est impossible car des billets ont déjà été vendus. Vous pouvez désactiver ce match pour qu'il n'apparaisse plus dans la boutique.`,
            };
        }
        return {
            entityName,
            actionType: 'DELETE',
            allowDelete: true,
            allowDeactivate: true,
            dependencies: [],
            warningMessage: `Ce match n'a aucun billet vendu. La suppression définitive est autorisée. Cette action est irréversible.`,
        };
    }
    async previewUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('Utilisateur introuvable.');
        return {
            entityName: user.fullName,
            actionType: 'DEACTIVATE',
            allowDelete: false,
            allowDeactivate: true,
            dependencies: [],
            warningMessage: `Cet utilisateur ne pourra plus accéder à l'administration. Ses données et son historique seront conservés.`,
        };
    }
    async previewTicket(id) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id },
            include: {
                match: {
                    include: {
                        homeTeam: { select: { name: true } },
                        awayTeam: { select: { name: true } },
                    },
                },
            },
        });
        if (!ticket)
            throw new common_1.NotFoundException('Billet introuvable.');
        if (ticket.status === client_1.TicketStatus.CANCELLED) {
            return {
                entityName: ticket.ticketCode,
                actionType: 'BLOCKED',
                allowDelete: false,
                allowDeactivate: false,
                dependencies: [],
                warningMessage: `Ce billet est déjà annulé. Aucune action possible.`,
            };
        }
        if (ticket.status === client_1.TicketStatus.USED) {
            return {
                entityName: ticket.ticketCode,
                actionType: 'BLOCKED',
                allowDelete: false,
                allowDeactivate: false,
                dependencies: [],
                warningMessage: `Ce billet a déjà été utilisé. Aucune annulation possible.`,
            };
        }
        return {
            entityName: ticket.ticketCode,
            actionType: 'CANCEL',
            allowDelete: false,
            allowDeactivate: false,
            dependencies: [],
            warningMessage: `Billet pour ${ticket.match.homeTeam.name} vs ${ticket.match.awayTeam.name}. L'annulation est irréversible — un motif est requis.`,
        };
    }
};
exports.DeletePreviewService = DeletePreviewService;
exports.DeletePreviewService = DeletePreviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeletePreviewService);
//# sourceMappingURL=delete-preview.service.js.map