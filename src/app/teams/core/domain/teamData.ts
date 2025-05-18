import { IMetadata } from "./interfaces";

export const STATUS_TEAM_LIST = [
	{ name: "Activo", uid: true },
	{ name: "Inactivo", uid: false },
];


export const metadata: IMetadata = {
	title: 'Teams',
	heading: 'Lista de teams',
	description: '',
	create: 'Crear Team',
	update: 'Actualizar Team',
}

export const columnsTable = [
	{ name: "#", uid: "position" },
	{ name: "Nombre del team", uid: "name" },
	{ name: "Invitados", uid: "invited" },
	{ name: "Status", uid: "status" },
	{ name: "Acción", uid: "actions" },
];
