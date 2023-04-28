/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import {
	BottomTabNavigationProp,
	BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
	CompositeNavigationProp,
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native';
import type {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { ProductType } from './data';
import { Address } from './user';

export type MainStackParamList = {
	AuthenticatedStack: undefined;
	WelcomeStack: undefined;
	LoadingStack: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
	NativeStackScreenProps<MainStackParamList, T>;

export type AuthenticatedStackParamList = {
	Dashboard: NavigatorScreenParams<DashboardTabParamList>;
	CategoryScreen: undefined;
	ProductScreen: { product: ProductType };
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
	CompositeScreenProps<
		BottomTabScreenProps<DashboardTabParamList, T>,
		AuthenticatedStackScreenProps<keyof AuthenticatedStackParamList>
	>;

export type DashboardNavigationProps<T extends keyof DashboardTabParamList> =
	CompositeNavigationProp<
		BottomTabNavigationProp<DashboardTabParamList, T>,
		NativeStackNavigationProp<AuthenticatedStackParamList>
	>;

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

declare global {
	namespace ReactNavigation {
		interface MainParamList extends MainStackParamList {}
	}
}
