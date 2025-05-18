/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	info: {},
};

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			if (action.payload) {
				state.info = action.payload;
			}
		},
		resetUser: (state) => {
			state.info = {};
		}
	},
});

export default user.reducer;
export const selectUser = (state: any) => state.user.info;
export const selectAccessToken = (state: any) => state.user.info.accessToken;

export const {
	setUser,
	resetUser
} = user.actions;
