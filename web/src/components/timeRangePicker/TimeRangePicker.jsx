import PropTypes from "prop-types";

const TimeRangePicker = ({
	earliestStartTime,
	latestStartTime,
	handleMeetingChange,
}) => {
	return (
		<>
			<div className="time-group">
				<div className="form-group">
					<input
						className="time-picker"
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
						className="time-picker"
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
		</>
	);
};

TimeRangePicker.propTypes = {
	earliestStartTime: PropTypes.string.isRequired,
	latestStartTime: PropTypes.string.isRequired,
	handleMeetingChange: PropTypes.func.isRequired,
};

export default TimeRangePicker;
