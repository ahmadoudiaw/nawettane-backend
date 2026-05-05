import { SettingsService } from './settings.service';
export declare class PublicSettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getAppSettings(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        applicationTitle: string;
        contactLabel: string;
        contactPhone: string;
        developerName: string;
        developerWebsite: string;
    }>;
}
