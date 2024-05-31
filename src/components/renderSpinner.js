import { spinnerEL } from "../common.js";

const renderSpinner = (whichone) => {
	if (whichone === "add") {
		spinnerEL.classList.add("spinner__visible");
	} else {
		spinnerEL.classList.remove("spinner__visible");
	}
};

export default renderSpinner;
