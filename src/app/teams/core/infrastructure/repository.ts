/* eslint-disable react-hooks/rules-of-hooks */
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ADD_INVITE_GUEST_TEAM, CREATE_TEAM, DELETE_GUEST_TEAM, DELETE_TEAM, DETAIL_TEAM, GET_TEAMS, LIST_GUEST_TEAM, UPDATE_GUEST, UPDATE_TEAM } from "./graphql";

export class repositoryTeam {

	static createTeam(onSuccess: (data: any) => void) {
		const [modelCreate, { loading, error }] = useMutation(CREATE_TEAM, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				GET_TEAMS
			],
		});

		return { modelCreate, loading, error }
	}

	static updateGuest(onSuccess: (data: any) => void) {
		const [modelUpdateGuest, { loading, error }] = useMutation(UPDATE_GUEST, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});
		return { modelUpdateGuest, loading, error }
	}

	static addInviteGuest(onSuccess: (data: any) => void) {
		const [modelAddInviteGuest, { loading, error }] = useMutation(ADD_INVITE_GUEST_TEAM, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				GET_TEAMS,
				LIST_GUEST_TEAM
			],
		});

		return { modelAddInviteGuest, loading, error }
	}


	static updateTeam(onSuccess: (data: any) => void) {
		const [modelUpdate, { loading, error }] = useMutation(UPDATE_TEAM, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				GET_TEAMS
			],
		});
		return { modelUpdate, loading, error }
	}

	static deleteTeam(onSuccess: (data: any) => void) {
		const [modelDelete, { loading, error }] = useMutation(DELETE_TEAM, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				GET_TEAMS
			],
		});
		return { modelDelete, loading, error }
	}


	static deleteGuestTeam(onSuccess: (data: any) => void) {
		const [modelDeleteGuest, { loading, error }] = useMutation(DELETE_GUEST_TEAM, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				GET_TEAMS,
				LIST_GUEST_TEAM
			],
		});
		return { modelDeleteGuest, loading, error }
	}



	static listTeam(filter: any, page: number, itemsPerPage: number = 10) {
		const { data: result, loading, fetchMore, refetch } = useQuery(GET_TEAMS, {
			variables: {
				filter,
				page: page,
				itemsPerPage,
			},
			fetchPolicy: 'no-cache'
		});
		return { data: result?.listTeamsPrivate, loading, fetchMore, refetch };
	}

	static listGuestTeam(teamId: string) {
		const { data: result, loading, fetchMore, refetch } = useQuery(LIST_GUEST_TEAM, {
			variables: { teamId },
			fetchPolicy: 'no-cache'
		});
		return { data: result?.listGuestTeam, loading, fetchMore, refetch };
	}

	static detailTeam() {
		const [modelDetail, { data, loading }] = useLazyQuery(DETAIL_TEAM, {
			fetchPolicy: 'no-cache',
		});

		return { modelDetail, data, loading };
	}

}