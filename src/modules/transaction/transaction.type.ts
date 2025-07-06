import type { Entity, Ref } from "../../types/entity.type";
import type { Account } from "../account/account.type";
import type { Category } from "../category/category.type";

export interface TransactionAccount<
    DEBTOR extends Ref<Account> = Ref<Account>,
    ORIGIN extends Ref<Account> = Ref<Account>
> {
    debtor: DEBTOR;
    origin: ORIGIN;
}

export interface Transaction<
    CATEGORY extends Ref<Category> = Ref<Category>,
    DEBTOR extends Ref<Account> = Ref<Account>,
    ORIGIN extends Ref<Account> = Ref<Account>
> extends Entity {
    account: TransactionAccount<ORIGIN, DEBTOR>;
    amount: number;
    category: CATEGORY[];
    date: Date;
    observation?: string;
}