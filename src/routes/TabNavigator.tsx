import Ionicons from '@expo/vector-icons/Ionicons';
import {
	Alert,
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { CurvedBottomBar } from '../components/CurvedBottomBar';
import TabHeader from '../components/Headers/TabHeader';
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/LocationScreen';
// import SearchScreen from '../screens/SearchScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../themes';

const TabNavigator = () => {
	const _renderIcon = (routeName: string, selectedTab: string) => {
		let icon: any = ''; // TODO: fix this

		switch (routeName) {
			case 'Home':
				icon = 'ios-home-outline';
				break;
			case 'Search':
				icon = 'ios-search';
				break;
			case 'Order':
				icon = 'ios-fast-food-outline';
				break;
			case 'Profile':
				icon = 'settings-outline';
				break;
		}

		return (
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Ionicons
					name={icon}
					size={20}
					color={
						routeName === selectedTab
							? colors.primaryButton
							: 'gray'
					}
				/>
				<Text
					style={{
						fontSize: 13,
						color:
							routeName === selectedTab
								? colors.primaryButton
								: 'gray',
					}}
				>
					{routeName}
				</Text>
			</View>
		);
	};

	return (
		<CurvedBottomBar.Navigator
			style={styles.bottomBar}
			height={50}
			circleWidth={55}
			bgColor='white'
			type='UP'
			initialRouteName='Home'
			borderTopLeftRight
			renderCircle={({ selectedTab, navigate }) => (
				<Animated.View style={styles.btnCircleUp}>
					<TouchableOpacity
						style={{
							flex: 1,
							justifyContent: 'center',
						}}
						onPress={() => Alert.alert('Click Action')}
					>
						<Ionicons
							name={'cart-outline'}
							color='white'
							size={25}
						/>
					</TouchableOpacity>
				</Animated.View>
			)}
			tabBar={({ routeName, selectedTab, navigate }) => {
				return (
					<TouchableOpacity
						onPress={() => navigate(routeName)}
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{_renderIcon(routeName, selectedTab)}
					</TouchableOpacity>
				);
			}}
			screenOptions={{
				header: (props) => {
					return <TabHeader {...props} />;
				},
			}}
		>
			<CurvedBottomBar.Screen
				name='Home'
				position='LEFT'
				component={HomeScreen}
			/>
			<CurvedBottomBar.Screen
				name='Search'
				position='LEFT'
				component={LocationScreen} // TODO: change this
			/>
			<CurvedBottomBar.Screen
				name='Order'
				position='RIGHT'
				component={OrdersScreen}
			/>
			<CurvedBottomBar.Screen
				name='Profile'
				component={ProfileScreen}
				position='RIGHT'
			/>
		</CurvedBottomBar.Navigator>
	);
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	button: {
		marginVertical: 5,
	},
	bottomBar: {},
	btnCircle: {
		width: 60,
		height: 60,
		borderRadius: 35,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0.5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 1,
		bottom: 30,
	},
	btnCircleUp: {
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primaryButton,
		bottom: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 1,
	},
	imgCircle: {
		width: 30,
		height: 30,
		tintColor: 'gray',
	},
	img: {
		width: 30,
		height: 30,
	},
});

export default TabNavigator;
