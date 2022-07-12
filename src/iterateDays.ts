export function iterateDays(start: Date, end: Date, cb: (day: Date) => void) {
    let loop = new Date(start);
    while (loop <= end) {
        cb(new Date(loop));
        loop = new Date(loop.setDate(loop.getDate() + 1));
    }
}