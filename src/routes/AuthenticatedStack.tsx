import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyProfile from '../screens/Authenticated/MyProfile';
import { AuthenticatedStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='MyProfile' component={MyProfile} />
		</Stack.Navigator>
	);
};

export default AuthenticatedStack;
