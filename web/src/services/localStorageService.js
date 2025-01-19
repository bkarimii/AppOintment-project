/* 

TO UPDATE LOCALSTORAGE STRUCTURE PLEASE FOLLOW THE RULES BELOW

1- follow semantic versioning	--->	major.minor.patch	ex --> 1.3.1

	major updates --> if you change the structure or the keys of the localStorage

	minor updates --> if you are adding a new key to structure

	patch upgrades --> if the old versions are completely compatiple with new versions (only version variable will be changed)

2- update currentVersion and meetingDataStructure in this file

3- update defaultMeetingStructure from the test file

-- */

const localStorageName = "meetingData";
const currentVersion = "1.1.1";
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
	userTimeZone: "",
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

	const latestVersion = findLatestVersion(parsedData);

	if (latestVersion) {
		parsedData[currentVersion] = migrateMeetingData(
			parsedData[latestVersion],
			meetingDataStructure,
		);
	} else {
		parsedData[currentVersion] = meetingDataStructure;

		localStorage.setItem(localStorageName, JSON.stringify(parsedData));
		console.warn(
			"Version mismatch: local storage version is old, initializing storage for current version",
		);
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
			console.warn("Error parsing localStorage:", error);
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

function parseVersion(version) {
	if (!/^\d+\.\d+\.\d+$/.test(version)) {
		return { major: 0, minor: 0, patch: 0 };
	}
	const [major, minor, patch] = version.split(".").map(Number);
	return { major, minor, patch };
}

function compareVersion(version) {
	const old = parseVersion(version);
	const current = parseVersion(currentVersion);

	if (old.major < current.major) {
		return "MAJOR";
	} else if (old.minor < current.minor) {
		return "MINOR";
	} else if (old.patch < current.patch) {
		return "PATCH";
	} else if (JSON.stringify(old) === JSON.stringify(current)) {
		return "SAME";
	}
	return "DEFAULT";
}

export function migrateMeetingData(oldData, newData) {
	const versionStatus = compareVersion(oldData.version);

	switch (versionStatus) {
		case "MAJOR":
			return newData;
		case "MINOR":
			return {
				...newData,
				...oldData,
				version: currentVersion,
			};
		case "PATCH":
			return {
				...oldData,
				version: currentVersion,
			};
		case "SAME":
			return oldData;
		default:
			return newData;
	}
}

function findLatestVersion(meetingData) {
	if (
		!meetingData ||
		typeof meetingData !== "object" ||
		Array.isArray(meetingData) ||
		Object.keys(meetingData).length === 0
	) {
		return null;
	}

	const latestVersion = Object.keys(meetingData).sort((a, b) => {
		const versionA = parseVersion(a);
		const versionB = parseVersion(b);
		return (
			versionB.major - versionA.major ||
			versionB.minor - versionA.minor ||
			versionB.patch - versionA.patch
		);
	})[0];

	return latestVersion;
}
