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
exports.SeasonsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SeasonsService = class SeasonsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list() {
        return this.prisma.season.findMany({
            orderBy: [{ year: 'desc' }, { name: 'asc' }],
        });
    }
    async create(dto) {
        return this.prisma.season.create({
            data: {
                name: dto.name,
                year: dto.year,
                active: dto.active ?? false,
            },
        });
    }
    async update(id, dto) {
        const existing = await this.prisma.season.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Season not found.');
        }
        return this.prisma.season.update({
            where: { id },
            data: {
                name: dto.name,
                year: dto.year,
                active: dto.active,
            },
        });
    }
    async activate(id) {
        const existing = await this.prisma.season.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Season not found.');
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.season.updateMany({ data: { active: false } });
            return tx.season.update({ where: { id }, data: { active: true } });
        });
    }
    async remove(id) {
        const existing = await this.prisma.season.findUnique({
            where: { id },
            include: { _count: { select: { matches: true } } },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Season not found.');
        }
        if (existing._count.matches > 0) {
            throw new common_1.ConflictException('Cannot delete a season that has matches.');
        }
        return this.prisma.season.delete({ where: { id } });
    }
};
exports.SeasonsService = SeasonsService;
exports.SeasonsService = SeasonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeasonsService);
//# sourceMappingURL=seasons.service.js.map