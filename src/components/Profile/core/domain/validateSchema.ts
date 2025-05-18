import * as yup from "yup";

export const schemaUpdateProfile = yup.object({
	name: yup
		.string()
		.required('El nombre es un campo obligatorio'),
	email: yup.string(),
	changePassword: yup.boolean(),
	password: yup.string().when('changePassword', {
		is: true, // alternatively: (val) => val == true
		then: (schema: any) =>
			schema
				.min(5)
				.min(8, 'La contraseña debe tener 8 caracteres')
				.matches(/[0-9]/, 'La contraseña requiere un número')
				.matches(/[a-z]/, 'La contraseña requiere una letra minúscula')
				.matches(/[A-Z]/, 'La contraseña requiere una letra mayúscula')
				.matches(/[^\w]/, 'La contraseña requiere un símbolo'),
	}),
	confirmPassword: yup.string().when('changePassword', {
		is: true, // alternatively: (val) => val == true
		then: (schema: any) =>
			schema
				.required('Se requiere confirmar contraseña')
				.oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
	}),
}).required();

