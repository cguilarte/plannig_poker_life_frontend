
import { ApolloLink, HttpLink, Observable, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import {
	ApolloNextAppProvider,
	InMemoryCache,
	ApolloClient,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { useSelector } from "react-redux";
import { resetUser, selectAccessToken } from "@/app/login/core/infrastructure/redux";
import { selectProfile } from "@/app/planning/core/infrastructure/redux";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";


// have a function to create a client for you
export function createApolloClient(userProfile: any, dispatch: any, token?: string | null) {
	
	const httpLink = new HttpLink({
		// this needs to be an absolute url, as relative urls cannot be used in SSR
		uri: `${process.env.NEXT_PUBLIC_URL_GRAPHQL}`,
		// you can disable result caching here if you want to
		// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
		fetchOptions: { cache: "no-store" },
		// you can override the default `fetchOptions` on a per query basis
		// via the `context` property on the options passed as a second argument
		// to an Apollo Client data fetching hook, e.g.:
		// const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
	});

	const wsLink = new GraphQLWsLink(createClient({
		url: `${process.env.NEXT_PUBLIC_URL_GRAPHQL_WS}`,
		connectionParams: {
			user: userProfile
		},
	}));



	const authLink = setContext((_: any, { headers }: any) => {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});

	const splitLink = process.browser
		? split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return (
					definition.kind === 'OperationDefinition' &&
					definition.operation === 'subscription'
				);
			},
			wsLink,
			authLink.concat(httpLink)
		)
		: authLink.concat(httpLink);

	let messageNetworkError = 0;

	const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
		console.log('errr ', graphQLErrors);
		if (graphQLErrors) {
			// eslint-disable-next-line no-restricted-syntax, no-unreachable-loop
			for (const err of graphQLErrors) {
				// eslint-disable-next-line default-case
				switch (err?.extensions?.code) {
					case 'UNAUTHENTICATED':
						console.log('error auth')
						dispatch(resetUser());
						signOut({
							redirect: true
						});
						//window.location.href = '/login';
						continue;
					//return Observable.of(operation);
				}
			}

			graphQLErrors.map((res) => {
				console.log(`[GraphQL errorss]: Message: ${res.message}`);
				console.log(res.message);
				return Observable.of(operation);
			});

			console.error(
				'Oops! Seems something went wrong... Please reload page and try again :)',
				5
			);
		} else if (networkError) {
			if (messageNetworkError === 0) {
				//alertError('Problema con el servidor, intente más tarde');
				messageNetworkError += 1;
			}
			console.log(`[Network error]: ${networkError}`);
			return Observable.of(operation);
		}

		return Observable.of(operation);
	});

	return new ApolloClient({
		// use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
		cache: new InMemoryCache({
			addTypename: false
		}),
		link: ApolloLink.from([
			// in a SSR environment, if you use multipart features like
			// @defer, you need to decide how to handle these.
			// This strips all interfaces with a `@defer` directive from your queries.
			new SSRMultipartLink({
				stripDefer: true,
			}),
			errorLink,
			splitLink
		])
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	const accessToken = useSelector(selectAccessToken);
	const userProfile = useSelector(selectProfile)
	const dispatch = useDispatch();
	const initialServer = () => createApolloClient(userProfile, dispatch, accessToken || null);
	return (
		<ApolloNextAppProvider makeClient={initialServer}>
			{children}
		</ApolloNextAppProvider>
	);
}