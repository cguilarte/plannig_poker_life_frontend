
export { default } from 'next-auth/middleware';

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getAccessToken } from './infrastructure/utils';

export async function middleware(req: NextRequest) {
	const session = await getToken({ req });
	if (!session) {
		const url = req.nextUrl.clone();
		url.pathname = `/login`;
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/plannings/:path*",
		"/users/:path*",
		"/teams/:path*",
	],
};