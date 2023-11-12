import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    findOne(query: any): Promise<User>;
}
