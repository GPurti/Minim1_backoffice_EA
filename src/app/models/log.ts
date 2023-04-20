export class Log {
    _id?: string;
    logged: boolean;
    start: string;
    duration: number;

    constructor(logged: boolean, start: string, duration: number) {
        this.logged = logged;
        this.start = start;
        this.duration = duration;
    }
}