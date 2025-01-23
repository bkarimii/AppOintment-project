import { convertStringOfTimeToTime } from "../timeUtils/timeUtils";

export function isValidInterval(startString, endString) {
	const startTime = convertStringOfTimeToTime(startString);
	const endTime = convertStringOfTimeToTime(endString);
	if (startTime <= endTime) {
		return true;
	}
	return false;
}
