import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddDate from '../screens/Authenticated/AddDate';
import AddressScreen from '../screens/Authenticated/AddressScreen';
import MyDates from '../screens/Authenticated/MyDates';
import MyProfile from '../screens/Authenticated/MyProfile';
import PaymentsScreen from '../screens/Authenticated/PaymentsScreen';
import LocationScreen from '../screens/LocationScreen';
import { AuthenticatedStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='MyProfile' component={MyProfile} />
			<Stack.Screen name='MyDates' component={MyDates} />
			<Stack.Screen name='AddDate' component={AddDate} />
			<Stack.Screen name='AddressScreen' component={AddressScreen} />
			<Stack.Screen
				name='LocationScreen'
				component={LocationScreen}
				initialParams={{
					fromAddressScreen: true,
					address: undefined,
				}}
			/>
			<Stack.Screen name='PaymentsScreen' component={PaymentsScreen} />
		</Stack.Navigator>
	);
};

export default AuthenticatedStack;
