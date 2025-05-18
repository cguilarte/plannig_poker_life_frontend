import * as yup from "yup";

export const schemaValidateCreateTeam = yup.object({
	name: yup.string().required()
}).required();
