import { createHmac, randomBytes } from "crypto";

const createRandomString = (): string => {
    const ENCODING = 'base64';
    const SIZE = 128;
    const BUFFER = randomBytes(SIZE);
    return BUFFER.toString(ENCODING);
};

const encrypt = (text: string, salt?: string): string => {
    const ALGORITHM = 'sha256';
    const DATA = `${salt || createRandomString()}/${text}`;
    const ENCODING = 'hex';
    const KEY = 'MY_KEY';
    const HMAC = createHmac(ALGORITHM, KEY);
    const UPDATED = HMAC.update(DATA);
    return UPDATED.digest(ENCODING);
};

export default { createRandomString, encrypt };
