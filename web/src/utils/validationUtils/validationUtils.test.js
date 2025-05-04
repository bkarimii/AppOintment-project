import { isValidInterval } from "./validationUtils";

describe("validation utils", () => {
	describe("isValidInterval", () => {
		it("returns true if the given start is before or equal to end time", () => {
			const start = "10:00";
			const end = "11:00";

			const isValidForNoInterval = isValidInterval(start, start);
			const isValidForPositiveInterval = isValidInterval(start, end);

			expect(isValidForNoInterval).toBe(true);
			expect(isValidForPositiveInterval).toBe(true);
		});
		it("returns false if the given start is after end time", () => {
			const start = "10:00";
			const invalidEnd = "09:00";

			const isValidForNegativeInterval = isValidInterval(start, invalidEnd);

			expect(isValidForNegativeInterval).toBe(false);
		});
	});
});
