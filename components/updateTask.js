import {
	state,
	BASE_API_URL,
	taskTableBodyEl,
	modalOverlayEl,
	modalContainerEl,
	modalInputNameEl,
	modalPriorityEl,
	modalInputTaskEl,
	modalBtnCancelEl,
	modalBtnUptadeEl,
} from "../common.js";
import renderSpinner from "./renderSpinner.js";

// HELPER FUNCTION
const addOrRemoveClassName = (whichone) => {
	if (whichone === "add") {
		modalOverlayEl.classList.add("modal__bg-overlay-active");
		modalContainerEl.classList.add("modal__task-active");
		return;
	}
	modalOverlayEl.classList.remove("modal__bg-overlay-active");
	modalContainerEl.classList.remove("modal__task-active");
};

// Remove selected task
taskTableBodyEl.addEventListener("click", async (event) => {
	if (event.target.closest(".task__edit-icon")) {
		// Get current task id
		state.taskId = event.target.closest(".task__edit-icon").dataset.taskId;

		// Add active class
		addOrRemoveClassName("add");
	}
});

const clickModalCancelBtn = () => {
	// Remove active class
	addOrRemoveClassName("remove");
};

const clickModalUpdateBtn = async () => {
	// Add Spinner
	renderSpinner("add");

	// Remove active class
	addOrRemoveClassName("remove");

	// Get inputs value
	const modalInputNameValue = modalInputNameEl.value;
	const modalInputTaskValue = modalInputTaskEl.value;
	const modalSelectPriorityValue = modalPriorityEl.value;
	const taskId = state.taskId;

	// Collect the updated task details
	const updatedTask = {
		id: +taskId,
		member: modalInputNameValue,
		task: modalInputTaskValue,
		priority: modalSelectPriorityValue,
		timer: modalSelectTimeValue,
	};

	// PUT method
	try {
		const res = await fetch(`${BASE_API_URL}/todos`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTask),
		});
		if (!res.ok) {
			throw new Error("Problem fetching tasks");
		}

		// Remove Spinner
		renderSpinner("remove");

		// Reload page
		window.location.reload();
	} catch (error) {
		console.log(error.message);
	}
};

modalBtnCancelEl.addEventListener("click", clickModalCancelBtn);
modalBtnUptadeEl.addEventListener("click", clickModalUpdateBtn);
