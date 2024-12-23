/* eslint-disable no-unused-vars */
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isArray } from "chart.js/helpers";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./NewMeeting.css";
import { useNavigate } from "react-router-dom";

function NewMeeting() {
	// New variables for second phase //
	const [inputBoxValue, setInputBoxValue] = useState("");
	const [filteredStations, setFilteredStations] = useState([]); // Filtered stations based on search
	// const [copyOfMeetingStations,setCopyOfMeetingStations]=useState([]);

	//////////////////////////////////////////
	const [stations, setStations] = useState([]);
	const [helpIconToggle, setHelpIconToggle] = useState(false);
	const [formData, setFormData] = useState(() => {
		const savedData = JSON.parse(localStorage.getItem("newMeetingData"));
		if (
			savedData &&
			!isArray(savedData.meetingStation) &&
			!isArray(savedData.copyOfMeetingStations)
		) {
			savedData.meetingStation = [{ station: savedData.meetingStation }];
			savedData.copyOfMeetingStations = [
				{ station: savedData.copyOfMeetingStations },
			];
		}
		return (
			savedData || {
				copyOfMeetingStations: [{ station: "" }],
				meetingStation: [{ station: "" }],
				meetingDate: "",
				earliestStartTime: "",
				latestStartTime: "",
				attendees: [{ name: "", station: "" }],
				intervalTime: 20,
			}
		);
	});

	// New variable
	const [copyOfMeetingStations, setCopyOfMeetingStations] = useState(
		formData.copyOfMeetingStations,
	);
	//============================
	const [meetingStation, setMeetingStation] = useState(formData.meetingStation);
	const [meetingDate, setMeetingDate] = useState(formData.meetingDate);
	const [earliestStartTime, setEarliestStartTime] = useState(
		formData.earliestStartTime,
	);
	const [latestStartTime, setLatestStartTime] = useState(
		formData.latestStartTime,
	);
	const [attendees, setAttendees] = useState(formData.attendees);
	const [intervalTime, setIntervalTime] = useState(formData.intervalTime);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("/api/station-list")
			.then((response) => response.json())
			.then((stationList) => setStations(stationList));
	}, []);

	useEffect(() => {
		const updateFormData = () => {
			setFormData({
				copyOfMeetingStations,
				meetingStation,
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
		meetingStation,
		meetingDate,
		earliestStartTime,
		latestStartTime,
		attendees,
		intervalTime,
	]);

	useEffect(() => {
		document.title = "ThisAppointment";
		localStorage.setItem("newMeetingData", JSON.stringify(formData));
		console.log(formData, "<---Form data--------");
	}, [formData]);

	const handleMeetingStationChange = (index, field, value) => {
		const updatedMeetingStation = [...meetingStation];
		updatedMeetingStation[index][field] = value;
		setMeetingStation(updatedMeetingStation);
	};

	const addMeetingStation = () => {
		setMeetingStation([...meetingStation, { station: "" }]);
	};

	const deleteMeetingStation = (index) => {
		const updatedMeetingStation = meetingStation.filter((_, i) => i !== index);
		setMeetingStation(updatedMeetingStation);
	};

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
		updatedAttendees[index][field] = value;
		setAttendees(updatedAttendees);
	};

	const addAttendee = () => {
		setAttendees([...attendees, { name: "", station: "" }]);
	};

	const deleteAttendee = (index) => (e) => {
		e.preventDefault();
		const updatedAttendees = attendees.filter((_, i) => i !== index);
		setAttendees(updatedAttendees);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/meeting-analysis");
	};

	const handleHelpButton = () => {
		setHelpIconToggle(!helpIconToggle);
	};

	/* ======================================================================= */

	const handleStationSelect = (station) => {
		setInputBoxValue(station); // Update input box with the selected station
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputBoxValue(value);
		// Filter the stations based on the input value
		const matches = stations.filter((stationObject) =>
			stationObject.station_name.toLowerCase().includes(value.toLowerCase()),
		);
		setFilteredStations(matches);
	};

	const addStation = (e) => {
		e.preventDefault();

		const alreadyAdded = copyOfMeetingStations.some(
			(stationObject) => stationObject.station === inputBoxValue,
		);
		if (!alreadyAdded && inputBoxValue.trim()) {
			// Check if inputBoxValue is not empty or just whitespace
			setCopyOfMeetingStations([
				...copyOfMeetingStations,
				{ station: inputBoxValue },
			]);
			setInputBoxValue("");
		} else if (!inputBoxValue.trim()) {
			alert("Empty value is not allowed!");
		} else if (alreadyAdded) {
			alert("Duplicate station!");
		}
	};

	const deleteStation = (e, index) => {
		e.preventDefault();
		const updatedMeetingStations = copyOfMeetingStations.filter(
			(_, i) => i !== index,
		);
		setCopyOfMeetingStations(updatedMeetingStations);
	};
	/* ======================================================================= */

	return (
		<>
			<div id="page-container">
				<h1 id="form-page-title">THIS APP OINTMENT</h1>
				<div id="form-page">
					<form onSubmit={handleSubmit}>
						<h2 className="form-header">Plan your meeting details</h2>
						<div className="form-group">
							<label id="list-heading" htmlFor="stn-list">
								Meeting Station List
							</label>
							{/* ======================================================================= */}
							{/* Adding new code to use an input box to  add stations instead of a dropdwon-list  */}
							<div id="input-box-container" style={{ marginBottom: "1rem" }}>
								<label htmlFor="station-list-input-box">Add a station:</label>
								<input
									type="text"
									id="station-list-input-box"
									value={inputBoxValue}
									onChange={handleInputChange}
									list="stations-list"
									aria-haspopup="listbox" // Accessibility: indicates a dropdown is available
								/>
								<datalist id="stations-list">
									{filteredStations.map((station, index) => (
										<option key={index} value={station.crs_code}>
											{station.station_name}
										</option>
									))}
								</datalist>
								<button onClick={addStation}>Add</button>
								<div>
									<ul>
										{copyOfMeetingStations.map((stationObject, index) => {
											return (
												<li key={index}>
													{console.log(stationObject, "<---station object")}
													{stationObject.station}
													<button onClick={(e) => deleteStation(e, index)}>
														Delete
													</button>
												</li>
											);
										})}
									</ul>
								</div>
							</div>

							{/* ======================================================================= */}
							<div id="station-list">
								<ul id="stn-list">
									{meetingStation.map((station, index) => (
										<li className="station-li" key={index}>
											<div className="form-group station-code-group">
												<select
													name="meetingStation"
													id={"meeting-station" + index}
													value={station.station}
													onChange={(e) =>
														handleMeetingStationChange(
															index,
															"station",
															e.target.value,
														)
													}
													required
													aria-required="true"
												>
													<option value="" disabled>
														Select a station
													</option>
													{stations.map((station, idx) => (
														<option key={idx} value={station.crs_code}>
															{station.station_name}
														</option>
													))}
												</select>
												<label htmlFor={"meeting-station" + index}>
													Station
												</label>
											</div>
											<button
												className="delete-button"
												onClick={() => deleteMeetingStation(index)}
												style={{ display: "flex", alignItems: "center" }}
												name="delete-station"
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
														fill="black"
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
														fill="black"
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
									id="add-station-button"
									type="button"
									onClick={addMeetingStation}
									name="add-station"
								>
									<span style={{ fontSize: "18px", marginRight: "5px" }}>
										+
									</span>
									Add Station
								</button>
							</div>
						</div>

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
												<select
													name="attendeesStation"
													id={"attendees-station" + index}
													value={attendees[index].station}
													onChange={(e) =>
														handleAttendeeChange(
															index,
															"station",
															e.target.value,
														)
													}
													required
												>
													<option value="" disabled>
														Select a station
													</option>
													{stations.map((station, idx) => (
														<option key={idx} value={station.crs_code}>
															{station.station_name}
														</option>
													))}
												</select>
												<label htmlFor={"attendees-station" + index}>
													Station
												</label>
											</div>
											<button
												className="delete-button"
												onClick={deleteAttendee(index)}
												aria-label={`Remove ${attendee.name} from attendee list`}
												name="delete-attendee"
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
									meeting will take place from the dropdown menu. If the
									stations is not listed, please check back later.
								</p>
								<p>
									<strong>Meeting Date:</strong> Select the date of the meeting
									using the date picker or import manually.
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
								<p>
									Enter the names and select the stations for each attendee:
								</p>
								<ul>
									<li>
										<strong>Name:</strong> Enter the full name of the attendee.
									</li>
									<li>
										<strong>Station:</strong> Select the station from the
										dropdown menu that corresponds to the attendee&lsquo;s
										location.
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
