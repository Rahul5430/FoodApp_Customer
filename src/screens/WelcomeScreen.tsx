import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MaterialTextInput from '../components/MaterialTextInput/MaterialTextInput';
import OtpInputs from '../components/OTPInputs';
import { getWidthnHeight, RFValue } from '../helpers/responsiveFontSize';
import { validatePhone } from '../helpers/utils';
import { colors } from '../themes';

type DetailsError = {
	phone: string;
	otp: string;
	name: string;
	email: string;
};

const WelcomeScreen = () => {
	const [error, setError] = useState<DetailsError>({
		phone: '',
		otp: '',
		name: '',
		email: '',
	});
	const [userPhone, setUserPhone] = useState('1234567890');
	const [otp, setOtp] = useState('');
	const [newUser, setNewUser] = useState(true);
	const [step, setStep] = useState(0);

	const screenWidth = getWidthnHeight(100).width;
	const aspectRatio = 237 / 428;
	const imageHeight = aspectRatio * screenWidth;

	const handleOnPress = () => {
		if (step === 0) {
			if (validatePhone(userPhone)) {
				if (error.phone) {
					setError({ ...error, phone: '' });
				}
				setStep(1);
			} else {
				setError({
					...error,
					phone: 'Please enter valid phone number',
				});
			}
		} else if (step === 1) {
			if (otp.length === 6) {
				if (error.otp) {
					setError({ ...error, otp: '' });
				}
				setStep(2);
			} else {
				setError({ ...error, otp: 'Invalid Code' });
			}
		} else if (step === 2) {
			setStep(3);
		} else if (step === 3) {
			setStep(4);
		}
	};

	const otpCodeChanged = (otpCode: string) => {
		console.log(otpCode);
		setOtp(otpCode);
	};

	return (
		<View>
			<FocusAwareStatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
			/>
			<ImageBackground
				source={require('../assets/cakebanner.png')}
				style={{
					width: screenWidth,
					height: imageHeight,
					justifyContent: 'center',
				}}
			>
				<Text style={styles.heading}>{"Baker's in"}</Text>
			</ImageBackground>
			<Surface style={styles.container}>
				<View style={styles.avatar}>
					<Fontisto name='person' size={40} />
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={styles.text}>Hi.</Text>
					<MaterialCommunityIcons
						name='hand-wave'
						size={getWidthnHeight(5).width}
						style={{ paddingLeft: 10 }}
					/>
				</View>
				<Text style={styles.text}>{"Let's get started"}</Text>
				{step === 0 && (
					<MaterialTextInput
						value={userPhone}
						onChangeText={(text: string) => {
							if (!validatePhone(text)) {
								setError({
									...error,
									phone: 'Please enter valid phone number',
								});
							} else {
								setError({
									...error,
									phone: '',
								});
							}
							setUserPhone(text);
						}}
						variant='standard'
						label='Mobile number'
						placeholder='Enter your number'
						leadingContainerStyle={{ width: 30 }}
						style={{
							marginVertical: getWidthnHeight(10).width,
						}}
						leading={
							<Text
								style={{
									fontFamily: 'Ovo',
									fontSize: RFValue(16),
									color: 'black',
								}}
								adjustsFontSizeToFit
								numberOfLines={1}
							>
								+91
							</Text>
						}
						helperText={error.phone}
						autoComplete='tel'
						inputMode='numeric'
						keyboardType='numeric'
						textContentType='telephoneNumber'
						onEndEditing={({ nativeEvent }) => {
							if (!validatePhone(nativeEvent.text)) {
								setError({
									...error,
									phone: 'Please enter valid phone number',
								});
							} else {
								setError({
									...error,
									phone: '',
								});
							}
						}}
					/>
				)}
				{step === 1 && (
					<View style={{ marginVertical: getWidthnHeight(10).width }}>
						<Text style={styles.otpHeading}>Enter The Otp</Text>
						<OtpInputs
							handleChange={(code: string) =>
								otpCodeChanged(code)
							}
							numberOfInputs={6}
							keyboardType='numeric'
							focusStyles={styles.otpInputFocused}
							inputContainerStyles={styles.otpInputContainer}
							inputStyles={styles.otpInput}
							style={styles.otp}
						/>
					</View>
				)}
				<Button
					mode='contained'
					style={styles.button}
					onPress={handleOnPress}
				>
					Continue
				</Button>
			</Surface>
		</View>
	);
};

const styles = StyleSheet.create({
	heading: {
		color: 'white',
		textAlign: 'center',
		fontSize: getWidthnHeight(10).width,
		textAlignVertical: 'center',
	},
	container: {
		borderRadius: 10,
		backgroundColor: 'white',
		marginHorizontal: 20,
		paddingHorizontal: 20,
		marginTop: -30,
		flexGrow: 1,
	},
	avatar: {
		backgroundColor: 'red',
		borderRadius: 50,
		width: getWidthnHeight(20).width,
		height: getWidthnHeight(20).width,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginVertical: getWidthnHeight(6).width,
	},
	text: {
		color: 'black',
		fontSize: getWidthnHeight(5).width,
		textAlign: 'center',
	},
	otpHeading: {
		color: colors.lightInputGrey,
		fontSize: getWidthnHeight(3.5).width,
	},
	otp: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
		backgroundColor: 'white',
	},
	otpInputContainer: {
		borderBottomWidth: 2,
		borderColor: colors.lightInputGrey,
	},
	otpInput: {
		fontSize: getWidthnHeight(8).width,
		fontFamily: 'Ovo',
		paddingHorizontal: 10,
		paddingVertical: 2,
		textAlign: 'center',
		backgroundColor: 'transparent',
		color: 'black',
	},
	otpInputFocused: {
		borderColor: colors.darkRed,
	},
	button: {
		marginBottom: getWidthnHeight(10).width,
	},
});

export default WelcomeScreen;
