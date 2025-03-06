const DeleteButton = (index, deleteFn, attendee) => {
	return (
		<>
			<button
				onClick={attendee ? deleteFn(index) : (e) => deleteFn(e, index)}
				className="delete-button"
				aria-label={
					attendee
						? `Remove ${attendee.name} from attendee list`
						: `Delete station ${index + 1}`
				}
				type="button"
				name={attendee ? "delete-attendee" : "delete-station"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					viewBox="0 0 64 64"
				>
					<rect x="16" y="22" width="32" height="34" fill="red" rx="4" />
					<rect x="12" y="16" width="40" height="5" fill="black" rx="2" />
					<rect x="24" y="11" width="16" height="6" fill="inherit" rx="2" />
					<rect x="22" y="27" width="4" height="24" fill="white" />
					<rect x="30" y="27" width="4" height="24" fill="white" />
					<rect x="38" y="27" width="4" height="24" fill="white" />
				</svg>
			</button>
		</>
	);
};

export default DeleteButton;
