import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            fullName: string;
            role: import(".prisma/client").$Enums.Role;
            email: string | null;
            phone: string;
        };
    }>;
    getMe(user: AuthenticatedUser): AuthenticatedUser;
}
