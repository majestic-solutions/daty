import {TimeSpan} from "./time-span";


describe("TimeSpan Tests", () => {
    describe("Initialize", () => {
        it("should initialize a new timespan with date objects", () => {
            // => Arrange / Act
           const sut = new TimeSpan(new Date(2022, 5, 1), new Date(2022, 5, 31));

           // => Assert
           expect(sut).toBeTruthy();
           expect(sut.start.getTime()).toEqual(new Date(2022, 5, 1).getTime());
           expect(sut.end.getTime()).toEqual(new Date(2022, 5, 31).getTime());
        });

        it("should initialize a new timespan with strings", () => {
            // => Arrange / Act
            const sut = new TimeSpan('2022-07-11T08:47:20.871Z', '2022-07-15T08:47:20.871Z');

            // => Assert
            expect(sut).toBeTruthy();
            expect(sut.start.getTime()).toEqual(new Date('2022-07-11T08:47:20.871Z').getTime());
            expect(sut.end.getTime()).toEqual(new Date('2022-07-15T08:47:20.871Z').getTime());
        });

        it("should initialize a new timespan with numbers", () => {
            // => Arrange
            let start = new Date(2022, 5, 1);
            let end = new Date(2022, 5, 31);

            // => Act
            const sut = new TimeSpan(start.getTime(), end.getTime());
            expect(sut).toBeTruthy();

            // => Assert
            expect(sut.start.getTime()).toEqual(start.getTime());
            expect(sut.end.getTime()).toEqual(end.getTime());
        });
    });

    describe("Immutability", () => {
        it('should be immutable', function () {
            // => Arrange
            let start = new Date(2022, 5, 1);
            let end = new Date(2022, 5, 31);
            const sut = new TimeSpan(start, end);

            // => Act
            start.setFullYear(2023);
            end.setFullYear(2023);

            // => Assert
            expect(sut.start.getTime()).not.toEqual(start.getTime())
            expect(sut.end.getTime()).not.toEqual(end.getTime())
        });

    });

    describe("Includes", () => {
        it('should include a specific date', () => {
            // => Arrange
            const sut = new TimeSpan(new Date(2022, 1, 2), new Date(2022, 1, 20));
            const date = new Date(2022, 1, 10);

            // => Act
            const result = sut.includes(date);

            // => Assert
            expect(result).toBeTruthy();
        });

        it('should not include a specific date - later', () => {
            // => Arrange
            const sut = new TimeSpan(new Date(2022, 1, 2), new Date(2022, 1, 20));
            const date = new Date(2022, 2, 10);

            // => Act
            const result = sut.includes(date);

            // => Assert
            expect(result).toBeFalsy();
        });

        it('should not include a specific date - earlier', () => {
            // => Arrange
            const sut = new TimeSpan(new Date(2022, 2, 2), new Date(2022, 1, 20));
            const date = new Date(2022, 1, 10);

            // => Act
            const result = sut.includes(date);

            // => Assert
            expect(result).toBeFalsy();
        });
    });

    describe("Iterate", () => {
        describe("Days", () => {
            it('should iterate through the days', () => {
                // => Arrange
                const mockCallback = jest.fn();
                const sut = new TimeSpan(new Date(2022, 6, 1), new Date(2022, 7, 1));

                // => Act
                sut.iterate.days(mockCallback);

                // => Assert
                expect(mockCallback.mock.calls.length).toBe(32);
                expect(mockCallback.mock.calls[0][0].getTime()).toEqual(new Date(2022, 6, 1).getTime());
                expect(mockCallback.mock.calls[1][0].getTime()).toEqual(new Date(2022, 6, 2).getTime());
                expect(mockCallback.mock.calls[2][0].getTime()).toEqual(new Date(2022, 6, 3).getTime());
                expect(mockCallback.mock.calls[29][0].getTime()).toEqual(new Date(2022, 6, 30).getTime());
                expect(mockCallback.mock.calls[30][0].getTime()).toEqual(new Date(2022, 6, 31).getTime());
                expect(mockCallback.mock.calls[31][0].getTime()).toEqual(new Date(2022, 7, 1).getTime());

            });
        });
    });
});