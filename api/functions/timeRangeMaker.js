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

	const start = fromZonedTime(`${meetingDate}T${startTime}:00`, userTimeZone);
	const end = fromZonedTime(`${meetingDate}T${endTime}:00`, userTimeZone);

	intervalMinutes = Number(intervalMinutes);

	let current = start;

	while (current <= end) {
		const formattedUTC = format(
			addMinutes(current, current.getTimezoneOffset()),
			"yyyy-MM-dd'T'HH:mm:ssXXX",
			{
				timeZone: "UTC",
			},
		);

		slots.push(formattedUTC);

		current = addMinutes(current, intervalMinutes);
	}

	return slots;
}
