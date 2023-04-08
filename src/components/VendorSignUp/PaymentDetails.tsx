import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Pressable,
	Platform,
	UIManager,
	LayoutAnimation,
} from 'react-native';
import { colors } from '../../themes';
import MaterialTextInput from '../MaterialTextInput/MaterialTextInput';
import { useLayoutEffect, useRef, useState } from 'react';
import { Divider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DefaultPageProps, VendorData } from '../../screens/VendorSignUpScreen';
import { RFValue, getWidthnHeight } from '../../helpers/responsiveFontSize';
import {
	validateBankAccountNumber,
	validateIFSCCode,
	validateUPIID,
} from '../../helpers/utils';

type BankTransferError = {
	accountNumber: string;
	reEnterAccountNumber: string;
	ifscCode: string;
	accountHolderName: string;
};

type UPITransferError = {
	upiID: string;
};

export interface PageComponentProps {
	vendorData: VendorData;
	setVendorData: (data: VendorData) => void;
}

interface BankTransferComponentProps extends PageComponentProps {
	reEnterAccountNumber: string;
	setReEnterAccountNumber: (data: string) => void;
	bankTransferError: BankTransferError;
	setbankTransferError: (data: BankTransferError) => void;
}

interface UPITransferComponentProps extends PageComponentProps {
	upiTransferError: UPITransferError;
	setUpiTransferError: (data: UPITransferError) => void;
}

