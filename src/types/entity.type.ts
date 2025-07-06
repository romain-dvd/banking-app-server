export interface Entity {
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Ref<T extends Entity> = T | T['_id'];