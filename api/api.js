import { Router } from "express";

import db from "./db.js";
import { prepareDataForReport } from "./functions/reportMaker.js";
import { computeRoutesForOrigins } from "./functions/routeDirectionsAPI.js";
import { statistics } from "./functions/statisticalAnalyse.js";
import { processTravelInfo } from "./functions/statisticalAnalyse.js";
import { generateTimeSlots } from "./functions/timeRangeMaker.js";
import messageRouter from "./messages/messageRouter.js";
import { googleApiKey } from "./utils/config.cjs";

const api = Router();
const apiKey = googleApiKey;

api.use("/message", messageRouter);

api.post("/compute-route", async (req, res) => {
	const body = await fetchBodyMaker(req.body);
	const {
		meetingDate,
		startingTime,
		endingTime,
		intervalTime,
		destination,
		origins,
	} = body;
	if (!meetingDate || !startingTime || !endingTime) {
		return res.status(400).json({
			error:
				"Meeting time info (meetingDate, startingTime, endingTime) is required.",
		});
	}

	if (!intervalTime || isNaN(intervalTime)) {
		return res.status(400).json({ error: "Valid intervalTime is required." });
	}

	if (!destination || !Array.isArray(destination) || destination.length === 0) {
		return res.status(400).json({
			error: "At least one destination is required.",
		});
	}

	if (!origins || !Array.isArray(origins) || origins.length === 0) {
		return res.status(400).json({ error: "At least one origin is required." });
	}
	try {
		// This function creates period of times in an array
		const meetingTimeArray = generateTimeSlots(
			meetingDate,
			startingTime,
			endingTime,
			intervalTime,
		);

		const arrayOfDestination = body.destination;
		const arrayOfOrigins = body.origins;

		const fields =
			"routes.legs.duration,routes.legs.staticDuration,routes.legs.steps.transitDetails.stopDetails.departureTime,routes.legs.steps.transitDetails.stopDetails.arrivalTime";
		const travelMode = "TRANSIT";

		const travelInfo = await computeRoutesForOrigins(
			meetingTimeArray,
			arrayOfOrigins,
			travelMode,
			arrayOfDestination,
			fields,
			apiKey,
		);

		const travelInfoStatus = travelInfo.status;
		// getResponseForStatus based on the out put of the routeDirection function prepares the response
		const getResponseForStatus = (status, travelInfoData) => {
			const processedInfo = processTravelInfo(travelInfoData);
			const stats = statistics(processedInfo);
			const reports = prepareDataForReport(processedInfo);
			const totalInformation = [stats, reports];
			return { status, totalInformation };
		};

		const statusMap = {
			1: travelInfo.liveData,
			429: travelInfo.staticOutPut,
			0: travelInfo.staticOutPut,
			2: travelInfo.staticOutPut,
			10: travelInfo.staticOutPut,
		};

		const userResponse = getResponseForStatus(
			travelInfoStatus,
			statusMap[travelInfoStatus] || travelInfo.staticOutPut,
		);
		res.status(200).json(userResponse);
	} catch (error) {
		res.status(500).json({ error: "Error happened: " + error });
	}
});

api.get("/station-list", async (req, res) => {
	const stations = await db.query(
		"SELECT station_name, crs_code FROM uk_stations",
	);
	res.status(200).json(stations.rows);
});

export async function fetchBodyMaker(body) {
	try {
		const arrayOfDestination = body.copyOfMeetingStations;
		const destinations = [];
		const origins = [];
		const arrayOfOriginStationCrs = body.attendees;

		const meetingDate = body.meetingDate;
		const startingTime = body.earliestStartTime;
		const endingTime = body.latestStartTime;

		for (const eachDestinationCrs of arrayOfDestination) {
			// Find destination station in JSON data
			const destinationsDBDetail = await db.query(
				"SELECT * FROM uk_stations WHERE crs_code = $1",
				[eachDestinationCrs.station.crs_code],
			);
			if (destinationsDBDetail.rows.length === 0) {
				throw new Error("Destination CRS code not found.");
			}

			const destinationObject = {
				latitude: destinationsDBDetail.rows[0].latitude,
				longitude: destinationsDBDetail.rows[0].longitude,
				stationCrs: eachDestinationCrs.station.crs_code,
				stationName: destinationsDBDetail.rows[0].station_name,
			};

			destinations.push(destinationObject);
		}

		for (const originCrs of arrayOfOriginStationCrs) {
			// Find origin station in JSON data
			const originDBDetail = await db.query(
				"SELECT * FROM uk_stations WHERE crs_code = $1",
				[originCrs.station],
			);
			if (originDBDetail.rows.length === 0) {
				throw new Error(`Origin CRS code ${originCrs} not found.`);
			}

			const originObject = {
				city: {
					...originCrs,
					stationName: originDBDetail.rows[0].station_name,
				},
				location: {
					latLng: {
						latitude: originDBDetail.rows[0].latitude,
						longitude: originDBDetail.rows[0].longitude,
					},
				},
			};
			origins.push(originObject);
		}

		const intervalTime = body.intervalTime ?? 20;
		const formattedBody = {
			origins: origins,
			destination: destinations,
			meetingDate: meetingDate,
			startingTime: startingTime,
			endingTime: endingTime,
			intervalTime: intervalTime,
		};

		return formattedBody;
	} catch (error) {
		return { error: error.message };
	}
}

export default api;
