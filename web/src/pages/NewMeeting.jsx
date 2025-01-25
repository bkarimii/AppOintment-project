import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isArray } from "chart.js/helpers";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./NewMeeting.css";
import { useNavigate } from "react-router-dom";

import MeetingStationPicker from "../components/meetingStationPicker/MeetingStationPicker";

function NewMeeting() {
	const [stations, setStations] = useState([]);
	const [helpIconToggle, setHelpIconToggle] = useState(false);
	const [formData, setFormData] = useState(() => {
		const savedData = JSON.parse(localStorage.getItem("newMeetingData"));
		if (savedData) {
			if (!isArray(savedData.copyOfMeetingStations)) {
				savedData.copyOfMeetingStations = [
					{ station: savedData.copyOfMeetingStations },
				];
			}
			if (!isArray(savedData.attendees)) {
				savedData.attendees = [{ name: "", station: "" }];
			}
		}
		return (
			savedData || {
				copyOfMeetingStations: [{ station: "" }],
				meetingDate: "",
				earliestStartTime: "",
				latestStartTime: "",
				attendees: [{ name: "", station: "" }],
				intervalTime: 20,
			}
		);
	});

	const [copyOfMeetingStations, setCopyOfMeetingStations] = useState(
		formData.copyOfMeetingStations || [{ station: { station_name: "" } }],
	);
	const [meetingDate, setMeetingDate] = useState(formData.meetingDate);
	const [earliestStartTime, setEarliestStartTime] = useState(
		formData.earliestStartTime,
	);
	const [latestStartTime, setLatestStartTime] = useState(
		formData.latestStartTime,
	);
	const [attendees, setAttendees] = useState(formData.attendees);
	const [intervalTime, setIntervalTime] = useState(formData.intervalTime);

	const [attendeeInputValues, setAttendeeInputValues] = useState(
		formData.attendees.map(() => ""),
	);

	const [filteredAttendeeStations, setFilteredAttendeeStations] = useState(
		formData.attendees.map(() => []),
	);

	const navigate = useNavigate();

	useEffect(() => {
		fetch("/api/station-list")
			.then((response) => response.json())
			.then((stationList) => {
				setStations(stationList);
				const initialInputValues = formData.attendees.map((attendee) => {
					if (attendee.station) {
						const station = stationList.find(
							(s) => s.crs_code === attendee.station,
						);
						return station ? station.station_name : "";
					}
					return "";
				});
				setAttendeeInputValues(initialInputValues);
			});
	}, [formData.attendees]);

	useEffect(() => {
		const updateFormData = () => {
			setFormData({
				copyOfMeetingStations,
				meetingDate,
				earliestStartTime,
				latestStartTime,
				attendees,
				intervalTime,
			});
		};
		updateFormData();
	}, [
		copyOfMeetingStations,
		meetingDate,
		earliestStartTime,
		latestStartTime,
		attendees,
		intervalTime,
	]);

	useEffect(() => {
		document.title = "ThisAppointment";
		localStorage.setItem("newMeetingData", JSON.stringify(formData));
	}, [formData]);

	const handleMeetingChange = (field, value) => {
		switch (field) {
			case "meetingDate":
				setMeetingDate(value);
				break;
			case "earliestStartTime":
				setEarliestStartTime(value);
				break;
			case "latestStartTime":
				setLatestStartTime(value);
				break;
			case "intervalTime":
				setIntervalTime(value);
				break;
			default:
				break;
		}
	};

	const handleAttendeeChange = (index, field, value) => {
		const updatedAttendees = [...attendees];
		if (field === "name") {
			updatedAttendees[index][field] = value;
			setAttendees(updatedAttendees);
		} else if (field === "station") {
			// // ======= Validation: Check if the station matches any meeting station =======
			// const isMeetingStation = copyOfMeetingStations.some(
			// 	(meetingStation) =>
			// 		meetingStation.station.station_name.toLowerCase() ===
			// 		value.toLowerCase(),
			// );

			// if (isMeetingStation) {
			// 	alert("An attendee's station cannot be the same as a meeting station.");
			// 	return; // Stop further processing
			// }
			// // ======= End of added validation =======
			// // Update the input value
			const updatedInputValues = [...attendeeInputValues];
			updatedInputValues[index] = value;
			setAttendeeInputValues(updatedInputValues);

			const exactMatch = stations.find(
				(station) => station.station_name === value,
			);

			if (exactMatch) {
				updatedAttendees[index].station = exactMatch.crs_code;
				setAttendees(updatedAttendees);

				const updatedFilteredStations = [...filteredAttendeeStations];
				updatedFilteredStations[index] = [];
				setFilteredAttendeeStations(updatedFilteredStations);
			} else {
				const matches = stations.filter((station) =>
					station.station_name.toLowerCase().includes(value.toLowerCase()),
				);
				const updatedFilteredStations = [...filteredAttendeeStations];
				updatedFilteredStations[index] = matches;
				setFilteredAttendeeStations(updatedFilteredStations);
			}
		}
	};

	const addAttendee = () => {
		setAttendees([...attendees, { name: "", station: "" }]);
		setAttendeeInputValues([...attendeeInputValues, ""]);
		setFilteredAttendeeStations([...filteredAttendeeStations, []]);
	};

	const deleteAttendee = (index) => (e) => {
		e.preventDefault();
		const updatedAttendees = attendees.filter((_, i) => i !== index);
		const updatedInputValues = attendeeInputValues.filter(
			(_, i) => i !== index,
		);
		const updatedFilteredStations = filteredAttendeeStations.filter(
			(_, i) => i !== index,
		);
		setAttendees(updatedAttendees);
		setAttendeeInputValues(updatedInputValues);
		setFilteredAttendeeStations(updatedFilteredStations);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/meeting-analysis");
	};

	const handleHelpButton = () => {
		setHelpIconToggle(!helpIconToggle);
	};

	return (
		<>
			<div id="page-container">
				<h1 id="form-page-title">THIS APP OINTMENT</h1>
				<div id="form-page">
					<form onSubmit={handleSubmit}>
						<h2 className="form-header">Plan your meeting details</h2>

						<MeetingStationPicker
							stations={stations}
							copyOfMeetingStations={copyOfMeetingStations}
							setCopyOfMeetingStations={setCopyOfMeetingStations}
						/>

						<div className="form-group">
							<input
								type="date"
								id="meeting-date"
								name="meetingDate"
								required
								value={meetingDate}
								min={new Date().toISOString().split("T")[0]}
								onChange={(e) =>
									handleMeetingChange("meetingDate", e.target.value)
								}
								aria-required="true"
							/>
							<label htmlFor="meeting-date">Meeting Date</label>
						</div>

						<div className="time-group">
							<div className="form-group">
								<input
									type="time"
									id="earliest-start-time"
									name="earliestStartTime"
									required
									value={earliestStartTime}
									onChange={(e) =>
										handleMeetingChange("earliestStartTime", e.target.value)
									}
									aria-required="true"
								/>
								<label htmlFor="earliest-start-time">Earliest Start Time</label>
							</div>

							<p>to</p>

							<div className="form-group">
								<input
									type="time"
									id="latest-start-time"
									name="latestStartTime"
									required
									value={latestStartTime}
									min={earliestStartTime}
									onChange={(e) =>
										handleMeetingChange("latestStartTime", e.target.value)
									}
									aria-required="true"
								/>
								<label htmlFor="latest-start-time">Latest Start Time</label>
							</div>
						</div>
						<h3 className="form-header">Who is coming?</h3>

						<div className="form-group">
							<label id="list-heading" htmlFor="att-list">
								Attendee List
							</label>
							<div id="attendees-list">
								<ul id="att-list">
									{attendees.map((attendee, index) => (
										<li className="attendee-li" key={index}>
											<div className="form-group attendee-name-group">
												<input
													type="text"
													id={"attendee-name" + index}
													placeholder=" "
													value={attendees[index].name}
													onChange={(e) =>
														handleAttendeeChange(index, "name", e.target.value)
													}
													required
												/>
												<label htmlFor={"attendee-name" + index}>Name</label>
											</div>
											<div className="form-group attendee-station-group">
												<input
													type="text"
													id={`attendee-station-input-${index}`}
													value={attendeeInputValues[index]}
													onChange={(e) =>
														handleAttendeeChange(
															index,
															"station",
															e.target.value,
														)
													}
													list={`stations-list-${index}`}
													placeholder=" "
													required
												/>
												<datalist id={`stations-list-${index}`}>
													{filteredAttendeeStations[index].map(
														(station, idx) => (
															<option key={idx} value={station.station_name}>
																{station.crs_code}
															</option>
														),
													)}
												</datalist>
												<label htmlFor={`attendee-station-input-${index}`}>
													Station
												</label>
											</div>
											<button
												className="delete-button"
												onClick={deleteAttendee(index)}
												aria-label={`Remove ${attendee.name} from attendee list`}
												name="delete-attendee"
												type="button"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="30"
													height="30"
													viewBox="0 0 64 64"
												>
													<rect
														x="16"
														y="22"
														width="32"
														height="34"
														fill="red"
														rx="4"
													/>
													<rect
														x="12"
														y="16"
														width="40"
														height="5"
														fill="black"
														rx="2"
													/>
													<rect
														x="24"
														y="11"
														width="16"
														height="6"
														fill="inherit"
														rx="2"
													/>
													<rect
														x="22"
														y="27"
														width="4"
														height="24"
														fill="white"
													/>
													<rect
														x="30"
														y="27"
														width="4"
														height="24"
														fill="white"
													/>
													<rect
														x="38"
														y="27"
														width="4"
														height="24"
														fill="white"
													/>
												</svg>
											</button>
										</li>
									))}
								</ul>

								<button
									id="add-attendee-button"
									type="button"
									onClick={addAttendee}
									aria-label="Add attendee"
									name="add-attendee"
								>
									<span style={{ fontSize: "18px", marginRight: "5px" }}>
										+
									</span>{" "}
									Add Attendee
								</button>
							</div>
						</div>

						<button
							type="submit"
							aria-label="Submit meeting details"
							name="submit"
						>
							Submit
						</button>
					</form>
					<div id="help-button-content-parent">
						<div id="help-button-and-title">
							<h2>Need help?</h2>
							<FontAwesomeIcon
								icon={faQuestionCircle}
								onClick={handleHelpButton}
								id="help-fa-icon"
								aria-expanded={helpIconToggle}
								aria-controls="help-content"
								name="help-button"
								aria-label="help-button"
								role="button"
							/>
						</div>

						{helpIconToggle && (
							<div id="help-content" aria-labelledby="help-title">
								<h3 id="help-title">How to Fill the Form</h3>
								<p>
									<strong>Meeting Station:</strong> Choose the station where the
									meeting will take place. Type in the station name and select
									from the suggestions.
								</p>
								<p>
									<strong>Meeting Date:</strong> Select the date of the meeting
									using the date picker or input manually.
								</p>
								<p>
									<strong>Earliest Start Time:</strong> Specify the earliest
									time you can start the meeting.
								</p>
								<p>
									<strong>Latest Start Time:</strong> Indicate the latest time
									you can start the meeting.
								</p>
								<h4>Attendee List:</h4>
								<p>Enter the names and stations for each attendee:</p>
								<ul>
									<li>
										<strong>Name:</strong> Enter the full name of the attendee.
									</li>
									<li>
										<strong>Station:</strong> Type in the station name and
										select from the suggestions that appear.
									</li>
								</ul>
								<p>
									To add more attendees, click the &ldquo;Add Attendee&quot;
									button. If you need to remove an attendee, click the delete
									button next to their information.
								</p>
								<p>
									Once all fields are filled out, click the &quot;Submit&quot;
									button to finalize your meeting details.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

// Define propTypes for validation
NewMeeting.propTypes = {
	onFormSubmit: PropTypes.func,
};

export default NewMeeting;
