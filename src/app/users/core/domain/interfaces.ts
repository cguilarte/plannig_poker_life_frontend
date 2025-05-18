import { Key } from "react";
import * as yup from "yup";
import { schemaValidateCreateUser } from "./validateSchema";

export interface IMetadata {
	title: string | undefined;
	heading?: string | undefined;
	description?: string | undefined;
	create?: string | undefined;
	update?: string | undefined;
}

export interface IBodyTableProps {
	columnKey: Key;
	row: IUser;
	openDetailUser: (userId: string) => void | undefined
}

export type FormDataCreateUser = yup.InferType<typeof schemaValidateCreateUser>;

export type TStatusUser = "ADMIN" | "COORDINATOR"

export interface IUser {
	_id: string;
	name: string;
	email: string;
	rol: string;
	status: TStatusUser;
}