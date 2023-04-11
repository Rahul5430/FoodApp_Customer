import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParamList = {
	WelcomeStack: undefined;
	LoadingStack: undefined;
};

export type WelcomeStackParamList = {
	WelcomeScreen: undefined;
	LocationScreen: undefined;
};

export type WelcomeStackScreenProps<T extends keyof WelcomeStackParamList> =
	NativeStackScreenProps<WelcomeStackParamList, T>;
