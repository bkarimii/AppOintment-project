const localStorageName = "meetingData";
const currentVersion = "v1.0.1"; // update this currentVersion value every time you change local storage structure
// update the meeting schema here
const meetingDataStructure = {
	version: "v1.0.1",
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
	const localStorageObject = localStorage.getItem(localStorageName);
	let parsedData = {};

	if (localStorageObject) {
		try {
			parsedData = JSON.parse(localStorageObject);
		} catch (error) {
			console.error("Error parsing localStorage:", error);
			return meetingDataStructure;
		}
	}

	if (!parsedData[currentVersion]) {
		console.error(
			"Version mismatch: local storage version is old, initializing storage for current version",
		);
		parsedData[currentVersion] = meetingDataStructure;
		localStorage.setItem(localStorageName, JSON.stringify(parsedData));
	}

	return parsedData[currentVersion];
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

	if (!isSameStructure) {
		console.error(
			"Local storage structure is not matching, Please update the version and template structure in meetingDataStructure variable",
		);
		return;
	}

	const localStorageObject = localStorage.getItem(localStorageName);
	let parsedData = {};

	if (localStorageObject) {
		try {
			parsedData = JSON.parse(localStorageObject);
		} catch (error) {
			console.error("Error parsing localStorage:", error);
		}
	}

	parsedData[currentVersion] = newMeetingData;

	localStorage.setItem(localStorageName, JSON.stringify(parsedData));
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
