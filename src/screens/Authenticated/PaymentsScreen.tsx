/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import BottomSheet, {
	BottomSheetTextInput,
	TouchableOpacity,
	useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	BackHandler,
	FlatList,
	Image,
	ImageSourcePropType,
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
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
import BottomSheetComponent, {
	CustomBottomSheetProps,
} from '../../components/BottomSheetComponent';
import { getWidthnHeight } from '../../helpers/responsiveFontSize';
import { responsiveImageHeight } from '../../helpers/responsiveImageSize';
import { numberWithSpace } from '../../helpers/utils';
import ScreenWithImageHeader from '../../layouts/ScreenWithImageHeader';
import { colors, fonts } from '../../themes';
import { AuthenticatedStackScreenProps } from '../../types/navigation';

type CommonTypes = {
	setCustomBottomSheet: (data: CustomBottomSheetProps) => void;
};

type CardsType = {
	name: string;
	cardType: ImageSourcePropType;
	logo: ImageSourcePropType;
	number: string;
} & CommonTypes;

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
} & CommonTypes;

type WalletComponentType = {
	item: WalletsType;
	phoneNumber: string;
	setPhoneNumber: (phoneNumber: string) => void;
} & CommonTypes;

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

const Wallets = React.forwardRef<BottomSheet, WalletComponentType>(
	(
		{ item, phoneNumber, setPhoneNumber, setCustomBottomSheet },
		bottomSheetRef
	) => {
		const { height, width } = Image.resolveAssetSource(item.logo);

		const [isOpen, setIsOpen] = useState(false);
		const swipeableRef = useRef<Swipeable>(null);

		useEffect(() => {
			if (isOpen) {
				const timer = setTimeout(
					() => swipeableRef.current.close(),
					3000
				);

				return () => clearTimeout(timer);
			}
		}, [isOpen]);

		return item.linked ? (
			<Swipeable
				ref={swipeableRef}
				onSwipeableOpen={(direction) => {
					console.log(direction);
					setIsOpen(true);
				}}
				onSwipeableClose={(direction) => {
					console.log(direction);
					setIsOpen(false);
				}}
				renderRightActions={() => (
					<View
						style={{
							backgroundColor: colors.grey,
							borderRadius: 50,
							marginLeft: getWidthnHeight(6).width,
							width: getWidthnHeight(6).width,
							height: getWidthnHeight(6).width,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'center',
						}}
					>
						<Feather
							name='trash-2'
							color={colors.black}
							size={getWidthnHeight(3.5).width}
						/>
					</View>
				)}
				overshootLeft={false}
				overshootRight={false}
			>
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
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<Swipeable
							ref={swipeableRef}
							onSwipeableOpen={(direction) => {
								console.log(direction);
								setIsOpen(true);
							}}
							onSwipeableClose={(direction) => {
								console.log(direction);
								setIsOpen(false);
							}}
							renderRightActions={() => (
								<View
									style={{
										backgroundColor: colors.grey,
										borderRadius: 50,
										marginLeft: getWidthnHeight(6).width,
										width: getWidthnHeight(6).width,
										height: getWidthnHeight(6).width,
										justifyContent: 'center',
										alignItems: 'center',
										alignSelf: 'center',
									}}
								>
									<Feather
										name='trash-2'
										color={colors.black}
										size={getWidthnHeight(3.5).width}
									/>
								</View>
							)}
							overshootLeft={false}
							overshootRight={false}
						>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'flex-end',
									backgroundColor: 'white',
									minHeight: 34,
								}}
							>
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
							</View>
						</Swipeable>
					</View>
				</View>
			</Swipeable>
		) : (
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
				<View style={styles.walletItemHeading}>
					<Text style={styles.subItemName}>{item.name}</Text>
				</View>
				<Pressable
					onPress={() => {
						setCustomBottomSheet({
							handleTitle: `Link ${item.name} Wallet`,
							bottomSheetChildren: (
								<View style={styles.walletContainer}>
									<View
										style={{
											flexDirection: 'row',
										}}
									>
										<Text style={styles.walletTitle}>
											Enter mobile number to link{' '}
											{item.name} wallet
										</Text>
										<View style={styles.logoContainer}>
											<Image
												source={item.logo}
												style={{
													width: getWidthnHeight(9)
														.width,
													height: responsiveImageHeight(
														width,
														height,
														getWidthnHeight(9).width
													),
												}}
												resizeMode='contain'
											/>
										</View>
									</View>
									<Text style={styles.walletSubTitle}>
										{
											"If you don't have an account we will create one for you"
										}
									</Text>
									<BottomSheetTextInput
										defaultValue={phoneNumber}
										onChangeText={(text: string) =>
											setPhoneNumber(text)
										}
										placeholder='Phone number'
										style={styles.walletTextInput}
										autoComplete='tel'
										inputMode='text'
										keyboardType='default'
										textContentType='telephoneNumber'
									/>
								</View>
							),
							buttonText: 'Confirm and Pay',
						});
						bottomSheetRef.current.snapToIndex(0);
					}}
				>
					<Ionicons
						name='add-circle'
						color={colors.primaryRed}
						size={getWidthnHeight(6).width}
					/>
				</Pressable>
			</View>
		);
	}
);

