/* eslint-disable react-hooks/rules-of-hooks */
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_PROFILE, UPDATE_PROFILE } from "./graphql";

export class servicesProfile {

	static getProfile() {
		const { data, loading } = useQuery(GET_PROFILE, {
			fetchPolicy: 'no-cache'
		});

		return { data: data?.profile, loading };

	}

	static updateProfile(onSuccess: (data: any) => void) {
		const [modelUpdate, { data, loading, error }] = useMutation(UPDATE_PROFILE, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { modelUpdate, data, loading, error }
	}

}