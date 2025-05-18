/* eslint-disable react-hooks/rules-of-hooks */
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, DELETE_USER, DETAIL_USER, GET_USERS, UPDATE_USER } from "./graphql";


export class repositoryUser {

	static createUser(onSuccess: (data: any) => void) {
		const [modelCreate, { loading, error }] = useMutation(CREATE_USER, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				GET_USERS
			],
		});

		return { modelCreate, loading, error }
	}


	static updateUser(onSuccess: (data: any) => void) {
		const [modelUpdate, { loading, error }] = useMutation(UPDATE_USER, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				GET_USERS
			],
		});
		return { modelUpdate, loading, error }
	}

	static deleteUser(onSuccess: (data: any) => void) {
		const [modelDelete, { loading, error }] = useMutation(DELETE_USER, {
			onCompleted: (data) => {
				onSuccess(data)
			},
			refetchQueries: [
				GET_USERS
			],
		});
		return { modelDelete, loading, error }
	}


	static listUser(filter: any, page: number, itemsPerPage: number = 10) {
		const { data: result, loading, fetchMore, refetch } = useQuery(GET_USERS, {
			variables: {
				filter,
				page: page,
				itemsPerPage,
			},
			fetchPolicy: 'no-cache'
		});
		return { data: result?.listUsers, loading, fetchMore, refetch };
	}

	static detailUser() {
		const [modelDetail, { data, loading }] = useLazyQuery(DETAIL_USER, {
			fetchPolicy: 'no-cache',
		});

		return { modelDetail, data, loading };
	}

}