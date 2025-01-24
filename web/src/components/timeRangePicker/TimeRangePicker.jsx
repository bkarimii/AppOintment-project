import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import { isValidInterval } from "../../utils/validationUtils/validationUtils";

import "./TimeRangePicker.css";

const TimeRangePicker = ({
	earliestStartTime,
	latestStartTime,
	handleMeetingChange,
	setValidated,
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
		memoizedHandleMeetingChange("earliestStartTime", earliest);
		memoizedHandleMeetingChange("latestStartTime", latest);

		if (earliest && latest && isValidInterval(earliest, latest)) {
			setInvalid({ status: false });
		} else {
			setInvalid({ status: true });
		}
	}, [earliest, latest, memoizedHandleMeetingChange]);

	useEffect(() => {
		setValidated((prev) => {
			return prev.timeRange !== !invalid.status
				? { ...prev, timeRange: !invalid.status }
				: prev;
		});
	}, [invalid, setValidated]);

	function handleInvalidInput(e) {
		e.preventDefault();
		e.target.setCustomValidity("");

		if (!earliest && !latest) {
			setInvalid({
				status: true,
				place: "interval",
				message: "Please enter a valid time",
			});
		} else if (!earliest) {
			setInvalid({
				status: true,
				place: "earliest",
				message: "Please enter a valid time",
			});
			return;
		} else if (!latest) {
			setInvalid({
				status: true,
				place: "latest",
				message: "Please enter a valid time",
			});
			return;
		} else if (!isValidInterval(earliest, latest)) {
			setInvalid({
				status: true,
				place: "interval",
				message: "Latest time can not be before earliest time",
			});
		}
	}

	return (
		<>
			<div className="time-group" style={{ position: "relative" }}>
				<div className="form-group">
					<input
						className={
							"time-picker" +
							(invalid.place === "earliest"
								? " invalid"
								: invalid.place === "interval"
									? " invalid"
									: "")
						}
						type="time"
						id="earliest-start-time"
						name="earliestStartTime"
						required
						max={latest}
						value={earliest}
						onChange={(e) => setEarliest(e.target.value || "")}
						aria-required="true"
						onInvalid={handleInvalidInput}
					/>
					<label
						htmlFor="earliest-start-time"
						className={
							invalid.place === "earliest"
								? " invalid"
								: invalid.place === "interval"
									? " invalid"
									: ""
						}
					>
						Earliest Start Time
					</label>
				</div>

				<p>to</p>

				<div className="form-group">
					<input
						className={
							"time-picker" +
							(invalid.place === "latest"
								? " invalid"
								: invalid.place === "interval"
									? " invalid"
									: "")
						}
						type="time"
						id="latest-start-time"
						name="latestStartTime"
						required
						min={earliest}
						value={latest}
						onChange={(e) => setLatest(e.target.value || "")}
						aria-required="true"
						onInvalid={handleInvalidInput}
					/>
					<label
						htmlFor="latest-start-time"
						className={
							invalid.place === "latest"
								? " invalid"
								: invalid.place === "interval"
									? " invalid"
									: ""
						}
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
	setValidated: PropTypes.func.isRequired,
	handleMeetingChange: PropTypes.func.isRequired,
};

export default TimeRangePicker;
