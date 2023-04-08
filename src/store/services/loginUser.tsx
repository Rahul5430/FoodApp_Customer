import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginError {
	errorMessage: string;
}

interface UserLogin {
	email: string;
	password: string;
}

export const loginUser = createAsyncThunk<
	string,
	UserLogin,
	{ rejectValue: LoginError }
>('login', async (userDetails, thunkAPI) => {
	try {
		const { email, password } = userDetails;
		const userData = {
			email: email,
			username: 'Jack Sparrow',
			profilePicture: '',
			token: 'GFDHG$#@#%DGFJHGHR^&**&^*&^',
		};
		console.log(userData);
		console.log('PASSWORD: ', password);
		const stringifyData = JSON.stringify(userData);
		await AsyncStorage.setItem('token', stringifyData);
		return stringifyData;
	} catch (err) {
		console.log('Error', err.response.data);
		return thunkAPI.rejectWithValue(err.response.data as LoginError);
	}
});
