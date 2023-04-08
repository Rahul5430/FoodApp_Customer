import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { colors } from '../../themes';
import MaterialTextInput from '../MaterialTextInput/MaterialTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { IconButton } from 'react-native-paper';
import GoogleLogo from '../../assets/google.png';
import FacebookLogo from '../../assets/facebook.png';
import InstagramLogo from '../../assets/instagram.png';
import { DefaultPageProps } from '../../screens/VendorSignUpScreen';
import { validateEmail, validatePhone } from '../../helpers/utils';
import { RFValue, getWidthnHeight } from '../../helpers/responsiveFontSize';

type DetailsError = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
};

interface PageProps extends DefaultPageProps {
	signInWithGoogle: () => void;
	signInWithFacebook: () => void;
	connectWithInstagram: () => void;
}

const Details = ({
	handlePageChange,
	vendorData,
	setVendorData,
	signInWithGoogle,
	signInWithFacebook,
	connectWithInstagram,
	calculateHeight,
}: PageProps) => {
	const firstNameRef = useRef<TextInput>(null);
	const lastNameRef = useRef<TextInput>(null);
	const emailRef = useRef<TextInput>(null);
	const phoneRef = useRef<TextInput>(null);

	const [error, setError] = useState<DetailsError>({
		firstName: '',
		lastName: '',
		email: '',
		phone: 'Enter correct mobile number, an OTP will be generated on this number',
	});

	const handleNext = () => {
		setError({
			firstName: '',
			lastName: '',
			email: '',
			phone: 'Enter correct mobile number, an OTP will be generated on this number',
		});
		const firstNameError = !vendorData.firstName;
		const lastNameError = !vendorData.lastName;
		const emailError =
			!!vendorData.email && !validateEmail(vendorData.email);
		const phoneError = !validatePhone(vendorData.phone);
		const errorObj: DetailsError = {
			firstName: firstNameError ? 'Please enter first name' : '',
			lastName: lastNameError ? 'Please enter last name' : '',
			email: emailError ? 'Please enter valid email address' : '',
			phone: phoneError
				? 'Please enter valid phone number'
				: 'Enter correct mobile number, an OTP will be generated on this number',
		};
		setError(errorObj);
		if (!firstNameError && !lastNameError && !emailError && !phoneError) {
			handlePageChange(1);
		}
	};

	useEffect(() => {
		const errorObj: DetailsError = { ...error };
		if (vendorData.firstName && error.firstName) {
			errorObj.firstName = '';
		}
		if (vendorData.lastName && error.lastName) {
			errorObj.lastName = '';
		}
		if (
			vendorData.email &&
			validateEmail(vendorData.email) &&
			error.email
		) {
			errorObj.email = '';
		}
		if (
			vendorData.phone &&
			validatePhone(vendorData.phone) &&
			error.phone
		) {
			errorObj.phone =
				'Enter correct mobile number, an OTP will be generated on this number';
		}
		setError(errorObj);
	}, [
		vendorData.firstName,
		vendorData.lastName,
		vendorData.email,
		vendorData.phone,
	]);

	const firstUpdate = useRef(true);
	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}

		setTimeout(() => calculateHeight(0), 0);
	}, [error.firstName, error.lastName, error.email, error.phone]);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>{"Baker's in"}</Text>
			<View style={{ justifyContent: 'center' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<MaterialTextInput
						ref={firstNameRef}
						value={vendorData.firstName}
						onChangeText={(text: string) => {
							if (!text) {
								setError({
									...error,
									firstName: 'Please enter first name',
								});
							} else {
								setError({ ...error, firstName: '' });
							}
							setVendorData({
								...vendorData,
								firstName: text,
							});
						}}
						helperText={error.firstName}
						helperTextStyle={{ marginBottom: 0 }}
						variant='outlined'
						label='First name'
						placeholder='Enter first name'
						style={{
							width: getWidthnHeight(42).width,
							marginTop: 10,
							marginBottom: error ? 0 : 10,
						}}
						required={true}
						autoComplete='name'
						inputMode='text'
						keyboardType='default'
						textContentType='name'
						returnKeyType='next'
						onSubmitEditing={() => lastNameRef.current?.focus()}
						blurOnSubmit={false}
						onEndEditing={({ nativeEvent }) => {
							if (!nativeEvent.text) {
								setError({
									...error,
									firstName: 'Please enter first name',
								});
							} else {
								setError({ ...error, firstName: '' });
							}
						}}
					/>
					<MaterialTextInput
						ref={lastNameRef}
						value={vendorData.lastName}
						onChangeText={(text: string) => {
							if (!text) {
								setError({
									...error,
									lastName: 'Please enter last name',
								});
							} else {
								setError({ ...error, lastName: '' });
							}
							setVendorData({
								...vendorData,
								lastName: text,
							});
						}}
						helperText={error.lastName}
						variant='outlined'
						label='Last name'
						placeholder='Enter last name'
						style={{
							width: getWidthnHeight(42).width,
							marginTop: 10,
							marginBottom: error ? 0 : 10,
						}}
						required={true}
						autoComplete='name'
						inputMode='text'
						keyboardType='default'
						textContentType='name'
						returnKeyType='next'
						onSubmitEditing={() => emailRef.current?.focus()}
						blurOnSubmit={false}
						onEndEditing={({ nativeEvent }) => {
							if (!nativeEvent.text) {
								setError({
									...error,
									lastName: 'Please enter last name',
								});
							} else {
								setError({ ...error, lastName: '' });
							}
						}}
					/>
				</View>
				<MaterialTextInput
					ref={emailRef}
					value={vendorData.email}
					onChangeText={(text: string) => {
						if (text && !validateEmail(text)) {
							setError({
								...error,
								email: 'Please enter valid email address',
							});
						} else {
							setError({ ...error, email: '' });
						}
						setVendorData({ ...vendorData, email: text });
					}}
					helperText={error.email}
					variant='outlined'
					label='Email (Optional)'
					placeholder='Enter email here'
					style={{
						marginTop: 10,
						marginBottom: error ? 0 : 10,
						width: getWidthnHeight(86).width,
					}}
					autoComplete='email'
					inputMode='email'
					keyboardType='email-address'
					textContentType='emailAddress'
					returnKeyType='next'
					onSubmitEditing={() => phoneRef.current?.focus()}
					blurOnSubmit={false}
					onEndEditing={({ nativeEvent }) => {
						if (
							nativeEvent.text &&
							!validateEmail(nativeEvent.text)
						) {
							setError({
								...error,
								email: 'Please enter valid email address',
							});
						} else {
							setError({ ...error, email: '' });
						}
					}}
				/>
				<MaterialTextInput
					ref={phoneRef}
					value={vendorData.phone}
					onChangeText={(text: string) => {
						if (!validatePhone(text)) {
							setError({
								...error,
								phone: 'Please enter valid phone number',
							});
						} else {
							setError({
								...error,
								phone: 'Enter correct mobile number, an OTP will be generated on this number',
							});
						}
						setVendorData({ ...vendorData, phone: text });
					}}
					variant='outlined'
					label='Mobile number'
					placeholder='Enter number'
					required={true}
					style={{
						marginTop: 10,
						marginBottom:
							error.phone === 'Please enter valid phone number'
								? 0
								: 10,
						width: getWidthnHeight(86).width,
					}}
					leading={
						<Text
							style={{
								fontFamily: 'Ovo',
								fontSize: RFValue(16),
								paddingRight: 1,
							}}
						>
							+91
						</Text>
					}
					helperText={error.phone}
					helperTextIcon={
						<Ionicons
							name='bulb'
							size={20}
							color={colors.darkRed}
						/>
					}
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
								phone: 'Enter correct mobile number, an OTP will be generated on this number',
							});
						}
					}}
				/>
			</View>
			<View style={styles.btnContainer}>
				<Pressable style={{ ...styles.btn, marginRight: 7 }}>
					<Text style={styles.btnText}>Back</Text>
				</Pressable>
				<Pressable
					style={{ ...styles.btn, marginLeft: 7 }}
					onPress={() => handleNext()}
				>
					<Text style={styles.btnText}>Next</Text>
				</Pressable>
			</View>
			<View style={styles.iconBtnContainer}>
				<Text style={{ fontFamily: 'Ovo', fontSize: RFValue(16) }}>
					Connect using
				</Text>
				<View style={{ flexDirection: 'row' }}>
					<IconButton
						icon={({ size }) => (
							<Image
								source={GoogleLogo}
								style={{ width: size, height: size }}
							/>
						)}
						size={45}
						onPress={() => signInWithGoogle()}
					/>
					<IconButton
						icon={({ size }) => (
							<Image
								source={FacebookLogo}
								style={{ width: size, height: size }}
							/>
						)}
						size={45}
						onPress={() => signInWithFacebook()}
					/>
					<IconButton
						icon={({ size }) => (
							<Image
								source={InstagramLogo}
								style={{ width: size, height: size }}
							/>
						)}
						size={45}
						onPress={() => connectWithInstagram()}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		paddingTop: 10,
		paddingHorizontal: 15,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	title: {
		fontSize: RFValue(24),
		color: colors.darkRed,
		textAlign: 'center',
		fontFamily: 'Ovo',
	},
	btnContainer: {
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	btn: {
		backgroundColor: colors.darkRed,
		borderRadius: 50,
		paddingVertical: 10,
		paddingHorizontal: 20,
		width: getWidthnHeight(38).width,
	},
	btnText: {
		color: 'white',
		textTransform: 'uppercase',
		textAlign: 'center',
		fontFamily: 'Ovo',
		fontSize: RFValue(16),
	},
	iconBtnContainer: {
		marginTop: 10,
		alignItems: 'center',
	},
});

export default Details;
