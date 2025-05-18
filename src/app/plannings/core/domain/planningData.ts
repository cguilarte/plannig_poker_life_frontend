import { IMetadata } from "./interfaces";

export const statusOptionsPlanning = [
	{ name: "Finalizado", uid: "DONE" },
	{ name: "En Proceso", uid: "PENDING" },
];

export const columnsPlanning = [
	{ name: "#", uid: "position" },
	{ name: "Titulo de la planning", uid: "title" },
	{ name: "Url planning", uid: "planningId" },
	{ name: "Tipo de planning", uid: "typePlanning" },
	{ name: "Sistema de carta", uid: "systemCard" },
	{ name: "Story Point", uid: "storyPoint" },
	{ name: "Estado", uid: "status" },
	{ name: "Acción", uid: "actions" },
];


export const STATUS_TASK = {
	ESTIMATE: "ESTIMATE",
	PENDING: "PENDING",
};

export const STATUS_PLANNING_RECORD = {
	DONE: "DONE",
	PENDING: "PENDING",
};

export const STATUS_PLANNING_LANG: any = Object.freeze({
	DONE: "Finalizado",
	PENDING: "En proceso",
});


export const metadata: IMetadata = {
	title: 'Plannings',
	heading: 'Lista de plannings',
	description: 'Todas las planning creada son generadas en esta sección',
	create: 'Crear Planning',
	update: 'Actualizar Planning',
}

export const TypePlanning = Object.freeze({
	MANUAL: "MANUAL",
	JIRA: "JIRA"
});

export const SYSTEM_CARD = Object.freeze({
	TSHIRTS: 'TSHIRTS',
	LINEAR: 'LINEAR',
	FIBONACCI: 'FIBONACCI'
})

export const TYPE_VISIBILITY = {
	PUBLIC: "PUBLIC",
	PRIVATE: "PRIVATE",
}