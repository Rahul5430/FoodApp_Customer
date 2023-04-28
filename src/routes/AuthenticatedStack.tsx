import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddDate from '../screens/Authenticated/AddDate';
import AddressScreen from '../screens/Authenticated/AddressScreen';
import CategoryScreen from '../screens/Authenticated/CategoryScreen';
import MyDates from '../screens/Authenticated/MyDates';
import MyOrders from '../screens/Authenticated/MyOrders';
import MyProfile from '../screens/Authenticated/MyProfile';
import PaymentsScreen from '../screens/Authenticated/PaymentsScreen';
import ProductScreen from '../screens/Authenticated/ProductScreen';
import LocationScreen from '../screens/LocationScreen';
import {
	AuthenticatedStackParamList,
	MainStackScreenProps,
} from '../types/navigation';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStack: React.FC<
	MainStackScreenProps<'AuthenticatedStack'>
> = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Dashboard' component={TabNavigator} />
			<Stack.Screen name='CategoryScreen' component={CategoryScreen} />
			<Stack.Screen name='ProductScreen' component={ProductScreen} />
			<Stack.Screen name='MyProfile' component={MyProfile} />
			<Stack.Screen name='MyDates' component={MyDates} />
			<Stack.Screen name='AddDate' component={AddDate} />
			<Stack.Screen name='MyOrders' component={MyOrders} />
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
