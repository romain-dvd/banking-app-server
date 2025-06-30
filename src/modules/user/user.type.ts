import { Entity } from "../../types/entity.type";

export namespace User {
    export interface Credential {
        password: string;
        salt: string;
    }

    export interface Personal {
        firstname: string;
        lastname: string;
        picture?: string;
    }
}

export interface User extends Entity {
    credential: User.Credential;
    personal: User.Personal;
}