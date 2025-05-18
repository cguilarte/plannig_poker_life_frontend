
import * as yup from "yup";
import { schemaLoginValidate } from "./validateSchema";

export enum TYPE_LOGIN {
	MANUAL = "MANUAL",
	SOCIAL = "SOCIAL"
}

export interface ILogin {
	email: string | undefined | null;
	password?: string;
	typeLogin?: TYPE_LOGIN;
}

export interface ResultLogin {
	error: boolean;
	message?: string;
	response?: IUser;
}

export interface IUser {
	_id: string;
	name: string;
	email: string;
	rol: string;
	verified_account: string;
	accessToken: string;
	avatar: string;
}

export type FormDataLogin = yup.InferType<typeof schemaLoginValidate>;
