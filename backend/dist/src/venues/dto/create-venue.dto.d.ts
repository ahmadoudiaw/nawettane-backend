import { OrganizationStatus } from '@prisma/client';
export declare class CreateVenueDto {
    organizationId?: string;
    communeId?: string;
    name: string;
    address?: string;
    capacity?: number;
    status?: OrganizationStatus;
}
