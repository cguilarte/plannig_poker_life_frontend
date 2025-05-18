import { IUser } from "@/app/login/core/domain/interfaces";
import "next-auth";

declare module "next-auth" {
	interface User extends IUser {
	}

	interface Session {
		user: User;
	}

}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		user?: User;
	}
}
