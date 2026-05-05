"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ImportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportService = void 0;
const common_1 = require("@nestjs/common");
const ExcelJS = __importStar(require("exceljs"));
const client_1 = require("@prisma/client");
const stream_1 = require("stream");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
let ImportService = ImportService_1 = class ImportService {
    prisma;
    auditLogs;
    logger = new common_1.Logger(ImportService_1.name);
    constructor(prisma, auditLogs) {
        this.prisma = prisma;
        this.auditLogs = auditLogs;
    }
    async importRegions(file, user) {
        this.assertFile(file);
        const rows = await this.parseFile(file);
        const result = { total: 0, created: 0, skipped: 0, errors: [] };
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNum = i + 2;
            const name = this.str(row[0]);
            const code = this.str(row[1]) || null;
            result.total++;
            if (!name) {
                result.errors.push({ row: rowNum, message: 'Colonne "name" manquante ou vide.' });
                continue;
            }
            const exists = await this.prisma.region.findFirst({
                where: { name: { equals: name, mode: 'insensitive' } },
                select: { id: true },
            });
            if (exists) {
                result.skipped++;
                continue;
            }
            try {
                await this.prisma.region.create({ data: { name, code } });
                result.created++;
            }
            catch (err) {
                if (this.isUniqueViolation(err)) {
                    result.skipped++;
                }
                else {
                    this.logger.error(`Import region row ${rowNum}`, err);
                    result.errors.push({ row: rowNum, message: this.errMsg(err) });
                }
            }
        }
        this.auditLogs.log({
            userId: user.id,
            action: 'REGIONS_IMPORTED',
            entityType: 'Region',
            entityId: 'bulk',
            metadata: { total: result.total, created: result.created, skipped: result.skipped, errors: result.errors.length },
        });
        return result;
    }
    async importDepartments(file, user) {
        this.assertFile(file);
        const rows = await this.parseFile(file);
        const result = { total: 0, created: 0, skipped: 0, errors: [] };
        const regionCache = new Map();
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNum = i + 2;
            const name = this.str(row[0]);
            const code = this.str(row[1]) || null;
            const regionName = this.str(row[2]);
            result.total++;
            if (!name) {
                result.errors.push({ row: rowNum, message: 'Colonne "name" manquante.' });
                continue;
            }
            if (!regionName) {
                result.errors.push({ row: rowNum, message: 'Colonne "regionName" manquante.' });
                continue;
            }
            const regionId = await this.resolveRegion(regionName, regionCache);
            if (!regionId) {
                result.errors.push({ row: rowNum, message: `Région introuvable : "${regionName}".` });
                continue;
            }
            const exists = await this.prisma.department.findFirst({
                where: { name: { equals: name, mode: 'insensitive' }, regionId },
                select: { id: true },
            });
            if (exists) {
                result.skipped++;
                continue;
            }
            try {
                await this.prisma.department.create({ data: { name, code, regionId } });
                result.created++;
            }
            catch (err) {
                if (this.isUniqueViolation(err)) {
                    result.skipped++;
                }
                else {
                    this.logger.error(`Import dept row ${rowNum}`, err);
                    result.errors.push({ row: rowNum, message: this.errMsg(err) });
                }
            }
        }
        this.auditLogs.log({
            userId: user.id,
            action: 'DEPARTMENTS_IMPORTED',
            entityType: 'Department',
            entityId: 'bulk',
            metadata: { total: result.total, created: result.created, skipped: result.skipped, errors: result.errors.length },
        });
        return result;
    }
    async importCommunes(file, user) {
        this.assertFile(file);
        const rows = await this.parseFile(file);
        const result = { total: 0, created: 0, skipped: 0, errors: [] };
        const regionCache = new Map();
        const deptCache = new Map();
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNum = i + 2;
            const name = this.str(row[0]);
            const code = this.str(row[1]) || null;
            const departmentName = this.str(row[2]);
            const regionName = this.str(row[3]);
            result.total++;
            if (!name) {
                result.errors.push({ row: rowNum, message: 'Colonne "name" manquante.' });
                continue;
            }
            if (!departmentName) {
                result.errors.push({ row: rowNum, message: 'Colonne "departmentName" manquante.' });
                continue;
            }
            const regionId = regionName ? await this.resolveRegion(regionName, regionCache) : null;
            const departmentId = await this.resolveDepartment(departmentName, regionId, deptCache);
            if (!departmentId) {
                result.errors.push({ row: rowNum, message: `Département introuvable : "${departmentName}"${regionName ? ` (région : "${regionName}")` : ''}.` });
                continue;
            }
            const exists = await this.prisma.commune.findFirst({
                where: { name: { equals: name, mode: 'insensitive' }, departmentId },
                select: { id: true },
            });
            if (exists) {
                result.skipped++;
                continue;
            }
            try {
                await this.prisma.commune.create({ data: { name, code, departmentId } });
                result.created++;
            }
            catch (err) {
                if (this.isUniqueViolation(err)) {
                    result.skipped++;
                }
                else {
                    this.logger.error(`Import commune row ${rowNum}`, err);
                    result.errors.push({ row: rowNum, message: this.errMsg(err) });
                }
            }
        }
        this.auditLogs.log({
            userId: user.id,
            action: 'COMMUNES_IMPORTED',
            entityType: 'Commune',
            entityId: 'bulk',
            metadata: { total: result.total, created: result.created, skipped: result.skipped, errors: result.errors.length },
        });
        return result;
    }
    async importOdcav(file, user) {
        this.assertFile(file);
        const rows = await this.parseFile(file);
        const result = { total: 0, created: 0, skipped: 0, errors: [] };
        const regionCache = new Map();
        const deptCache = new Map();
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNum = i + 2;
            const name = this.str(row[0]);
            const departmentName = this.str(row[1]);
            const regionName = this.str(row[2]);
            const status = (this.str(row[3]) || 'ACTIVE').toUpperCase();
            result.total++;
            if (!name) {
                result.errors.push({ row: rowNum, message: 'Colonne "name" manquante.' });
                continue;
            }
            if (!departmentName) {
                result.errors.push({ row: rowNum, message: 'Colonne "departmentName" manquante.' });
                continue;
            }
            if (!this.validStatus(status)) {
                result.errors.push({ row: rowNum, message: `Statut invalide : "${status}".` });
                continue;
            }
            const regionId = regionName ? await this.resolveRegion(regionName, regionCache) : null;
            const departmentId = await this.resolveDepartment(departmentName, regionId, deptCache);
            if (!departmentId) {
                result.errors.push({ row: rowNum, message: `Département introuvable : "${departmentName}".` });
                continue;
            }
            const exists = await this.prisma.organization.findFirst({
                where: { name: { equals: name, mode: 'insensitive' }, type: client_1.OrganizationType.ODCAV, departmentId },
                select: { id: true },
            });
            if (exists) {
                result.skipped++;
                continue;
            }
            try {
                await this.prisma.organization.create({
                    data: { name, type: client_1.OrganizationType.ODCAV, departmentId, status: status },
                });
                result.created++;
            }
            catch (err) {
                if (this.isUniqueViolation(err)) {
                    result.skipped++;
                }
                else {
                    this.logger.error(`Import ODCAV row ${rowNum}`, err);
                    result.errors.push({ row: rowNum, message: this.errMsg(err) });
                }
            }
        }
        this.auditLogs.log({
            userId: user.id,
            action: 'ODCAV_IMPORTED',
            entityType: 'Organization',
            entityId: 'bulk',
            metadata: { total: result.total, created: result.created, skipped: result.skipped, errors: result.errors.length },
        });
        return result;
    }
    async importZones(file, user) {
        this.assertFile(file);
        const rows = await this.parseFile(file);
        const result = { total: 0, created: 0, skipped: 0, errors: [] };
        const regionCache = new Map();
        const deptCache = new Map();
        const communeCache = new Map();
        const odcavCache = new Map();
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNum = i + 2;
            const name = this.str(row[0]);
            const communeName = this.str(row[1]);
            const departmentName = this.str(row[2]);
            const regionName = this.str(row[3]);
            const odcavName = this.str(row[4]);
            const status = (this.str(row[5]) || 'ACTIVE').toUpperCase();
            result.total++;
            if (!name) {
                result.errors.push({ row: rowNum, message: 'Colonne "name" manquante.' });
                continue;
            }
            if (!communeName) {
                result.errors.push({ row: rowNum, message: 'Colonne "communeName" manquante. La commune est obligatoire pour les nouvelles zones.' });
                continue;
            }
            if (!this.validStatus(status)) {
                result.errors.push({ row: rowNum, message: `Statut invalide : "${status}".` });
                continue;
            }
            const regionId = regionName ? await this.resolveRegion(regionName, regionCache) : null;
            const departmentId = departmentName ? await this.resolveDepartment(departmentName, regionId, deptCache) : null;
            const communeId = await this.resolveCommune(communeName, departmentId, communeCache);
            if (!communeId) {
                result.errors.push({ row: rowNum, message: `Commune introuvable : "${communeName}"${departmentName ? ` (département : "${departmentName}")` : ''}.` });
                continue;
            }
            let parentId = null;
            if (odcavName) {
                parentId = await this.resolveOdcav(odcavName, odcavCache);
                if (!parentId) {
                    result.errors.push({ row: rowNum, message: `ODCAV introuvable : "${odcavName}".` });
                    continue;
                }
            }
            const exists = await this.prisma.organization.findFirst({
                where: { name: { equals: name, mode: 'insensitive' }, type: client_1.OrganizationType.ZONE, communeId },
                select: { id: true },
            });
            if (exists) {
                result.skipped++;
                continue;
            }
            try {
                await this.prisma.organization.create({
                    data: { name, type: client_1.OrganizationType.ZONE, communeId, parentId, status: status },
                });
                result.created++;
            }
            catch (err) {
                if (this.isUniqueViolation(err)) {
                    result.skipped++;
                }
                else {
                    this.logger.error(`Import zone row ${rowNum}`, err);
                    result.errors.push({ row: rowNum, message: this.errMsg(err) });
                }
            }
        }
        this.auditLogs.log({
            userId: user.id,
            action: 'ZONES_IMPORTED',
            entityType: 'Organization',
            entityId: 'bulk',
            metadata: { total: result.total, created: result.created, skipped: result.skipped, errors: result.errors.length },
        });
        return result;
    }
    async importVenues(file, user) {
        this.assertFile(file);
        const rows = await this.parseFile(file);
        const result = { total: 0, created: 0, skipped: 0, errors: [] };
        const regionCache = new Map();
        const deptCache = new Map();
        const communeCache = new Map();
        const legacyZoneCache = new Map();
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNum = i + 2;
            const name = this.str(row[0]);
            const communeOrZoneName = this.str(row[1]);
            const departmentName = this.str(row[2]);
            const regionName = this.str(row[3]);
            const address = this.str(row[4]);
            const capacityRaw = this.str(row[5]);
            const status = (this.str(row[6]) || 'ACTIVE').toUpperCase();
            result.total++;
            if (!name) {
                result.errors.push({ row: rowNum, message: 'Colonne "name" manquante.' });
                continue;
            }
            if (!communeOrZoneName) {
                result.errors.push({ row: rowNum, message: 'Colonne "communeName" manquante.' });
                continue;
            }
            if (!this.validStatus(status)) {
                result.errors.push({ row: rowNum, message: `Statut invalide : "${status}".` });
                continue;
            }
            let capacity = null;
            if (capacityRaw) {
                const parsed = parseInt(capacityRaw, 10);
                if (isNaN(parsed) || parsed < 0) {
                    result.errors.push({ row: rowNum, message: `Capacité invalide : "${capacityRaw}".` });
                    continue;
                }
                capacity = parsed;
            }
            const regionId = regionName ? await this.resolveRegion(regionName, regionCache) : null;
            const departmentId = departmentName ? await this.resolveDepartment(departmentName, regionId, deptCache) : null;
            const communeId = await this.resolveCommune(communeOrZoneName, departmentId, communeCache);
            if (communeId) {
                const exists = await this.prisma.venue.findFirst({
                    where: { name: { equals: name, mode: 'insensitive' }, communeId },
                    select: { id: true },
                });
                if (exists) {
                    result.skipped++;
                    continue;
                }
                try {
                    await this.prisma.venue.create({
                        data: { name, communeId, address: address || null, capacity, status: status },
                    });
                    result.created++;
                }
                catch (err) {
                    if (this.isUniqueViolation(err)) {
                        result.skipped++;
                    }
                    else {
                        this.logger.error(`Import venue row ${rowNum}`, err);
                        result.errors.push({ row: rowNum, message: this.errMsg(err) });
                    }
                }
            }
            else {
                const organizationId = await this.resolveZone(communeOrZoneName, legacyZoneCache);
                if (!organizationId) {
                    result.errors.push({ row: rowNum, message: `Commune introuvable : "${communeOrZoneName}". Si c'est une ancienne zone, elle n'a pas pu être trouvée non plus.` });
                    continue;
                }
                const exists = await this.prisma.venue.findFirst({
                    where: { name: { equals: name, mode: 'insensitive' }, organizationId },
                    select: { id: true },
                });
                if (exists) {
                    result.skipped++;
                    continue;
                }
                try {
                    await this.prisma.venue.create({
                        data: { name, organizationId, address: address || null, capacity, status: status },
                    });
                    result.created++;
                }
                catch (err) {
                    if (this.isUniqueViolation(err)) {
                        result.skipped++;
                    }
                    else {
                        this.logger.error(`Import venue (legacy) row ${rowNum}`, err);
                        result.errors.push({ row: rowNum, message: this.errMsg(err) });
                    }
                }
            }
        }
        this.auditLogs.log({
            userId: user.id,
            action: 'VENUES_IMPORTED',
            entityType: 'Venue',
            entityId: 'bulk',
            metadata: { total: result.total, created: result.created, skipped: result.skipped, errors: result.errors.length },
        });
        return result;
    }
    normalizeAgeCategory(value) {
        const v = value?.trim().toUpperCase();
        if (v === 'CADET')
            return client_1.AgeCategory.CADET;
        return client_1.AgeCategory.SENIOR;
    }
    async importTeams(file, user) {
        this.assertFile(file);
        const rows = await this.parseFile(file);
        const result = { total: 0, created: 0, skipped: 0, errors: [] };
        const zoneCache = new Map();
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowNum = i + 2;
            const name = this.str(row[0]);
            const zoneName = this.str(row[1]);
            const category = this.str(row[5]);
            const status = (this.str(row[6]) || 'ACTIVE').toUpperCase();
            result.total++;
            if (!name) {
                result.errors.push({ row: rowNum, message: 'Colonne "name" manquante.' });
                continue;
            }
            if (!zoneName) {
                result.errors.push({ row: rowNum, message: 'Colonne "zoneName" manquante.' });
                continue;
            }
            if (!this.validStatus(status)) {
                result.errors.push({ row: rowNum, message: `Statut invalide : "${status}".` });
                continue;
            }
            const organizationId = await this.resolveZone(zoneName, zoneCache);
            if (!organizationId) {
                result.errors.push({ row: rowNum, message: `Zone introuvable : "${zoneName}".` });
                continue;
            }
            const exists = await this.prisma.team.findFirst({
                where: { name: { equals: name, mode: 'insensitive' }, organizationId },
                select: { id: true },
            });
            if (exists) {
                result.skipped++;
                continue;
            }
            try {
                await this.prisma.team.create({
                    data: { name, organizationId, category: this.normalizeAgeCategory(category), status: status },
                });
                result.created++;
            }
            catch (err) {
                if (this.isUniqueViolation(err)) {
                    result.skipped++;
                }
                else {
                    this.logger.error(`Import team row ${rowNum}`, err);
                    result.errors.push({ row: rowNum, message: this.errMsg(err) });
                }
            }
        }
        this.auditLogs.log({
            userId: user.id,
            action: 'TEAMS_IMPORTED',
            entityType: 'Team',
            entityId: 'bulk',
            metadata: { total: result.total, created: result.created, skipped: result.skipped, errors: result.errors.length },
        });
        return result;
    }
    async resolveRegion(name, cache) {
        if (cache.has(name))
            return cache.get(name) ?? null;
        const rec = await this.prisma.region.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } },
            select: { id: true },
        });
        const id = rec?.id ?? null;
        cache.set(name, id);
        return id;
    }
    async resolveDepartment(name, regionId, cache) {
        const key = `${name}||${regionId ?? ''}`;
        if (cache.has(key))
            return cache.get(key) ?? null;
        const rec = await this.prisma.department.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                ...(regionId ? { regionId } : {}),
            },
            select: { id: true },
        });
        const id = rec?.id ?? null;
        cache.set(key, id);
        return id;
    }
    async resolveCommune(name, departmentId, cache) {
        const key = `${name}||${departmentId ?? ''}`;
        if (cache.has(key))
            return cache.get(key) ?? null;
        const rec = await this.prisma.commune.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                ...(departmentId ? { departmentId } : {}),
            },
            select: { id: true },
        });
        const id = rec?.id ?? null;
        cache.set(key, id);
        return id;
    }
    async resolveOdcav(name, cache) {
        if (cache.has(name))
            return cache.get(name) ?? null;
        const rec = await this.prisma.organization.findFirst({
            where: { name: { equals: name, mode: 'insensitive' }, type: client_1.OrganizationType.ODCAV },
            select: { id: true },
        });
        const id = rec?.id ?? null;
        cache.set(name, id);
        return id;
    }
    async resolveZone(name, cache) {
        if (cache.has(name))
            return cache.get(name) ?? null;
        const org = await this.prisma.organization.findFirst({
            where: { name: { equals: name, mode: 'insensitive' }, type: client_1.OrganizationType.ZONE },
            select: { id: true },
        });
        const id = org?.id ?? null;
        cache.set(name, id);
        return id;
    }
    async parseFile(file) {
        const ext = file.originalname.split('.').pop()?.toLowerCase();
        if (!ext || !['xlsx', 'xls', 'csv'].includes(ext)) {
            throw new common_1.BadRequestException('Format non supporté. Utilisez .xlsx ou .csv.');
        }
        const workbook = new ExcelJS.Workbook();
        if (ext === 'csv') {
            const stream = stream_1.Readable.from(file.buffer);
            await workbook.csv.read(stream);
        }
        else {
            await workbook.xlsx.load(file.buffer);
        }
        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
            throw new common_1.BadRequestException('Le fichier est vide ou ne contient aucune feuille.');
        }
        const rows = [];
        let firstRow = true;
        worksheet.eachRow({ includeEmpty: false }, (row) => {
            if (firstRow) {
                firstRow = false;
                return;
            }
            const cells = row.values.slice(1);
            if (cells.some((c) => c !== null && c !== undefined && c !== '')) {
                rows.push(cells);
            }
        });
        return rows;
    }
    async generateRegionsTemplate() {
        const wb = this.templateWorkbook();
        const ws = wb.addWorksheet('Régions');
        ws.columns = [
            { header: 'name', key: 'name', width: 32 },
            { header: 'code', key: 'code', width: 16 },
        ];
        this.styleTemplateHeader(ws);
        ws.addRow({ name: 'Dakar', code: 'DK' });
        this.styleExampleRow(ws);
        return this.toBuffer(wb);
    }
    async generateDepartmentsTemplate() {
        const wb = this.templateWorkbook();
        const ws = wb.addWorksheet('Départements');
        ws.columns = [
            { header: 'name', key: 'name', width: 32 },
            { header: 'code', key: 'code', width: 16 },
            { header: 'regionName', key: 'regionName', width: 28 },
        ];
        this.styleTemplateHeader(ws);
        ws.addRow({ name: 'Dakar', code: 'DK-D', regionName: 'Dakar' });
        this.styleExampleRow(ws);
        return this.toBuffer(wb);
    }
    async generateCommunesTemplate() {
        const wb = this.templateWorkbook();
        const ws = wb.addWorksheet('Communes');
        ws.columns = [
            { header: 'name', key: 'name', width: 32 },
            { header: 'code', key: 'code', width: 16 },
            { header: 'departmentName', key: 'departmentName', width: 28 },
            { header: 'regionName', key: 'regionName', width: 28 },
        ];
        this.styleTemplateHeader(ws);
        ws.addRow({ name: 'Plateau', code: 'DK-PL', departmentName: 'Dakar', regionName: 'Dakar' });
        this.styleExampleRow(ws);
        return this.toBuffer(wb);
    }
    async generateOdcavTemplate() {
        const wb = this.templateWorkbook();
        const ws = wb.addWorksheet('ODCAV');
        ws.columns = [
            { header: 'name', key: 'name', width: 36 },
            { header: 'departmentName', key: 'departmentName', width: 28 },
            { header: 'regionName', key: 'regionName', width: 28 },
            { header: 'status', key: 'status', width: 18 },
        ];
        this.styleTemplateHeader(ws);
        ws.addRow({ name: 'ODCAV Dakar', departmentName: 'Dakar', regionName: 'Dakar', status: 'ACTIVE' });
        this.styleExampleRow(ws);
        return this.toBuffer(wb);
    }
    async generateZonesTemplate() {
        const wb = this.templateWorkbook();
        const ws = wb.addWorksheet('Zones');
        ws.columns = [
            { header: 'name', key: 'name', width: 32 },
            { header: 'communeName', key: 'communeName', width: 28 },
            { header: 'departmentName', key: 'departmentName', width: 28 },
            { header: 'regionName', key: 'regionName', width: 28 },
            { header: 'odcavName', key: 'odcavName', width: 30 },
            { header: 'status', key: 'status', width: 18 },
        ];
        this.styleTemplateHeader(ws);
        ws.addRow({ name: 'Zone Nord', communeName: 'Plateau', departmentName: 'Dakar', regionName: 'Dakar', odcavName: 'ODCAV Dakar', status: 'ACTIVE' });
        this.styleExampleRow(ws);
        return this.toBuffer(wb);
    }
    async generateVenuesTemplate() {
        const wb = this.templateWorkbook();
        const ws = wb.addWorksheet('Stades');
        ws.columns = [
            { header: 'name', key: 'name', width: 32 },
            { header: 'communeName', key: 'communeName', width: 28 },
            { header: 'departmentName', key: 'departmentName', width: 28 },
            { header: 'regionName', key: 'regionName', width: 28 },
            { header: 'address', key: 'address', width: 36 },
            { header: 'capacity', key: 'capacity', width: 14 },
            { header: 'status', key: 'status', width: 18 },
        ];
        this.styleTemplateHeader(ws);
        ws.addRow({ name: 'Stade Municipal', communeName: 'Plateau', departmentName: 'Dakar', regionName: 'Dakar', address: 'Avenue Lamine Guèye', capacity: 8000, status: 'ACTIVE' });
        this.styleExampleRow(ws);
        return this.toBuffer(wb);
    }
    async generateTeamsTemplate() {
        const wb = this.templateWorkbook();
        const ws = wb.addWorksheet('Équipes');
        ws.columns = [
            { header: 'name', key: 'name', width: 32 },
            { header: 'zoneName', key: 'zoneName', width: 28 },
            { header: 'communeName', key: 'communeName', width: 28 },
            { header: 'departmentName', key: 'departmentName', width: 28 },
            { header: 'regionName', key: 'regionName', width: 28 },
            { header: 'category', key: 'category', width: 22 },
            { header: 'status', key: 'status', width: 18 },
        ];
        this.styleTemplateHeader(ws);
        ws.addRow({ name: 'ASC Jaraaf', zoneName: 'Zone Nord', communeName: 'Plateau', departmentName: 'Dakar', regionName: 'Dakar', category: 'Senior', status: 'ACTIVE' });
        this.styleExampleRow(ws);
        return this.toBuffer(wb);
    }
    str(value) {
        if (value === null || value === undefined)
            return '';
        if (typeof value === 'string')
            return value.trim();
        if (typeof value === 'number')
            return String(value);
        if (typeof value === 'object') {
            const obj = value;
            if (Array.isArray(obj['richText'])) {
                return obj['richText'].map((r) => r.text ?? '').join('').trim();
            }
            if ('result' in obj)
                return String(obj['result']).trim();
            if ('text' in obj)
                return String(obj['text']).trim();
        }
        return String(value).trim();
    }
    validStatus(s) {
        return ['ACTIVE', 'INACTIVE', 'ARCHIVED'].includes(s);
    }
    isUniqueViolation(err) {
        return err instanceof client_1.Prisma.PrismaClientKnownRequestError && err.code === 'P2002';
    }
    errMsg(err) {
        return err instanceof Error ? err.message : String(err);
    }
    assertFile(file) {
        if (!file)
            throw new common_1.BadRequestException('Aucun fichier reçu.');
    }
    templateWorkbook() {
        const wb = new ExcelJS.Workbook();
        wb.creator = 'NAWETTANE';
        wb.created = new Date();
        return wb;
    }
    styleTemplateHeader(ws) {
        const header = ws.getRow(1);
        header.height = 22;
        header.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F5C8B' } };
        header.alignment = { vertical: 'middle', horizontal: 'center' };
        header.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin', color: { argb: 'FFD9D9D9' } },
                left: { style: 'thin', color: { argb: 'FFD9D9D9' } },
                bottom: { style: 'thin', color: { argb: 'FFD9D9D9' } },
                right: { style: 'thin', color: { argb: 'FFD9D9D9' } },
            };
        });
    }
    styleExampleRow(ws) {
        const row = ws.getRow(2);
        row.font = { italic: true, color: { argb: 'FF555555' } };
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' } };
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin', color: { argb: 'FFD9D9D9' } },
                left: { style: 'thin', color: { argb: 'FFD9D9D9' } },
                bottom: { style: 'thin', color: { argb: 'FFD9D9D9' } },
                right: { style: 'thin', color: { argb: 'FFD9D9D9' } },
            };
        });
    }
    async toBuffer(wb) {
        return Buffer.from(await wb.xlsx.writeBuffer());
    }
};
exports.ImportService = ImportService;
exports.ImportService = ImportService = ImportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_logs_service_1.AuditLogsService])
], ImportService);
//# sourceMappingURL=import.service.js.map