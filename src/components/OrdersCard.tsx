import { Image, StyleSheet, Text, View } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../themes';
import { Order } from '../screens/OrdersScreen';

interface OrdersCardProps {
	order: Order;
	receipt: () => void;
	reorder: () => void;
}

const OrdersCard = ({ order, receipt, reorder }: OrdersCardProps) => {
	return (
		<Card style={styles.orders}>
			<View style={styles.orderHeader}>
				<Text style={styles.orderVendorName}>{order?.vendorName}</Text>
			</View>
			{order.items.map((item, index) => (
				<View style={styles.orderDetails} key={`${item.name}-${index}`}>
					<View style={styles.leftOrderDetails}>
						<Image source={item.img} style={styles.img} />
						<View style={styles.stars}>
							<MaterialIcons
								name='star-border'
								size={15}
								style={styles.starSelected}
							/>
							<MaterialIcons
								name='star-border'
								size={15}
								style={styles.starSelected}
							/>
							<MaterialIcons
								name='star-border'
								size={15}
								style={styles.starSelected}
							/>
							<MaterialIcons
								name='star-border'
								size={15}
								style={styles.starSelected}
							/>
							<MaterialIcons
								name='star-border'
								size={15}
								style={styles.starUnselected}
							/>
						</View>
					</View>
					<View style={styles.rightOrderDetails}>
						<Text style={styles.orderTitle}>{item.name}</Text>
						<Text style={styles.orderDescription}>
							{item.description}
						</Text>
						<View style={{ flexDirection: 'row' }}>
							{item.customization.map((customization, idx) => (
								<View
									style={styles.orderCustomization}
									key={`${customization}-${idx}`}
								>
									<Text style={styles.orderCustomizationText}>
										{customization}
									</Text>
								</View>
							))}
						</View>
						<Text style={styles.orderDate}>
							<Text>{item.date}</Text>
							<Text>{' | '}</Text>
							<Text>{item.time}</Text>
						</Text>
					</View>
				</View>
			))}
			<View style={styles.orderFooter}>
				<TouchableRipple
					borderless
					style={styles.orderBtn}
					onPress={() => reorder()}
				>
					<Text style={styles.orderBtnText}>Reorder</Text>
				</TouchableRipple>
				<TouchableRipple
					borderless
					style={styles.orderBtn}
					onPress={() => receipt()}
				>
					<Text style={styles.orderBtnText}>Receipt</Text>
				</TouchableRipple>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	orders: {
		borderRadius: 5,
		borderColor: colors.primaryButton,
		backgroundColor: colors.white,
		margin: 10,
	},
	orderHeader: {
		backgroundColor: colors.primaryButton,
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},
	orderVendorName: {
		color: colors.white,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		paddingHorizontal: 4,
		paddingVertical: 5,
		marginLeft: 12,
	},
	orderDetails: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.lightGrey,
	},
	leftOrderDetails: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginHorizontal: 10,
	},
	stars: {
		display: 'flex',
		flexDirection: 'row',
		marginVertical: 5,
	},
	starUnselected: {
		color: colors.black,
	},
	starSelected: {
		color: '#ffb300',
	},
	rightOrderDetails: {
		marginHorizontal: 10,
		alignItems: 'flex-start',
	},
	orderTitle: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	orderDescription: {
		color: colors.darkGrey,
		fontWeight: '500',
	},
	orderCustomization: {
		borderWidth: 1,
		borderColor: colors.primaryButton,
		borderRadius: 50,
		marginVertical: 6,
	},
	orderCustomizationText: {
		color: colors.primaryButton,
		paddingVertical: 3,
		paddingHorizontal: 10,
		fontWeight: '500',
	},
	orderDate: {
		color: colors.darkGrey,
		fontWeight: '500',
	},
	orderFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	orderBtn: {
		backgroundColor: colors.primaryButton,
		marginVertical: 10,
		marginRight: 15,
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 50,
	},
	orderBtnText: {
		textTransform: 'uppercase',
		color: colors.white,
		padding: 5,
		fontWeight: 'bold',
	},
});

export default OrdersCard;
