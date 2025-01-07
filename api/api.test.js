import { addDays, format } from "date-fns";
import request from "supertest";

import app from "./app.js";

describe("/api", () => {
	describe("POST /compute-route", () => {
		const body = {
			meetingStation: [
				{
					name: "eus",
					station: "EUS",
				},
				{
					name: "abw",
					station: "ABW",
				},
			],
			meetingDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
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
			meetingStation: [
				{
					name: "London Euston",
					station: "EUS",
				},
				{
					name: "Abbey Wood",
					station: "ABW",
				},
			],
			meetingDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
			earliestStartTime: "05:29",
			latestStartTime: "05:45",
			attendees: [
				{ name: "fikret", station: "MAN" },
				{ name: "behrouz", station: "ACY" },
			],
			intervalTime: 15,
		};

		it("returns an array of travel stats", async () => {
			const response = await request(app).post("/api/compute-route").send(body);

			expect(response.status).toBe(200);

			// Validate the response body structure
		}, 30000);
	});
});
