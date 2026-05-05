import { UserStatus } from '@prisma/client';
export declare class UpdateSuperAdminDto {
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    status?: UserStatus;
}
