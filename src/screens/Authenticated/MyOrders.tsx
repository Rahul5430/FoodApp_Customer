import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Ratings from '../../components/Ratings';
import VegNonveg from '../../components/VegNonveg';
import { ordersData, restaurantData } from '../../data/orders';
import { getWidthnHeight } from '../../helpers/responsiveFontSize';
import { responsiveImageHeight } from '../../helpers/responsiveImageSize';
import ScreenWithImageHeader from '../../layouts/ScreenWithImageHeader';
import { colors, fonts } from '../../themes';
import { Order, Restaurant } from '../../types/data';
import { AuthenticatedStackScreenProps } from '../../types/navigation';

const OrderCard = ({ order }: { order: Order }) => {
	const restaurant = restaurantData.find(
		(item) => item.id === order.restaurantID
	) as Restaurant;
	const { height, width } = Image.resolveAssetSource(restaurant.logo);

	return (
		<View style={styles.orderCard}>
			<View style={styles.orderHeader}>
				<Surface elevation={2}>
					<Image
						source={restaurant.logo}
						style={{
							width: getWidthnHeight(19).width,
							height: responsiveImageHeight(
								width,
								height,
								getWidthnHeight(19).width
							),
						}}
						resizeMode='contain'
					/>
				</Surface>
				<View
					style={{
						flex: 1,
						paddingHorizontal: getWidthnHeight(2).width,
					}}
				>
					<Text style={styles.bakerName}>{restaurant.name}</Text>
					<Text style={styles.bakerDetails}>Open time 10:00 Am</Text>
					<Text style={styles.bakerItem}>{order.items[0].name}</Text>
					<Text style={styles.bakerDetails}>Sector 74, Mohali</Text>
				</View>
				<Ratings
					rating={restaurant.rating}
					reviews={restaurant.reviews}
					style={{ width: getWidthnHeight(16.5).width }}
				/>
			</View>
			<View style={styles.orderItemsContainer}>
				<View style={styles.leftOrderItems}>
					<FlatList
						data={order.items}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => (
							<View style={styles.orderItem}>
								<VegNonveg
									type={item.type}
									style={{
										width: getWidthnHeight(4).width,
										height: getWidthnHeight(4).width,
										alignSelf: 'center',
									}}
								/>
								<Text
									style={styles.orderItemText}
									numberOfLines={1}
								>
									<Text style={{ color: colors.lightInput }}>
										{item.quantity} X{' '}
									</Text>
									{item.name}
								</Text>
							</View>
						)}
					/>
				</View>
				<View>
					<Button
						compact
						buttonColor={colors.lightBlack}
						style={styles.storeButton}
						labelStyle={[
							styles.buttonText,
							{
								paddingHorizontal: getWidthnHeight(2).width,
								fontSize: getWidthnHeight(3).width,
							},
						]}
						onPress={() => console.log('Go to the store')}
					>
						Go to the store
					</Button>
				</View>
			</View>
			<View style={styles.orderTimeContainer}>
				<Text style={styles.orderTimeText}>{order.date}</Text>
				<Text style={styles.orderAmount}>
					<FontAwesome
						name='rupee'
						size={getWidthnHeight(3.5).width}
						color={'black'}
					/>
					{order.amount}
				</Text>
			</View>
			<View style={styles.orderButtonsContainer}>
				<Button
					compact
					buttonColor={colors.primaryButton}
					style={styles.button}
					labelStyle={[
						styles.buttonText,
						{ paddingHorizontal: getWidthnHeight(1.3).width },
					]}
					onPress={() => console.log('Reorder')}
					icon={() => (
						<FontAwesome5
							name='undo'
							color='white'
							size={getWidthnHeight(2.6).width}
						/>
					)}
				>
					Reorder
				</Button>
				<Button
					compact
					buttonColor={colors.grey}
					style={styles.button}
					labelStyle={[
						styles.buttonText,
						{
							paddingHorizontal: getWidthnHeight(1.3).width,
							color: 'black',
						},
					]}
					onPress={() => console.log('Receipt')}
					icon={() => (
						<Ionicons
							name='receipt'
							color='black'
							size={getWidthnHeight(3.5).width}
						/>
					)}
				>
					Receipt
				</Button>
				<Button
					compact
					buttonColor={
						order.status === 'Delivered'
							? colors.green
							: colors.darkGrey
					}
					style={styles.button}
					labelStyle={styles.buttonText}
					onPress={() => console.log(order.status)}
				>
					{order.status}
				</Button>
			</View>
		</View>
	);
};

const MyOrders: React.FC<AuthenticatedStackScreenProps<'MyOrders'>> = () => {
	return (
		<ScreenWithImageHeader
			title='My Orders'
			titleStyle={{ fontFamily: fonts.Ovo }}
			containerStyle={{ paddingVertical: getWidthnHeight(5).width }}
			backButton={true}
		>
			<FlatList
				data={ordersData}
				keyExtractor={(item, index) => `${index}-${item.date}`}
				renderItem={({ item }) => <OrderCard order={item} />}
				ItemSeparatorComponent={() => (
					<View style={{ padding: getWidthnHeight(2.5).width }} />
				)}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenWithImageHeader>
	);
};

const styles = StyleSheet.create({
	orderCard: {
		padding: getWidthnHeight(1).width,
		borderRadius: 9,
		borderWidth: 1,
		borderColor: colors.lightGrey,
	},
	orderHeader: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		marginVertical: getWidthnHeight(2).width,
		marginHorizontal: getWidthnHeight(1.5).width,
	},
	bakerName: {
		fontSize: getWidthnHeight(6).width,
		fontFamily: fonts.OxygenBold,
		color: 'black',
	},
	bakerDetails: {
		fontSize: getWidthnHeight(3.5).width,
		fontFamily: fonts.Ovo,
		color: colors.lightInput,
	},
	bakerItem: {
		fontSize: getWidthnHeight(3.819).width,
		fontFamily: fonts.PoppinsMedium,
		color: 'black',
	},
	orderItemsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: getWidthnHeight(2).width,
		marginLeft: getWidthnHeight(1.5).width,
	},
	leftOrderItems: {
		flex: 1,
	},
	orderItem: {
		flexDirection: 'row',
	},
	orderItemText: {
		fontSize: getWidthnHeight(3.7).width,
		fontFamily: fonts.PoppinsMedium,
		color: 'black',
		paddingLeft: getWidthnHeight(2).width,
	},
	storeButton: {
		borderRadius: 20,
		marginHorizontal: getWidthnHeight(1).width,
	},
	orderTimeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: getWidthnHeight(2).width,
		marginHorizontal: getWidthnHeight(1.5).width,
	},
	orderTimeText: {
		fontSize: getWidthnHeight(4).width,
		fontFamily: fonts.Ovo,
		color: colors.lightInput,
	},
	orderAmount: {
		fontSize: getWidthnHeight(4).width,
		fontFamily: fonts.PoppinsMedium,
		color: 'black',
		textAlignVertical: 'bottom',
	},
	orderButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: getWidthnHeight(2).width,
	},
	button: {
		borderRadius: 20,
		marginHorizontal: getWidthnHeight(1).width,
		flex: 1,
	},
	buttonText: {
		fontSize: getWidthnHeight(3.5).width,
		fontFamily: fonts.PoppinsRegular,
		color: 'white',
		marginLeft: 0,
		marginVertical: getWidthnHeight(1).width,
		marginHorizontal: getWidthnHeight(0).width,
	},
});

export default MyOrders;
