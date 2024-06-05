// CONSTANTS
export const BASE_API_URL = "https://mydailytasks.vercel.app";

// SELECTORS
export const containerTasks = document.querySelector(".container__tasks");
export const taskTableBodyEl = document.querySelector(".table__tbody");
export const containerInputsEl = document.querySelector(".footer__inputs");

export const inputs = document.querySelectorAll(".task-input");
export const nameInputEl = document.querySelector(".name__input");
export const taskInputEl = document.querySelector(".task__input");
export const prioritySelectEl = document.querySelector(".select__priority");

export const addButtonEl = document.querySelector(".footer__btn-add");
export const cancelButtonEl = document.querySelector(".footer__btn-cancel");

export const spinnerEL = document.querySelector(".spinner");

export const filterPriorityEl = document.querySelector(".filter__priority");
export const activeTasksLength = document.querySelector(
	".active__tasks-length",
);

export const modalOverlayEl = document.querySelector(".modal__bg-overlay");
export const modalContainerEl = document.querySelector(".modal__task");

export const modalInputNameEl = document.querySelector(".modal__input-name");
export const modalInputTaskEl = document.querySelector(".modal__input-task");
export const modalPriorityEl = document.querySelector(
	".modal__select-priority",
);

export const modalBtnCancelEl = document.querySelector(".modal__cancel-btn");
export const modalBtnUptadeEl = document.querySelector(".modal__update-btn");

// STATE
export const state = {
	tasksList: [],
	taskId: 0,
};

// HELPER / UTILITY FUNCTIONS
export const createMarkupOfTask = (task) => {
	// Define which class name
	let priorityClassName;
	if (task.priority.includes("High")) {
		priorityClassName = "high__priority";
	} else if (task.priority.includes("Middle")) {
		priorityClassName = "middle__priority";
	} else {
		priorityClassName = "low__priority";
	}

	// Add the new task to the UI
	const tasksMarkup = `
				<tr class="table__row">
							<td>${task.member}</td>
							<td>${task.task}</td>
							<td><span id="priority" class=${priorityClassName}>${task.priority}</span></td>
							<td>
								 <button class="task__edit-icon icon" data-task-id="${task.id}"><i class="fa-regular fa-pen-to-square"></i></button>
								 <button class="task__bin-icon icon" data-task-id="${task.id}"><i class="fa-solid fa-trash-can"></i></button>
								 </td>
							<td>${task.date}</td>
						</tr>
			`;

	taskTableBodyEl.insertAdjacentHTML("beforeend", tasksMarkup);
};

export const createdDate = () => {
	const today = new Date();
	const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	const options = {
		weekday: "short",
		month: "long",
		day: "numeric",
	};
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
	return formattedDate;
};
