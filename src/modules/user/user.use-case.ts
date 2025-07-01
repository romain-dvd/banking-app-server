import { HttpError } from "../../types/error.type";
import encrypter from "../../utils/encrypter";
import { UserRepo } from "./user.repo";
import { User } from "./user.type";

interface AuthentifyArg {
    id: string;
    password: string;
}

export class UserUseCases {
    constructor(private readonly userRepo: UserRepo) { }

    public async authentify(arg: AuthentifyArg): Promise<User> {
        const USER = await this.userRepo.findByIdWithCredential(arg.id);
        const ENCYPTED_PASSWORD = encrypter.encrypt(
            arg.password,
            USER.credential.salt
        );
        if (ENCYPTED_PASSWORD !== USER.credential.password) {
            throw new HttpError('Bad credentials', 401);
        }
        const EMPTY_CREDENTIAL = {
            password: '',
            salt: ''
        };
        return {
            ...USER,
            credential: EMPTY_CREDENTIAL
        };
    }

    public async create(user: User): Promise<void> {
        const SALT = encrypter.createRandomString();
        const PASSWORD = encrypter.encrypt(user.credential.password, SALT);
        const CREDENTIAL = {
            password: PASSWORD,
            salt: SALT
        };
        const USER = {
            ...user,
            credential: CREDENTIAL
        };
        await this.userRepo.create(USER);
    }

    public async deleteById(id: string): Promise<void> {
        await this.userRepo.deleteById(id);
    }

    public async update(user: User): Promise<void> {
        await this.userRepo.update(user);
    }
}