import crypto from 'crypto';

export const createKey = (): string => {
    const ENCODING = 'base64';
    const SIZE = 128;
    return crypto.randomBytes(SIZE).toString(ENCODING);
};

export const createEncyption = (text: string, key?: string): string => {
    const ALGORITHM = 'sha256';
    const DATA = `${key || createKey()}/${text}`;
    const ENCODING = 'hex';
    return crypto.createHmac(ALGORITHM, '').update(DATA).digest(ENCODING);
};