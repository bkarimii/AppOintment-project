import PropTypes from "prop-types";

import DeleteIcon from "../deleteIcon/DeleteIcon";

const MeetingStationPicker = ({
	stations,
	copyOfMeetingStations,
	setCopyOfMeetingStations,
}) => {
	const deleteStation = (e, index) => {
		e.preventDefault();
		const updatedMeetingStations = copyOfMeetingStations.filter(
			(_, i) => i !== index,
		);
		setCopyOfMeetingStations(updatedMeetingStations);
	};
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
