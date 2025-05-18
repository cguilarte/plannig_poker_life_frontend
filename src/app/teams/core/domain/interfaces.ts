import { Key } from "react";
import * as yup from "yup";
import { schemaValidateCreateTeam } from "./validateSchema";

export interface IMetadata {
	title: string | undefined;
	heading?: string | undefined;
	description?: string | undefined;
	create?: string | undefined;
	update?: string | undefined;
}

export interface IBodyTableProps {
	columnKey: Key;
	row: ITeam;
	openDetailTeam: (teamId: string) => void | undefined;
	handleListInvite: (teamId: string) => void | undefined;
}

export type FormDataCreateTeam = yup.InferType<typeof schemaValidateCreateTeam>;


export interface ITeam {
	_id: string;
	name: string;
	status: boolean;
}