import {
	inputs,
	createdDate,
	nameInputEl,
	taskInputEl,
	addButtonEl,
	BASE_API_URL,
	containerTasks,
	cancelButtonEl,
	activeTasksLength,
	prioritySelectEl,
	containerInputsEl,
	createMarkupOfTask,
} from "../common.js";

// HELPER FUNCTIONS
const addOrRemoveActiveClass = (whichone) => {
	if (whichone === "add") {
		containerInputsEl.classList.add("footer__inputs-active");
		return;
	}
	containerInputsEl.classList.remove("footer__inputs-active");
};

const changingBtnText = (btn) => {
	if (btn === "add task") {
		const saveBtnText = btn.replace("add task", "save task");
		addButtonEl.textContent = saveBtnText;
	} else {
		addButtonEl.textContent = "add task";
		// Remove Active Class
		addOrRemoveActiveClass("remove");
	}

	if (btn === "save task") {
		const saveBtnText = btn.replace("save task", "add task");
		addButtonEl.textContent = saveBtnText;
	}
};

const changeBorderColor = (whichone) => {
	inputs.forEach((input) => input.classList.add(whichone));
};

const clickCancelBtnHandler = () => {
	// After adding task, removing inputs value
	inputs.forEach((input) => {
		return (input.value = "");
	});

	// Remove Active Class
	addOrRemoveActiveClass("remove");

	// Change Btn text and some logic
	const addBtnText = addButtonEl.textContent;

	changingBtnText(addBtnText);
};

const clickAddBtnHandler = async () => {
	// Add Active Class
	addOrRemoveActiveClass("add");

	// Change Btn text and some logic
	const addBtnText = addButtonEl.textContent;
	changingBtnText(addBtnText);

	// Get inputs value
	const nameInputElValue = nameInputEl.value;
	const taskInputElValue = taskInputEl.value;
	const prioritySelectElValue = prioritySelectEl.value;

	if (addBtnText === "save task") {
		// Update tasks length
		activeTasksLength.textContent = parseInt(activeTasksLength.textContent) + 1;

		// After adding task, removing inputs value
		inputs.forEach((input) => {
			return (input.value = "");
		});

		// Validation of inputs
		if (nameInputElValue === "" || taskInputElValue === "") {
			changeBorderColor("input__invalid");

			// Add Active Class
			addOrRemoveActiveClass("add");

			addButtonEl.textContent = "save task";
			return;
		} else {
			changeBorderColor("input__valid");
		}

		// Create new object
		const newTask = {
			id: Date.now(),
			member: nameInputElValue,
			task: taskInputElValue,
			priority: prioritySelectElValue,
			date: createdDate(),
			createdAt: new Date(),
		};

		// Send task to database
		try {
			const res = await fetch(`${BASE_API_URL}/todos`, {
				method: "POST",
				body: JSON.stringify(newTask),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				console.log("Something went wrong!");
				return;
			}

			createMarkupOfTask(newTask);

			// Going to bottom to show new task
			containerTasks.scrollTo({
				top: containerTasks.scrollHeight,
				behavior: "smooth",
			});
		} catch (error) {
			console.log(error.message);
		}
	}
};

cancelButtonEl.addEventListener("click", clickCancelBtnHandler);
addButtonEl.addEventListener("click", clickAddBtnHandler);
