import { GOOGLE_AUTH_URL, GOOGLE_SCOPE, PATH, PROVIDER } from "./constants";

export const TOKEN_PLANNING_LIVE = `_TOKEN_PLANNING_LIVE`;

export const setAccessToken = (token: string) => {
	localStorage.setItem(TOKEN_PLANNING_LIVE, token);
};

export const getAccessToken = () => localStorage.getItem(TOKEN_PLANNING_LIVE);

export const deleteAccessToken = () => {
	localStorage.removeItem(TOKEN_PLANNING_LIVE);
};


// Auth Social
const getURLWithQueryParams = (base: any, params: any) => {
	const query = Object.entries(params)
		.map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
		.join('&');

	return `${base}?${query}`;
};

export const getRedirectUri = (provider: any) =>
	`${window.location.origin}${PATH.OAUTH}?provider=${provider.toLowerCase()}`;

export const getProvidersUrls = () => ({
	[PROVIDER.GOOGLE]: getURLWithQueryParams(GOOGLE_AUTH_URL, {
		client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		redirect_uri: getRedirectUri(PROVIDER.GOOGLE),
		scope: GOOGLE_SCOPE,
		response_type: 'code',
		access_type: 'offline',
		prompt: 'consent',
	})
});
