import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
// import DrawerNavigator from './DrawerNavigator';
import LoadingNavigator from './LoadingNavigator';
import WelcomeNavigator from './WelcomeNavigator';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{/* {isLoggedIn && (
				<Stack.Screen name='dashboard' component={DrawerNavigator} />
			)} */}
			{isLoggedIn === false && (
				<Stack.Screen name='welcome' component={WelcomeNavigator} />
			)}
			{isLoggedIn === null && (
				<Stack.Screen name='loading' component={LoadingNavigator} />
			)}
		</Stack.Navigator>
	);
};

export default MainNavigator;
