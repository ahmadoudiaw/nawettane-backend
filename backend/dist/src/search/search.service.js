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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SearchService = class SearchService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(q) {
        const term = q.trim();
        if (!term) {
            return { matches: [], teams: [], zones: [], tickets: [], users: [] };
        }
        const contains = { contains: term, mode: 'insensitive' };
        const [matches, teams, zones, tickets, users] = await Promise.all([
            this.prisma.match.findMany({
                where: {
                    OR: [
                        { homeTeam: { name: contains } },
                        { awayTeam: { name: contains } },
                    ],
                },
                select: {
                    id: true,
                    matchDate: true,
                    status: true,
                    competitionName: true,
                    homeTeam: { select: { name: true } },
                    awayTeam: { select: { name: true } },
                    organization: { select: { name: true } },
                },
                take: 5,
                orderBy: { matchDate: 'desc' },
            }),
            this.prisma.team.findMany({
                where: { name: contains },
                select: { id: true, name: true, category: true, status: true },
                take: 5,
                orderBy: { name: 'asc' },
            }),
            this.prisma.organization.findMany({
                where: { name: contains },
                select: { id: true, name: true, type: true, status: true },
                take: 5,
                orderBy: { name: 'asc' },
            }),
            this.prisma.ticket.findMany({
                where: { ticketCode: contains },
                select: {
                    id: true,
                    ticketCode: true,
                    status: true,
                    match: {
                        select: {
                            homeTeam: { select: { name: true } },
                            awayTeam: { select: { name: true } },
                        },
                    },
                },
                take: 5,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.findMany({
                where: {
                    OR: [
                        { fullName: contains },
                        { phone: contains },
                    ],
                },
                select: { id: true, fullName: true, phone: true, role: true, status: true },
                take: 5,
                orderBy: { fullName: 'asc' },
            }),
        ]);
        return { matches, teams, zones, tickets, users };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map