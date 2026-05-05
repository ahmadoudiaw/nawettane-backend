import { PrismaService } from '../prisma/prisma.service';
export type ActionType = 'DELETE' | 'DEACTIVATE' | 'CANCEL' | 'BLOCKED';
export interface DeletePreviewDep {
    label: string;
    count: number;
}
export interface DeletePreviewResult {
    entityName: string;
    actionType: ActionType;
    allowDelete: boolean;
    allowDeactivate: boolean;
    dependencies: DeletePreviewDep[];
    warningMessage: string;
}
export declare class DeletePreviewService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPreview(entity: string, id: string): Promise<DeletePreviewResult>;
    private previewZone;
    private previewTeam;
    private previewVenue;
    private previewMatch;
    private previewUser;
    private previewTicket;
}
