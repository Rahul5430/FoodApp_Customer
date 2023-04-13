import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { MainStackParamList } from '../types/navigation';
import AuthenticatedStack from './AuthenticatedStack';
import LoadingNavigator from './LoadingNavigator';
import WelcomeNavigator from './WelcomeNavigator';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{isLoggedIn === true && (
				<Stack.Screen
					name='AuthenticatedStack'
					component={AuthenticatedStack}
				/>
			)}
			{isLoggedIn === false && (
				<Stack.Screen
					name='WelcomeStack'
					component={WelcomeNavigator}
				/>
			)}
			{isLoggedIn === null && (
				<Stack.Screen
					name='LoadingStack'
					component={LoadingNavigator}
				/>
			)}
		</Stack.Navigator>
	);
};

export default MainNavigator;
