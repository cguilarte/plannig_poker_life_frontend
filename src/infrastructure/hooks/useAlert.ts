import { toast } from "react-toastify";

const useAlert = () => {


	const alertError = (message: string) => {
		toast.error(message, {
		    duration: 6000,
		});
	};
	const alertSuccess = (message: string) => {
		toast.success(message, optionMessage as any);
	};

	const alertInfo = (message: string) => {
		toast.info(message, optionMessage as any);
	};

	return { alertError, alertSuccess, alertInfo };
};

export default useAlert;
