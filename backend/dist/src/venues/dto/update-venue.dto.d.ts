import { OrganizationStatus } from '@prisma/client';
export declare class UpdateVenueDto {
    organizationId?: string;
    communeId?: string;
    name?: string;
    address?: string;
    capacity?: number;
    status?: OrganizationStatus;
}
