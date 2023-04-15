import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyProfile from '../screens/Authenticated/MyProfile';
import PaymentsScreen from '../screens/Authenticated/PaymentsScreen';
import { AuthenticatedStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='PaymentsScreen' component={PaymentsScreen} />
			<Stack.Screen name='MyProfile' component={MyProfile} />
		</Stack.Navigator>
	);
};

export default AuthenticatedStack;
