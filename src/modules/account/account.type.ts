import type { Entity, Ref } from "../../types/entity.type";
import { User } from "../user/user.type";

export interface Account<
    USER extends Ref<User> = Ref<User>
> extends Entity {
    baseAmount: number;
    label: string;
    personal: boolean;
    user: USER;
}