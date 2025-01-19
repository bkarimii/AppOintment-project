import { describe, it, expect, beforeEach, vi } from "vitest";

import {
	getLocalStorage,
	setLocalStorage,
	migrateMeetingData,
} from "./localStorageService";

describe("LocalStorageService", () => {
	const localStorageMock = (() => {
		let store = {};
		return {
			getItem: vi.fn((key) => store[key] || null),
			setItem: vi.fn((key, value) => {
				store[key] = value;
			}),
			clear: () => {
				store = {};
			},
		};
	})();

	beforeEach(() => {
		Object.defineProperty(window, "localStorage", { value: localStorageMock });
		localStorageMock.clear();
		vi.clearAllMocks();
	});

	const defaultMeetingStructure = {
		version: "1.1.1",
		copyOfMeetingStations: [{ station: { station_name: "", crs_code: "" } }],
		meetingDate: "",
		earliestStartTime: "",
		latestStartTime: "",
		attendees: [
			{ name: "", station: "" },
			{ name: "", station: "" },
		],
		intervalTime: 20,
		userTimeZone: "",
	};

	describe("getLocalStorage", () => {
		it("should return default structure when localStorage is empty", () => {
			const result = getLocalStorage();
			expect(result).toEqual(defaultMeetingStructure);
		});

		it("should handle invalid JSON in localStorage", () => {
			localStorageMock.getItem.mockReturnValue("invalid-json");
			const result = getLocalStorage();
			expect(result).toEqual(defaultMeetingStructure);
		});

		it("should migrate data from older version", () => {
			const oldData = {
				"1.0.0": {
					version: "1.0.0",
					copyOfMeetingStations: [],
					meetingDate: "2025-01-18",
					intervalTime: 15,
				},
			};
			localStorageMock.getItem.mockReturnValue(JSON.stringify(oldData));

			const result = getLocalStorage();
			expect(result.version).toBe("1.1.1");
			expect(result.meetingDate).toBe("2025-01-18");
		});
	});

	describe("setLocalStorage", () => {
		it("should save valid meeting data to localStorage", () => {
			const newData = {
				...defaultMeetingStructure,
				meetingDate: "2025-01-18",
			};

			setLocalStorage(newData);

			const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
			expect(savedData["1.1.1"]).toEqual(newData);
		});

		it("should reject data with incorrect version", () => {
			const invalidData = {
				...defaultMeetingStructure,
				version: "1.0.0",
			};

			setLocalStorage(invalidData);
			expect(localStorageMock.setItem).not.toHaveBeenCalled();
		});

		it("should reject data with incorrect structure", () => {
			const invalidData = {
				version: "1.0.1",
				invalidField: "test",
			};

			setLocalStorage(invalidData);
			expect(localStorageMock.setItem).not.toHaveBeenCalled();
		});
	});

	describe("migrateMeetingData", () => {
		it("should handle major version upgrade", () => {
			const oldData = {
				version: "0.9.0",
				someField: "value",
			};

			const result = migrateMeetingData(oldData, defaultMeetingStructure);
			expect(result).toEqual(defaultMeetingStructure);
		});

		it("should handle minor version upgrade", () => {
			const oldData = {
				version: "1.0.0",
				meetingDate: "2025-01-18",
				customField: "value",
			};

			const result = migrateMeetingData(oldData, defaultMeetingStructure);
			expect(result.version).toBe("1.1.1");
			expect(result.meetingDate).toBe("2025-01-18");
			expect(result.customField).toBe("value");
		});

		it("should handle patch version upgrade", () => {
			const oldData = {
				version: "1.0.0",
				meetingDate: "2025-01-18",
			};

			const result = migrateMeetingData(oldData, defaultMeetingStructure);
			expect(result.version).toBe("1.1.1");
			expect(result.meetingDate).toBe("2025-01-18");
		});

		it("should return same data for current version", () => {
			const currentData = {
				...defaultMeetingStructure,
				meetingDate: "2025-01-18",
			};

			const result = migrateMeetingData(currentData, defaultMeetingStructure);
			expect(result).toEqual(currentData);
		});
	});
});
