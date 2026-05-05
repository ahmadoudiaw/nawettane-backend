import { CreateCommuneDto } from './dto/create-commune.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateCommuneDto } from './dto/update-commune.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { TerritoriesService } from './territories.service';
export declare class TerritoriesController {
    private readonly territoriesService;
    constructor(territoriesService: TerritoriesService);
    listRegions(): Promise<({
        _count: {
            departments: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        code: string | null;
    })[]>;
    createRegion(dto: CreateRegionDto): Promise<{
        _count: {
            departments: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        code: string | null;
    }>;
    updateRegion(id: string, dto: UpdateRegionDto): Promise<{
        _count: {
            departments: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        code: string | null;
    }>;
    deleteRegion(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        code: string | null;
    }>;
    listDepartments(regionId?: string): Promise<({
        _count: {
            communes: number;
        };
        region: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        regionId: string;
        code: string | null;
    })[]>;
    createDepartment(dto: CreateDepartmentDto): Promise<{
        _count: {
            communes: number;
        };
        region: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        regionId: string;
        code: string | null;
    }>;
    updateDepartment(id: string, dto: UpdateDepartmentDto): Promise<{
        _count: {
            communes: number;
        };
        region: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        regionId: string;
        code: string | null;
    }>;
    deleteDepartment(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        regionId: string;
        code: string | null;
    }>;
    listCommunes(departmentId?: string): Promise<({
        _count: {
            organizations: number;
        };
        department: {
            region: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                code: string | null;
            };
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            regionId: string;
            code: string | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        code: string | null;
    })[]>;
    createCommune(dto: CreateCommuneDto): Promise<{
        _count: {
            organizations: number;
        };
        department: {
            region: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                code: string | null;
            };
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            regionId: string;
            code: string | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        code: string | null;
    }>;
    updateCommune(id: string, dto: UpdateCommuneDto): Promise<{
        _count: {
            organizations: number;
        };
        department: {
            region: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                code: string | null;
            };
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            regionId: string;
            code: string | null;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        code: string | null;
    }>;
    deleteCommune(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        code: string | null;
    }>;
}
