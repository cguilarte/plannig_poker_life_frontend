import * as yup from "yup";

export const schemaAccesoPlanningValidate = yup.object({
	name: yup
		.string()
		.required('El nombre es un campo obligatorio'),
	email: yup
		.string()
		.email('El correo electrónico debe ser un correo electrónico válido')
		.required('El correo electrónico es un campo obligatorio'),
	modeObserver: yup.boolean()
}).required();



export const schemaUpdatePerfilGuest = yup.object({
	name: yup
		.string()
		.required('El nombre es un campo obligatorio'),
}).required();

