import { IIssues } from "@/app/plannings/core/domain/interfaces";
import { STATUS_TASK } from "@/app/plannings/core/domain/planningData";

export const TOKEN_USER_PLANNING = `_PLANNING_ACCESS_TOKEN_USER`;

export const setUserPlanning = (token: string) => {
	localStorage.setItem(TOKEN_USER_PLANNING, token);
};

export const getUserPlanning = () => localStorage.getItem(TOKEN_USER_PLANNING);

export const deleteUserPlanning = () => {
	localStorage.removeItem(TOKEN_USER_PLANNING);
};

export const EMOJI_MAP: any = ['💖', '👍🏽', '🎉', '👏🏽', '😂', '😮', '😢', '🤔', '👎🏽']

export const SYSTEM_CARD: any = {
	LINEAR: [
		{ label: '1', value: 1 },
		{ label: '2', value: 2 },
		{ label: '3', value: 3 },
		{ label: '4', value: 4 },
		{ label: '5', value: 5 },
		{ label: '6', value: 6 },
		{ label: '7', value: 7 },
		{ label: '8', value: 8 },
		{ label: '9', value: 9 },
		{ label: '10', value: 10 },
		{ label: '☕︎', value: 0 }
	],
	FIBONACCI: [
		{ label: '0', value: 0 },
		{ label: '1', value: 1 },
		{ label: '2', value: 2 },
		{ label: '3', value: 3 },
		{ label: '5', value: 5 },
		{ label: '8', value: 8 },
		{ label: '13', value: 13 },
		{ label: '21', value: 21 },
		{ label: '34', value: 34 },
		{ label: '55', value: 55 },
		{ label: '89', value: 89 },
		{ label: '☕︎', value: 0 }
	]
}

export const tabTaksCount = (task: IIssues[]) => {

	const taskPendingCount = task.reduce((accumulator: number, currentValue: IIssues) => {
		if (currentValue.statusStimate === STATUS_TASK.PENDING) accumulator += 1
		return accumulator;
	}, 0);

	const taskEstimateCount = task.reduce((accumulator: number, currentValue: IIssues) => {
		if (currentValue.statusStimate === STATUS_TASK.ESTIMATE) accumulator += 1
		return accumulator;
	}, 0)

	const listPending: IIssues[] = task.filter((row: IIssues) => row.statusStimate === STATUS_TASK.PENDING);
	const listEstimate: IIssues[] = task.filter((row: IIssues) => row.statusStimate === STATUS_TASK.ESTIMATE);

	const porcentaje = (taskEstimateCount * 100) / task.length;

	return { taskPending: listPending, taskEstimate: listEstimate, taskPendingCount, taskEstimateCount, porcentaje }
}