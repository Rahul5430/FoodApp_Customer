/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import BottomSheet, {
	BottomSheetTextInput,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import AmazonPeLogo from '../../assets/images/logos/amazonPayLogo.png';
import MasterCardLogo from '../../assets/images/logos/mastercardLogo.png';
import MasterCardText from '../../assets/images/logos/mastercardText.png';
import PaytmLogo from '../../assets/images/logos/paytmLogo.png';
import PhonePeLogo from '../../assets/images/logos/phonpeLogo.png';
import VisaLogo from '../../assets/images/logos/visaLogo.png';
import VisaText from '../../assets/images/logos/visaText.png';
import { getWidthnHeight } from '../../helpers/responsiveFontSize';
import { responsiveImageHeight } from '../../helpers/responsiveImageSize';
import { numberWithSpace } from '../../helpers/utils';
import ScreenWithImageHeader from '../../layouts/ScreenWithImageHeader';
import { colors, fonts } from '../../themes';
import { AuthenticatedStackScreenProps } from '../../types/navigation';

type CardsType = {
	name: string;
	cardType: ImageSourcePropType;
	logo: ImageSourcePropType;
	number: string;
};

type UPIType = {
	name: string;
	logo: ImageSourcePropType;
	linked: boolean;
};

type WalletsType = {
	name: string;
	logo: ImageSourcePropType;
	balance: string;
	phoneNumber: string;
	linked: boolean;
};

type PaymentCardType<T extends 'Cards'> = {
	heading: T;
	data: CardsType[];
};

type PaymentUPIType<T extends 'UPI'> = {
	heading: T;
	data: UPIType[];
};

type PaymentWalletType<T extends 'Wallets'> = {
	heading: T;
	data: WalletsType[];
};

type PaymentsDataType<T extends 'Cards' | 'UPI' | 'Wallets'> = T extends 'Cards'
	? PaymentCardType<T>
	: T extends 'UPI'
	? PaymentUPIType<T>
	: T extends 'Wallets'
	? PaymentWalletType<T>
	: null;

const Cards = ({ item }: { item: CardsType }) => {
	const { height, width } = Image.resolveAssetSource(item.logo);
	const imageName = Image.resolveAssetSource(item.cardType);

	const formatedCardNumber = numberWithSpace(item.number, '*');

	return (
		<View style={styles.subItemList}>
			<View style={styles.logoContainer}>
				<Image
					source={item.logo}
					style={{
						width: getWidthnHeight(9).width,
						height: responsiveImageHeight(
							width,
							height,
							getWidthnHeight(9).width
						),
					}}
					resizeMode='contain'
				/>
			</View>
			<View style={{ flex: 1, paddingLeft: getWidthnHeight(5).width }}>
				<Text style={styles.subItemName}>{formatedCardNumber}</Text>
				<Image
					source={item.cardType}
					style={[
						item.name === 'MasterCard'
							? {
									width: getWidthnHeight(14).width,
									height: responsiveImageHeight(
										imageName.width,
										imageName.height,
										getWidthnHeight(14).width
									),
							  }
							: {
									width: getWidthnHeight(8).width,
									height: responsiveImageHeight(
										imageName.width,
										imageName.height,
										getWidthnHeight(8).width
									),
							  },
					]}
					resizeMode='contain'
				/>
			</View>
			<View
				style={{
					backgroundColor: colors.grey,
					borderRadius: 50,
					width: getWidthnHeight(6).width,
					height: getWidthnHeight(6).width,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Feather
					name='trash-2'
					color={colors.black}
					size={getWidthnHeight(3.5).width}
				/>
			</View>
		</View>
	);
};

const UPI = ({ item }: { item: UPIType }) => {
	const { height, width } = Image.resolveAssetSource(item.logo);

	return (
		<View style={styles.subItemList}>
			<View style={styles.logoContainer}>
				<Image
					source={item.logo}
					style={{
						width: getWidthnHeight(9).width,
						height: responsiveImageHeight(
							width,
							height,
							getWidthnHeight(9).width
						),
					}}
					resizeMode='contain'
				/>
			</View>
			<View
				style={{
					flex: 1,
					paddingLeft: getWidthnHeight(5.1).width,
				}}
			>
				<Text style={styles.subItemName}>{item.name}</Text>
			</View>
			<Octicons
				name='check-circle-fill'
				color={colors.green}
				size={getWidthnHeight(5.1).width}
			/>
		</View>
	);
};

const Wallets = ({ item }: { item: WalletsType }) => {
	const { height, width } = Image.resolveAssetSource(item.logo);

	return (
		<View style={styles.subItemList}>
			<View style={styles.logoContainer}>
				<Image
					source={item.logo}
					style={{
						width: getWidthnHeight(9).width,
						height: responsiveImageHeight(
							width,
							height,
							getWidthnHeight(9).width
						),
					}}
					resizeMode='contain'
				/>
			</View>
			{item.linked ? (
				<React.Fragment>
					<View
						style={{
							flex: 1,
							paddingLeft: getWidthnHeight(5).width,
						}}
					>
						<Text style={styles.subItemName}>{item.name}</Text>
						<Text
							style={[
								styles.subItemName,
								{
									color: colors.darkGrey,
									fontSize: getWidthnHeight(4).width,
								},
							]}
						>
							{item.phoneNumber}
						</Text>
					</View>
					<Text
						style={[
							styles.subItemName,
							{
								color: colors.darkGrey,
								fontSize: getWidthnHeight(4).width,
							},
						]}
					>
						<FontAwesome
							name='rupee'
							size={getWidthnHeight(3.5).width}
							color={colors.darkGrey}
						/>
						{item.balance}
					</Text>
				</React.Fragment>
			) : (
				<React.Fragment>
					<View
						style={{
							flex: 1,
							paddingLeft: getWidthnHeight(5).width,
						}}
					>
						<Text style={styles.subItemName}>{item.name}</Text>
					</View>
					<Ionicons
						name='add-circle'
						color={colors.primaryRed}
						size={getWidthnHeight(6).width}
					/>
				</React.Fragment>
			)}
		</View>
	);
};

const PaymentsScreen = React.forwardRef<
	BottomSheet,
	AuthenticatedStackScreenProps<'PaymentsScreen'>
>((props, ref) => {
	const [paymentsData, setPaymentsData] = useState<
		PaymentsDataType<'Cards' | 'UPI' | 'Wallets'>[]
	>([]);

	useEffect(() => {
		const userCards: CardsType[] = [
			{
				name: 'Visa',
				cardType: VisaText,
				logo: VisaLogo,
				number: '1234567891232345',
			},
			{
				name: 'MasterCard',
				cardType: MasterCardText,
				logo: MasterCardLogo,
				number: '1234567891232345',
			},
		];
		const userUPIs: UPIType[] = [
			{
				name: 'Paytm UPI',
				logo: PaytmLogo,
				linked: true,
			},
			{
				name: 'Phonepe',
				logo: PhonePeLogo,
				linked: true,
			},
		];
		const userWallets: WalletsType[] = [
			{
				name: 'Phonepe',
				logo: PhonePeLogo,
				balance: '',
				phoneNumber: '',
				linked: false,
			},
			{
				name: 'Paytm',
				logo: PaytmLogo,
				balance: '1500.60',
				phoneNumber: '9889290880',
				linked: true,
			},
			{
				name: 'Amazon Pay',
				logo: AmazonPeLogo,
				balance: '',
				phoneNumber: '',
				linked: false,
			},
		];
		setPaymentsData([
			{ heading: 'Cards', data: userCards },
			{ heading: 'UPI', data: userUPIs },
			{ heading: 'Wallets', data: userWallets },
		]);
	}, []);

	const BottomSheetComponent = () => {
		const [upiID, setUpiID] = useState('');

		return (
			<BottomSheetView>
				<View
					style={{
						flexDirection: 'row',
						paddingVertical: getWidthnHeight(6).width,
						paddingHorizontal: getWidthnHeight(4).width,
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottomColor: colors.lightGrey,
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={{
							fontSize: getWidthnHeight(6).width,
							fontWeight: 'bold',
							color: 'black',
						}}
					>
						Add new UPI
					</Text>
					<Pressable onPress={() => ref.current?.close()}>
						<AntDesign
							name='closecircle'
							size={getWidthnHeight(8).width}
							color={'black'}
						/>
					</Pressable>
				</View>
				<View
					style={{
						paddingVertical: getWidthnHeight(6).width,
						paddingHorizontal: getWidthnHeight(4).width,
					}}
				>
					<BottomSheetTextInput
						value={upiID}
						onChangeText={(text: string) => setUpiID(text)}
						placeholder='Enter your UPI ID'
						style={{
							borderWidth: 1,
							borderRadius: 5,
							borderColor: colors.lightInputGrey,
							paddingLeft: getWidthnHeight(3).width,
						}}
						autoComplete='name'
						inputMode='text'
						keyboardType='default'
						textContentType='name'
					/>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: getWidthnHeight(2).width,
						}}
					>
						<MaterialIcons
							name='verified-user'
							size={getWidthnHeight(4).width}
							color={colors.green}
						/>
						<Text
							style={{
								color: colors.lightInputGrey,
								alignSelf: 'flex-start',
								fontSize: getWidthnHeight(3.5).width,
								paddingLeft: getWidthnHeight(1).width,
							}}
						>
							This UPI Will Be Saved For Faster Payments
						</Text>
					</View>
					<Button
						mode='contained'
						style={[
							{
								borderRadius: 9,
								marginVertical: getWidthnHeight(5).width,
							},
						]}
						onPress={() => console.log('Verifying...')}
						buttonColor={colors.primaryButton}
						labelStyle={styles.btnText}
					>
						Verify and Pay
					</Button>
				</View>
			</BottomSheetView>
		);
	};

	return (
		<ScreenWithImageHeader
			title='Payments'
			titleStyle={{ fontFamily: fonts.Ovo }}
			containerStyle={{ paddingVertical: getWidthnHeight(5).width }}
			withBottomSheet
			bottomSheetChildren={<BottomSheetComponent />}
		>
			<FlatList
				data={paymentsData}
				keyExtractor={(item) => item.heading}
				renderItem={({ item, index }) => (
					<View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingVertical: getWidthnHeight(2.7).width,
							}}
						>
							<Text style={styles.heading}>{item.heading}</Text>
							<Ionicons
								name='add-circle'
								color={colors.primaryRed}
								size={getWidthnHeight(6).width}
							/>
						</View>
						<FlatList
							data={item.data}
							keyExtractor={(subItem) => subItem.name}
							renderItem={(subItem) => {
								return item.heading === 'Cards' ? (
									<Cards item={subItem.item} />
								) : item.heading === 'UPI' ? (
									<UPI item={subItem.item} />
								) : (
									<Wallets
										item={subItem.item as WalletsType}
									/>
								);
							}}
							ListHeaderComponent={() => (
								<View
									style={{
										borderBottomColor: colors.lightGrey,
										borderBottomWidth: 1,
									}}
								/>
							)}
							ItemSeparatorComponent={() => (
								<View
									style={{
										borderBottomColor: colors.lightGrey,
										borderBottomWidth: 1,
									}}
								/>
							)}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				)}
				ListHeaderComponent={() => (
					<View
						style={{
							borderBottomColor: colors.lightGrey,
							borderBottomWidth: 1,
							paddingTop: getWidthnHeight(5).width,
						}}
					/>
				)}
				ItemSeparatorComponent={() => (
					<View
						style={{
							borderBottomColor: colors.lightGrey,
							borderBottomWidth: 1,
						}}
					/>
				)}
				ListFooterComponent={() => (
					<View
						style={{
							borderBottomColor: colors.lightGrey,
							borderBottomWidth: 1,
							marginBottom: getWidthnHeight(5).width,
						}}
					/>
				)}
				style={{ paddingHorizontal: getWidthnHeight(3).width }}
				showsVerticalScrollIndicator={false}
				scrollEnabled
			/>
		</ScreenWithImageHeader>
	);
});

const styles = StyleSheet.create({
	heading: {
		fontFamily: fonts.PoppinsSemiBold,
		fontSize: getWidthnHeight(4.6).width,
		color: 'black',
	},
	subItemName: {
		fontFamily: fonts.Ovo,
		fontSize: getWidthnHeight(4.6).width,
		color: 'black',
	},
	logoContainer: {
		width: Math.max(42, getWidthnHeight(10).width),
		height: getWidthnHeight(10).width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	subItemList: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: getWidthnHeight(2.7).width,
	},
	btnText: {
		fontSize: getWidthnHeight(3.7).width,
	},
});

export default PaymentsScreen;
