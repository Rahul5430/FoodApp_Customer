/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GOOGLE_MAPS_API_KEY } from '@env';
import BottomSheet, {
	BottomSheetTextInput,
	useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	Alert,
	BackHandler,
	KeyboardAvoidingView,
	Linking,
	PermissionsAndroid,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	ToastAndroid,
	View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { LatLng, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Button, Searchbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import appConfig from '../../app.json';
import BottomSheetComponent, {
	CustomBottomSheetProps,
} from '../components/BottomSheetComponent';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { getWidthnHeight } from '../helpers/responsiveFontSize';
import { setLoggedIn } from '../store/reducers/userSlice';
import { AppDispatch } from '../store/store';
import { colors, fonts } from '../themes';
import {
	Address,
	AuthenticatedStackScreenProps,
	WelcomeStackScreenProps,
} from '../types/navigation';

const LocationScreen: React.FC<
	| AuthenticatedStackScreenProps<'LocationScreen'>
	| WelcomeStackScreenProps<'LocationScreen'>
> = ({ navigation, route }) => {
	console.log(route);
	const address = route.params?.address;
	const fromAddressScreen = route.params?.fromAddressScreen;

	const dispatch = useDispatch<AppDispatch>();

	const { top, bottom } = useSafeAreaInsets();
	const bottomSafeAreaInset =
		bottom < getWidthnHeight(3).width ? getWidthnHeight(3).width : bottom;

	const [coords, setCoords] = useState<Region>({
		latitude: 30.709597189331838,
		longitude: 76.68947006872848,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});
	const [searchText, setSearchText] = useState('');
	const [newAddress, setNewAddress] = useState<Address>({
		id: '',
		label: '',
		address: '',
		coords: coords,
		floor: '',
		landmark: '',
	});
	const [neighborhood, setNeighborhood] = useState('');
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [customBottomSheet, setCustomBottomSheet] =
		useState<CustomBottomSheetProps>({
			handleTitle: '',
			bottomSheetChildren: null,
			buttonText: '',
		});

	const mapRef = useRef<MapView>(null);
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
					bottomSheetRef.current?.close();
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

	const hasPermissionIOS = async () => {
		const openSetting = () => {
			Linking.openSettings().catch(() => {
				Alert.alert('Unable to open settings');
			});
		};
		const status = await Geolocation.requestAuthorization('whenInUse');

		if (status === 'granted') {
			return true;
		}

		if (status === 'denied') {
			Alert.alert('Location permission denied');
		}

		if (status === 'disabled') {
			Alert.alert(
				`Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
				'',
				[
					{ text: 'Go to Settings', onPress: openSetting },
					{
						text: "Don't Use Location",
						onPress: () => {
							console.log('Denied');
						},
					},
				]
			);
		}

		return false;
	};

	const hasLocationPermission = async () => {
		if (Platform.OS === 'ios') {
			const hasPermission = await hasPermissionIOS();
			return hasPermission;
		}

		if (Platform.OS === 'android' && Platform.Version < 23) {
			return true;
		}

		const hasPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);

		if (hasPermission) {
			return true;
		}

		const status = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);

		if (status === PermissionsAndroid.RESULTS.GRANTED) {
			return true;
		}

		if (status === PermissionsAndroid.RESULTS.DENIED) {
			ToastAndroid.show(
				'Location permission denied by user.',
				ToastAndroid.LONG
			);
		} else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
			ToastAndroid.show(
				'Location permission revoked by user.',
				ToastAndroid.LONG
			);
		}

		return false;
	};

	const getCurrentLocation = async () => {
		const hasPermission = await hasLocationPermission();

		if (!hasPermission) {
			return;
		}
		console.log('getCurrentLocation');
		Geolocation.getCurrentPosition(
			(pos) => {
				console.log(pos.coords);
				console.log(coords);
				setCoords({
					...coords,
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude,
				});
				mapRef.current?.animateToRegion({
					...coords,
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude,
				});
				if (!fromAddressScreen) {
					dispatch(setLoggedIn(true));
					AsyncStorage.setItem('token', JSON.stringify({}));
				} else if (!address) {
					onRegionChangeComplete({
						...coords,
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude,
					});
				}
			},
			(error) => Toast.show(error.message),
			{
				accuracy: {
					android: 'high',
					ios: 'best',
				},
				enableHighAccuracy: true,
				timeout: 15000,
				maximumAge: 10000,
				distanceFilter: 0,
				forceRequestLocation: true,
			}
		);
	};

	const getAddress = async ({ latitude, longitude }: LatLng) => {
		const url =
			'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
			latitude +
			',' +
			longitude +
			'&key=' +
			GOOGLE_MAPS_API_KEY;
		const response = await fetch(url);
		const data = await response.json();
		const street_address = data.results[0];
		console.log(JSON.stringify(street_address, null, 4));
		const neighborhood = street_address.address_components.find(
			(item: { types: string[] }) =>
				item.types.some(
					(subItem) =>
						subItem === 'neighborhood' ||
						subItem === 'sublocality' ||
						subItem === 'sublocality_level_1' ||
						subItem === 'route' ||
						subItem === 'locality' ||
						subItem === 'political'
				)
		).long_name;
		return {
			formatted_address: street_address.formatted_address as string,
			neighborhood: neighborhood as string,
		};
	};

	const skip = () => {
		console.log('skip');
		dispatch(setLoggedIn(true));
	};

	const onRegionChangeComplete = async (region: Region) => {
		console.log('onRegionChangeComplete: ', region);
		const { formatted_address, neighborhood } = await getAddress(region);
		setNeighborhood(neighborhood);
		if (address) {
			setNewAddress({
				...newAddress,
				label: address?.label,
				coords: region,
				address: formatted_address,
			});
		} else {
			setNewAddress({
				...newAddress,
				coords: region,
				address: formatted_address,
			});
		}
	};

	const saveAddress = () => {
		console.log(JSON.stringify(newAddress, null, 4));
	};

	useEffect(() => {
		if (address && fromAddressScreen) {
			setCoords(address.coords);
			onRegionChangeComplete(address.coords);
		} else {
			getCurrentLocation();
		}
	}, [address, fromAddressScreen]);

	const AddressBottomSheetChildren = () => {
		const [selectedLabel, setSelectedLabel] = useState<
			'Home' | 'Work' | 'Other'
		>('Home');

		const labelRef = useRef<TextInput>(null);
		const completeAddressRef = useRef<TextInput>(null);
		const floorRef = useRef<TextInput>(null);
		const landmarkRef = useRef<TextInput>(null);

		useEffect(() => {
			setSelectedLabel(
				address?.label !== 'Home' && address?.label !== 'Work'
					? 'Other'
					: address.label
			);
		}, [address]);

		return (
			<View style={styles.addressBottomSheet}>
				<Text style={styles.nickname}>Save adress as*</Text>
				<View style={styles.chipContainer}>
					<Pressable
						onPress={() => {
							setSelectedLabel('Home');
							setNewAddress({ ...newAddress, label: 'Home' });
						}}
					>
						<Text
							style={[
								styles.chip,
								selectedLabel === 'Home' && styles.selectedChip,
							]}
						>
							Home
						</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							setSelectedLabel('Work');
							setNewAddress({ ...newAddress, label: 'Work' });
						}}
					>
						<Text
							style={[
								styles.chip,
								selectedLabel === 'Work' && styles.selectedChip,
							]}
						>
							Work
						</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							setSelectedLabel('Other');
							setNewAddress({
								...newAddress,
								label: address?.label || '',
							});
						}}
					>
						<Text
							style={[
								styles.chip,
								selectedLabel === 'Other' &&
									styles.selectedChip,
							]}
						>
							Other
						</Text>
					</Pressable>
				</View>
				{selectedLabel === 'Other' && (
					<BottomSheetTextInput
						ref={labelRef as any}
						defaultValue={newAddress.label}
						onChangeText={(text: string) =>
							setNewAddress({
								...newAddress,
								label: text,
							})
						}
						placeholder='Enter label for address'
						style={styles.cardTextInput}
						autoComplete='name'
						inputMode='text'
						keyboardType='default'
						textContentType='name'
						blurOnSubmit={false}
						returnKeyType='next'
						onSubmitEditing={() =>
							completeAddressRef.current?.focus()
						}
					/>
				)}
				<BottomSheetTextInput
					ref={completeAddressRef as any}
					defaultValue={newAddress.address}
					onChangeText={(text: string) =>
						setNewAddress({
							...newAddress,
							address: text,
						})
					}
					placeholder='Complete address*'
					style={[styles.cardTextInput, { textAlignVertical: 'top' }]}
					autoComplete='name'
					inputMode='text'
					keyboardType='default'
					textContentType='name'
					multiline={true}
					// numberOfLines={4}
				/>
				<BottomSheetTextInput
					ref={floorRef as any}
					defaultValue={newAddress.floor}
					onChangeText={(text: string) =>
						setNewAddress({
							...newAddress,
							floor: text,
						})
					}
					placeholder='Floor (optional)'
					style={styles.cardTextInput}
					autoComplete='name'
					inputMode='text'
					keyboardType='default'
					textContentType='name'
					blurOnSubmit={false}
					returnKeyType='next'
					onSubmitEditing={() => landmarkRef.current?.focus()}
				/>
				<BottomSheetTextInput
					ref={landmarkRef as any}
					defaultValue={newAddress.landmark}
					onChangeText={(text: string) =>
						setNewAddress({
							...newAddress,
							landmark: text,
						})
					}
					placeholder='Nearby landmark (optional)'
					style={styles.cardTextInput}
					autoComplete='name'
					inputMode='text'
					keyboardType='default'
					textContentType='name'
				/>
			</View>
		);
	};

	return (
		<View style={{ flexGrow: 1 }}>
			<FocusAwareStatusBar
				barStyle='dark-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
			/>
			<KeyboardAvoidingView
				style={{ flexGrow: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView
					contentContainerStyle={{
						justifyContent: 'space-between',
						height: getWidthnHeight(100, 100).height,
					}}
					keyboardShouldPersistTaps='handled'
					scrollEnabled={false}
				>
					<View
						style={[
							styles.topBox,
							{
								marginTop: top + getWidthnHeight(100, 3).height,
							},
						]}
					>
						<View style={{ flexDirection: 'row' }}>
							<Pressable
								onPress={() => navigation.goBack()}
								style={styles.backButton}
							>
								<Feather
									name='chevron-left'
									size={getWidthnHeight(10).width}
									color={'white'}
									style={{ alignSelf: 'center' }}
								/>
							</Pressable>
							<Searchbar
								placeholder='Search here...'
								value={searchText}
								onChangeText={setSearchText}
								iconColor={colors.primaryRed}
								traileringIcon={() => (
									<Foundation
										name='marker'
										size={getWidthnHeight(6).width}
										color={colors.primaryRed}
									/>
								)}
								style={{
									flex: 1,
									flexGrow: 1,
									backgroundColor: 'white',
									borderRadius: 9,
									marginLeft: getWidthnHeight(5).width,
								}}
								elevation={2}
							/>
						</View>
					</View>
					<View
						style={[
							StyleSheet.absoluteFill,
							getWidthnHeight(100, 100, 'screen'),
							{ justifyContent: 'center', alignItems: 'center' },
						]}
					>
						<MapView
							ref={mapRef}
							provider={PROVIDER_GOOGLE}
							style={[StyleSheet.absoluteFillObject]}
							initialRegion={coords}
							onRegionChangeComplete={onRegionChangeComplete}
							showsUserLocation={true}
							showsMyLocationButton={false}
						/>
						<View
							style={[
								styles.markerFixed,
								fromAddressScreen && {
									bottom: '55%',
								},
								!(neighborhood && newAddress.address) && {
									backgroundColor: 'transparent',
								},
							]}
							pointerEvents='none'
						>
							{neighborhood && newAddress.address ? (
								<View style={styles.markerTextContainer}>
									<Text
										style={[
											styles.markerText,
											{ fontWeight: 'bold' },
										]}
									>
										Current Location
									</Text>
									<Text
										style={styles.markerText}
										numberOfLines={2}
									>
										{newAddress.address}
									</Text>
								</View>
							) : (
								<React.Fragment>
									<SkeletonPlaceholder
										borderRadius={9}
										backgroundColor={colors.placeholderGrey}
									>
										<View style={styles.markerSkeleton} />
									</SkeletonPlaceholder>
									<SkeletonPlaceholder borderRadius={5}>
										<React.Fragment>
											<View
												style={styles.markerSkeletonOne}
											/>
											<View
												style={styles.markerSkeletonTwo}
											/>
										</React.Fragment>
									</SkeletonPlaceholder>
								</React.Fragment>
							)}
						</View>
						<View
							style={[
								styles.markerTriangle,
								fromAddressScreen && {
									bottom: '54%',
								},
							]}
							pointerEvents='none'
						>
							<View
								style={[
									styles.TriangleShapeCSS,
									!(neighborhood && newAddress.address) && {
										borderTopColor: colors.placeholderGrey,
									},
								]}
							/>
						</View>
						<View
							style={[
								{
									position: 'absolute',
									borderRadius: 9,
									bottom: '50%',
								},
							]}
							pointerEvents='none'
						>
							<MaterialIcons
								name='location-pin'
								color={colors.primaryRed}
								size={getWidthnHeight(7).width}
							/>
						</View>
					</View>
					<View
						style={{
							backgroundColor: 'white',
							padding: getWidthnHeight(3).width,
							paddingBottom: bottomSafeAreaInset,
							paddingTop: getWidthnHeight(4.4).width,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
								marginBottom: getWidthnHeight(6).width,
							}}
						>
							<FontAwesome5
								name='map-marker-alt'
								size={getWidthnHeight(10).width}
								color={colors.primaryRed}
							/>
							<View
								style={{
									paddingLeft: getWidthnHeight(3).width,
									paddingRight: getWidthnHeight(6).width,
								}}
							>
								{neighborhood && newAddress.address ? (
									<React.Fragment>
										<Text
											style={[
												styles.addressText,
												{
													fontWeight: 'bold',
													fontSize:
														getWidthnHeight(5)
															.width,
												},
											]}
										>
											{neighborhood}
										</Text>
										<Text
											style={[
												styles.addressText,
												{
													paddingRight:
														getWidthnHeight(6)
															.width,
												},
											]}
										>
											{newAddress.address}
										</Text>
									</React.Fragment>
								) : (
									<SkeletonPlaceholder borderRadius={5}>
										<React.Fragment>
											<View
												style={
													styles.addressLabelSkeleton
												}
											/>
											<View
												style={
													styles.addressTextSkeleton
												}
											/>
										</React.Fragment>
									</SkeletonPlaceholder>
								)}
							</View>
						</View>
						{fromAddressScreen ? (
							<Button
								mode='contained'
								style={[
									{
										width: getWidthnHeight(90).width,
										borderRadius: 9,
										alignSelf: 'center',
									},
								]}
								onPress={() => {
									setCustomBottomSheet({
										...customBottomSheet,
										handleTitle: 'Enter Complete address',
										bottomSheetChildren: (
											<AddressBottomSheetChildren />
										),
										buttonText: 'Save Address',
									});
									bottomSheetRef.current?.snapToIndex(0);
								}}
								buttonColor={colors.primaryButton}
								labelStyle={styles.btnText}
							>
								Enter Complete Address
							</Button>
						) : (
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-evenly',
									alignItems: 'center',
								}}
							>
								<Button
									mode='contained'
									style={[
										{
											width: getWidthnHeight(60).width,
											borderRadius: 9,
										},
									]}
									onPress={getCurrentLocation}
									buttonColor={colors.primaryButton}
									labelStyle={styles.btnText}
								>
									Use Current Location
								</Button>
								<Button
									mode='text'
									style={[
										{ width: getWidthnHeight(20).width },
									]}
									contentStyle={{
										flexDirection: 'row-reverse',
									}}
									onPress={skip}
									buttonColor={'white'}
									textColor='black'
									icon={() => (
										<Ionicons
											name='chevron-forward-circle'
											size={getWidthnHeight(6).width}
											color={colors.primaryButton}
										/>
									)}
									labelStyle={styles.btnText}
								>
									Skip
								</Button>
							</View>
						)}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
			{/* @ts-ignore */}
			<BottomSheetComponent
				ref={bottomSheetRef}
				snapPoints={animatedSnapPoints}
				handleHeight={animatedHandleHeight}
				contentHeight={animatedContentHeight}
				handleContentLayout={handleContentLayout}
				onChange={handleSheetChanges}
				customHandle={customBottomSheet}
				buttonOnpress={() => saveAddress()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	topBox: {
		width: getWidthnHeight(90).width,
		marginHorizontal: getWidthnHeight(5).width,
		zIndex: 999,
	},
	backButton: {
		borderRadius: 50,
		backgroundColor: colors.primaryRed,
		width: getWidthnHeight(11).width,
		height: getWidthnHeight(11).width,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	markerFixed: {
		position: 'absolute',
		backgroundColor: colors.lightBlack,
		borderRadius: 9,
		bottom: '51%',
		zIndex: 2,
		width: getWidthnHeight(84).width,
		height: getWidthnHeight(20).width,
	},
	markerTextContainer: {
		paddingVertical: getWidthnHeight(2.2).width,
		paddingHorizontal: getWidthnHeight(4).width,
	},
	markerText: {
		color: 'white',
		fontSize: getWidthnHeight(3.7).width,
	},
	markerTriangle: {
		position: 'absolute',
		borderRadius: 9,
		bottom: '50%',
		left: getWidthnHeight(48).width,
	},
	TriangleShapeCSS: {
		width: 0,
		height: 0,
		borderLeftWidth: getWidthnHeight(2).width,
		borderRightWidth: getWidthnHeight(2).width,
		borderTopWidth: getWidthnHeight(4).width,
		borderStyle: 'solid',
		backgroundColor: 'transparent',
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: colors.lightBlack,
		zIndex: 1,
	},
	markerSkeleton: {
		width: getWidthnHeight(84).width,
		height: getWidthnHeight(20).width,
		paddingHorizontal: getWidthnHeight(4).width,
	},
	markerSkeletonOne: {
		width: getWidthnHeight(30).width,
		height: getWidthnHeight(5).width,
		marginBottom: getWidthnHeight(2.5).width,
		marginTop: -getWidthnHeight(16.5).width,
		marginLeft: getWidthnHeight(4).width,
	},
	markerSkeletonTwo: {
		width: getWidthnHeight(70).width,
		height: getWidthnHeight(5).width,
		marginLeft: getWidthnHeight(4).width,
	},
	bottomBox: {
		backgroundColor: 'white',
		padding: getWidthnHeight(3).width,
	},
	addressText: {
		color: 'black',
		fontSize: getWidthnHeight(3.5).width,
	},
	addressLabelSkeleton: {
		width: getWidthnHeight(30).width,
		height: getWidthnHeight(5).width,
		marginBottom: getWidthnHeight(3).width,
	},
	addressTextSkeleton: {
		width: getWidthnHeight(70).width,
		height: getWidthnHeight(5).width,
		marginBottom: getWidthnHeight(3).width,
	},
	btnText: {
		fontSize: getWidthnHeight(4).width,
	},
	addressBottomSheet: {
		paddingVertical: getWidthnHeight(3).width,
	},
	nickname: {
		color: colors.lightInputGrey,
		alignSelf: 'flex-start',
		fontSize: getWidthnHeight(3.5).width,
		paddingBottom: getWidthnHeight(3.5).width,
		fontFamily: fonts.Oxygen,
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
		fontFamily: fonts.Oxygen,
		fontSize: getWidthnHeight(3.5).width,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	selectedChip: {
		backgroundColor: colors.primaryRed,
		color: 'white',
		borderColor: colors.primaryRed,
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
		fontFamily: fonts.Oxygen,
		fontSize: getWidthnHeight(3.5).width,
	},
});

export default LocationScreen;
