import { Pressable, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../../themes';

const TabHeader = (props) => {
	const navigation = props.navigation;

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const goBack = () => {
		navigation.navigate('Profile');
	};

	if (props?.route?.name === 'Order') {
		return (
			<View style={styles.view}>
				<View style={styles.drawerTitle}>
					<Pressable onPress={goBack}>
						<View style={styles.drawerTitleLeft}>
							<Entypo
								name='chevron-left'
								color={colors.primaryButton}
								size={13}
							/>
							<Text style={styles.drawerTitleText}>Back</Text>
						</View>
					</Pressable>
					<Pressable onPress={openDrawer}>
						<Feather name='menu' color={'black'} size={30} />
					</Pressable>
				</View>
				<View style={styles.myOrdersTitle}>
					<Text style={styles.myOrdersTitleText}>{'My Orders'}</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.view}>
			<View style={{ paddingTop: 5, paddingBottom: 10 }}>
				<View style={styles.drawerTitle}>
					<Text style={styles.myOrdersTitleText}>
						{props?.route?.name}
					</Text>
					<Pressable onPress={openDrawer}>
						<Feather name='menu' color={'black'} size={30} />
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		paddingTop: Constants.statusBarHeight,
		paddingHorizontal: 10,
		backgroundColor: 'white',
		borderWidth: 0,
		borderColor: 'red',
	},
	drawerTitle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 4,
	},
	drawerTitleLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	drawerTitleText: {
		color: colors.primaryButton,
		fontSize: 13,
	},
	myOrdersTitle: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingTop: 5,
		paddingBottom: 10,
	},
	myOrdersTitleText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default TabHeader;
