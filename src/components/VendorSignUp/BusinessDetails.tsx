import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../themes';
import MaterialTextInput from '../MaterialTextInput/MaterialTextInput';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DefaultPageProps } from '../../screens/VendorSignUpScreen';
import { RFValue, getWidthnHeight } from '../../helpers/responsiveFontSize';

type BusinessDetailsError = {
	businessName: string;
	uniqueBusinessName: string;
};

const BusinessDetails = ({
	handlePageChange,
	vendorData,
	setVendorData,
	calculateHeight,
}: DefaultPageProps) => {
	const businessNameRef = useRef<TextInput>(null);
	const uniqueBusinessNameRef = useRef<TextInput>(null);

	const [error, setError] = useState<BusinessDetailsError>({
		businessName: '',
		uniqueBusinessName: 'You cannot change unique business later',
	});

	const handleNext = () => {
		setError({
			businessName: '',
			uniqueBusinessName: 'You cannot change unique business later',
		});
		const businessNameError = !vendorData.businessName;
		const uniqueBusinessNameError = !vendorData.uniqueBusinessName;
		const errorObject: BusinessDetailsError = {
			businessName: businessNameError
				? 'Please enter a business name'
				: '',
			uniqueBusinessName: uniqueBusinessNameError
				? 'Please enter unique business name'
				: 'You cannot change unique business later',
		};
		setError(errorObject);
		if (!businessNameError && !uniqueBusinessNameError) {
			handlePageChange(3);
		}
	};

	const firstUpdate = useRef(true);
	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}

		setTimeout(() => calculateHeight(2), 0);
	}, [error.businessName, error.uniqueBusinessName]);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Business Details</Text>
			<Text style={styles.subTitle}>
				Share your store name with your customer
			</Text>
			<View style={{ marginVertical: 10 }}>
				<MaterialTextInput
					ref={businessNameRef}
					value={vendorData.businessName}
					onChangeText={(text: string) => {
						if (!text) {
							setError({
								...error,
								businessName: 'Please enter a business name',
							});
						} else {
							setError({
								...error,
								businessName: '',
							});
						}
						setVendorData({ ...vendorData, businessName: text });
					}}
					onEndEditing={({ nativeEvent }) => {
						if (!nativeEvent.text) {
							setError({
								...error,
								businessName: 'Please enter a business name',
							});
						} else {
							setError({
								...error,
								businessName: '',
							});
						}
					}}
					helperText={error.businessName}
					variant='outlined'
					label='Name of the business'
					placeholder='Enter business name'
					style={{
						marginVertical: 10,
						width: getWidthnHeight(88).width,
					}}
					autoComplete='name'
					inputMode='text'
					keyboardType='default'
					textContentType='name'
					returnKeyType='next'
					onSubmitEditing={() =>
						uniqueBusinessNameRef.current?.focus()
					}
					blurOnSubmit={false}
					required
				/>
				<MaterialTextInput
					ref={uniqueBusinessNameRef}
					value={vendorData.uniqueBusinessName}
					onChangeText={(text: string) => {
						if (!text) {
							setError({
								...error,
								uniqueBusinessName:
									'Please enter unique business name',
							});
						} else {
							setError({
								...error,
								uniqueBusinessName:
									'You cannot change unique business later',
							});
						}
						setVendorData({
							...vendorData,
							uniqueBusinessName: text,
						});
					}}
					onEndEditing={({ nativeEvent }) => {
						if (!nativeEvent.text) {
							setError({
								...error,
								uniqueBusinessName:
									'Please enter unique business name',
							});
						} else {
							setError({
								...error,
								uniqueBusinessName:
									'You cannot change unique business later',
							});
						}
					}}
					variant='outlined'
					label='Unique business name'
					placeholder='Enter business name'
					style={{
						marginVertical: 10,
						width: getWidthnHeight(88).width,
					}}
					autoComplete='name'
					inputMode='text'
					keyboardType='default'
					textContentType='name'
					helperText={error.uniqueBusinessName}
					helperTextIcon={
						<Ionicons
							name='bulb'
							size={20}
							color={colors.darkRed}
						/>
					}
					trailing={
						<Text style={{ fontSize: 16, fontFamily: 'Ovo' }}>
							.baker.collection
						</Text>
					}
					trailingContainerStyle={{ marginEnd: 6 }}
					required
				/>
			</View>
			<View style={styles.btnContainer}>
				<Pressable
					style={{ ...styles.btn, marginRight: 7 }}
					onPress={() => handlePageChange(1)}
				>
					<Text style={styles.btnText}>Back</Text>
				</Pressable>
				<Pressable
					style={{ ...styles.btn, marginLeft: 7 }}
					onPress={() => handleNext()}
				>
					<Text style={styles.btnText}>Next</Text>
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
	title: {
		fontSize: RFValue(24),
		color: colors.darkRed,
		fontFamily: 'Ovo',
	},
	subTitle: {
		color: colors.black,
		fontSize: RFValue(16),
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

export default BusinessDetails;
