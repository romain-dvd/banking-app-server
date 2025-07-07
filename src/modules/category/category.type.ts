import type { Entity, Ref } from "../../types/entity.type";
import { User } from "../user/user.type";

export interface Category<
    USER extends Ref<User> = Ref<User>
> extends Entity {
    label: string;
    user: USER;
}