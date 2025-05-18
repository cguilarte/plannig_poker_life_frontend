/* eslint-disable react-hooks/rules-of-hooks */
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_PALNNING_JIRA, CREATE_PALNNING_MANUAL, DELETE_PLANNING, GET_ACCESS_TOKEN, GET_LIST_BOARD_JIRA, GET_LIST_PROJECT_JIRA, GET_LIST_SPRINT_JIRA, GET_LIST_TASK_JIRA, GET_PLANNING_ID, GET_RESOURCES_JIRA, LIST_GUEST_TEAM_ID, LIST_PPLANNING, LIST_TEAM, UPDATE_PLANNING } from "./graphql";


export class repositoryPlanning {

	static createPlanningManual(onSuccess: (data: any) => void) {
		const [createPlaningManual, { loading, error }] = useMutation(CREATE_PALNNING_MANUAL, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { createPlaningManual, loading, error }
	}

	static createPlanningJira(onSuccess: (data: any) => void) {
		const [createPlaningJira, { loading, error }] = useMutation(CREATE_PALNNING_JIRA, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { createPlaningJira, loading, error }
	}

	static updatePlanning(onSuccess: (data: any) => void) {
		const [udpateP, { loading, error }] = useMutation(UPDATE_PLANNING, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { udpateP, loading, error }
	}

	static deletePlanning(onSuccess: (data: any) => void) {
		const [deletePlanning, { loading }] = useMutation(DELETE_PLANNING, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				LIST_PPLANNING
			],
		});

		return { deletePlanning, loading }
	}

	static getPlannings(filter: any, page: number, itemsPerPage: number = 10) {
		const { data: result, loading, fetchMore, refetch } = useQuery(LIST_PPLANNING, {
			variables: {
				filter,
				page: page,
				itemsPerPage,
			},
			fetchPolicy: 'no-cache'
		});
		return { data: result?.listPlanning, loading, fetchMore, refetch };
	}

	static detailPlanningId() {
		const [getPlanningId, { data, loading }] = useLazyQuery(GET_PLANNING_ID, {
			fetchPolicy: 'no-cache',
		});

		return { getPlanningId, data, loading };
	}

	static getTeams() {
		const { data, loading } = useQuery(LIST_TEAM);
		let result = [];

		if (data?.listTeams.length > 0) {
			result = data.listTeams
		}

		return { result, loading };
	}

	static getAccessToken() {
		const [getQueryAccessToken, { data, loading }] = useLazyQuery(GET_ACCESS_TOKEN, {
			fetchPolicy: 'no-cache',
		});

		return { getQueryAccessToken, data, loading };
	}

	static getResourcesJira(accessToken: string | null) {
		const { data, loading } = useQuery(GET_RESOURCES_JIRA, {
			fetchPolicy: 'no-cache',
			variables: {
				accessToken
			}
		});
		let result = [];

		if (data?.getResources.length > 0) {
			result = data.getResources
		}

		return { result, loading };
	}

	static getProjectsJira() {
		const [getQueryProjects, { data, loading }] = useLazyQuery(GET_LIST_PROJECT_JIRA, {
			fetchPolicy: 'no-cache',
		});

		let result = [];

		if (data) {
			result = data.getProjectsJira;
		}

		return { getQueryProjects, result, loading };
	}

	static getBoardsJira() {
		const [getQueryBoards, { data, loading }] = useLazyQuery(GET_LIST_BOARD_JIRA, {
			fetchPolicy: 'no-cache',
		});

		let result = [];

		if (data) {
			result = data.getBoardsJira;
		}

		return { getQueryBoards, result, loading };
	}

	static getSprintsJira() {
		const [getQuerySprints, { data, loading }] = useLazyQuery(GET_LIST_SPRINT_JIRA, {
			fetchPolicy: 'no-cache',
		});

		let result = [];

		if (data) {
			result = data.getSprintsJira;
		}

		return { getQuerySprints, result, loading };
	}

	static getTaskJira() {
		const [getQueryTask, { data, loading }] = useLazyQuery(GET_LIST_TASK_JIRA, {
			fetchPolicy: 'no-cache',
		});

		let result = [];

		if (data) {
			result = data.getBoardsIssuesJira;
		}

		return { getQueryTask, result, loading };
	}

	static listGuestTeamId() {
		const [getGuestTeamId, { data, loading }] = useLazyQuery(LIST_GUEST_TEAM_ID, {
			fetchPolicy: 'no-cache',
		});

		let result = [];

		if (data) {
			result = data.listGuest.data;
		}

		return { getGuestTeamId, result, loading };
	}




}