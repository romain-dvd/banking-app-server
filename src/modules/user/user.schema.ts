import { Schema } from "mongoose";
import { User } from "./user.type";

const createCredential = (): Readonly<Schema<User.Credential>> => {
    return new Schema({
        password: { required: true, type: String },
        salt: { required: true, type: String }
    }, { _id: false });
};

const createPersonal = (): Readonly<Schema<User.Personal>> => {
    return new Schema({
        firstname: { required: true, type: String },
        lastname: { required: true, type: String },
        picture: { type: String }
    }, { _id: false });
};

const userSchema = (): Readonly<Schema<User>> => {
    return new Schema({
        credential: { required: true, select: false, type: createCredential() },
        personal: { required: true, type: createPersonal() }
    }, { timestamps: true });
};

export default userSchema;