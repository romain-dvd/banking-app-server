import type { Entity } from "../../types/entity.type";

export interface Account extends Entity {
    baseAmount: number;
    label: string;
    personal: boolean;
}