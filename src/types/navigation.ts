import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParamList = {
	AuthenticatedStack: undefined;
	WelcomeStack: undefined;
	LoadingStack: undefined;
};

export type AuthenticatedStackParamList = {
	Dashboard: undefined;
	MyProfile: undefined;
};

export type AuthenticatedStackScreenProps<
	T extends keyof AuthenticatedStackParamList
> = NativeStackScreenProps<AuthenticatedStackParamList, T>;

export type WelcomeStackParamList = {
	WelcomeScreen: undefined;
	LocationScreen: undefined;
};

export type WelcomeStackScreenProps<T extends keyof WelcomeStackParamList> =
	NativeStackScreenProps<WelcomeStackParamList, T>;

export type LoadingStackParamList = {
	LoadingScreen: undefined;
};

export type LoadingStackScreenProps<T extends keyof LoadingStackParamList> =
	NativeStackScreenProps<LoadingStackParamList, T>;
