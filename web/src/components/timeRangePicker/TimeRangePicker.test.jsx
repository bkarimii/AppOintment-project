import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { vi } from "vitest";

import TimeRangePicker from "./TimeRangePicker";

describe("TimeRangePicker Component", () => {
	const handleMeetingChangeMock = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders the TimeRangePicker component", () => {
		render(
			<TimeRangePicker
				earliestStartTime="09:00"
				latestStartTime="17:00"
				handleMeetingChange={handleMeetingChangeMock}
			/>,
		);

		expect(screen.getByLabelText("Earliest Start Time")).toBeInTheDocument();
		expect(screen.getByLabelText("Latest Start Time")).toBeInTheDocument();
		expect(screen.getByText("to")).toBeInTheDocument();
	});

	it("displays the correct initial values", () => {
		render(
			<TimeRangePicker
				earliestStartTime="09:00"
				latestStartTime="17:00"
				handleMeetingChange={handleMeetingChangeMock}
			/>,
		);

		const earliestInput = screen.getByLabelText("Earliest Start Time");
		const latestInput = screen.getByLabelText("Latest Start Time");

		expect(earliestInput).toHaveValue("09:00");
		expect(latestInput).toHaveValue("17:00");
	});

	it("calls handleMeetingChange with correct arguments when earliestStartTime changes", () => {
		render(
			<TimeRangePicker
				earliestStartTime="09:00"
				latestStartTime="17:00"
				handleMeetingChange={handleMeetingChangeMock}
			/>,
		);

		const earliestInput = screen.getByLabelText("Earliest Start Time");
		fireEvent.change(earliestInput, { target: { value: "10:00" } });

		expect(handleMeetingChangeMock).toHaveBeenCalledWith(
			"earliestStartTime",
			"10:00",
		);
	});

	it("calls handleMeetingChange with correct arguments when latestStartTime changes", () => {
		render(
			<TimeRangePicker
				earliestStartTime="09:00"
				latestStartTime="17:00"
				handleMeetingChange={handleMeetingChangeMock}
			/>,
		);

		const latestInput = screen.getByLabelText("Latest Start Time");
		fireEvent.change(latestInput, { target: { value: "18:00" } });

		expect(handleMeetingChangeMock).toHaveBeenCalledWith(
			"latestStartTime",
			"18:00",
		);
	});

	it("latestStartTime input respects the min attribute based on earliestStartTime", () => {
		render(
			<TimeRangePicker
				earliestStartTime="09:00"
				latestStartTime="17:00"
				handleMeetingChange={handleMeetingChangeMock}
			/>,
		);

		const latestInput = screen.getByLabelText("Latest Start Time");

		expect(latestInput).toHaveAttribute("min", "09:00");
	});
});
