export function convertStringOfTimeToTime(stringOfTime) {
	if (typeof stringOfTime != "string") return false;
	if (!/^(0[0-9]|1[0-9]|2[0-4]):([0-5][0-9])$/.test(stringOfTime)) return false;

	const [hours, minutes] = stringOfTime.split(":");
	const date = new Date();

	date.setHours(parseInt(hours));
	date.setMinutes(parseInt(minutes));

	return date;
}
