import { OrganizationStatus } from '@prisma/client';
export declare class UpdateOrganizationDto {
    name?: string;
    parentId?: string;
    regionId?: string;
    departmentId?: string;
    communeId?: string;
    status?: OrganizationStatus;
}
