import { AgeCategory, OrganizationStatus } from '@prisma/client';
export declare class CreateTeamDto {
    organizationId: string;
    name: string;
    category: AgeCategory;
    status?: OrganizationStatus;
}
