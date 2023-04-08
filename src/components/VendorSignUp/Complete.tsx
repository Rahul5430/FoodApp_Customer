import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../themes';
import { RFValue, getWidthnHeight } from '../../helpers/responsiveFontSize';
import { VendorData } from '../../screens/VendorSignUpScreen';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setLoggedIn, setUserType } from '../../store/reducers/userSlice';

const Complete = ({ vendorData }: { vendorData: VendorData }) => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Congratulations!!</Text>
			<View style={{ flexDirection: 'row', marginVertical: 10 }}>
				<Text style={styles.subTitle}>Welcome </Text>
				<Text style={{ ...styles.subTitle, color: colors.golden }}>
					{vendorData.uniqueBusinessName}
				</Text>
			</View>
			<Pressable
				style={styles.btn}
				onPress={() => {
					dispatch(setLoggedIn(true));
					dispatch(setUserType('VENDOR'));
				}}
			>
				<Text style={styles.btnText}>GO TO PROFILE</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		paddingTop: 40,
		width: getWidthnHeight(100).width,
		alignItems: 'center',
		backgroundColor: colors.primaryButton,
	},
	title: {
		fontSize: RFValue(28),
		color: 'white',
		fontFamily: 'Ovo',
	},
	subTitle: {
		fontSize: RFValue(18),
		color: 'white',
		fontFamily: 'Ovo',
	},
	btn: {
		backgroundColor: colors.golden,
		width: '80%',
		borderRadius: 50,
		marginVertical: 10,
	},
	btnText: {
		color: 'white',
		marginVertical: 10,
		marginHorizontal: 70,
		textAlign: 'center',
		fontFamily: 'Ovo',
		fontSize: RFValue(18),
	},
});

export default Complete;
