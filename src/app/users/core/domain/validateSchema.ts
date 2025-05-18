import * as yup from "yup";

export const schemaValidateCreateUser = yup.object({
	name: yup.string().required(),
	email: yup.string().email(),
	rol: yup.string().required(),
}).required();
