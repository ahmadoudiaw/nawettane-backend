import { DeletePreviewService } from './delete-preview.service';
export declare class DeletePreviewController {
    private readonly service;
    constructor(service: DeletePreviewService);
    getPreview(entity: string, id: string): Promise<import("./delete-preview.service").DeletePreviewResult>;
}
