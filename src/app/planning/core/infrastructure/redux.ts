/* eslint-disable no-param-reassign */
import { IIssues, ITask } from '@/app/plannings/core/domain/interfaces';
import { RootState } from '@/infrastructure/redux';
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	guests: [],
	profile: null,
	planningId: null,
	info: {},
	votos: {},
	initialVote: false,
	showCard: false,
	result: null,
	taskCurrent: null,
	teamPoints: [],
	controlPlanning: false,
	controlCelebration: false,
};

const planningLive = createSlice({
	name: 'planningLive',
	initialState,
	reducers: {
		setControlPlanning: (state, action) => {
			state.controlPlanning = action.payload;
		},
		setControlCelebration: (state, action) => {
			state.controlCelebration = action.payload;
		},
		setTeamPoints: (state, action) => {
			state.teamPoints = action.payload;
		},
		setTaskCurrent: (state, action) => {
			state.taskCurrent = action.payload;
		},
		setResult: (state, action) => {
			state.result = action.payload;
		},
		resetVoto: (state) => {
			state.votos = {};
		},
		setVotoNew: (state, action) => {
			if (action.payload) {
				state.votos = action.payload;
			}
		},
		setVoto: (state, action) => {
			if (action.payload) {
				const currentState = current(state);
				let votos = { ...currentState.votos };

				const { guestId, value } = action.payload;
				votos = Object.assign(votos, { [`${guestId}`]: { value } })

				state.votos = votos;
			}
		},
		setShowCard: (state, action) => {
			state.showCard = action.payload;
		},
		setInfoPlanning: (state, action) => {
			if (action.payload) {
				state.controlPlanning = action.payload.controlPlanning;
				state.controlCelebration = action.payload.celebrationEmoji;
				state.info = action.payload;
			}
		},
		setGuests: (state, action) => {
			if (action.payload) {
				state.guests = action.payload;
			}
		},
		setProfile: (state, action) => {
			state.profile = action.payload;

		},
		setPlanningId: (state, action) => {
			if (action.payload) {
				state.planningId = action.payload;
			}
		},
	},
});

export default planningLive.reducer;

export const selectGuest = (state: RootState) => state.planningLive.guests;
export const selectProfile = (state: RootState) => state.planningLive.profile;
export const selectPlanningId = (state: RootState) => state.planningLive.planningId;
export const selectInfoPlanning = (state: RootState) => state.planningLive.info;
export const selectVotos = (state: RootState) => state.planningLive.votos;
export const selectShowCard = (state: RootState) => state.planningLive.showCard;
export const selectResult = (state: RootState) => state.planningLive.result;
export const selectTaskCurrent = (state: RootState) => state.planningLive.taskCurrent;
export const selectTeamPoint = (state: RootState) => state.planningLive.teamPoints;
export const selectControlPlanning = (state: RootState) => state.planningLive.controlPlanning;
export const selectControlCelebration = (state: RootState) => state.planningLive.controlCelebration;

export const {
	setTaskCurrent,
	setVotoNew,
	resetVoto,
	setResult,
	setShowCard,
	setVoto,
	setGuests,
	setProfile,
	setPlanningId,
	setInfoPlanning,
	setTeamPoints,
	setControlPlanning,
	setControlCelebration
} = planningLive.actions;
