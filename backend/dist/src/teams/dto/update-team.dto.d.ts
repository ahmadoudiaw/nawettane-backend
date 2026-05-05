import { AgeCategory, OrganizationStatus } from '@prisma/client';
export declare class UpdateTeamDto {
    organizationId?: string;
    name?: string;
    category?: AgeCategory;
    status?: OrganizationStatus;
}
