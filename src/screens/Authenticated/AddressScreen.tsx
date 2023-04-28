import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { addressData } from '../../data/user';
import { getWidthnHeight } from '../../helpers/responsiveFontSize';
import ScreenWithImageHeader from '../../layouts/ScreenWithImageHeader';
import { colors, fonts } from '../../themes';
import { AuthenticatedStackScreenProps } from '../../types/navigation';

const AddressScreen: React.FC<
	AuthenticatedStackScreenProps<'AddressScreen'>
> = ({ navigation }) => {
	return (
		<ScreenWithImageHeader
			title='My Address'
			titleStyle={{ fontFamily: fonts.Ovo }}
			containerStyle={{ paddingVertical: getWidthnHeight(5).width }}
			backButton={true}
		>
			<FlatList
				data={addressData}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						{item.label === 'Home' ? (
							<Ionicons
								name='home-outline'
								color='black'
								size={getWidthnHeight(6).width}
							/>
						) : item.label === 'Work' ? (
							<MaterialCommunityIcons
								name='office-building-marker'
								color='black'
								size={getWidthnHeight(6).width}
							/>
						) : (
							<Entypo
								name='location'
								color='black'
								size={getWidthnHeight(6).width}
							/>
						)}
						<View
							style={{
								paddingHorizontal: getWidthnHeight(3).width,
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<Text style={styles.addressLabel}>
									{item.label}
								</Text>
								<Pressable
									style={{
										backgroundColor: colors.grey,
										borderRadius: 50,
										width: getWidthnHeight(6).width,
										height: getWidthnHeight(6).width,
										justifyContent: 'center',
										alignItems: 'center',
									}}
									onPress={() =>
										navigation.navigate('LocationScreen', {
											fromAddressScreen: true,
											address: item,
										})
									}
								>
									<MaterialIcons
										name='mode-edit'
										color={colors.primaryRed}
										size={getWidthnHeight(3.5).width}
									/>
								</Pressable>
							</View>
							<Text style={styles.address}>{item.address}</Text>
						</View>
					</View>
				)}
				ListHeaderComponent={() => (
					<View style={styles.listHeader}>
						<Text style={styles.listHeaderText}>Add Address</Text>
						<Pressable
							onPress={() =>
								navigation.navigate('LocationScreen', {
									fromAddressScreen: true,
									address: undefined,
								})
							}
						>
							<Ionicons
								name='add-circle'
								color={colors.primaryRed}
								size={getWidthnHeight(7).width}
							/>
						</Pressable>
					</View>
				)}
				ItemSeparatorComponent={() => (
					<View
						style={{
							borderBottomColor: colors.lightGrey,
							borderBottomWidth: 1,
						}}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenWithImageHeader>
	);
};

const styles = StyleSheet.create({
	listHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: colors.lightGrey,
		borderBottomWidth: 1,
		paddingTop: getWidthnHeight(1).width,
		paddingBottom: getWidthnHeight(4).width,
	},
	listHeaderText: {
		color: 'black',
		fontFamily: fonts.OxygenBold,
		fontSize: getWidthnHeight(6).width,
	},
	listItem: {
		flexDirection: 'row',
		paddingVertical: getWidthnHeight(4).width,
		paddingHorizontal: getWidthnHeight(2.5).width,
	},
	addressLabel: {
		fontFamily: fonts.OxygenBold,
		fontSize: getWidthnHeight(4).width,
		color: 'black',
		paddingRight: getWidthnHeight(2.5).width,
	},
	address: {
		fontFamily: fonts.OxygenBold,
		fontSize: getWidthnHeight(3.5).width,
		color: 'black',
		paddingRight: getWidthnHeight(1.5).width,
	},
});

export default AddressScreen;
