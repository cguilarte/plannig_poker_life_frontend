import * as yup from "yup";

export const schemaValidateCreatePlanning = yup.object({
	title: yup.string().required(),
	description: yup.string(),
	systemCard: yup.string().required(),
	sendMail: yup.boolean(),
	protectPlanning: yup.boolean(),
	protectPassword: yup.string().when('protectPlanning', {
		is: true, // alternatively: (val) => val == true
		then: (schema: any) =>
			schema
				.min(5, 'La contraseña debe tener 8 caracteres')
				.min(8, 'La contraseña debe tener 8 caracteres')
	}),
}).required();


export const schemaValidateCreateTask = yup.object({
	title: yup.string().required(),
	description: yup.string()
}).required();