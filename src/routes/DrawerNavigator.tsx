import {
	createDrawerNavigator,
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerToggleButton,
} from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
	return (
		<DrawerContentScrollView>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	);
};

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			drawerContent={DrawerContent}
			initialRouteName='Tabs'
			screenOptions={{
				headerLeft: undefined,
				headerRight: () => <DrawerToggleButton />,
			}}
		>
			<Drawer.Screen
				name='UserTabs'
				component={TabNavigator}
				options={{
					headerShown: false,
				}}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
