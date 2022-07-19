import {iterateDays} from "./iterateDays";

export class TimeSpan {
    private readonly _start: Date;
    private readonly _end: Date;

    /**
     * Timespan with a start and an end
     * @param start Begin of the timespan
     * @param end End of the timespan
     */
    constructor(
        start: Date | string | number,
        end: Date | string | number
    ) {
        this._start = new Date(start);
        this._end = new Date(end);
    }

    /**
     * Begin of the timespan
     */
    public get start() {
        return new Date(this._start);
    }

    /**
     * End of the timespan
     */
    public get end() {
        return new Date(this._end);
    }

    /**
     * Checks, if the timespan includes a specific date
     * @param date Date, to be checked
     */
    public includes = (date: Date) => date.getTime() >= this.start.getTime() && date.getTime() <= this.end.getTime();

    public get iterate() {
        return {
            days: (cb: (date: Date) => void) => iterateDays(this.start, this.end, cb)
        }
    }



}