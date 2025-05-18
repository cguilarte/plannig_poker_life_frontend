import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { serviceLogin } from '@/app/login/core/infrastructure/services';
import { TYPE_LOGIN } from '@/app/login/core/domain/interfaces';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "email", placeholder: "test@test.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { error, response } = await serviceLogin.login({
					email: credentials?.email || "",
					password: credentials?.password || "",
					typeLogin: TYPE_LOGIN.MANUAL
				})

				if (error) {
					throw new Error(response);
				}

				return { ...response };

			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code"
				}
			}
		})
	],
	/* session: {
		strategy: "jwt" as SessionStrategy,
		maxAge: 3 * 24 * 60 * 60,
	},
	jwt: {
		maxAge: 3 * 24 * 60 * 60,
	}, */
	callbacks: {
		async jwt({ token, user, account }) {
			if (account?.type === 'oauth') {
				const { error, response } = await serviceLogin.login({
					email: token.email,
					password: '',
					typeLogin: TYPE_LOGIN.SOCIAL
				})

				if (error) throw new Error(response);
				token.user = response;

			} else {
				if (user) {
					token.user = user;
				}
			}

			return { ...token }
		},
		async session({ session, token }) {
			session.user = token.user as any;
			console.log('session nuevo: ', session)
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	debug: true,
};
