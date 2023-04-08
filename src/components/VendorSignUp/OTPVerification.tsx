import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import OTPVerifyLogo from '../../assets/OTPVerifyLogo.jpeg';
import { colors } from '../../themes';
import OTPInputs from '../OTPInputs';
import { RFValue, getWidthnHeight } from '../../helpers/responsiveFontSize';
import { useState } from 'react';
import { DefaultPageProps } from '../../screens/VendorSignUpScreen';

interface PageProps extends DefaultPageProps {
	signInWithPhoneNumber: (phoneNumber?: string) => void;
	verifyOTP: (code: string) => void;
}

const OTPVerification = ({
	handlePageChange,
	vendorData,
	verifyOTP,
	signInWithPhoneNumber,
}: PageProps) => {
	const [otp, setOtp] = useState('');
	const [error, setError] = useState(null);

	const otpCodeChanged = (otpCode: string) => {
		console.log(error);
		if (!error) {
			setError(null);
		}
		console.log(otpCode);
		setOtp(otpCode);
	};

	return (
		<View style={styles.screen}>
			<Image source={OTPVerifyLogo} style={styles.image} />
			<Text style={styles.heading}>OTP Verification</Text>
			<Text style={styles.subHeading}>
				Enter the OTP in the below field
			</Text>
			<OTPInputs
				handleChange={(code: string) => otpCodeChanged(code)}
				numberOfInputs={6}
				keyboardType='numeric'
				focusStyles={styles.otpInputFocused}
				inputContainerStyles={{
					...styles.otpInputContainer,
					borderColor:
						vendorData.isPhoneVerified && otp.length === 6
							? 'green'
							: colors.lightInputGrey,
				}}
				inputStyles={{
					...styles.otpInput,
					color:
						vendorData.isPhoneVerified && otp.length === 6
							? 'green'
							: 'black',
				}}
				style={styles.otp}
				editable={!(vendorData.isPhoneVerified && otp.length === 6)}
			/>
			<Pressable onPress={() => signInWithPhoneNumber()}>
				<Text
					style={{
						...styles.subHeading,
						color: colors.darkRed,
						textDecorationLine: 'underline',
						marginVertical: 10,
					}}
				>
					Resend OTP
				</Text>
			</Pressable>
			<View style={styles.btnContainer}>
				<Pressable
					style={{ ...styles.btn, marginRight: 7 }}
					onPress={() => handlePageChange(0)}
				>
					<Text style={styles.btnText}>Back</Text>
				</Pressable>
				<Pressable
					style={{ ...styles.btn, marginLeft: 7 }}
					onPress={() =>
						vendorData.isPhoneVerified && otp.length === 6
							? handlePageChange(2)
							: verifyOTP(otp)
					}
				>
					<Text style={styles.btnText}>
						{vendorData.isPhoneVerified && otp.length === 6
							? 'Next'
							: 'Verify'}
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		paddingTop: 10,
		paddingHorizontal: 10,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	image: {
		width: 250,
		height: 250,
	},
	heading: {
		color: colors.darkRed,
		fontSize: RFValue(24),
		textAlign: 'center',
		fontFamily: 'Ovo',
	},
	subHeading: {
		color: colors.black,
		fontSize: RFValue(16),
		textAlign: 'center',
		fontFamily: 'Ovo',
	},
	otp: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
		backgroundColor: 'white',
	},
	otpInputContainer: {
		borderWidth: 1,
		borderRadius: 20,
		marginHorizontal: 5,
	},
	otpInput: {
		fontSize: RFValue(40),
		fontFamily: 'Ovo',
		paddingHorizontal: 10,
		paddingVertical: 2,
		textAlign: 'center',
		backgroundColor: 'transparent',
	},
	otpInputFocused: {
		borderColor: colors.darkRed,
	},
	btnContainer: {
		marginTop: 10,
		flexDirection: 'row',
		backgroundColor: 'white',
	},
	btn: {
		backgroundColor: colors.darkRed,
		borderRadius: 50,
		paddingVertical: 10,
		paddingHorizontal: 20,
		width: getWidthnHeight(40).width,
	},
	btnText: {
		color: 'white',
		textTransform: 'uppercase',
		textAlign: 'center',
		fontFamily: 'Ovo',
		fontSize: RFValue(16),
	},
});

export default OTPVerification;
