import { addMinutes } from "date-fns";
import { fromZonedTime, format, toZonedTime } from "date-fns-tz";

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
		slots.push(
			format(toZonedTime(current, "UTC"), "yyyy-MM-dd'T'HH:mm:ss") + ".000Z",
		);

		current = addMinutes(current, intervalMinutes);
	}

	return slots;
}
