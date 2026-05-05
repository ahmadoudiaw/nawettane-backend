import { OrganizationStatus, OrganizationType } from '@prisma/client';
export declare class CreateOrganizationDto {
    name: string;
    type: OrganizationType;
    parentId?: string;
    regionId?: string;
    departmentId?: string;
    communeId?: string;
    status?: OrganizationStatus;
}
