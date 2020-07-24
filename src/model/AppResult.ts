export class AppResult {

    constructor(
        public readonly status: AppResultStatus,
        public readonly data: any | any[] | null,
        public readonly message: string = '',
    ) { }

}

export enum AppResultStatus {
    OK = 0,
    ERROR = 1,
    NOT_FOUND = 2
}