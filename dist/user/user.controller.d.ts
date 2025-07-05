import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(req: Request, createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(req: Request): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string, req: Request): Promise<import("./entities/user.entity").User>;
    update(id: string, req: Request, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string, req: Request): Promise<{
        deleted: boolean;
    }>;
}
