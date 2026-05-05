import { Response } from 'express';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { ImportService } from './import.service';
export declare class ImportController {
    private readonly importService;
    constructor(importService: ImportService);
    importRegions(file: Express.Multer.File, user: AuthenticatedUser): Promise<import("./import.service").ImportResult>;
    importDepartments(file: Express.Multer.File, user: AuthenticatedUser): Promise<import("./import.service").ImportResult>;
    importCommunes(file: Express.Multer.File, user: AuthenticatedUser): Promise<import("./import.service").ImportResult>;
    importOdcav(file: Express.Multer.File, user: AuthenticatedUser): Promise<import("./import.service").ImportResult>;
    importZones(file: Express.Multer.File, user: AuthenticatedUser): Promise<import("./import.service").ImportResult>;
    importVenues(file: Express.Multer.File, user: AuthenticatedUser): Promise<import("./import.service").ImportResult>;
    importTeams(file: Express.Multer.File, user: AuthenticatedUser): Promise<import("./import.service").ImportResult>;
    templateRegions(res: Response): Promise<void>;
    templateDepartments(res: Response): Promise<void>;
    templateCommunes(res: Response): Promise<void>;
    templateOdcav(res: Response): Promise<void>;
    templateZones(res: Response): Promise<void>;
    templateVenues(res: Response): Promise<void>;
    templateTeams(res: Response): Promise<void>;
    private sendTemplate;
}