const PaymentsScreen: React.FC<
	AuthenticatedStackScreenProps<'PaymentsScreen'>
> = () => {
	const [paymentsData, setPaymentsData] = useState<
		PaymentsDataType<'Cards' | 'UPI' | 'Wallets'>[]
	>([]);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [customBottomSheet, setCustomBottomSheet] =
		useState<CustomBottomSheetProps>({
			handleTitle: '',
			bottomSheetChildren: null,
			buttonText: '',
		});
	const [selectedNickName, setSelectedNickName] = useState<
		'Personal' | 'Business' | 'Other'
	>('Personal');
	const [card, setCard] = useState({
		nickName: '',
		name: '',
		cardNumber: '',
		expiryDate: '',
	});
	const [upiID, setUpiID] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

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

	const bottomSheetRef = useRef<BottomSheet>(null);
	const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
		if (index === -1) {
			setIsBottomSheetOpen(false);
			setCustomBottomSheet({
				handleTitle: '',
				bottomSheetChildren: null,
				buttonText: '',
			});
		} else {
			setIsBottomSheetOpen(true);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				console.log(isBottomSheetOpen);
				if (isBottomSheetOpen) {
					bottomSheetRef.current.close();
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
		}, [isBottomSheetOpen])
	);

	const {
		animatedHandleHeight,
		animatedSnapPoints,
		animatedContentHeight,
		handleContentLayout,
	} = useBottomSheetDynamicSnapPoints(initialSnapPoints);

	return (
		<React.Fragment>
			<ScreenWithImageHeader
				title='Payments'
				titleStyle={{ fontFamily: fonts.Ovo }}
				containerStyle={{ paddingVertical: getWidthnHeight(5).width }}
				backButton={true}
			>
				<FlatList
					data={paymentsData}
					keyExtractor={(item) => item.heading}
					renderItem={({ item, index }) => (
						<View>
							<View style={styles.categoryBox}>
								<Text style={styles.heading}>
									{item.heading}
								</Text>
								{item.heading !== 'Wallets' && (
									<Pressable
										onPress={() => {
											if (item.heading === 'UPI') {
												setCustomBottomSheet({
													handleTitle: 'Add new UPI',
													bottomSheetChildren: (
														<View
															style={
																styles.UBSStyle
															}
														>
															<BottomSheetTextInput
																defaultValue={
																	upiID
																}
																onChangeText={(
																	text: string
																) =>
																	setUpiID(
																		text
																	)
																}
																placeholder='Enter your UPI ID'
																style={
																	styles.UBSTI
																}
																autoComplete='name'
																inputMode='text'
																keyboardType='default'
																textContentType='name'
															/>
															<View
																style={
																	styles.UBSTV
																}
															>
																<MaterialIcons
																	name='verified-user'
																	size={
																		getWidthnHeight(
																			4
																		).width
																	}
																	color={
																		colors.green
																	}
																/>
																<Text
																	style={
																		styles.UBSTS
																	}
																>
																	This UPI
																	Will Be
																	Saved For
																	Faster
																	Payments
																</Text>
															</View>
														</View>
													),
													buttonText:
														'Verify and Pay',
												});
												bottomSheetRef.current.snapToIndex(
													0
												);
											} else {
												setCustomBottomSheet({
													handleTitle: 'Add new Card',
													bottomSheetChildren: (
														<View
															style={{
																paddingVertical:
																	getWidthnHeight(
																		3
																	).width,
															}}
														>
															<Text
																style={
																	styles.nickname
																}
															>
																Nickname for
																card
															</Text>
															<View
																style={
																	styles.chipContainer
																}
															>
																<TouchableOpacity
																	onPress={() =>
																		setSelectedNickName(
																			'Personal'
																		)
																	}
																>
																	<Text
																		style={[
																			styles.chip,
																			selectedNickName ===
																				'Personal' && {
																				backgroundColor:
																					colors.primaryRed,
																				color: 'white',
																				borderWidth: 0,
																			},
																		]}
																	>
																		Personal
																	</Text>
																</TouchableOpacity>
																<TouchableOpacity
																	onPress={() =>
																		setSelectedNickName(
																			'Business'
																		)
																	}
																>
																	<Text
																		style={[
																			styles.chip,
																			selectedNickName ===
																				'Business' && {
																				backgroundColor:
																					colors.primaryRed,
																				color: 'white',
																				borderWidth: 0,
																			},
																		]}
																	>
																		Business
																	</Text>
																</TouchableOpacity>
																<TouchableOpacity
																	onPress={() =>
																		setSelectedNickName(
																			'Other'
																		)
																	}
																>
																	<Text
																		style={[
																			styles.chip,
																			selectedNickName ===
																				'Other' && {
																				backgroundColor:
																					colors.primaryRed,
																				color: 'white',
																				borderWidth: 0,
																			},
																		]}
																	>
																		Other
																	</Text>
																</TouchableOpacity>
															</View>
															{selectedNickName ===
																'Other' && (
																<BottomSheetTextInput
																	defaultValue={
																		card.nickName
																	}
																	onChangeText={(
																		text: string
																	) =>
																		setCard(
																			{
																				...card,
																				nickName:
																					text,
																			}
																		)
																	}
																	placeholder='Enter nickname for card'
																	style={
																		styles.cardTextInput
																	}
																	autoComplete='name'
																	inputMode='text'
																	keyboardType='default'
																	textContentType='name'
																/>
															)}
															<BottomSheetTextInput
																defaultValue={
																	card.name
																}
																onChangeText={(
																	text: string
																) =>
																	setCard({
																		...card,
																		name: text,
																	})
																}
																placeholder='Name on card'
																style={
																	styles.cardTextInput
																}
																autoComplete='name'
																inputMode='text'
																keyboardType='default'
																textContentType='name'
															/>
															<BottomSheetTextInput
																defaultValue={
																	card.cardNumber
																}
																onChangeText={(
																	text: string
																) =>
																	setCard({
																		...card,
																		cardNumber:
																			text,
																	})
																}
																placeholder='Card number'
																style={
																	styles.cardTextInput
																}
																autoComplete='name'
																inputMode='text'
																keyboardType='default'
																textContentType='name'
															/>
															<BottomSheetTextInput
																defaultValue={
																	card.expiryDate
																}
																onChangeText={(
																	text: string
																) =>
																	setCard({
																		...card,
																		expiryDate:
																			text,
																	})
																}
																placeholder='Expiry date (MM/YY)'
																style={
																	styles.cardTextInput
																}
																autoComplete='name'
																inputMode='text'
																keyboardType='default'
																textContentType='name'
															/>
														</View>
													),
													buttonText: 'Add Card',
												});
												bottomSheetRef.current.snapToIndex(
													0
												);
											}
										}}
									>
										<Ionicons
											name='add-circle'
											color={colors.primaryRed}
											size={getWidthnHeight(6).width}
										/>
									</Pressable>
								)}
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
											ref={bottomSheetRef}
											item={subItem.item}
											setCustomBottomSheet={
												setCustomBottomSheet
											}
											phoneNumber={phoneNumber}
											setPhoneNumber={setPhoneNumber}
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
			<BottomSheetComponent
				ref={bottomSheetRef}
				animatedSnapPoints={animatedSnapPoints}
				animatedHandleHeight={animatedHandleHeight}
				animatedContentHeight={animatedContentHeight}
				handleContentLayout={handleContentLayout}
				onChange={handleSheetChanges}
				customHandle={customBottomSheet}
			/>
		</React.Fragment>
	);
};

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
	chip: {
		paddingVertical: getWidthnHeight(1).width,
		paddingHorizontal: getWidthnHeight(2.7).width,
		marginRight: getWidthnHeight(2.7).width,
		borderRadius: 9,
		borderColor: colors.lightInputGrey,
		borderWidth: 1,
		color: 'black',
		overflow: 'hidden',
	},
	categoryBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: getWidthnHeight(2.7).width,
	},
	UBSStyle: {
		paddingVertical: getWidthnHeight(6).width,
		marginBottom: getWidthnHeight(2.5).width,
	},
	UBSTI: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: colors.lightInputGrey,
		paddingLeft: getWidthnHeight(3).width,
		paddingVertical: getWidthnHeight(3).width,
	},
	UBSTV: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: getWidthnHeight(2).width,
	},
	UBSTS: {
		color: colors.lightInputGrey,
		alignSelf: 'flex-start',
		fontSize: getWidthnHeight(3.5).width,
		paddingLeft: getWidthnHeight(1).width,
	},
	nickname: {
		color: colors.lightInputGrey,
		alignSelf: 'flex-start',
		fontSize: getWidthnHeight(3.5).width,
		paddingBottom: getWidthnHeight(3.5).width,
	},
	chipContainer: {
		flexDirection: 'row',
		paddingBottom: getWidthnHeight(2.5).width,
	},
	cardTextInput: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: colors.lightInputGrey,
		paddingLeft: getWidthnHeight(3).width,
		paddingVertical: getWidthnHeight(2).width,
		marginBottom: getWidthnHeight(3).width,
	},
	walletContainer: {
		paddingVertical: getWidthnHeight(6).width,
	},
	walletItemHeading: {
		flex: 1,
		paddingLeft: getWidthnHeight(5).width,
	},
	walletTitle: {
		fontSize: getWidthnHeight(5.5).width,
		fontWeight: 'bold',
		color: 'black',
		flex: 1,
	},
	walletSubTitle: {
		color: colors.lightInputGrey,
		alignSelf: 'flex-start',
		fontSize: getWidthnHeight(3.5).width,
		paddingTop: getWidthnHeight(1).width,
		paddingBottom: getWidthnHeight(4).width,
	},
	walletTextInput: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: colors.lightInputGrey,
		paddingLeft: getWidthnHeight(3).width,
		paddingVertical: getWidthnHeight(3).width,
	},
});

export default PaymentsScreen;
