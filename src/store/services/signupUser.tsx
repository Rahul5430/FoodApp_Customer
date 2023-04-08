import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface SignUpError {
	errorMessage: string;
}

interface UserSignUp {
	name: string;
	email: string;
	password: string;
}

export const signupUser = createAsyncThunk<
	string,
	UserSignUp,
	{ rejectValue: SignUpError }
>('users/signupUser', async ({ name, email, password }, thunkAPI) => {
	try {
		const response = await fetch('', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});
		const data = await response.json();
		console.log('data', data);
		const stringifyData = JSON.stringify(data);
		await AsyncStorage.setItem('token', stringifyData);
		return stringifyData;
	} catch (err) {
		console.log('Error', err.response.data);
		return thunkAPI.rejectWithValue(err.response.data as SignUpError);
	}
});
