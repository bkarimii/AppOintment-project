const localStorageName = "meetingData";
const currentVersion = 1.3; // update this currentVersion value every time you change local storage structure
// update the meeting schema here
const newMeetingData = {
	version: currentVersion,
	copyOfMeetingStations: [{ station: { station_name: "" } }],
	meetingDate: "",
	earliestStartTime: "",
	latestStartTime: "",
	attendees: [
		{ name: "", station: "" },
		{ name: "", station: "" },
	],
	intervalTime: 20,
};

export function getLocalStorage() {
	const meetingData = localStorage.getItem(localStorageName);
	let parsedData;
	if (meetingData) {
		parsedData = JSON.parse(meetingData);
	}
	if (!parsedData || parsedData.version != currentVersion) {
		console.error(
			"Local Storage version is old, deleting current local storage...",
		);
		localStorage.removeItem(localStorageName);
		localStorage.setItem(localStorageName, JSON.stringify(newMeetingData));
		return newMeetingData;
	}
	return parsedData;
}

export function setLocalStorage(newMeetingData) {
	newMeetingData.version = currentVersion;
	localStorage.setItem(localStorageName, JSON.stringify(newMeetingData));
}
