import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import { colors, fonts } from '../themes';

const MyTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const { bottom } = useSafeAreaInsets();

	const renderIcon = (routeName: string) => {
		switch (routeName) {
			case 'HomeScreen':
				return (
					<View style={styles.iconContainer}>
						<Octicons name='home' color='white' size={15} />
					</View>
				);
			case 'SearchScreen':
				return (
					<View style={styles.iconContainer}>
						<MaterialIcons name='search' color='white' size={17} />
					</View>
				);
			case 'MyCartScreen':
				return (
					<View style={styles.iconContainer}>
						<MaterialCommunityIcons
							name='cart-outline'
							color='white'
							size={15}
						/>
					</View>
				);
			case 'MyOrders':
				return (
					<View style={styles.iconContainer}>
						<MaterialIcons
							name='delivery-dining'
							color='white'
							size={18}
						/>
					</View>
				);
			case 'MyProfile':
				return (
					<MaterialCommunityIcons
						name='account-circle'
						color={colors.primaryRed}
						size={27}
						style={{
							marginHorizontal: 10,
							marginVertical: 5,
							width: 25,
							height: 25,
						}}
					/>
				);
			default:
				return <Octicons name='home' color='white' size={15} />;
		}
	};
	const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (
		focusedOptions.tabBarStyle &&
		// @ts-expect-error Property 'display' does not exist on type 'RegisteredStyle<ViewStyle>'.
		focusedOptions.tabBarStyle.display === 'none'
	) {
		return null;
	}

	return (
		<View style={[styles.tabBar, { paddingBottom: bottom / 2 }]}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};
				return (
					<Pressable
						key={route.key}
						accessibilityRole='button'
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{ flex: 1, alignItems: 'center' }}
					>
						<View
							style={[
								styles.tab,
								isFocused && styles.selectedTab,
							]}
						>
							{renderIcon(route.name)}
						</View>
						<Text style={styles.label}>{label as string}</Text>
					</Pressable>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	tab: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectedTab: {
		backgroundColor: colors.bgGrey,
		borderBottomLeftRadius: 9,
		borderBottomRightRadius: 9,
	},
	iconContainer: {
		borderRadius: 50,
		backgroundColor: colors.primaryRed,
		marginHorizontal: 10,
		marginVertical: 5,
		width: 25,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		fontSize: 15,
		fontFamily: fonts.PoppinsRegular,
		lineHeight: 22,
		color: 'black',
	},
});

export default MyTabBar;
