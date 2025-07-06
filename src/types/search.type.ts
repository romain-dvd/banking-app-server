import type { Entity } from './entity.type.ts';

export enum SortOrder {
    Ascending = 1,
    Descending = -1
};

export type Sort<T extends Entity> = Partial<{ [K in keyof T]: SortOrder }>;

export interface Search<T extends Entity> {
    filter?: Record<string, unknown>;
    offset?: number;
    quantity?: number;
    sort?: Sort<T>;
}