import { Entity } from "../../types/entity.type";

export interface User extends Entity {
    firstname: string;
    lastname: string;
    key: string;
    password: string;
}