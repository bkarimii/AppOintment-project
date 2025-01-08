import { addMinutes } from "date-fns";
import { fromZonedTime, format } from "date-fns-tz";

export function generateTimeSlots(
	meetingDate,
	startTime,
	endTime,
	intervalMinutes,
	userTimeZone,
) {
	const slots = [];

	const start = fromZonedTime(
		`${meetingDate}T${startTime}:00`,
		userTimeZone.ianaTimeZone,
	);
	const end = fromZonedTime(
		`${meetingDate}T${endTime}:00`,
		userTimeZone.ianaTimeZone,
	);

	intervalMinutes = Number(intervalMinutes);
	let current = start;

	while (current <= end) {
		slots.push(
			format(current, "yyyy-MM-dd'T'HH:mm:ssXXX", {
				timeZone: userTimeZone.ianaTimeZone,
			}),
		);
		current = addMinutes(current, intervalMinutes);
	}

	return slots;
}
