export const TOKEN_APP = `_PLANNING_ACCESS_TOKEN_JIRA`;
export const REFRESH_TOKEN_APP = `_PLANNING_REFRESH_TOKEN_JIRA`;

export const setAccessToken = (token: string) => {
	localStorage.setItem(TOKEN_APP, token);
};

export const getAccessToken = () => localStorage.getItem(TOKEN_APP);

export const deleteAccessToken = () => {
	localStorage.removeItem(TOKEN_APP);
};

export const setRefreshAccessToken = (token: string) => {
	localStorage.setItem(REFRESH_TOKEN_APP, token);
};

export const getRefreshAccessToken = () => localStorage.getItem(REFRESH_TOKEN_APP);

export const deleteRefresAccessToken = () => {
	localStorage.removeItem(REFRESH_TOKEN_APP);
};


export const copyLink = async (link: string) => {
	if ('clipboard' in navigator) {
		return await navigator.clipboard.writeText(link);
	} else {
		return document.execCommand('copy', true, link);
	}
};