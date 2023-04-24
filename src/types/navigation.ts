import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Region } from 'react-native-maps';

export type Address = {
	id: string;
	label: string;
	address: string;
	floor: string;
	landmark: string;
	coords: Region;
};

export type MainStackParamList = {
	AuthenticatedStack: undefined;
	WelcomeStack: undefined;
	LoadingStack: undefined;
};

export type AuthenticatedStackParamList = {
	Dashboard: undefined;
	MyProfile: undefined;
	MyDates: undefined;
	AddDate: undefined;
	MyOrders: undefined;
	AddressScreen: undefined;
	LocationScreen: {
		fromAddressScreen: boolean;
		address: Address | undefined;
	};
	PaymentsScreen: undefined;
};

export type AuthenticatedStackScreenProps<
	T extends keyof AuthenticatedStackParamList
> = NativeStackScreenProps<AuthenticatedStackParamList, T>;

export type DashboardTabParamList = {
	HomeScreen: undefined;
	SearchScreen: undefined;
	MyCartScreen: undefined;
	MyOrders: undefined;
	MyProfile: undefined;
};

export type DashboardTabScreenProps<T extends keyof DashboardTabParamList> =
	BottomTabScreenProps<DashboardTabParamList, T>;

export type WelcomeStackParamList = {
	WelcomeScreen: undefined;
	LocationScreen: {
		fromAddressScreen: boolean;
		address: Address | undefined;
	};
};

export type WelcomeStackScreenProps<T extends keyof WelcomeStackParamList> =
	NativeStackScreenProps<WelcomeStackParamList, T>;

export type LoadingStackParamList = {
	LoadingScreen: undefined;
};

export type LoadingStackScreenProps<T extends keyof LoadingStackParamList> =
	NativeStackScreenProps<LoadingStackParamList, T>;
