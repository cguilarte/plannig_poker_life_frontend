export const ROUTER = {
	plannings: {
		list: '/plannings',
		form: '/plannings/form'
	},
	planningLiveUrl: 'planning'
}

export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_SCOPE =
	'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

export const FACEBOOK_AUTH_URL = 'https://www.facebook.com/v4.0/dialog/oauth';
export const FACEBOOK_SCOPE = 'public_profile,email';

export const LINKEDIN_AUTH_URL =
	'https://www.linkedin.com/oauth/v2/authorization';
export const LINKEDIN_SCOPE = 'r_liteprofile r_emailaddress';

export const PATH = {
	OAUTH: '/oauth',
};

export const PROVIDER = {
	GOOGLE: 'GOOGLE',
	FACEBOOK: 'FACEBOOK',
	LINKEDIN: 'LINKEDIN',
};

export const MODAL_PURPOSE = {
	SIGN_UP: 'SIGN_UP',
	SIGN_IN: 'SIGN_IN',
};

export const PROVIDER_NAME = {
	[PROVIDER.GOOGLE]: 'Google',
	[PROVIDER.LINKEDIN]: 'LinkedIn',
	[PROVIDER.FACEBOOK]: 'Facebook',
};
