import * as yup from "yup";

import { schemaAccesoPlanningValidate, schemaUpdatePerfilGuest } from "./validateSchema";

export type FormDataAccesoPlanning = yup.InferType<typeof schemaAccesoPlanningValidate>;
export type FormDataUpdatePerfilGuest = yup.InferType<typeof schemaUpdatePerfilGuest>;

export interface IFeedback {
	name: string;
	email: string;
	emoji: string;
	comment: string;
}