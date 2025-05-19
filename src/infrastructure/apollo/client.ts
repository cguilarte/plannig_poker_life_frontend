// lib/apollo-client.ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Crear una función que retorne el cliente
export function createApolloClient() {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_URL_GRAPHQL,
			// Opcional: agregar headers si necesitas autenticación
			headers: {
				// 'Authorization': `Bearer ${token}`,
			},
		}),
	});
}

// Para usar en Server Components
export const getClient = createApolloClient;