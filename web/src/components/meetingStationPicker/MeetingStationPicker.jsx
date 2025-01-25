import PropTypes from "prop-types";

import DeleteIcon from "../deleteIcon/DeleteIcon";

import "./MeetingStationPicker.css";

const MeetingStationPicker = ({
	stations,
	copyOfMeetingStations,
	setCopyOfMeetingStations,
	// setValidated,
}) => {
	// const [invalid, setInvalid] = useState({
	// 	status: false,
	// 	place: "",
	// 	message: "",
	// });

	// useEffect(() => {
	// 	setValidated((prev) => {
	// 		return prev.timeRange !== !invalid.status
	// 			? { ...prev, timeRange: !invalid.status }
	// 			: prev;
	// 	});
	// }, [invalid, setValidated]);

	const deleteStation = (e, index) => {
		e.preventDefault();
		const updatedMeetingStations = copyOfMeetingStations.filter(
			(_, i) => i !== index,
		);
		setCopyOfMeetingStations(updatedMeetingStations);
	};

	// function handleInvalidInput(e) {
	// 	e.preventDefault();
	// 	e.target.setCustomValidity("");

	// 	if (!earliest && !latest) {
	// 		setInvalid({
	// 			status: true,
	// 			place: "interval",
	// 			message: "Please enter a valid time",
	// 		});
	// 	} else if (!earliest) {
	// 		setInvalid({
	// 			status: true,
	// 			place: "earliest",
	// 			message: "Please enter a valid time",
	// 		});
	// 		return;
	// 	} else if (!latest) {
	// 		setInvalid({
	// 			status: true,
	// 			place: "latest",
	// 			message: "Please enter a valid time",
	// 		});
	// 		return;
	// 	} else if (!isValidInterval(earliest, latest)) {
	// 		setInvalid({
	// 			status: true,
	// 			place: "interval",
	// 			message: "Latest time can not be before earliest time",
	// 		});
	// 	}
	// }
	return (
		<>
			<div className="form-group">
				<label id="list-heading" htmlFor="stn-list">
					Meeting Station List
				</label>
				<div id="input-box-container" style={{ marginBottom: "1rem" }}>
					<ul id="stn-list">
						{copyOfMeetingStations.map((stationObject, index) => (
							<li className="meeting-list-item" key={index}>
								<div className="form-group station-input-group">
									<input
										type="text"
										id={`meeting-station-input-${index}`}
										className={"meeting-station-picker" + " invalid"}
										value={stationObject?.station?.station_name || ""}
										onChange={(e) => {
											const value = e.target.value;
											const updatedStations = [...copyOfMeetingStations];
											const exactMatch = stations.find(
												(station) => station.station_name === value,
											);

											if (exactMatch) {
												updatedStations[index].station = exactMatch;
											} else {
												updatedStations[index].station = {
													station_name: value,
												};
											}
											setCopyOfMeetingStations(updatedStations);
										}}
										list={`meeting-stations-list-${index}`}
										placeholder=" "
										required
										// onInvalid={handleInvalidInput}
									/>
									<datalist id={`meeting-stations-list-${index}`}>
										{stations
											.filter((station) =>
												station.station_name
													.toLowerCase()
													.includes(
														(
															stationObject.station.station_name || ""
														).toLowerCase(),
													),
											)
											.map((station, idx) => (
												<option key={idx} value={station.station_name}>
													{station.crs_code}
												</option>
											))}
									</datalist>
									<label htmlFor={`meeting-station-input-${index}`}>
										Meeting Station {index + 1}
									</label>
								</div>
								<button
									onClick={(e) => deleteStation(e, index)}
									className="delete-button"
									aria-label={`Delete station ${index + 1}`}
									type="button"
								>
									<DeleteIcon />
								</button>
							</li>
						))}
					</ul>

					<button
						id="add-station-button"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							setCopyOfMeetingStations([
								...copyOfMeetingStations,
								{ station: { station_name: "" } },
							]);
						}}
						aria-label="Add station"
						name="add-station"
					>
						<span style={{ fontSize: "18px", marginRight: "5px" }}>+</span> Add
						Station
					</button>
				</div>
				{/* {invalid.status && ( */}
				{/* <div className="error-message">{invalid.message}</div> */}
				{/* )} */}
			</div>
		</>
	);
};

MeetingStationPicker.propTypes = {
	stations: PropTypes.array.isRequired,
	copyOfMeetingStations: PropTypes.array.isRequired,
	setCopyOfMeetingStations: PropTypes.func.isRequired,
};

export default MeetingStationPicker;
