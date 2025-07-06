export class HttpError extends Error {
    constructor(message: string, private status: number) {
        super(message);
    }

    public get httpStatus(): number {
        return this.status;
    }
}