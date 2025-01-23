import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import { isValidInterval } from "../../utils/validationUtils/validationUtils";

import "./TimeRangePicker.css";

const TimeRangePicker = ({
	earliestStartTime,
	latestStartTime,
	handleMeetingChange,
}) => {
	const [earliest, setEarliest] = useState(earliestStartTime || "");
	const [latest, setLatest] = useState(latestStartTime || "");
	const [invalid, setInvalid] = useState({
		status: false,
		place: "",
		message: "",
	});
	const memoizedHandleMeetingChange = useCallback(handleMeetingChange, [
		handleMeetingChange,
	]);

	useEffect(() => {
		if (latest) {
			if (isValidInterval(earliest, latest)) {
				memoizedHandleMeetingChange("earliestStartTime", earliest);
				memoizedHandleMeetingChange("latestStartTime", latest);
				setInvalid(false);
			} else if (earliest) {
				memoizedHandleMeetingChange("earliestStartTime", "");
				setInvalid({
					status: true,
					place: "earliest",
					message: "Earliest time cannot be after latest time",
				});
			} else {
				setInvalid(false);
			}
		} else {
			setInvalid(false);
			memoizedHandleMeetingChange("earliestStartTime", earliest);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [earliest]);

	useEffect(() => {
		if (earliest) {
			if (isValidInterval(earliest, latest)) {
				memoizedHandleMeetingChange("earliestStartTime", earliest);
				memoizedHandleMeetingChange("latestStartTime", latest);
				setInvalid(false);
			} else if (latest) {
				memoizedHandleMeetingChange("latestStartTime", "");
				setInvalid({
					status: true,
					place: "latest",
					message: "Latest time cannot be before earliest time",
				});
			} else {
				setInvalid(false);
			}
		} else {
			setInvalid(false);
			memoizedHandleMeetingChange("latestStartTime", latest);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [latest]);

	function handleTimePickerChange(pickerType, value) {
		switch (pickerType) {
			case "earliestStartTime":
				setEarliest(value);
				break;
			case "latestStartTime":
				setLatest(value);
				break;
		}
	}

	function handleInvalidInput(e) {
		if (!earliest) {
			setInvalid({
				status: true,
				place: "earliest",
				message: "Please enter a valid time",
			});
		} else if (!latest) {
			setInvalid({
				status: true,
				place: "latest",
				message: "Please enter a valid time",
			});
		}
		e.preventDefault();
		e.target.setCustomValidity("");
	}

	return (
		<>
			<div className="time-group" style={{ position: "relative" }}>
				<div className="form-group">
					<input
						className={
							"time-picker" + (invalid.place === "earliest" ? " invalid" : "")
						}
						type="time"
						id="earliest-start-time"
						name="earliestStartTime"
						required
						max={latest}
						value={earliest}
						onChange={(e) =>
							handleTimePickerChange("earliestStartTime", e.target.value)
						}
						aria-required="true"
						onInvalid={handleInvalidInput}
					/>
					<label
						htmlFor="earliest-start-time"
						className={invalid.place === "earliest" ? "invalid" : ""}
					>
						Earliest Start Time
					</label>
				</div>

				<p>to</p>

				<div className="form-group">
					<input
						className={
							"time-picker" + (invalid.place === "latest" ? " invalid" : "")
						}
						type="time"
						id="latest-start-time"
						name="latestStartTime"
						required
						min={earliest}
						value={latest}
						onChange={(e) =>
							handleTimePickerChange("latestStartTime", e.target.value)
						}
						aria-required="true"
						onInvalid={handleInvalidInput}
					/>
					<label
						htmlFor="latest-start-time"
						className={invalid.place === "latest" ? "invalid" : ""}
					>
						Latest Start Time
					</label>
				</div>
				{invalid.status && (
					<div className="error-message">{invalid.message}</div>
				)}
			</div>
		</>
	);
};

TimeRangePicker.propTypes = {
	earliestStartTime: PropTypes.string.isRequired,
	latestStartTime: PropTypes.string.isRequired,
	handleMeetingChange: PropTypes.func.isRequired,
};

export default TimeRangePicker;
