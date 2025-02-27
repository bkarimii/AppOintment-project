/* eslint-disable no-unused-vars */
const processedInfoFakeData = [
	{
		meetingTime: "2024-11-03T10:00:00.000Z",
		destination: "London Euston",
		analys: [
			{
				city: {
					name: "Leah",
					station: "NRW",
					stationName: "Norwich",
				},
				spentTimeInMinutes: 320,
				spentTimeInHour: 5.333,
				departureTime: "04:40:00.000",
				arrivalTime: "09:39:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Sara",
					station: "CME",
					stationName: "Combe (Oxon)",
				},
				spentTimeInMinutes: 194,
				spentTimeInHour: 3.233,
				departureTime: "07:01:43.000",
				arrivalTime: "09:20:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Ali",
					station: "OXF",
					stationName: "Oxford",
				},
				spentTimeInMinutes: 140,
				spentTimeInHour: 2.333,
				departureTime: "07:41:00.000",
				arrivalTime: "09:20:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Rajesh",
					station: "AGV",
					stationName: "Abergavenny",
				},
				spentTimeInMinutes: 634,
				spentTimeInHour: 10.567,
				departureTime: "23:38:00.000",
				arrivalTime: "04:20:00.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "David",
					station: "SHF",
					stationName: "Sheffield",
				},
				spentTimeInMinutes: 309,
				spentTimeInHour: 5.15,
				departureTime: "04:55:00.000",
				arrivalTime: "09:29:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Toba",
					station: "LDS",
					stationName: "Leeds",
				},
				spentTimeInMinutes: 570,
				spentTimeInHour: 9.5,
				departureTime: "00:34:13.000",
				arrivalTime: "07:53:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Anna",
					station: "SWA",
					stationName: "Swansea",
				},
				spentTimeInMinutes: 382,
				spentTimeInHour: 6.367,
				departureTime: "03:38:00.000",
				arrivalTime: "09:23:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Miya",
					station: "GLC",
					stationName: "Glasgow Central",
				},
				spentTimeInMinutes: 623,
				spentTimeInHour: 10.383,
				departureTime: "23:41:00.000",
				arrivalTime: "09:29:12.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "Mariana",
					station: "BCE",
					stationName: "Bracknell",
				},
				spentTimeInMinutes: 106,
				spentTimeInHour: 1.767,
				departureTime: "08:14:00.000",
				arrivalTime: "09:36:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
		],
	},
	{
		meetingTime: "2024-11-03T10:20:00.000Z",
		destination: "London Euston",
		analys: [
			{
				city: {
					name: "Leah",
					station: "NRW",
					stationName: "Norwich",
				},
				spentTimeInMinutes: 340,
				spentTimeInHour: 5.667,
				departureTime: "04:40:00.000",
				arrivalTime: "09:39:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Sara",
					station: "CME",
					stationName: "Combe (Oxon)",
				},
				spentTimeInMinutes: 191,
				spentTimeInHour: 3.183,
				departureTime: "07:31:43.000",
				arrivalTime: "09:54:21.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Ali",
					station: "OXF",
					stationName: "Oxford",
				},
				spentTimeInMinutes: 136,
				spentTimeInHour: 2.267,
				departureTime: "08:12:00.000",
				arrivalTime: "09:54:21.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Rajesh",
					station: "AGV",
					stationName: "Abergavenny",
				},
				spentTimeInMinutes: 654,
				spentTimeInHour: 10.9,
				departureTime: "23:38:00.000",
				arrivalTime: "04:20:00.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "David",
					station: "SHF",
					stationName: "Sheffield",
				},
				spentTimeInMinutes: 329,
				spentTimeInHour: 5.483,
				departureTime: "04:55:00.000",
				arrivalTime: "09:29:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Toba",
					station: "LDS",
					stationName: "Leeds",
				},
				spentTimeInMinutes: 590,
				spentTimeInHour: 9.833,
				departureTime: "00:34:13.000",
				arrivalTime: "07:53:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Anna",
					station: "SWA",
					stationName: "Swansea",
				},
				spentTimeInMinutes: 402,
				spentTimeInHour: 6.7,
				departureTime: "03:38:00.000",
				arrivalTime: "09:23:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Miya",
					station: "GLC",
					stationName: "Glasgow Central",
				},
				spentTimeInMinutes: 643,
				spentTimeInHour: 10.717,
				departureTime: "23:41:00.000",
				arrivalTime: "09:29:12.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "Mariana",
					station: "BCE",
					stationName: "Bracknell",
				},
				spentTimeInMinutes: 96,
				spentTimeInHour: 1.6,
				departureTime: "08:44:00.000",
				arrivalTime: "10:06:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
		],
	},
	{
		meetingTime: "2024-11-03T10:40:00.000Z",
		destination: "London Euston",
		analys: [
			{
				city: {
					name: "Leah",
					station: "NRW",
					stationName: "Norwich",
				},
				spentTimeInMinutes: 215,
				spentTimeInHour: 3.583,
				departureTime: "07:05:00.000",
				arrivalTime: "10:24:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Sara",
					station: "CME",
					stationName: "Combe (Oxon)",
				},
				spentTimeInMinutes: 181,
				spentTimeInHour: 3.017,
				departureTime: "08:01:43.000",
				arrivalTime: "10:29:32.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Ali",
					station: "OXF",
					stationName: "Oxford",
				},
				spentTimeInMinutes: 127,
				spentTimeInHour: 2.117,
				departureTime: "08:41:00.000",
				arrivalTime: "10:29:32.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Rajesh",
					station: "AGV",
					stationName: "Abergavenny",
				},
				spentTimeInMinutes: 674,
				spentTimeInHour: 11.233,
				departureTime: "23:38:00.000",
				arrivalTime: "04:20:00.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "David",
					station: "SHF",
					stationName: "Sheffield",
				},
				spentTimeInMinutes: 239,
				spentTimeInHour: 3.983,
				departureTime: "06:45:00.000",
				arrivalTime: "10:33:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Toba",
					station: "LDS",
					stationName: "Leeds",
				},
				spentTimeInMinutes: 156,
				spentTimeInHour: 2.6,
				departureTime: "08:05:00.000",
				arrivalTime: "10:33:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Anna",
					station: "SWA",
					stationName: "Swansea",
				},
				spentTimeInMinutes: 422,
				spentTimeInHour: 7.033,
				departureTime: "03:38:00.000",
				arrivalTime: "09:23:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Miya",
					station: "GLC",
					stationName: "Glasgow Central",
				},
				spentTimeInMinutes: 663,
				spentTimeInHour: 11.05,
				departureTime: "23:41:00.000",
				arrivalTime: "09:29:12.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "Mariana",
					station: "BCE",
					stationName: "Bracknell",
				},
				spentTimeInMinutes: 86,
				spentTimeInHour: 1.433,
				departureTime: "09:14:00.000",
				arrivalTime: "10:36:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
		],
	},
	{
		meetingTime: "2024-11-03T11:00:00.000Z",
		destination: "London Euston",
		analys: [
			{
				city: {
					name: "Leah",
					station: "NRW",
					stationName: "Norwich",
				},
				spentTimeInMinutes: 235,
				spentTimeInHour: 3.917,
				departureTime: "07:05:00.000",
				arrivalTime: "10:24:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Sara",
					station: "CME",
					stationName: "Combe (Oxon)",
				},
				spentTimeInMinutes: 201,
				spentTimeInHour: 3.35,
				departureTime: "08:01:43.000",
				arrivalTime: "10:29:32.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Ali",
					station: "OXF",
					stationName: "Oxford",
				},
				spentTimeInMinutes: 147,
				spentTimeInHour: 2.45,
				departureTime: "08:41:00.000",
				arrivalTime: "10:29:32.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Rajesh",
					station: "AGV",
					stationName: "Abergavenny",
				},
				spentTimeInMinutes: 694,
				spentTimeInHour: 11.567,
				departureTime: "23:38:00.000",
				arrivalTime: "04:20:00.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "David",
					station: "SHF",
					stationName: "Sheffield",
				},
				spentTimeInMinutes: 144,
				spentTimeInHour: 2.4,
				departureTime: "08:36:00.000",
				arrivalTime: "10:57:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Toba",
					station: "LDS",
					stationName: "Leeds",
				},
				spentTimeInMinutes: 164,
				spentTimeInHour: 2.733,
				departureTime: "08:17:00.000",
				arrivalTime: "10:57:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Anna",
					station: "SWA",
					stationName: "Swansea",
				},
				spentTimeInMinutes: 442,
				spentTimeInHour: 7.367,
				departureTime: "03:38:00.000",
				arrivalTime: "09:23:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Miya",
					station: "GLC",
					stationName: "Glasgow Central",
				},
				spentTimeInMinutes: 683,
				spentTimeInHour: 11.383,
				departureTime: "23:41:00.000",
				arrivalTime: "09:29:12.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "Mariana",
					station: "BCE",
					stationName: "Bracknell",
				},
				spentTimeInMinutes: 106,
				spentTimeInHour: 1.767,
				departureTime: "09:14:00.000",
				arrivalTime: "10:36:12.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
		],
	},
	{
		meetingTime: "2024-11-03T10:00:00.000Z",
		destination: "Kent House",
		analys: [
			{
				city: {
					name: "Leah",
					station: "NRW",
					stationName: "Norwich",
				},
				spentTimeInMinutes: 385,
				spentTimeInHour: 6.417,
				departureTime: "03:40:00.000",
				arrivalTime: "08:51:32.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Sara",
					station: "CME",
					stationName: "Combe (Oxon)",
				},
				spentTimeInMinutes: 544,
				spentTimeInHour: 9.067,
				departureTime: "01:16:43.000",
				arrivalTime: "04:58:35.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Ali",
					station: "OXF",
					stationName: "Oxford",
				},
				spentTimeInMinutes: 206,
				spentTimeInHour: 3.433,
				departureTime: "06:45:00.000",
				arrivalTime: "09:32:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Rajesh",
					station: "AGV",
					stationName: "Abergavenny",
				},
				spentTimeInMinutes: 627,
				spentTimeInHour: 10.45,
				departureTime: "23:38:00.000",
				arrivalTime: "04:58:35.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "David",
					station: "SHF",
					stationName: "Sheffield",
				},
				spentTimeInMinutes: 413,
				spentTimeInHour: 6.883,
				departureTime: "03:25:00.000",
				arrivalTime: "08:17:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Toba",
					station: "LDS",
					stationName: "Leeds",
				},
				spentTimeInMinutes: 584,
				spentTimeInHour: 9.733,
				departureTime: "00:34:13.000",
				arrivalTime: "08:17:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Anna",
					station: "SWA",
					stationName: "Swansea",
				},
				spentTimeInMinutes: 480,
				spentTimeInHour: 8,
				departureTime: "02:08:00.000",
				arrivalTime: "08:09:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Miya",
					station: "GLC",
					stationName: "Glasgow Central",
				},
				spentTimeInMinutes: 650,
				spentTimeInHour: 10.833,
				departureTime: "23:15:00.000",
				arrivalTime: "08:32:00.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "Mariana",
					station: "BCE",
					stationName: "Bracknell",
				},
				spentTimeInMinutes: 189,
				spentTimeInHour: 3.15,
				departureTime: "06:58:00.000",
				arrivalTime: "09:47:19.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
		],
	},
	{
		meetingTime: "2024-11-03T10:20:00.000Z",
		destination: "Kent House",
		analys: [
			{
				city: {
					name: "Leah",
					station: "NRW",
					stationName: "Norwich",
				},
				spentTimeInMinutes: 348,
				spentTimeInHour: 5.8,
				departureTime: "04:40:00.000",
				arrivalTime: "10:04:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Sara",
					station: "CME",
					stationName: "Combe (Oxon)",
				},
				spentTimeInMinutes: 228,
				spentTimeInHour: 3.8,
				departureTime: "07:01:43.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Ali",
					station: "OXF",
					stationName: "Oxford",
				},
				spentTimeInMinutes: 174,
				spentTimeInHour: 2.9,
				departureTime: "07:41:00.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Rajesh",
					station: "AGV",
					stationName: "Abergavenny",
				},
				spentTimeInMinutes: 647,
				spentTimeInHour: 10.783,
				departureTime: "23:38:00.000",
				arrivalTime: "04:58:35.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "David",
					station: "SHF",
					stationName: "Sheffield",
				},
				spentTimeInMinutes: 343,
				spentTimeInHour: 5.717,
				departureTime: "04:55:00.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Toba",
					station: "LDS",
					stationName: "Leeds",
				},
				spentTimeInMinutes: 604,
				spentTimeInHour: 10.067,
				departureTime: "00:34:13.000",
				arrivalTime: "08:17:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Anna",
					station: "SWA",
					stationName: "Swansea",
				},
				spentTimeInMinutes: 410,
				spentTimeInHour: 6.833,
				departureTime: "03:38:00.000",
				arrivalTime: "10:04:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Miya",
					station: "GLC",
					stationName: "Glasgow Central",
				},
				spentTimeInMinutes: 657,
				spentTimeInHour: 10.95,
				departureTime: "23:41:00.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "Mariana",
					station: "BCE",
					stationName: "Bracknell",
				},
				spentTimeInMinutes: 134,
				spentTimeInHour: 2.233,
				departureTime: "08:14:00.000",
				arrivalTime: "10:00:30.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
		],
	},
	{
		meetingTime: "2024-11-03T10:40:00.000Z",
		destination: "Kent House",
		analys: [
			{
				city: {
					name: "Leah",
					station: "NRW",
					stationName: "Norwich",
				},
				spentTimeInMinutes: 368,
				spentTimeInHour: 6.133,
				departureTime: "04:40:00.000",
				arrivalTime: "10:04:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Sara",
					station: "CME",
					stationName: "Combe (Oxon)",
				},
				spentTimeInMinutes: 248,
				spentTimeInHour: 4.133,
				departureTime: "07:01:43.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Ali",
					station: "OXF",
					stationName: "Oxford",
				},
				spentTimeInMinutes: 194,
				spentTimeInHour: 3.233,
				departureTime: "07:41:00.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Rajesh",
					station: "AGV",
					stationName: "Abergavenny",
				},
				spentTimeInMinutes: 667,
				spentTimeInHour: 11.117,
				departureTime: "23:38:00.000",
				arrivalTime: "04:58:35.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "David",
					station: "SHF",
					stationName: "Sheffield",
				},
				spentTimeInMinutes: 363,
				spentTimeInHour: 6.05,
				departureTime: "04:55:00.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Toba",
					station: "LDS",
					stationName: "Leeds",
				},
				spentTimeInMinutes: 624,
				spentTimeInHour: 10.4,
				departureTime: "00:34:13.000",
				arrivalTime: "08:17:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Anna",
					station: "SWA",
					stationName: "Swansea",
				},
				spentTimeInMinutes: 430,
				spentTimeInHour: 7.167,
				departureTime: "03:38:00.000",
				arrivalTime: "10:04:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Miya",
					station: "GLC",
					stationName: "Glasgow Central",
				},
				spentTimeInMinutes: 677,
				spentTimeInHour: 11.283,
				departureTime: "23:41:00.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "Mariana",
					station: "BCE",
					stationName: "Bracknell",
				},
				spentTimeInMinutes: 124,
				spentTimeInHour: 2.067,
				departureTime: "08:44:00.000",
				arrivalTime: "10:30:30.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
		],
	},
	{
		meetingTime: "2024-11-03T11:00:00.000Z",
		destination: "Kent House",
		analys: [
			{
				city: {
					name: "Leah",
					station: "NRW",
					stationName: "Norwich",
				},
				spentTimeInMinutes: 242,
				spentTimeInHour: 4.033,
				departureTime: "07:05:00.000",
				arrivalTime: "10:48:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Sara",
					station: "CME",
					stationName: "Combe (Oxon)",
				},
				spentTimeInMinutes: 226,
				spentTimeInHour: 3.767,
				departureTime: "07:31:43.000",
				arrivalTime: "10:54:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Ali",
					station: "OXF",
					stationName: "Oxford",
				},
				spentTimeInMinutes: 171,
				spentTimeInHour: 2.85,
				departureTime: "08:12:00.000",
				arrivalTime: "10:54:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Rajesh",
					station: "AGV",
					stationName: "Abergavenny",
				},
				spentTimeInMinutes: 687,
				spentTimeInHour: 11.45,
				departureTime: "23:38:00.000",
				arrivalTime: "04:58:35.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "David",
					station: "SHF",
					stationName: "Sheffield",
				},
				spentTimeInMinutes: 383,
				spentTimeInHour: 6.383,
				departureTime: "04:55:00.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Toba",
					station: "LDS",
					stationName: "Leeds",
				},
				spentTimeInMinutes: 644,
				spentTimeInHour: 10.733,
				departureTime: "00:34:13.000",
				arrivalTime: "08:17:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Anna",
					station: "SWA",
					stationName: "Swansea",
				},
				spentTimeInMinutes: 450,
				spentTimeInHour: 7.5,
				departureTime: "03:38:00.000",
				arrivalTime: "10:04:00.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
			{
				city: {
					name: "Miya",
					station: "GLC",
					stationName: "Glasgow Central",
				},
				spentTimeInMinutes: 697,
				spentTimeInHour: 11.617,
				departureTime: "23:41:00.000",
				arrivalTime: "09:47:00.000",
				departureDate: "2024-11-02",
				arrivalDate: "2024-11-03",
				durationInDays: 86400000,
			},
			{
				city: {
					name: "Mariana",
					station: "BCE",
					stationName: "Bracknell",
				},
				spentTimeInMinutes: 144,
				spentTimeInHour: 2.4,
				departureTime: "08:44:00.000",
				arrivalTime: "10:30:30.000",
				departureDate: "2024-11-03",
				arrivalDate: "2024-11-03",
				durationInDays: 0,
			},
		],
	},
];
