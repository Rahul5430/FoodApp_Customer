import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyTabBar from '../components/MyTabBar';
import HomeScreen from '../screens/Authenticated/HomeScreen';
import MyCartScreen from '../screens/Authenticated/MyCartScreen';
import MyOrders from '../screens/Authenticated/MyOrders';
import MyProfile from '../screens/Authenticated/MyProfile';
import SearchScreen from '../screens/Authenticated/SearchScreen';
import {
	AuthenticatedStackScreenProps,
	DashboardTabParamList,
} from '../types/navigation';

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const TabNavigator: React.FC<
	AuthenticatedStackScreenProps<'Dashboard'>
> = () => {
	return (
		<Tab.Navigator
			tabBar={(props) => <MyTabBar {...props} />}
			screenOptions={{ headerShown: false }}
		>
			<Tab.Screen
				name='HomeScreen'
				component={HomeScreen}
				options={{ tabBarLabel: 'Home' }}
			/>
			<Tab.Screen
				name='SearchScreen'
				component={SearchScreen}
				options={{ tabBarLabel: 'Search' }}
			/>
			<Tab.Screen
				name='MyCartScreen'
				component={MyCartScreen}
				options={{ tabBarLabel: 'My Cart' }}
			/>
			<Tab.Screen
				name='MyOrders'
				component={MyOrders}
				options={{
					tabBarLabel: 'Orders',
					tabBarStyle: { display: 'none' },
				}}
			/>
			<Tab.Screen
				name='MyProfile'
				component={MyProfile}
				options={{
					tabBarLabel: 'Profile',
					tabBarStyle: { display: 'none' },
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
