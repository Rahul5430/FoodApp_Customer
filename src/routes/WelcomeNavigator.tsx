import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationScreen from '../screens/LocationScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { WelcomeStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<WelcomeStackParamList>();

const WelcomeNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
			<Stack.Screen name='LocationScreen' component={LocationScreen} />
		</Stack.Navigator>
	);
};

export default WelcomeNavigator;
