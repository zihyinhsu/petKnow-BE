import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    findUser(id: number): Promise<import("./user.entity").User>;
    signUp(body: CreateUserDto): Promise<import("./user.entity").User>;
    login(body: CreateUserDto): Promise<{
        status: number;
        message: string;
        user: import("./user.entity").User;
    }>;
}
