/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFocusEffect } from '@react-navigation/native';
import React, {
	RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	BackHandler,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CartoonUser from '../assets/images/cartoonuser.png';
import MaterialTextInput from '../components/MaterialTextInput/MaterialTextInput';
import OtpInputs from '../components/OTPInputs';
import { getWidthnHeight, RFValue } from '../helpers/responsiveFontSize';
import { validateEmail, validatePhone } from '../helpers/utils';
import ScrollViewWithImageHeader from '../layouts/ScrollViewWithImageHeader';
import { colors, fonts } from '../themes';
import { WelcomeStackScreenProps } from '../types/navigation';

type DetailsError = {
	phone: string;
	otp: string;
	name: string;
	email: string;
};

const CORRECT_OTP = '123456';

const WelcomeScreen = ({
	navigation,
}: WelcomeStackScreenProps<'WelcomeScreen'>) => {
	const [error, setError] = useState<DetailsError>({
		phone: '',
		otp: '',
		name: '',
		email: '',
	});
	const [userPhone, setUserPhone] = useState('1234567890');
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [newUser, setNewUser] = useState(true);
	const [step, setStep] = useState(0);

	// @ts-ignore
	const otpRef: RefObject<OtpInputs> = useRef();
	const emailRef = useRef<TextInput>(null);

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
			if (otp.length === 6 && otp === CORRECT_OTP) {
				if (error.otp) {
					setError({ ...error, otp: '' });
				}
				setOtp('');
				if (newUser) {
					setStep(2);
				}
			} else {
				setError({ ...error, otp: 'Invalid OTP' });
			}
		} else if (step === 2) {
			if (userName) {
				if (userEmail && !validateEmail(userEmail)) {
					setError({
						...error,
						email: 'Please enter valid email',
					});
				} else {
					setError({ ...error, name: '', email: '' });
					navigation.navigate('LocationScreen', {
						fromAddressScreen: false,
						address: undefined,
					});
				}
			} else {
				setError({
					...error,
					name: 'Please enter your name',
				});
			}
		}
	};

	const otpCodeChanged = (otpCode: string) => {
		console.log(otpCode);
		setOtp(otpCode);
	};

	useEffect(() => {
		if (error.otp) {
			if (otp.length === 6) {
				const toast = Toast.show('Invalid OTP');
			} else {
				const toast = Toast.show('Please enter OTP');
			}
		}
	}, [error.otp, otp]);

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				if (step > 0) {
					setStep(0);
					return true;
				} else {
					return false;
				}
			};

			const subscription = BackHandler.addEventListener(
				'hardwareBackPress',
				onBackPress
			);

			return () => subscription.remove();
		}, [step])
	);

	return (
		<ScrollViewWithImageHeader title={"Baker's in"}>
			<View style={styles.avatar}>
				<Image source={CartoonUser} style={styles.image} />
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text
					style={[
						styles.text,
						{ marginTop: getWidthnHeight(3).width },
					]}
				>
					Hi.
				</Text>
				<MaterialCommunityIcons
					name='hand-wave'
					size={getWidthnHeight(7).width}
					color={colors.primaryButton}
					style={{ paddingLeft: 10 }}
				/>
			</View>
			<Text
				style={[
					styles.text,
					{ marginVertical: getWidthnHeight(3).width },
				]}
			>
				{"Let's get started"}
			</Text>
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
					label=''
					placeholder='Enter your number'
					leadingContainerStyle={{
						width: 40,
						borderRightWidth: 1,
						paddingRight: getWidthnHeight(2).width,
					}}
					style={{
						marginTop: getWidthnHeight(8).width,
						marginBottom: getWidthnHeight(10).width,
					}}
					leading={
						<Text
							style={{
								fontFamily: fonts.Ovo,
								fontSize: RFValue(18),
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
				<View
					style={{
						marginVertical: getWidthnHeight(10).width,
					}}
				>
					<Text style={styles.otpHeading}>Enter The Otp</Text>
					<OtpInputs
						ref={otpRef}
						handleChange={(code: string) => otpCodeChanged(code)}
						numberOfInputs={6}
						keyboardType='numeric'
						focusStyles={styles.otpInputFocused}
						activeStyles={styles.otpInputActive}
						inputContainerStyles={[
							styles.otpInputContainer,
							!!error.otp &&
								otp.length === 6 && {
									borderRadius: 10,
									backgroundColor: 'red',
									borderBottomWidth: 0,
								},
						]}
						inputStyles={[
							styles.otpInput,
							!!error.otp &&
								otp.length === 6 && {
									color: 'white',
								},
						]}
						style={styles.otp}
						onFocus={() => {
							if (error.otp) {
								otpRef.current.reset();
								setError({ ...error, otp: '' });
							}
						}}
					/>
				</View>
			)}
			{step === 2 && (
				<React.Fragment>
					<MaterialTextInput
						value={userName}
						onChangeText={(text: string) => {
							if (!text) {
								setError({
									...error,
									name: 'Please enter your name',
								});
							} else {
								setError({
									...error,
									name: '',
								});
							}
							setUserName(text);
						}}
						variant='standard'
						label=''
						placeholder='Enter your name'
						style={{
							marginVertical: getWidthnHeight(8).width,
						}}
						helperText={error.name}
						autoComplete='name'
						inputMode='text'
						keyboardType='default'
						textContentType='name'
						returnKeyType='next'
						blurOnSubmit={false}
						onSubmitEditing={() => emailRef.current?.focus()}
						onEndEditing={({ nativeEvent }) => {
							if (!nativeEvent.text) {
								setError({
									...error,
									name: 'Please enter your name',
								});
							} else {
								setError({
									...error,
									name: '',
								});
							}
						}}
					/>
					<MaterialTextInput
						ref={emailRef}
						value={userEmail}
						onChangeText={(text: string) => {
							if (text && !validateEmail(text)) {
								setError({
									...error,
									email: 'Please enter valid email',
								});
							} else {
								setError({
									...error,
									email: '',
								});
							}
							setUserEmail(text);
						}}
						variant='standard'
						label=''
						placeholder='Enter your email (optional)'
						style={{
							marginBottom: getWidthnHeight(10).width,
						}}
						helperText={error.email}
						autoComplete='email'
						inputMode='email'
						keyboardType='email-address'
						textContentType='emailAddress'
						onEndEditing={({ nativeEvent }) => {
							if (
								nativeEvent.text &&
								!validateEmail(nativeEvent.text)
							) {
								setError({
									...error,
									email: 'Please enter valid email',
								});
							} else {
								setError({
									...error,
									email: '',
								});
							}
						}}
					/>
				</React.Fragment>
			)}
			<Button
				mode='contained'
				style={{
					borderRadius: 24,
					marginBottom: getWidthnHeight(4).width,
				}}
				labelStyle={{
					fontFamily: fonts.Ovo,
					fontSize: getWidthnHeight(6).width,
					padding: getWidthnHeight(1).width,
					textAlignVertical: 'center',
				}}
				onPress={handleOnPress}
				buttonColor={colors.primaryButton}
				disabled={step === 1 && (!!error.otp || otp.length < 6)}
			>
				Continue
			</Button>
		</ScrollViewWithImageHeader>
	);
};

const styles = StyleSheet.create({
	avatar: {
		backgroundColor: colors.primaryRed,
		borderRadius: 50,
		width: getWidthnHeight(25).width,
		height: getWidthnHeight(25).width,
		justifyContent: 'flex-end',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: getWidthnHeight(8).width,
		marginBottom: getWidthnHeight(6).width,
	},
	image: {
		width: getWidthnHeight(20).width,
		height: getWidthnHeight(20).width,
		marginBottom: getWidthnHeight(0.4).width,
	},
	text: {
		color: 'black',
		fontFamily: fonts.Ovo,
		fontSize: getWidthnHeight(7).width,
		textAlign: 'center',
	},
	otpHeading: {
		color: colors.lightInputGrey,
		fontSize: getWidthnHeight(3.8).width,
		fontFamily: fonts.Ovo,
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
		fontFamily: fonts.Ovo,
		paddingHorizontal: 10,
		paddingVertical: 2,
		textAlign: 'center',
		backgroundColor: 'transparent',
		color: 'black',
	},
	otpInputFocused: {
		borderColor: colors.primaryRed,
	},
	otpInputActive: {
		borderColor: colors.primaryRed,
	},
});

export default WelcomeScreen;
