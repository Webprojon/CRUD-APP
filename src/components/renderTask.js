import {
	state,
	BASE_API_URL,
	taskTableBodyEl,
	filterPriorityEL,
	activeTasksLength,
	createMarkupOfTask,
} from "../common.js";
import renderSpinner from "./renderSpinner.js";

// VARIABLES
let FILTEREDTASKS;

filterPriorityEL.addEventListener("change", (event) => {
	state.priorityValue = event.target.value;
});

const renderTasks = async () => {
	// Add Spinner
	renderSpinner("add");

	try {
		const res = await fetch(`${BASE_API_URL}/todos`);
		if (!res.ok) {
			throw new Error("Problem fetching tasks");
		}

		const data = await res.json();

		// Assign to state
		const tasks = (state.tasksList = data);

		// Filter data besed on selecter
		switch (state.priorityValue) {
			case "High priority":
				FILTEREDTASKS = tasks.filter(
					(task) => task.priority === "High priority",
				);
				break;
			case "Middle priority":
				FILTEREDTASKS = tasks.filter(
					(task) => task.priority === "Middle priority",
				);
				break;
			case "Low priority":
				FILTEREDTASKS = tasks.filter(
					(task) => task.priority === "Low priority",
				);
				break;
			default:
				FILTEREDTASKS = tasks;
		}

		//console.log(filterPriorityEL.value);
		console.log(tasks);

		// Display active tasks length
		activeTasksLength.textContent = FILTEREDTASKS.length;

		// Remove Spinner
		renderSpinner("remove");

		FILTEREDTASKS.forEach((task) => {
			createMarkupOfTask(task);
		});
	} catch (error) {
		console.log(error.message);
	}
};
renderTasks();

// Remove selected task
taskTableBodyEl.addEventListener("click", async (event) => {
	if (event.target.closest(".task__bin-icon")) {
		// Add Spinner
		renderSpinner("add");

		// Get current task id
		const taskId = event.target.closest(".task__bin-icon").dataset.taskId;

		// Delete method
		try {
			const res = await fetch(`${BASE_API_URL}/todos/${+taskId}`, {
				method: "DELETE",
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
	}
});
