const localStorageName = "meetingData";
const currentVersion = 1.3; // update this currentVersion value every time you change local storage structure
// update the meeting schema here
const meetingDataStructure = {
	version: currentVersion,
	copyOfMeetingStations: [{ station: { station_name: "", crs_code: "" } }],
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

	if (!parsedData || parsedData.version !== currentVersion) {
		console.error("Version mismatch: local storage version is now updating");
		localStorage.removeItem(localStorageName);
		localStorage.setItem(
			localStorageName,
			JSON.stringify(meetingDataStructure),
		);
		return meetingDataStructure;
	}
	return parsedData;
}

export function setLocalStorage(newMeetingData) {
	if (newMeetingData.version !== currentVersion) {
		console.error("Version mismatch: local storage version is not updated");
		return;
	}
	const isSameStructure = compareStructures(
		meetingDataStructure,
		newMeetingData,
	);
	if (isSameStructure) {
		localStorage.setItem(localStorageName, JSON.stringify(newMeetingData));
	} else {
		console.error(
			"Local storage structure is incorrect, Please update the template structure in meetingDataStructure variable",
		);
	}
}

function compareStructures(template, data) {
	if (
		typeof data !== "object" ||
		data === null ||
		typeof template !== "object"
	) {
		return typeof data == typeof template;
	}
	if (template.version && data.version && template.version !== data.version) {
		return false;
	}

	if (Array.isArray(template) && Array.isArray(data)) {
		return data.every((item) => compareStructures(template[0], item));
	}

	const templateKeys = Object.keys(template);
	const dataKeys = Object.keys(data);

	if (templateKeys.length !== dataKeys.length) return false;

	return templateKeys.every((key) => {
		if (!Object.prototype.hasOwnProperty.call(data, key)) return false;
		return compareStructures(template[key], data[key]);
	});
}
