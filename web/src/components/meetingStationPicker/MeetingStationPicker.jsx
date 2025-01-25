import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

import DeleteIcon from "../deleteIcon/DeleteIcon";

import "./MeetingStationPicker.css";

const MeetingStationPicker = ({
	stations,
	copyOfMeetingStations,
	setCopyOfMeetingStations,
}) => {
	const [invalid, setInvalid] = useState({
		status: {},
		place: {},
		message: "Invalid station name",
	});

	useEffect(() => {
		// const updatedInvalid = { ...invalid };
		// const updatedInvalidPlace = updatedInvalid.place;

		copyOfMeetingStations.map((input, index) => {
			let place = {};
			const exactMatch = stations.find(
				(station) => station.station_name === input.station.station_name,
			);

			if (exactMatch) {
				// updatedInvalidPlace[index] = false;
				place[index] = false;
			} else {
				// updatedInvalidPlace[index] = true;
				place[index] = true;
			}

			if (input.station.station_name === "" || exactMatch) {
				setInvalid((prevState) => ({
					...prevState,
					status: { ...prevState.status, [index]: false },
				}));
			}
			setInvalid((prevInvalid) => ({
				...prevInvalid,
				place: { ...prevInvalid.place, place },
			}));
		});

		// setInvalid((prevInvalid) => ({
		// 	...prevInvalid,
		// 	place: updatedInvalidPlace,
		// }));
	}, [copyOfMeetingStations, stations]);

	const stationRegex = useMemo(() => {
		const stationNames = stations.map((station) => station.station_name);
		const escapedStationNames = stationNames.map((name) =>
			name.replace(/[.*+?^=!:${}()|[\]/\\]/g, "\\$&"),
		);
		const pattern = `^(${escapedStationNames.join("|")})$`;
		return pattern;
	}, [stations]);

	function deleteStation(e, index) {
		e.preventDefault();
		const updatedMeetingStations = copyOfMeetingStations.filter(
			(_, i) => i !== index,
		);
		setCopyOfMeetingStations(updatedMeetingStations);
	}

	function handleInvalidInput(e, index) {
		e.preventDefault();
		e.target.setCustomValidity("");

		setInvalid((prevState) => ({
			...prevState,
			status: { ...prevState.status, [index]: true },
			place: { ...prevState.place, [index]: true },
		}));
	}
	return (
		<>
			<div className="form-group">
				<label id="list-heading" htmlFor="stn-list">
					Meeting Station List
				</label>
				<div id="input-box-container" style={{ marginBottom: "1rem" }}>
					<ul id="stn-list" style={{ position: "relative" }}>
						{copyOfMeetingStations.map((stationObject, index) => (
							<li className="meeting-list-item" key={index}>
								<div className="form-group station-input-group">
									<input
										type="text"
										id={`meeting-station-input-${index}`}
										className={
											"meeting-station-picker" +
											(invalid.status[index] === true &&
											invalid.place[index] === true
												? " invalid"
												: "")
										}
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
											setInvalid((prevState) => ({
												...prevState,
												status: { ...prevState.status, [index]: false },
											}));
											setCopyOfMeetingStations(updatedStations);
										}}
										list={`meeting-stations-list-${index}`}
										placeholder=" "
										pattern={stationRegex}
										onInvalid={(e) => handleInvalidInput(e, index)}
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
									<label
										htmlFor={`meeting-station-input-${index}`}
										className={
											invalid.status[index] === true &&
											invalid.place[index] === true
												? "invalid"
												: ""
										}
									>
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
						{Object.keys(invalid.place).some(
							(index) =>
								invalid.status[index] === true && invalid.place[index] === true,
						) && <div className="error-message">{invalid.message}</div>}
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
