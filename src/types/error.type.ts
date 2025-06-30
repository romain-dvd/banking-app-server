export class HttpError extends Error {
    constructor(
        public override message: string,
        public status: number
    ) {
        super();
    }
}