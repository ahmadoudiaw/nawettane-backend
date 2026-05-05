import { Role, UserStatus } from '@prisma/client';
export declare class CreateUserDto {
    fullName: string;
    email?: string;
    phone: string;
    password?: string;
    role: Role;
    status?: UserStatus;
    organizationIds?: string[];
}
