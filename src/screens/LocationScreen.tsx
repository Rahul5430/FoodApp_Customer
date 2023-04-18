/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GOOGLE_MAPS_API_KEY } from '@env';
import BottomSheet, {
	BottomSheetTextInput,
	TouchableOpacity,
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
	ToastAndroid,
	View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {
	LatLng,
	Marker,
	PROVIDER_GOOGLE,
	Region,
} from 'react-native-maps';
import { Button, Searchbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
	| WelcomeStackScreenProps<'LocationScreen'>
	| AuthenticatedStackScreenProps<'LocationScreen'>
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
		address:
			'Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160055',
		coords: coords,
	});
	const [neighborhood, setNeighborhood] = useState('Phase 8B');
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
		console.log(street_address);
		const neighborhood = street_address.address_components.find(
			(item: { types: string[] }) =>
				item.types.some((subItem) => subItem === 'neighborhood')
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
		setNewAddress({
			...newAddress,
			coords: region,
			address: formatted_address,
		});
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

		return (
			<View style={styles.addressBottomSheet}>
				<Text style={styles.nickname}>Save adress as*</Text>
				<View style={styles.chipContainer}>
					<TouchableOpacity onPress={() => setSelectedLabel('Home')}>
						<Text
							style={[
								styles.chip,
								selectedLabel === 'Home' && styles.selectedChip,
							]}
						>
							Home
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setSelectedLabel('Work')}>
						<Text
							style={[
								styles.chip,
								selectedLabel === 'Work' && styles.selectedChip,
							]}
						>
							Work
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setSelectedLabel('Other')}>
						<Text
							style={[
								styles.chip,
								selectedLabel === 'Other' &&
									styles.selectedChip,
							]}
						>
							Other
						</Text>
					</TouchableOpacity>
				</View>
				{selectedLabel === 'Other' && (
					<BottomSheetTextInput
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
					/>
				)}
				<BottomSheetTextInput
					defaultValue={newAddress.address}
					onChangeText={(text: string) =>
						setNewAddress({
							...newAddress,
							address: text,
						})
					}
					placeholder='Complete address*'
					style={styles.cardTextInput}
					autoComplete='name'
					inputMode='text'
					keyboardType='default'
					textContentType='name'
					multiline={true}
				/>
				<BottomSheetTextInput
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
				/>
				<BottomSheetTextInput
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
							<Pressable onPress={() => navigation.goBack()}>
								<Ionicons
									name='chevron-back-circle'
									size={getWidthnHeight(11).width}
									color={colors.primaryRed}
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
								fromAddressScreen &&
									address && {
										bottom: '55%',
									},
							]}
							pointerEvents='none'
						>
							<Text
								style={[
									styles.markerText,
									{ fontWeight: 'bold' },
								]}
							>
								Current Location
							</Text>
							<Text style={[styles.markerText]}>
								{newAddress.address}
							</Text>
						</View>
						<View
							style={[
								{
									position: 'absolute',
									borderRadius: 9,
									bottom: '50%',
									left: getWidthnHeight(48).width,
								},
								fromAddressScreen &&
									address && {
										bottom: '54%',
									},
							]}
							pointerEvents='none'
						>
							<View style={[styles.TriangleShapeCSS]} />
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
								<Text
									style={[
										styles.addressText,
										{
											fontWeight: 'bold',
											fontSize: getWidthnHeight(5).width,
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
												getWidthnHeight(6).width,
										},
									]}
								>
									{newAddress.address}
								</Text>
							</View>
						</View>
						{fromAddressScreen && address ? (
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
	markerFixed: {
		position: 'absolute',
		backgroundColor: colors.lightBlack,
		paddingVertical: getWidthnHeight(2.2).width,
		paddingHorizontal: getWidthnHeight(4).width,
		marginHorizontal: getWidthnHeight(4).width,
		borderRadius: 9,
		bottom: '51%',
	},
	markerText: {
		color: 'white',
		fontSize: getWidthnHeight(3.7).width,
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
	},
	bottomBox: {
		backgroundColor: 'white',
		padding: getWidthnHeight(3).width,
	},
	addressText: {
		color: 'black',
		fontSize: getWidthnHeight(3.5).width,
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
