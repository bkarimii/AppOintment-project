import { Router } from "express";

import db from "./db.js";
import messageRouter from "./messages/messageRouter.js";

const api = Router();

api.use("/message", messageRouter);

api.get("/station-list", async (req, res) => {
	const stations = await db.query(
		"SELECT station_name, crs_code FROM uk_stations",
	);
	res.status(200).json(stations.rows);
});

async function fetchBodyMaker(body) {
	const destinationCrs = body.meetingStation;

	const destinationsDBDetail = await db.query(
		"SELECT * FROM uk_stations WHERE crs_code = $1",
		[destinationCrs],
	);
	// eslint-disable-next-line no-console
	console.log(destinationsDBDetail, "<-----destinations all row");

	const destination = {
		latitude: destinationsDBDetail.rows[0]?.latitude,
		longitude: destinationsDBDetail.rows[0]?.longitude,
	};

	const meetingDate = body.meetingDate;
	const meetingStartPoint = body.earliestStartTime;
	const meetingEndPoint = body.latestStartTime;
	const meetingRange = {
		startingTime: `${meetingDate}T${meetingStartPoint}:00Z`,
		endingTime: `${meetingDate}T${meetingEndPoint}:00Z`,
	};

	const origins = [];
	const arrayOfOriginStationCrs = body.attendees;

	for (const originCrs of arrayOfOriginStationCrs) {
		// Parameterized queries for each origin station
		const originDBDetail = await db.query(
			"SELECT * FROM uk_stations WHERE crs_code = $1",
			[originCrs],
		);
		const originObject = {
			city: originCrs,
			location: {
				latLng: {
					latitude: originDBDetail.rows[0]?.latitude,
					longitude: originDBDetail.rows[0]?.longitude,
				},
			},
		};
		origins.push(originObject);
	}

	// Default interval time to 15 if not provided
	let intervalTime = body.intervalTime ?? 15;

	const formattedBody = {
		origins: origins,
		destination: {
			latitude: destination.latitude,
			longitude: destination.longitude,
		},
		meetingRange: {
			startingTime: meetingRange.startingTime,
			endingTime: meetingRange.endingTime,
		},
		intervalTime: intervalTime,
	};

	return formattedBody;
}

api.post("/body-maker", async (req, res) => {
	try {
		const body = req.body;
		const preparedBody = await fetchBodyMaker(body);
		res.status(200).json(preparedBody);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

api.get("/database", async (req, res) => {
	const stations = await db.query("SELECT * FROM uk_stations");
	res.status(200).json(stations.rows);
});

export default api;
