import {
	faExclamationTriangle,
	faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { getLocalStorage } from "../services/localStorageService";

import { ReportMaker } from "./ReportMaker";
import Visualise from "./Visualise";
import "./DisplayComponent.css";

function TableContent({
	sortedResults,
	toggleRowExpansion,
	expandedRow,
	extractDateTime,
	processedReport,
}) {
	return (
		<table role="table">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Meeting Location</th>
					<th>Meeting Time</th>
					<th>Min Travel Time</th>
					<th>Average Travel Time</th>
					<th>Max Travel Time</th>
					<th>Departures</th>
					<th>Arrivals</th>
					<th>Arrival Slack</th>
					<th>Warnings</th>
				</tr>
			</thead>
			<tbody>
				{sortedResults.map((result, index) => (
					<React.Fragment key={index}>
						<tr onClick={() => toggleRowExpansion(index)} role="row">
							<td data-label="Rank"># {index + 1}</td>
							<td data-label="Meeting Location">{result.destination}</td>
							<td data-label="Meeting Time">
								{extractDateTime(result.meetingTime)[1]}
							</td>
							<td data-label="Min Travel Time">
								{`${formatHours(result.minTravelTimeInHour)} h (${result.minTravelTimeInMinute} m)`}
							</td>
							<td data-label="Average Travel Time">
								{`${formatHours(result.averageTravelTimeInHour)} h (${result.averageTravelTimeInMinute} m)`}
							</td>
							<td data-label="Max Travel Time">
								{`${formatHours(result.maxTravelTimeInHour)} h (${result.maxTravelTimeInMinute} m)`}
							</td>
							<td data-label="Departures">
								{result.earliestDeparture} - {result.latestDeparture}
							</td>
							<td data-label="Arrivals">
								{result.earliestArrival} - {result.latestArrival}
							</td>
							<td data-label="Arrival Slack">{result.arrivalSlack}</td>
							<td data-label="Warnings">
								{result.difficultTravels.length > 0 ||
								result.tooLongTravels.length > 0 ? (
									<FontAwesomeIcon
										icon={faExclamationTriangle}
										id="warning-button"
										title="This meeting includes a long journey. Click the row for more details."
										aria-label="Warning-long journey in this meeting. click the row for more details."
									/>
								) : (
									<FontAwesomeIcon
										icon={faCheckCircle}
										title="All Good"
										id="check-tick-button"
										aria-label="All good in this journey."
									/>
								)}
							</td>
						</tr>
						{expandedRow === index && (
							<tr role="row">
								<td colSpan="10" id="col-span-tabel-td">
									<ReportMaker
										destination={result.destination}
										timeOfReport={extractDateTime(result.meetingTime)[1]}
										arrayOfReport={processedReport}
									/>
								</td>
							</tr>
						)}
					</React.Fragment>
				))}
			</tbody>
		</table>
	);
}

TableContent.propTypes = {
	sortedResults: PropTypes.arrayOf(
		PropTypes.shape({
			meetingTime: PropTypes.string.isRequired,
			minTravelTimeInMinute: PropTypes.number.isRequired,
			minTravelTimeInHour: PropTypes.string.isRequired,
			averageTravelTimeInMinute: PropTypes.number.isRequired,
			maxTravelTimeInMinute: PropTypes.number.isRequired,
			earliestDeparture: PropTypes.string.isRequired,
			latestDeparture: PropTypes.string.isRequired,
			earliestArrival: PropTypes.string.isRequired,
			latestArrival: PropTypes.string.isRequired,
			arrivalSlack: PropTypes.number.isRequired,
			difficultTravels: PropTypes.array.isRequired,
			tooLongTravels: PropTypes.array.isRequired,
		}),
	).isRequired,
	toggleRowExpansion: PropTypes.func.isRequired,
	expandedRow: PropTypes.number,
	extractDateTime: PropTypes.func.isRequired,
	processedReport: PropTypes.array.isRequired,
};

const formatHours = (hourValue) => {
	const hours = Math.floor(hourValue);
	const minutes = Math.round((hourValue - hours) * 60);
	return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

function DisplayTravelResults() {
	const [processedResultsStorage, setProcessedResultsStorage] = useState([]);
	const [processedReport, setProcessedReport] = useState([]);
	const [expandedRow, setExpandedRow] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState("meeting-time");
	const [statusCode, setStatusCode] = useState(null);
	const [useOfflineData, setUseOfflineData] = useState(false);

	const navigate = useNavigate();
	const url = "/api/compute-route";

	const fetchTravelData = async (URL) => {
		setLoading(true);
		try {

			const bodyData = JSON.stringify(getLocalStorage());

			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: bodyData,
			});

			if (response.ok) {
				const totalInformation = await response.json();
				const result = totalInformation.totalInformation[0];
				const reports = totalInformation.totalInformation[1];
				setProcessedResultsStorage(result);
				setProcessedReport(reports);
				setUseOfflineData(totalInformation.status !== "1");

				switch (totalInformation.status) {
					case "1":
						setUseOfflineData(false);
						break;
					case "429":
						setStatusCode(429);
						break;
					case "2":
						setStatusCode(2);
						break;
					case "10":
						setStatusCode(10);
						break;
					case "0":
						setStatusCode(0);
						break;
				}
			} else {
				if (response.status === 429) {
					setStatusCode(429);
				}
				console.error("An error occurred!", response.status.error);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTravelData(url);
		document.title = "Meeting results";
	}, []);

	const extractDateTime = (isoString) => {
		const dateObject = new Date(isoString);
		const date = dateObject.toLocaleDateString("en-GB", { timeZone: "UTC" });
		const time = dateObject.toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: "UTC",
		});
		return [date, time];
	};

	const toggleRowExpansion = (index) => {
		setExpandedRow(expandedRow === index ? null : index);
	};

	const handleGoBackButton = (e) => {
		e.preventDefault();
		navigate("/");
	};

	const getSortedResults = () => {
		const results = [...processedResultsStorage];
		switch (selectedOption) {
			case "meeting-time":
				return results.sort(
					(a, b) => new Date(a.meetingTime) - new Date(b.meetingTime),
				);
			case "average":
				return results.sort(
					(a, b) => a.averageTravelTimeInMinute - b.averageTravelTimeInMinute,
				);
			case "max":
				return results.sort(
					(a, b) => a.maxTravelTimeInMinute - b.maxTravelTimeInMinute,
				);
			case "minSlack":
				return results.sort((a, b) => a.arrivalSlack - b.arrivalSlack);
		}
	};

	const statusMessages = {
		429: "Google API Quota exceeded - This is a sample meeting generated by the app to show how it works. Please try again later for live data.",
		2: "Failed to compute the route - This is a sample meeting generated by the app to show how it works. Please try again later for live data.",
		0: "Unknown error occurred - This is a sample meeting generated by the app to show how it works. Please try again later for live data.",
		10: "Google API Quota exceeded - This is a sample meeting generated by the app to show how it works. Please try again later for live data.",
	};

	const meetingDateToShowInBrowser =
		processedResultsStorage.length > 0
			? extractDateTime(processedResultsStorage[0].meetingTime)[0]
			: "";
	const meetinDayToShow =
		processedResultsStorage.length > 0
			? new Date(processedResultsStorage[0].meetingTime).getDay()
			: null;
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return (
		<>
			<div id="div-container">
				{loading ? (
					<div className="spinner-container">
						<div className="spinner"></div>
						<p>Data is loading...</p>
					</div>
				) : (
					<>
						<div id="button-text-container">
							<button
								onClick={handleGoBackButton}
								aria-label="Go Back to the form page."
								id="back-button"
							>
								<FontAwesomeIcon icon={faArrowLeft} />
							</button>
							{useOfflineData && (
								<p id="alert-message">
									<i>
										<strong>Caution: {statusMessages[statusCode]}</strong>
									</i>
								</p>
							)}
						</div>

						<div id="meeting-date-container">
							<h3 id="meeting-date-in-table-page">
								Meeting Date: {daysOfWeek[meetinDayToShow]},{" "}
								{meetingDateToShowInBrowser}
							</h3>
						</div>
						<div className="table-container">
							<Tabs
								selectedTabClassName="active-tab"
								onSelect={(index) => {
									const options = [
										"meeting-time",
										"average",
										"max",
										"minSlack",
										"meeting-location",
										"diagram",
									];
									setSelectedOption(options[index]);
								}}
							>
								<TabList className="tabs" role="tablist">
									<Tab className="tab">Meeting Time</Tab>
									<Tab className="tab">Avg Travel Time</Tab>
									<Tab className="tab">Max Travel Time</Tab>
									<Tab className="tab">Min Arrival Slack</Tab>
									<Tab className="tab">Diagram</Tab>
								</TabList>
								<TabPanel>
									<TableContent
										sortedResults={getSortedResults()}
										toggleRowExpansion={toggleRowExpansion}
										expandedRow={expandedRow}
										extractDateTime={extractDateTime}
										processedReport={processedReport}
									/>
								</TabPanel>
								<TabPanel>
									<TableContent
										sortedResults={getSortedResults()}
										toggleRowExpansion={toggleRowExpansion}
										expandedRow={expandedRow}
										extractDateTime={extractDateTime}
										processedReport={processedReport}
									/>
								</TabPanel>
								<TabPanel>
									<TableContent
										sortedResults={getSortedResults()}
										toggleRowExpansion={toggleRowExpansion}
										expandedRow={expandedRow}
										extractDateTime={extractDateTime}
										processedReport={processedReport}
									/>
								</TabPanel>
								<TabPanel>
									<TableContent
										sortedResults={getSortedResults()}
										toggleRowExpansion={toggleRowExpansion}
										expandedRow={expandedRow}
										extractDateTime={extractDateTime}
										processedReport={processedReport}
									/>
								</TabPanel>
								<TabPanel>
									<div id="chart-container">
										<Visualise travelData={processedResultsStorage} />
									</div>
								</TabPanel>
							</Tabs>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default DisplayTravelResults;
