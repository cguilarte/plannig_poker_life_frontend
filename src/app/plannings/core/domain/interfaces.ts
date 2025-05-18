import { Key } from "react";
import { schemaValidateCreatePlanning, schemaValidateCreateTask } from "./validateSchema";
import * as yup from "yup";

export interface IMetadata {
	title: string | undefined;
	heading?: string | undefined;
	description?: string | undefined;
	create?: string | undefined;
	update?: string | undefined;
}

export interface IBodyTableProps {
	columnKey: Key;
	row: IPlanning;
}

export type TTypePlanning = "MANUAL" | "JIRA"

export type FormDataCreatePlanning = yup.InferType<typeof schemaValidateCreatePlanning>;
export type FormDataCreateTask = yup.InferType<typeof schemaValidateCreateTask>;


export type typePlanning = "MANUAL" | "JIRA"

export type StatusPlanning = "PENDING" | "DONE"

export type SystemCard = "TSHIRTS" | "LINEAR" | "FIBONACCI" | "PROGRESSION"

export type IStatusStimate = "ESTIMATE" | "PENDING"
export type ItypeVisibility = "PUBLIC" | "PRIVATE"

export interface IPlanning {
	_id: string;
	title: string;
	description: string;
	planningId?: string;
	typePlanning: typePlanning;
	storyPoint: number;
	systemCard: SystemCard;
	status: StatusPlanning;
	typeVisibility: ItypeVisibility;
	sendMail: boolean;
	teamIds: string[];
	guests: IGuest[]
	task?: ITask[] | IIssues[]
	resourceId: string | undefined;
	access_token?: string | undefined;
	refresh_token?: string | undefined;
	taskCurrent: ITask | IIssues;
	protectPlanning: boolean;
	protectPassword: string;
}

export const STATUS_PLANNING = {
	PENDING: "PENDING",
	DONE: "DONE",
}

export const TYPE_PLANNING = {
	MANUAL: "MANUAL",
	JIRA: "JIRA",
}

export interface ITeamPointsPlanning {
	planningId: string;
	teamId: string;
	storyPoint?: number;
}

export interface IIusseType {
	id: string;
	name: string;
	description: string;
	iconUrl: string;
}


export interface ISprint {
	id: string;
	name: string;
}

export interface IProject {
	id: string;
	name: string;
	key: string;
	avatarUrls: string;
	projectTypeKey: string;
}


export interface IUserJira {
	accountId: string;
	emailAddress: string;
	avatarUrls: string;
	displayName: string;
}


export interface IPriority {
	id: string;
	name: string;
	iconUrl: string;
}


export interface IStatus {
	id: string;
	name: string;
	iconUrl: string;
}

export interface IDIssues {
	_id: string;
	id: string;
	key: string;
	boardId: number;
	sprintId: number;
	title: string;
	description: string;
	issuetype: IIusseType;
	sprint: ISprint;
	project: IProject;
	status: IStatus;
	creator: IUserJira;
	assignee: IUserJira;
	storyPoint: number;
	stimatePoint: number;
	planningId: string;
	userId: string;
	statusStimate: IStatusStimate;
	order: number;
}

export interface IIssues extends IDIssues {
	subtasks: [IIssues]
}

export interface ITask {
	_id?: string;
	key: string;
	title: string;
	description: string;
	stimatePoint?: number | string;
	storyPoint?: number;
	planningId?: string;
	statusStimate?: IStatusStimate;
}

export interface ITeam {
	_id: string;
	name: string;
	guests: IGuest[]
}

export interface IGuest {
	_id: string;
	name: string;
	email: string;
	avatar: string;
	teamId: string;
}