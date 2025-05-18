import * as yup from "yup";

export const schemaLoginValidate = yup.object({
	email: yup
		.string()
		.email('El correo electrónico debe ser un correo electrónico válido')
		.required('El correo electrónico es un campo obligatorio'),
	password: yup.string().required('La contraseña es un campo requerido'),
}).required();

