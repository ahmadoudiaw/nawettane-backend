import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonsService } from './seasons.service';
export declare class SeasonsController {
    private readonly seasonsService;
    constructor(seasonsService: SeasonsService);
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
