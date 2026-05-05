import { PrismaService } from '../prisma/prisma.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
export declare class SeasonsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        active: boolean;
    }[]>;
    create(dto: CreateSeasonDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        active: boolean;
    }>;
    update(id: string, dto: UpdateSeasonDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        active: boolean;
    }>;
    activate(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        active: boolean;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        year: number;
        active: boolean;
    }>;
}
