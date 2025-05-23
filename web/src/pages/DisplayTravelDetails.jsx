import PropTypes from "prop-types";

function DisplayDetailOfResults({ details }) {
	return (
		<div>
			<p>
				<strong>Earliest Arrival Time: </strong>
				{details.earliestArrival.split(".")[0]}
			</p>
			<p>
				<strong>Latest Departure: </strong>{" "}
				{details.latestDeparture.split(".")[0]}
			</p>
			<p>
				<strong>Median Arrival Time: </strong>
				{details.medianArrivalTime}
			</p>
			<p>
				<strong>Difficult Travels: </strong>
				{details.difficultTravels.length > 0 ? "YES" : "NO"}
			</p>
			<p>
				<strong>Too Long Travel: </strong>
				{details.tooLongTravel.length > 0 ? "YES" : "NO"}
			</p>
		</div>
	);
}

DisplayDetailOfResults.propTypes = {
	details: PropTypes.shape({
		maxTravelTimeInHour: PropTypes.number.isRequired,
		minTravelTimeInHour: PropTypes.number.isRequired,
		averageTravelTimeInHour: PropTypes.number.isRequired,
		earliestArrival: PropTypes.string.isRequired,
		latestArrival: PropTypes.string.isRequired,
		latestDeparture: PropTypes.string.isRequired,
		medianArrivalTime: PropTypes.string.isRequired,
		difficultTravels: PropTypes.arrayOf(PropTypes.any).isRequired,
		tooLongTravel: PropTypes.arrayOf(PropTypes.any).isRequired,
	}),
};

export default DisplayDetailOfResults;
