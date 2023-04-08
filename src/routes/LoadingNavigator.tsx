import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const LoadingNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='LoadingScreen' component={LoadingScreen} />
		</Stack.Navigator>
	);
};

export default LoadingNavigator;
