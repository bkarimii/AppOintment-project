import { generateTimeSlots } from "./functions/timeRangeMaker";

describe("generateTimeSlots", () => {
	it("generates correct time slots", () => {
		const meetingDate = "2024-12-20";
		const startTime = "05:29";
		const endTime = "05:45";
		const intervalMinutes = 5;
		const userTimeZone = "Europe/London";

		const expectedSlots = [
			"2024-12-20T05:29:00.000Z",
			"2024-12-20T05:34:00.000Z",
			"2024-12-20T05:39:00.000Z",
			"2024-12-20T05:44:00.000Z",
		];

		const slots = generateTimeSlots(
			meetingDate,
			startTime,
			endTime,
			intervalMinutes,
			userTimeZone,
		);

		expect(slots).toEqual(expectedSlots);
	});

	it("returns an empty array if start time is after end time", () => {
		const meetingDate = "2024-12-20";
		const startTime = "06:00";
		const endTime = "05:45";
		const intervalMinutes = 5;
		const userTimeZone = "Europe/London";

		const slots = generateTimeSlots(
			meetingDate,
			startTime,
			endTime,
			intervalMinutes,
			userTimeZone,
		);

		expect(slots).toEqual([]);
	});

	it("handles intervalMinutes as a string", () => {
		const meetingDate = "2024-12-20";
		const startTime = "05:29";
		const endTime = "05:45";
		const intervalMinutes = "5";
		const userTimeZone = "Europe/London";

		const expectedSlots = [
			"2024-12-20T05:29:00.000Z",
			"2024-12-20T05:34:00.000Z",
			"2024-12-20T05:39:00.000Z",
			"2024-12-20T05:44:00.000Z",
		];

		const slots = generateTimeSlots(
			meetingDate,
			startTime,
			endTime,
			intervalMinutes,
			userTimeZone,
		);

		expect(slots).toEqual(expectedSlots);
	});

	it("handles a full hour interval correctly", () => {
		const meetingDate = "2024-12-20";
		const startTime = "05:00";
		const endTime = "07:00";
		const intervalMinutes = 60;
		const userTimeZone = "Europe/London";

		const expectedSlots = [
			"2024-12-20T05:00:00.000Z",
			"2024-12-20T06:00:00.000Z",
			"2024-12-20T07:00:00.000Z",
		];

		const slots = generateTimeSlots(
			meetingDate,
			startTime,
			endTime,
			intervalMinutes,
			userTimeZone,
		);

		expect(slots).toEqual(expectedSlots);
	});

	it("handles a single minute interval correctly", () => {
		const meetingDate = "2024-12-20";
		const startTime = "05:00";
		const endTime = "05:02";
		const intervalMinutes = 1;
		const userTimeZone = "Europe/London";

		const expectedSlots = [
			"2024-12-20T05:00:00.000Z",
			"2024-12-20T05:01:00.000Z",
			"2024-12-20T05:02:00.000Z",
		];

		const slots = generateTimeSlots(
			meetingDate,
			startTime,
			endTime,
			intervalMinutes,
			userTimeZone,
		);

		expect(slots).toEqual(expectedSlots);
	});

	it("handles summertime correctly", () => {
		const meetingDate = "2024-05-31"; // Date when DST starts in many regions
		const startTime = "00:00";
		const endTime = "02:00";
		const intervalMinutes = 30;
		const userTimeZone = "Europe/London";

		const expectedSlots = [
			"2024-05-30T23:00:00.000Z",
			"2024-05-30T23:30:00.000Z",
			"2024-05-31T00:00:00.000Z",
			"2024-05-31T00:30:00.000Z",
			"2024-05-31T01:00:00.000Z",
		];

		const slots = generateTimeSlots(
			meetingDate,
			startTime,
			endTime,
			intervalMinutes,
			userTimeZone,
		);

		expect(slots).toEqual(expectedSlots);
	});
});
