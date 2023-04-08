import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../services/loginUser';
import { signupUser } from '../services/signupUser';

export interface UserState {
	userObj: string | null;
	location: string | null;
	orders: string | null;
	token: string | null;
	isFetching: boolean;
	errorMessage: string | null;
	isLoggedIn: boolean | null;
}

const initialState: UserState = {
	userObj: null,
	location: null,
	orders: null,
	token: null,
	isFetching: false,
	errorMessage: '',
	isLoggedIn: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserObj: (state, action) => {
			state.userObj = action.payload;
		},
		clearState: (state) => {
			state.isFetching = false;
			state.errorMessage = '';

			return state;
		},
		setUserLocation: (state, { payload }) => {
			console.log('locationPayload', payload);
			state.location = payload;
		},
		logout: (state) => {
			state.userObj = null;
			state.token = null;
		},
		setLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setIsFetching: (state, action) => {
			state.isFetching = action.payload;
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload;
		},
		googleLogin: (state, { payload }) => {
			state.userObj = payload;
			state.isLoggedIn = true;
			state.isFetching = false;
			state.errorMessage = '';
			return state;
		},
		facebookLogin: (state, { payload }) => {
			state.userObj = payload;
			state.isLoggedIn = true;
			state.isFetching = false;
			state.errorMessage = '';
			return state;
		},
		setOrders: (state, { payload }) => {
			state.orders = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signupUser.fulfilled, (state, action) => {
				console.log('payload', action.payload);
				state.userObj = action.payload;
				state.isFetching = false;
			})
			.addCase(signupUser.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.isFetching = false;
				console.log('ERROR PAYLOAD', action.payload);
				if (action.payload) {
					state.errorMessage = action.payload.errorMessage;
				} else {
					state.errorMessage = JSON.stringify(action.error);
				}
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.userObj = action.payload;
				state.isLoggedIn = true;
				state.isFetching = false;
				state.errorMessage = '';
				return state;
			})
			.addCase(loginUser.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isFetching = false;
				state.isLoggedIn = false;
				if (action.payload) {
					state.errorMessage = action.payload.errorMessage;
				} else {
					state.errorMessage = JSON.stringify(action.error);
				}
			});
	},
});

export const {
	clearState,
	setUserLocation,
	logout,
	setLoggedIn,
	setIsFetching,
	setErrorMessage,
	setUserObj,
	googleLogin,
	facebookLogin,
	setOrders,
} = userSlice.actions;

export default userSlice.reducer;
