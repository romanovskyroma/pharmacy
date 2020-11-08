import { IUser } from '../interfaces/users.interface';

export class User implements IUser {
    constructor(
        public email: string,
        public uid: string,
        public role: string,
        public password: string
    ) { }
}
