import request from "supertest";

import app from "./app.js";

describe("/api", () => {
	describe("POST /compute-route", () => {
		const body = {
			copyOfMeetingStations: [
				{ station: { crs_code: "EUS", name: "London Euston" } },
				{ station: { crs_code: "ABW", name: "Abbey Wood" } },
			],
			meetingDate: "2024-12-20",
			earliestStartTime: "05:29",
			latestStartTime: "05:45",

			attendees: [
				{ name: "fikret", station: "MAN" },
				{ name: "behrouz", station: "ACY" },
			],
			intervalTime: 15,
		};
		it("returns an array", async () => {
			const response = await request(app).post("/api/compute-route").send(body);

			// Validate the response body structure
			expect(typeof response.body).toBe("object"); // Check if response body is an object
		}, 30000);
	});

	describe("POST /compute-route 2", () => {
		const body = {
			copyOfMeetingStations: [
				{ station: { crs_code: "EUS", name: "London Euston" } },
				{ station: { crs_code: "ABW", name: "Abbey Wood" } },
			],
			meetingDate: "2024-12-20",
			earliestStartTime: "05:29",
			latestStartTime: "05:45",
			attendees: [
				{ name: "fikret", station: "MAN" },
				{ name: "behrouz", station: "ACY" },
			],
			intervalTime: 15,
		};

		it("returns a successful response with expected structure", async () => {
			const response = await request(app).post("/api/compute-route").send(body);

			expect(response.status).toBe(200);

			expect(response.body).toHaveProperty("status");
			expect(response.body).toHaveProperty("totalInformation");

			expect(Array.isArray(response.body.totalInformation)).toBe(true);
			expect(response.body.totalInformation.length).toBeGreaterThanOrEqual(2);
		}, 30000);
	});
});
