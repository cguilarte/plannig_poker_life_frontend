/* eslint-disable react-hooks/rules-of-hooks */
import { LOGIN } from "./graphql";
import { createApolloClient } from "@/infrastructure/providers/ApolloWrapper";
import { ILogin } from "../domain/interfaces";

export class serviceLogin {

	static async login(data: ILogin) {

		const client = createApolloClient({}, null);

		const result = await client.mutate({
			mutation: LOGIN,
			variables: {
				data
			},
		});

		if (result.data.login.__typename === "Error") return { error: true, response: result.data.login.message };

		return { error: false, response: result.data.login };

	}
}