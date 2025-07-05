import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: SignupDto): Promise<{
        token: string;
    }>;
    login(body: LoginDto): Promise<{
        token: string;
    }>;
}
