import { IMetadata } from "./interfaces";

export const STATUS_USER_LIST = [
	{ name: "Activo", uid: true },
	{ name: "Inactivo", uid: false },
];


export const metadata: IMetadata = {
	title: 'Ususarios',
	heading: 'Lista de usuarios',
	description: '',
	create: 'Crear Usuario',
	update: 'Actualizar usuario',
}

export const TYPE_USER = Object.freeze({
	ADMIN: "ADMIN",
	COORDINATOR: "COORDINATOR"
});



export const columnsTable = [
	{ name: "#", uid: "position" },
	{ name: "Nombre del usuario", uid: "name" },
	{ name: "Email", uid: "email" },
	{ name: "Rol", uid: "rol" },
	{ name: "Status", uid: "status" },
	{ name: "Acción", uid: "actions" },
];
