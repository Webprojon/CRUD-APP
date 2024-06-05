import { BASE_API_URL, timerSelectEl } from "../common.js";

const renderTimer = async () => {
	try {
		const res = await fetch(`${BASE_API_URL}/todos`);
		if (!res.ok) {
			throw new Error("Problem fetching tasks");
		}

		const data = await res.json();
		data.forEach((item) => {
			const taskTime = setInterval(() => {
				const decreasingNumber = --item.timer;
				//console.log(decreasingNumber);
				//taskTimerEl.innerHTML = decreasingNumber;

				if (item.timer == 0) {
					//console.log("all finished");
					clearInterval(taskTime);
				}
			}, 1000);
		});
	} catch (error) {
		console.log(error.message);
	}
};
renderTimer();
