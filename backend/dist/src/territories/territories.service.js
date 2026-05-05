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
exports.TerritoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TerritoriesService = class TerritoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listRegions() {
        return this.prisma.region.findMany({
            orderBy: { name: 'asc' },
            include: { _count: { select: { departments: true } } },
        });
    }
    async createRegion(dto) {
        return this.prisma.region.create({
            data: { name: dto.name, code: dto.code ?? null },
            include: { _count: { select: { departments: true } } },
        });
    }
    async updateRegion(id, dto) {
        await this.findRegionOrThrow(id);
        return this.prisma.region.update({
            where: { id },
            data: { name: dto.name, code: dto.code },
            include: { _count: { select: { departments: true } } },
        });
    }
    async deleteRegion(id) {
        const region = await this.prisma.region.findUnique({
            where: { id },
            include: { _count: { select: { departments: true } } },
        });
        if (!region)
            throw new common_1.NotFoundException('Région introuvable.');
        if (region._count.departments > 0) {
            throw new common_1.ConflictException(`Impossible de supprimer cette région : elle contient ${region._count.departments} département(s).`);
        }
        return this.prisma.region.delete({ where: { id } });
    }
    async findRegionOrThrow(id) {
        const region = await this.prisma.region.findUnique({ where: { id } });
        if (!region)
            throw new common_1.NotFoundException('Région introuvable.');
        return region;
    }
    async listDepartments(regionId) {
        return this.prisma.department.findMany({
            where: regionId ? { regionId } : undefined,
            orderBy: [{ region: { name: 'asc' } }, { name: 'asc' }],
            include: {
                region: true,
                _count: { select: { communes: true } },
            },
        });
    }
    async createDepartment(dto) {
        await this.findRegionOrThrow(dto.regionId);
        return this.prisma.department.create({
            data: { name: dto.name, code: dto.code ?? null, regionId: dto.regionId },
            include: { region: true, _count: { select: { communes: true } } },
        });
    }
    async updateDepartment(id, dto) {
        const existing = await this.prisma.department.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Département introuvable.');
        if (dto.regionId)
            await this.findRegionOrThrow(dto.regionId);
        return this.prisma.department.update({
            where: { id },
            data: { name: dto.name, code: dto.code, regionId: dto.regionId },
            include: { region: true, _count: { select: { communes: true } } },
        });
    }
    async deleteDepartment(id) {
        const dept = await this.prisma.department.findUnique({
            where: { id },
            include: { _count: { select: { communes: true } } },
        });
        if (!dept)
            throw new common_1.NotFoundException('Département introuvable.');
        if (dept._count.communes > 0) {
            throw new common_1.ConflictException(`Impossible de supprimer ce département : il contient ${dept._count.communes} commune(s).`);
        }
        return this.prisma.department.delete({ where: { id } });
    }
    async listCommunes(departmentId) {
        return this.prisma.commune.findMany({
            where: departmentId ? { departmentId } : undefined,
            orderBy: [{ department: { name: 'asc' } }, { name: 'asc' }],
            include: {
                department: { include: { region: true } },
                _count: { select: { organizations: true } },
            },
        });
    }
    async createCommune(dto) {
        const dept = await this.prisma.department.findUnique({ where: { id: dto.departmentId } });
        if (!dept)
            throw new common_1.NotFoundException('Département introuvable.');
        return this.prisma.commune.create({
            data: { name: dto.name, code: dto.code ?? null, departmentId: dto.departmentId },
            include: { department: { include: { region: true } }, _count: { select: { organizations: true } } },
        });
    }
    async updateCommune(id, dto) {
        const existing = await this.prisma.commune.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Commune introuvable.');
        if (dto.departmentId) {
            const dept = await this.prisma.department.findUnique({ where: { id: dto.departmentId } });
            if (!dept)
                throw new common_1.NotFoundException('Département introuvable.');
        }
        return this.prisma.commune.update({
            where: { id },
            data: { name: dto.name, code: dto.code, departmentId: dto.departmentId },
            include: { department: { include: { region: true } }, _count: { select: { organizations: true } } },
        });
    }
    async deleteCommune(id) {
        const commune = await this.prisma.commune.findUnique({
            where: { id },
            include: { _count: { select: { organizations: true } } },
        });
        if (!commune)
            throw new common_1.NotFoundException('Commune introuvable.');
        if (commune._count.organizations > 0) {
            throw new common_1.ConflictException(`Impossible de supprimer cette commune : elle est liée à ${commune._count.organizations} organisation(s).`);
        }
        return this.prisma.commune.delete({ where: { id } });
    }
};
exports.TerritoriesService = TerritoriesService;
exports.TerritoriesService = TerritoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TerritoriesService);
//# sourceMappingURL=territories.service.js.map