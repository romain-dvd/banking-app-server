import type { Entity } from "../../types/entity.type";

export interface Account extends Entity {
    label: string;
    personal: boolean;
}