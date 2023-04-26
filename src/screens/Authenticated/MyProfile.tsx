import {
	FlatList,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import CartoonUser from '../../assets/images/cartoonuser.png';
import { getWidthnHeight } from '../../helpers/responsiveFontSize';
import ScreenWithImageHeader from '../../layouts/ScreenWithImageHeader';
import { colors, fonts } from '../../themes';
import { AuthenticatedStackScreenProps } from '../../types/navigation';

const MyProfile: React.FC<AuthenticatedStackScreenProps<'MyProfile'>> = ({
	navigation,
}) => {
	const myProfileList = [
		{
			icon: (
				<MaterialCommunityIcons
					name='calendar-month-outline'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'Special Dates',
			onPress: () => navigation.navigate('AddDate'),
		},
		{
			icon: (
				<MaterialCommunityIcons
					name='notebook'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'My Orders',
			onPress: () => navigation.navigate('MyOrders'),
		},
		{
			icon: (
				<MaterialCommunityIcons
					name='cart-outline'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'My Cart',
			onPress: () => {
				console.log('Pressed My Cart');
			},
		},
		{
			icon: (
				<MaterialCommunityIcons
					name='map-marker-outline'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'Address',
			onPress: () => navigation.navigate('AddressScreen'),
		},
		{
			icon: (
				<MaterialCommunityIcons
					name='cash-multiple'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'Wallet',
			onPress: () => navigation.navigate('PaymentsScreen'),
		},
		{
			icon: (
				<Ionicons
					name='settings-sharp'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'Settings',
			onPress: () => {
				console.log('Pressed Settings');
			},
		},
		{
			icon: (
				<MaterialCommunityIcons
					name='account-question'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'Help',
			onPress: () => {
				console.log('Pressed Help');
			},
		},
		{
			icon: (
				<Octicons
					name='comment-discussion'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'FAQ',
			onPress: () => {
				console.log('Pressed FAQ');
			},
		},
		{
			icon: (
				<MaterialIcons
					name='logout'
					color={colors.primaryRed}
					size={getWidthnHeight(5).width}
				/>
			),
			name: 'Logout',
			onPress: () => {
				console.log('Pressed Logout');
			},
		},
	];

	return (
		<ScreenWithImageHeader
			title='My Profile'
			titleStyle={{ fontFamily: fonts.Ovo }}
			containerStyle={[
				Platform.OS === 'ios' && {
					paddingBottom: getWidthnHeight(5).width,
				},
			]}
			backButton={true}
		>
			<View
				style={{
					flexDirection: 'row',
					marginVertical: getWidthnHeight(5).width,
				}}
			>
				<View style={styles.avatar}>
					<Image source={CartoonUser} style={styles.image} />
				</View>
				<Text style={styles.userName}>Manthan Rawat</Text>
				<View style={styles.editContainer}>
					<MaterialIcons
						name='mode-edit'
						color={colors.primaryRed}
						size={getWidthnHeight(6).width}
					/>
				</View>
			</View>
			<FlatList
				data={myProfileList}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => (
					<TouchableOpacity key={item.name} onPress={item.onPress}>
						<View style={styles.profileListOption}>
							<View style={styles.profileListOptionIcon}>
								{item.icon}
							</View>
							<Text style={styles.profileListOptionName}>
								{item.name}
							</Text>
							<MaterialIcons
								name='chevron-right'
								size={getWidthnHeight(6).width}
								color='black'
								style={{ alignSelf: 'center' }}
							/>
						</View>
					</TouchableOpacity>
				)}
				ItemSeparatorComponent={() => (
					<View
						style={{
							borderBottomColor: colors.lightGrey,
							borderBottomWidth: 1,
						}}
					/>
				)}
				ListFooterComponent={() => (
					<View
						style={{
							marginBottom: getWidthnHeight(3).width,
						}}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenWithImageHeader>
	);
};

const styles = StyleSheet.create({
	avatar: {
		backgroundColor: colors.primaryRed,
		borderRadius: 50,
		width: getWidthnHeight(20).width,
		height: getWidthnHeight(20).width,
		justifyContent: 'flex-end',
		alignItems: 'center',
		alignSelf: 'center',
		marginRight: getWidthnHeight(2).width,
	},
	image: {
		width: getWidthnHeight(16).width,
		height: getWidthnHeight(16).width,
		marginBottom: getWidthnHeight(0.4).width,
	},
	userName: {
		color: 'black',
		fontFamily: fonts.Ovo,
		fontSize: getWidthnHeight(6).width,
		textAlign: 'center',
		alignSelf: 'center',
		flex: 1,
	},
	editContainer: {
		backgroundColor: colors.lightGrey,
		borderRadius: 50,
		width: getWidthnHeight(10).width,
		height: getWidthnHeight(10).width,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -getWidthnHeight(7.5).width,
		marginRight: -getWidthnHeight(7.5).width,
	},
	profileListOption: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: getWidthnHeight(1.8).width,
		paddingVertical: getWidthnHeight(2.4).width,
	},
	profileListOptionIcon: {
		backgroundColor: colors.lightGrey,
		borderRadius: 50,
		width: getWidthnHeight(10).width,
		height: getWidthnHeight(10).width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileListOptionName: {
		fontFamily: fonts.Ovo,
		fontSize: getWidthnHeight(4.075).width,
		color: 'black',
		flex: 1,
		paddingLeft: getWidthnHeight(3.5).width,
	},
});

export default MyProfile;
