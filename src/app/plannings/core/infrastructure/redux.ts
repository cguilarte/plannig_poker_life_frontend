/* eslint-disable no-param-reassign */
import { RootState } from '@/infrastructure/redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	plannings: [],
	access_token_planing: null
};

const planning = createSlice({
	name: 'planning',
	initialState,
	reducers: {
		setPlannings: (state, action) => {
			if (action.payload) {
				state.plannings = action.payload;
			}
		},
		setAccessTokenCreatePlanning: (state, action) => {
			if (action.payload) {
				state.access_token_planing = action.payload
			}
		},
		resetAccessTokenCreatePlanning: (state,) => {
			state.access_token_planing = null;

		},
	},
});

export default planning.reducer;
export const selectplanning = (state: RootState) => state.planning.plannings;
export const getAccessTokenCreatePlanning = (state: RootState) => state.planning.access_token_planing;
export const {
	setPlannings,
	setAccessTokenCreatePlanning,
	resetAccessTokenCreatePlanning
} = planning.actions;