if (
	Platform.OS === 'android' &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BankTransfer = ({
	vendorData,
	setVendorData,
	reEnterAccountNumber,
	setReEnterAccountNumber,
	bankTransferError,
	setbankTransferError,
}: BankTransferComponentProps) => {
	const accountNumberRef = useRef<TextInput>(null);
	const reEnterAccountNumberRef = useRef<TextInput>(null);
	const ifscCodeRef = useRef<TextInput>(null);
	const accountHolderNameRef = useRef<TextInput>(null);

	return (
		<View style={{ alignItems: 'center' }}>
			<MaterialTextInput
				ref={accountNumberRef}
				value={vendorData.accountNumber}
				onChangeText={(text: string) => {
					if (!text || !validateBankAccountNumber(text)) {
						setbankTransferError({
							...bankTransferError,
							accountNumber: 'Please enter valid account number',
						});
					} else {
						setbankTransferError({
							...bankTransferError,
							accountNumber: '',
						});
					}
					setVendorData({ ...vendorData, accountNumber: text });
				}}
				onEndEditing={({ nativeEvent }) => {
					if (
						!nativeEvent.text ||
						!validateBankAccountNumber(nativeEvent.text)
					) {
						setbankTransferError({
							...bankTransferError,
							accountNumber: 'Please enter valid account number',
						});
					} else {
						setbankTransferError({
							...bankTransferError,
							accountNumber: '',
						});
					}
				}}
				helperText={bankTransferError.accountNumber}
				variant='outlined'
				label='Account number'
				placeholder='Enter account number'
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				autoComplete='name'
				inputMode='text'
				keyboardType='default'
				textContentType='name'
				returnKeyType='next'
				onSubmitEditing={() => reEnterAccountNumberRef.current?.focus()}
				blurOnSubmit={false}
				required
				secureTextEntry
			/>
			<MaterialTextInput
				ref={reEnterAccountNumberRef}
				value={reEnterAccountNumber}
				onChangeText={(text: string) => {
					if (!text || text !== vendorData.accountNumber) {
						setbankTransferError({
							...bankTransferError,
							reEnterAccountNumber:
								'Account number does not match',
						});
					} else {
						setbankTransferError({
							...bankTransferError,
							reEnterAccountNumber: '',
						});
					}
					setReEnterAccountNumber(text);
				}}
				onEndEditing={({ nativeEvent }) => {
					if (
						!nativeEvent.text ||
						nativeEvent.text !== vendorData.accountNumber
					) {
						setbankTransferError({
							...bankTransferError,
							reEnterAccountNumber:
								'Account number does not match',
						});
					} else {
						setbankTransferError({
							...bankTransferError,
							reEnterAccountNumber: '',
						});
					}
				}}
				helperText={bankTransferError.reEnterAccountNumber}
				variant='outlined'
				label='Re-enter account number'
				placeholder='Re-enter bank account number'
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				autoComplete='name'
				inputMode='text'
				keyboardType='default'
				textContentType='name'
				returnKeyType='next'
				onSubmitEditing={() => ifscCodeRef.current?.focus()}
				blurOnSubmit={false}
				required
			/>
			<MaterialTextInput
				ref={ifscCodeRef}
				value={vendorData.ifscCode}
				onChangeText={(text: string) => {
					if (!text || !validateIFSCCode(text)) {
						setbankTransferError({
							...bankTransferError,
							ifscCode: 'Please enter valid IFSC Code',
						});
					} else {
						setbankTransferError({
							...bankTransferError,
							ifscCode: '',
						});
					}
					setVendorData({ ...vendorData, ifscCode: text });
				}}
				onEndEditing={({ nativeEvent }) => {
					if (
						!nativeEvent.text ||
						!validateIFSCCode(nativeEvent.text)
					) {
						setbankTransferError({
							...bankTransferError,
							ifscCode: 'Please enter valid IFSC Code',
						});
					} else {
						setbankTransferError({
							...bankTransferError,
							ifscCode: '',
						});
					}
				}}
				helperText={bankTransferError.ifscCode}
				variant='outlined'
				label='IFSC code'
				placeholder='Enter IFSC code'
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				autoComplete='name'
				inputMode='text'
				keyboardType='default'
				textContentType='name'
				returnKeyType='next'
				onSubmitEditing={() => accountHolderNameRef.current?.focus()}
				trailing={<Ionicons name='md-search' size={20} />}
				blurOnSubmit={false}
				required
			/>
			<MaterialTextInput
				ref={accountHolderNameRef}
				value={vendorData.accountHolderName}
				onChangeText={(text: string) => {
					if (!text) {
						setbankTransferError({
							...bankTransferError,
							accountHolderName:
								'Please enter account holder name',
						});
					} else {
						setbankTransferError({
							...bankTransferError,
							accountHolderName: '',
						});
					}
					setVendorData({ ...vendorData, accountHolderName: text });
				}}
				onEndEditing={({ nativeEvent }) => {
					if (!nativeEvent.text) {
						setbankTransferError({
							...bankTransferError,
							accountHolderName:
								'Please enter account holder name',
						});
					} else {
						setbankTransferError({
							...bankTransferError,
							accountHolderName: '',
						});
					}
				}}
				helperText={bankTransferError.accountHolderName}
				variant='outlined'
				label='Account holder name'
				placeholder='Enter holder name'
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				autoComplete='name'
				inputMode='text'
				keyboardType='default'
				textContentType='name'
				required
			/>
		</View>
	);
};

const UPITransfer = ({
	vendorData,
	setVendorData,
	upiTransferError,
	setUpiTransferError,
}: UPITransferComponentProps) => {
	const upiIDRef = useRef<TextInput>(null);

	return (
		<View style={{ marginVertical: 10, alignItems: 'center' }}>
			<MaterialTextInput
				ref={upiIDRef}
				value={vendorData.upiID}
				onChangeText={(text: string) => {
					if (!text || !validateUPIID(text)) {
						setUpiTransferError({
							...upiTransferError,
							upiID: 'Please enter valid UPI ID',
						});
					} else {
						setUpiTransferError({ ...upiTransferError, upiID: '' });
					}
					setVendorData({ ...vendorData, upiID: text });
				}}
				onEndEditing={({ nativeEvent }) => {
					if (!nativeEvent.text || !validateUPIID(nativeEvent.text)) {
						setUpiTransferError({
							...upiTransferError,
							upiID: 'Please enter valid UPI ID',
						});
					} else {
						setUpiTransferError({ ...upiTransferError, upiID: '' });
					}
				}}
				helperText={upiTransferError.upiID}
				variant='outlined'
				label='Add UPI'
				placeholder='Enter UPI'
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				autoComplete='name'
				inputMode='text'
				keyboardType='default'
				textContentType='name'
				required
			/>
		</View>
	);
};

const PaymentDetails = ({
	handlePageChange,
	vendorData,
	setVendorData,
	calculateHeight,
}: DefaultPageProps) => {
	const [bankTransfer, setBankTransfer] = useState(true);
	const [upiTransfer, setUpiTransfer] = useState(false);
	const [reEnterAccountNumber, setReEnterAccountNumber] = useState('');

	const [bankTransferError, setbankTransferError] =
		useState<BankTransferError>({
			accountNumber: '',
			reEnterAccountNumber: '',
			ifscCode: '',
			accountHolderName: '',
		});

	const [upiTransferError, setUpiTransferError] = useState<UPITransferError>({
		upiID: '',
	});

	const handlePress = (name: 'bankTransfer' | 'upiTransfer') => {
		if (name === 'bankTransfer') {
			// Bank transfer was previously collapsed
			if (!bankTransfer) {
				// UPI transfer was previously open
				if (upiTransfer) {
					setbankTransferError({
						accountNumber: '',
						reEnterAccountNumber: '',
						ifscCode: '',
						accountHolderName: '',
					});
					setUpiTransfer(!upiTransfer);
				} else {
					// Both were previously collapsed
					setUpiTransferError({ upiID: '' });
				}
				// Reset UPI ID  and set transfer method to BANK
				setVendorData({
					...vendorData,
					upiID: '',
					transferMethod: 'BANK',
				});
			}
			// Toggle Bank transfer
			setBankTransfer(!bankTransfer);
		} else {
			// UPI transfer was previously collapsed
			if (!upiTransfer) {
				// Bank transfer was previously open
				if (bankTransfer) {
					setBankTransfer(!bankTransfer);
					setUpiTransferError({ upiID: '' });
				} else {
					// Both were previously collapsed
					setbankTransferError({
						accountNumber: '',
						reEnterAccountNumber: '',
						ifscCode: '',
						accountHolderName: '',
					});
				}
				// Reset Bank transfer and set transfer method to UPI
				setVendorData({
					...vendorData,
					accountNumber: '',
					ifscCode: '',
					accountHolderName: '',
					transferMethod: 'UPI',
				});
			}
			// Toggle UPI Transfer
			setUpiTransfer(!upiTransfer);
		}
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	};

	const handleNext = () => {
		if (bankTransfer) {
			setbankTransferError({
				accountNumber: '',
				reEnterAccountNumber: '',
				ifscCode: '',
				accountHolderName: '',
			});
			const accountNumberError =
				!vendorData.accountNumber ||
				!validateBankAccountNumber(vendorData.accountNumber);
			const reEnterAccountNumberError =
				!reEnterAccountNumber ||
				reEnterAccountNumber !== vendorData.accountNumber;
			const ifscCodeError =
				!vendorData.ifscCode || !validateIFSCCode(vendorData.ifscCode);
			const accountHolderNameError = !vendorData.accountHolderName;
			if (
				!accountNumberError &&
				!reEnterAccountNumberError &&
				!ifscCodeError &&
				!accountHolderNameError
			) {
				handlePageChange(5);
			} else {
				const bankTransferErrorObj: BankTransferError = {
					accountNumber: accountNumberError
						? 'Please enter valid account number'
						: '',
					reEnterAccountNumber: reEnterAccountNumberError
						? 'Account number does not match'
						: '',
					ifscCode: ifscCodeError
						? 'Please enter valid IFSC Code'
						: '',
					accountHolderName: accountHolderNameError
						? 'Please enter account holder name'
						: '',
				};
				setbankTransferError(bankTransferErrorObj);
			}
		} else if (upiTransfer) {
			setUpiTransferError({ upiID: '' });
			const upiIDError =
				!vendorData.upiID || !validateUPIID(vendorData.upiID);
			if (!upiIDError) {
				handlePageChange(5);
			} else {
				const upiTransferErrorObj: UPITransferError = {
					upiID: upiIDError ? 'Please enter valid UPI ID' : '',
				};
				setUpiTransferError(upiTransferErrorObj);
			}
		} else {
			setBankTransfer(true);
		}
	};

	const firstUpdate = useRef(true);
	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}

		setTimeout(() => calculateHeight(4), 0);
	}, [
		bankTransfer,
		upiTransfer,
		bankTransferError.accountNumber,
		bankTransferError.reEnterAccountNumber,
		bankTransferError.ifscCode,
		bankTransferError.accountHolderName,
		upiTransferError.upiID,
	]);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Payment Details</Text>
			<Text style={styles.subTitle}>
				Choose an option to receive your payment
			</Text>
			<View
				style={{
					marginVertical: 10,
					width: getWidthnHeight(94).width,
				}}
			>
				<View style={{ paddingHorizontal: 10 }}>
					<Pressable
						style={styles.selectBtn}
						onPress={() => handlePress('bankTransfer')}
						android_ripple={{
							color: colors.lightGrey,
							borderless: false,
						}}
					>
						<Text
							style={{
								color: colors.darkRed,
								fontSize: RFValue(18),
								fontFamily: 'Ovo',
							}}
						>
							Bank Transfer
						</Text>
						<View
							style={{
								backgroundColor: colors.golden,
								borderRadius: 50,
								padding: 2,
							}}
						>
							<Ionicons
								name={`chevron-${bankTransfer ? 'up' : 'down'}`}
								color={colors.darkRed}
								size={20}
							/>
						</View>
					</Pressable>
					{bankTransfer && (
						<BankTransfer
							vendorData={vendorData}
							setVendorData={setVendorData}
							reEnterAccountNumber={reEnterAccountNumber}
							setReEnterAccountNumber={setReEnterAccountNumber}
							bankTransferError={bankTransferError}
							setbankTransferError={setbankTransferError}
						/>
					)}
				</View>
				<Divider />
				<View style={{ paddingHorizontal: 10 }}>
					<Pressable
						style={styles.selectBtn}
						onPress={() => handlePress('upiTransfer')}
						android_ripple={{
							color: colors.lightGrey,
							borderless: false,
						}}
					>
						<Text
							style={{
								color: colors.darkRed,
								fontSize: RFValue(18),
								fontFamily: 'Ovo',
							}}
						>
							UPI ID
						</Text>
						<View
							style={{
								backgroundColor: colors.golden,
								borderRadius: 50,
								padding: 2,
							}}
						>
							<Ionicons
								name={`chevron-${upiTransfer ? 'up' : 'down'}`}
								color={colors.darkRed}
								size={20}
							/>
						</View>
					</Pressable>
					{upiTransfer && (
						<UPITransfer
							vendorData={vendorData}
							setVendorData={setVendorData}
							upiTransferError={upiTransferError}
							setUpiTransferError={setUpiTransferError}
						/>
					)}
				</View>
			</View>
			<View style={styles.btnContainer}>
				<Pressable
					style={{ ...styles.btn, marginRight: 7 }}
					onPress={() => handlePageChange(3)}
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
		paddingVertical: 10,
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
		marginTop: 10,
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
	selectBtn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
});

export default PaymentDetails;
