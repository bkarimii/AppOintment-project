import { createLogger, format, transports } from "winston";

import config from "./config.cjs";

const customFormat = format.printf(({ level, message, timestamp, stack }) => {
	return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
	format: format.combine(
		format.timestamp({ format: "MMM-DD HH:mm:ss" }),
		format.align(),
		format.colorize(),
		format.errors({ stack: true }),
		format.splat(),
		customFormat,
	),
	timestamp: true,
	level: config.logLevel,
	transports: [new transports.Console({ timestamp: true })],
});

if (!config.production) {
	logger.debug("configured with: %O", config);
}

export default logger;
