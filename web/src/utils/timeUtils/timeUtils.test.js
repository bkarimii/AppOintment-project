import { convertStringOfTimeToTime } from "./timeUtils";

describe("time utils", () => {
	describe("convertStringOfTimeToTime", () => {
		it("returns false if the given parameter is not in HH:MM (string) format", () => {
			const wrongParameter1 = 11;
			const wrongParameter2 = "abc";

			const result1 = convertStringOfTimeToTime(wrongParameter1);
			const result2 = convertStringOfTimeToTime(wrongParameter2);

			expect(result1).toBe(false);
			expect(result2).toBe(false);
		});

		it("returns a Date object for a valid HH:MM string", () => {
			const stringOfTime = "10:00";
			const convertedTime = convertStringOfTimeToTime(stringOfTime);

			expect(convertedTime instanceof Date).toBe(true);
		});

		it("correctly converts the given HH:MM string to a Date object", () => {
			const stringOfTime = "10:00";
			const convertedTime = convertStringOfTimeToTime(stringOfTime);

			const expectedDate = new Date();
			expectedDate.setHours(10, 0, 0, 0);

			expect(convertedTime.getHours()).toBe(expectedDate.getHours());
			expect(convertedTime.getMinutes()).toBe(expectedDate.getMinutes());
		});

		it("returns false for invalid time values (e.g., 25:61)", () => {
			const invalidTime1 = "25:00";
			const invalidTime2 = "12:61";

			const result1 = convertStringOfTimeToTime(invalidTime1);
			const result2 = convertStringOfTimeToTime(invalidTime2);

			expect(result1).toBe(false);
			expect(result2).toBe(false);
		});
	});
});
