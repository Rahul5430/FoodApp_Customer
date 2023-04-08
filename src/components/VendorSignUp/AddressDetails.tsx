import {
	StyleSheet,
	View,
	Text,
	Pressable,
	TextInput,
	LayoutAnimation,
	Platform,
	UIManager,
} from 'react-native';
import { colors } from '../../themes';
import { DefaultPageProps, VendorData } from '../../screens/VendorSignUpScreen';
import { RFValue, getWidthnHeight } from '../../helpers/responsiveFontSize';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { IconButton, Surface } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MaterialTextInput from '../MaterialTextInput/MaterialTextInput';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import stateAndCitiesDB from '../../data/stateAndCitiesDB.json';
import MaterialDropDown from '../MaterialDropDown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_IOS_KEY } from '@env';

if (
	Platform.OS === 'android' &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface PageProps extends DefaultPageProps {
	getCurrentLocation: () => Promise<void>;
	currentUserLocation: Region;
	onRegionChange: (region: Region) => Promise<void>;
}

type AddressFieldsError = {
	fullAddress: string;
	landmark: string;
	state: string;
	city: string;
	pincode: string;
};

export interface PageComponentProps {
	vendorData: VendorData;
	setVendorData: (data: VendorData) => void;
}

interface AddressFieldsComponentProps extends PageComponentProps {
	addressFieldsError: AddressFieldsError;
	setAddressFieldsError: (data: AddressFieldsError) => void;
	filteredStatesArr: Array<{ label: string; value: string }>;
	filterStatesArr: (value: string) => void;
	filteredCitiesArr: Array<{ label: string; value: string }>;
	filterCitiesArr: (value: string) => void;
	setSelectedState: (value: string) => void;
	setSelectedCity: (value: string) => void;
	selectedState: string;
	selectedCity: string;
}

const AddressFields = ({
	vendorData,
	setVendorData,
	addressFieldsError,
	setAddressFieldsError,
	filteredStatesArr,
	filterStatesArr,
	filteredCitiesArr,
	filterCitiesArr,
	setSelectedState,
	setSelectedCity,
	selectedState,
	selectedCity,
}: AddressFieldsComponentProps) => {
	const fullAddressRef = useRef<TextInput>(null);
	const landmarkRef = useRef<TextInput>(null);
	const stateRef = useRef<TextInput>(null);
	const cityRef = useRef<TextInput>(null);
	const pincodeRef = useRef<TextInput>(null);

	return (
		<View style={{ marginTop: 10, alignItems: 'center' }}>
			<MaterialTextInput
				ref={fullAddressRef}
				value={vendorData.address.fullAddress}
				onChangeText={(text: string) => {
					if (!text) {
						setAddressFieldsError({
							...addressFieldsError,
							fullAddress: 'Please enter full address',
						});
					} else {
						setAddressFieldsError({
							...addressFieldsError,
							fullAddress: '',
						});
					}
					setVendorData({
						...vendorData,
						address: {
							...vendorData.address,
							fullAddress: text,
						},
					});
				}}
				onEndEditing={({ nativeEvent }) => {
					if (!nativeEvent.text) {
						setAddressFieldsError({
							...addressFieldsError,
							fullAddress: 'Please enter full address',
						});
					} else {
						setAddressFieldsError({
							...addressFieldsError,
							fullAddress: '',
						});
					}
				}}
				helperText={addressFieldsError.fullAddress}
				variant='outlined'
				label='Full Address'
				placeholder='Enter address'
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				inputStyle={{ paddingTop: 8, paddingBottom: 8 }}
				autoComplete='street-address'
				inputMode='text'
				keyboardType='default'
				textContentType='streetAddressLine1'
				returnKeyType='next'
				onSubmitEditing={() => landmarkRef.current?.focus()}
				blurOnSubmit={false}
				required
				multiline={true}
				numberOfLines={4}
				textAlignVertical='top'
			/>
			<MaterialTextInput
				ref={landmarkRef}
				value={vendorData.address.landmark}
				onChangeText={(text: string) => {
					setVendorData({
						...vendorData,
						address: { ...vendorData.address, landmark: text },
					});
				}}
				helperText={addressFieldsError.landmark}
				variant='outlined'
				label='Landmark (optional)'
				placeholder='Enter landmark'
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				autoComplete='name'
				inputMode='text'
				keyboardType='default'
				textContentType='name'
				// returnKeyType='next'
				onSubmitEditing={() => stateRef.current?.focus()}
				blurOnSubmit={false}
			/>
			<MaterialDropDown
				data={filteredStatesArr}
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				label='State'
				placeholder='Select state'
				onChangeText={(value: string) => {
					filterStatesArr(value);
				}}
				onChange={(item) => {
					if (item.label !== selectedState) {
						setAddressFieldsError({
							...addressFieldsError,
							city: 'Please select city',
						});
						setSelectedCity('');
					} else {
						setAddressFieldsError({
							...addressFieldsError,
							city: '',
						});
					}
					setSelectedState(item.label);
					setVendorData({
						...vendorData,
						address: { ...vendorData.address, state: item.label },
					});
				}}
				helperText={addressFieldsError.state}
				onFocus={() => {
					setAddressFieldsError({
						...addressFieldsError,
						state: '',
					});
				}}
				onBlur={() => {
					if (!selectedState) {
						setAddressFieldsError({
							...addressFieldsError,
							state: 'Please select state',
						});
					}
				}}
				required
			/>
			<MaterialDropDown
				data={filteredCitiesArr}
				style={{
					marginVertical: 10,
					width: getWidthnHeight(86).width,
				}}
				label='City'
				placeholder='Select city'
				onChangeText={(value: string) => {
					filterCitiesArr(value);
				}}
				onChange={(item) => {
					setAddressFieldsError({
						...addressFieldsError,
						city: '',
					});
					setSelectedCity(item.label);
					setVendorData({
						...vendorData,
						address: { ...vendorData.address, city: item.label },
					});
				}}
				helperText={addressFieldsError.city}
				onFocus={() => {
					setAddressFieldsError({
						...addressFieldsError,
						city: '',
					});
				}}
				onBlur={() => {
					if (!selectedCity) {
						setAddressFieldsError({
							...addressFieldsError,
							city: 'Please select city',
						});
					}
				}}
				required
			/>
			<MaterialTextInput
				ref={pincodeRef}
				value={vendorData.address.pincode}
				onChangeText={(text: string) => {
					if (!text) {
						setAddressFieldsError({
							...addressFieldsError,
							pincode: 'Please enter pincode',
						});
					} else {
						setAddressFieldsError({
							...addressFieldsError,
							pincode: '',
						});
					}
					setVendorData({
						...vendorData,
						address: { ...vendorData.address, pincode: text },
					});
				}}
				onEndEditing={({ nativeEvent }) => {
					if (!nativeEvent.text) {
						setAddressFieldsError({
							...addressFieldsError,
							pincode: 'Please enter pincode',
						});
					} else {
						setAddressFieldsError({
							...addressFieldsError,
							pincode: '',
						});
					}
				}}
				helperText={addressFieldsError.pincode}
				variant='outlined'
				label='Pincode'
				placeholder='Enter pincode'
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

const AddressDetails = ({
	handlePageChange,
	vendorData,
	setVendorData,
	getCurrentLocation,
	currentUserLocation,
	onRegionChange,
	calculateHeight,
}: PageProps) => {
	const [statesArr, setStatesArr] = useState<Array<string>>([]);
	const [citiesArr, setCitiesArr] = useState<Array<string>>([]);
	const [filteredStatesArr, setFilteredStatesArr] = useState<
		Array<{ label: string; value: string }>
	>([]);
	const [filteredCitiesArr, setFilteredCitiesArr] = useState<
		Array<{ label: string; value: string }>
	>([]);
	const [selectedState, setSelectedState] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [showAddressFields, setShowAddressFields] = useState(false);
	const [addressFieldsError, setAddressFieldsError] =
		useState<AddressFieldsError>({
			fullAddress: '',
			landmark: '',
			state: '',
			city: '',
			pincode: '',
		});
	const mapRef = useRef<MapView>(null);

	const handleNext = () => {
		setAddressFieldsError({
			fullAddress: '',
			landmark: '',
			state: '',
			city: '',
			pincode: '',
		});
		const fullAddressError = !vendorData.address.fullAddress;
		const landmarkError = false;
		const stateError = !vendorData.address.state || !selectedState;
		const cityError = !vendorData.address.city || !selectedCity;
		const pincodeError = !vendorData.address.pincode;
		if (
			!fullAddressError &&
			!landmarkError &&
			!stateError &&
			!cityError &&
			!pincodeError
		) {
			handlePageChange(4);
		} else {
			const addressFieldsErrorObj: AddressFieldsError = {
				fullAddress: fullAddressError
					? 'Please enter full address'
					: '',
				landmark: '',
				state: stateError ? 'Please select state' : '',
				city: cityError ? 'Please select city' : '',
				pincode: pincodeError ? 'Please enter pincode' : '',
			};
			setAddressFieldsError(addressFieldsErrorObj);
		}
	};

	useEffect(() => {
		if (addressFieldsError.state && selectedState) {
			setAddressFieldsError({
				...addressFieldsError,
				state: '',
			});
		}

		if (addressFieldsError.city && selectedCity && selectedState) {
			setAddressFieldsError({
				...addressFieldsError,
				city: '',
			});
		}
	}, [
		addressFieldsError.state,
		addressFieldsError.city,
		selectedState,
		selectedCity,
	]);

	const firstUpdate = useRef(true);
	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}

		setTimeout(() => calculateHeight(3), 0);
	}, [
		vendorData.mapAddress,
		showAddressFields,
		addressFieldsError.fullAddress,
		addressFieldsError.landmark,
		addressFieldsError.state,
		addressFieldsError.city,
		addressFieldsError.pincode,
	]);

	useEffect(() => {
		if (statesArr.length === 0) {
			setStatesArr(stateAndCitiesDB.map((state) => state.name));
			setFilteredStatesArr(
				stateAndCitiesDB.map((state) => ({
					label: state.name,
					value: state.name,
				}))
			);
		}
	}, []);

	useEffect(() => {
		if (!!selectedState && statesArr.length > 0) {
			const foundState = stateAndCitiesDB.find(
				(state) => state.name === selectedState
			);
			if (foundState === undefined) {
				console.log('State not found');
			} else {
				setCitiesArr(foundState.cities.map((cities) => cities.name));
				setFilteredCitiesArr(
					foundState.cities.map((cities) => ({
						label: cities.name,
						value: cities.name,
					}))
				);
			}
		}
	}, [statesArr, selectedState]);

	const filterStatesArr = (value: string) => {
		const filteredData = statesArr
			.filter((state) =>
				state.toLowerCase().includes(value.toLowerCase())
			)
			.map((state) => ({
				label: state,
				value: state,
			}));
		setFilteredStatesArr(filteredData);
	};

	const filterCitiesArr = (value: string) => {
		const filteredData = citiesArr
			.filter((city) => city.toLowerCase().includes(value.toLowerCase()))
			.map((city) => ({
				label: city,
				value: city,
			}));
		setFilteredCitiesArr(filteredData);
	};

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Address Details</Text>
			<Text style={styles.subTitle}>
				{showAddressFields
					? 'Delivery partner will pick up orders from here'
					: 'Add or search your pick up address'}
			</Text>
			<GooglePlacesAutocomplete
				placeholder='Search your pick up address'
				query={{
					key:
						Platform.OS === 'android'
							? GOOGLE_MAPS_API_KEY
							: GOOGLE_MAPS_IOS_KEY,
					language: 'en',
					components: 'country:in',
				}}
				fetchDetails={true}
				onPress={(data, details = null) => {
					setTimeout(() => calculateHeight(3), 0);
					console.log('@@@ Data', data);
					console.log('### Details', details);
					console.log('### Geometry', details?.geometry.location);
					if (details) {
						mapRef.current?.animateToRegion({
							...currentUserLocation,
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
						});
					}
				}}
				onFail={(error) => {
					console.log(error);
					setTimeout(() => calculateHeight(3), 0);
				}}
				onNotFound={() => {
					console.log('No results');
					setTimeout(() => calculateHeight(3), 0);
				}}
				listViewDisplayed={true}
				suppressDefaultStyles={true}
				textInputProps={{
					placeholder: 'Search your pick up address',
					placeholderTextColor: colors.lightInputGrey,
					underlineColorAndroid: 'transparent',
					returnKeyType: 'search',
					accessibilityRole: 'search',
					onChangeText: () => setTimeout(() => calculateHeight(3), 0),
					onFocus: () => setTimeout(() => calculateHeight(3), 0),
					onBlur: () => setTimeout(() => calculateHeight(3), 0),
				}}
				listEmptyComponent={() => (
					<View style={{ flex: 1 }}>
						<Text
							style={{ fontFamily: 'Ovo', fontSize: RFValue(14) }}
						>
							No result were found
						</Text>
					</View>
				)}
				renderRightButton={() => (
					<IconButton
						accessibilityRole='button'
						borderless
						rippleColor={'rgba(73, 69, 79, 0.32)'}
						iconColor={colors.darkRed}
						icon={({ size, color }) => (
							<MaterialCommunityIcons
								name='magnify'
								color={color}
								size={size}
							/>
						)}
					/>
				)}
				styles={{
					container: {
						width: getWidthnHeight(86).width,
					},
					textInputContainer: {
						flexDirection: 'row',
						alignItems: 'center',
						fontSize: RFValue(16),
						fontFamily: 'Ovo',
						color: colors.lightInputGrey,
						borderRadius: 50,
						borderColor: colors.lightInputGrey,
						borderWidth: 1,
						backgroundColor: 'white',
						marginVertical: 10,
					},
					textInput: {
						flex: 1,
						alignSelf: 'stretch',
						textAlign: 'left',
						minWidth: 0,
						paddingLeft: 12,
						minHeight: 56,
						fontSize: RFValue(16),
						fontFamily: 'Ovo',
						color: colors.black,
					},
					poweredContainer: {
						justifyContent: 'flex-end',
						alignItems: 'center',
						borderBottomRightRadius: 5,
						borderBottomLeftRadius: 5,
						borderColor: '#c8c7cc',
						borderTopWidth: 0.5,
					},
					powered: {},
					listView: {
						width: getWidthnHeight(86).width,
					},
					row: {
						backgroundColor: '#FFFFFF',
						padding: 13,
						height: 44,
						flexDirection: 'row',
					},
					separator: {
						height: 0.5,
						backgroundColor: '#c8c7cc',
					},
					description: {
						fontSize: RFValue(16),
						fontFamily: 'Ovo',
					},
					loader: {
						flexDirection: 'row',
						justifyContent: 'flex-end',
						height: 20,
					},
				}}
			/>
			<Pressable
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					marginVertical: 5,
				}}
				onPress={getCurrentLocation}
			>
				<MaterialCommunityIcons
					name='crosshairs-gps'
					size={24}
					color={colors.golden}
				/>
				<Text
					style={{
						color: colors.darkRed,
						marginLeft: 5,
						fontSize: RFValue(16),
						fontFamily: 'Ovo',
					}}
				>
					Get current location with GPS
				</Text>
			</Pressable>
			<Surface style={styles.surface} elevation={3}>
				<View style={styles.box}>
					<MapView
						ref={mapRef}
						style={styles.map}
						provider={PROVIDER_GOOGLE}
						initialRegion={vendorData.coords}
						// region={{
						// 	latitude: currentUserLocation?.latitude,
						// 	longitude: currentUserLocation?.longitude,
						// 	latitudeDelta: currentUserLocation?.latitudeDelta,
						// 	longitudeDelta: currentUserLocation?.longitudeDelta,
						// }}
						onRegionChangeComplete={onRegionChange}
						showsUserLocation={true}
					/>
					<View style={styles.markerFixed} pointerEvents='none'>
						<FontAwesome5
							name='map-marker-alt'
							size={24}
							color={colors.primaryButton}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-start',
						marginTop: 7,
						marginBottom: 15,
						width: getWidthnHeight(85).width,
					}}
				>
					<MaterialIcons
						name='location-on'
						size={30}
						color={colors.golden}
					/>
					<View style={{ width: getWidthnHeight(52).width }}>
						<Text
							style={{
								color: colors.darkRed,
								fontSize: RFValue(16),
								fontFamily: 'Ovo',
							}}
						>
							Set Location
						</Text>
						<Text
							style={{
								fontSize: RFValue(14),
								fontFamily: 'Ovo',
								flexWrap: 'wrap',
							}}
						>
							{vendorData.mapAddress}
						</Text>
					</View>
					<Pressable style={styles.addressChangeBtn}>
						<Text
							style={{
								color: 'white',
								textAlign: 'center',
								fontSize: RFValue(14),
								fontFamily: 'Ovo',
							}}
						>
							Change
						</Text>
					</Pressable>
				</View>
			</Surface>
			{showAddressFields && (
				<AddressFields
					vendorData={vendorData}
					setVendorData={setVendorData}
					addressFieldsError={addressFieldsError}
					setAddressFieldsError={setAddressFieldsError}
					filteredStatesArr={filteredStatesArr}
					filterStatesArr={filterStatesArr}
					filteredCitiesArr={filteredCitiesArr}
					filterCitiesArr={filterCitiesArr}
					setSelectedState={setSelectedState}
					setSelectedCity={setSelectedCity}
					selectedState={selectedState}
					selectedCity={selectedCity}
				/>
			)}
			<View style={styles.btnContainer}>
				<Pressable
					style={{ ...styles.btn, marginRight: 7 }}
					onPress={() => handlePageChange(2)}
				>
					<Text style={styles.btnText}>Back</Text>
				</Pressable>
				<Pressable
					style={{ ...styles.btn, marginLeft: 7 }}
					onPress={() => {
						if (showAddressFields) {
							handleNext();
						} else {
							setShowAddressFields(true);
						}
						LayoutAnimation.configureNext(
							LayoutAnimation.Presets.easeInEaseOut
						);
					}}
				>
					<Text style={styles.btnText}>
						{showAddressFields ? 'Next' : 'Proceed'}
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
		backgroundColor: 'white',
	},
	title: {
		fontSize: RFValue(24),
		color: colors.darkRed,
		textAlign: 'center',
		fontFamily: 'Ovo',
	},
	subTitle: {
		color: colors.black,
		fontSize: RFValue(16),
		textAlign: 'center',
		fontFamily: 'Ovo',
	},
	searchBar: {
		borderRadius: 50,
		borderColor: colors.lightInputGrey,
		borderWidth: 1,
		backgroundColor: 'white',
		marginVertical: 10,
	},
	searchBarText: {
		fontSize: 16,
		color: colors.lightInputGrey,
	},
	surface: {
		backgroundColor: 'white',
		borderRadius: 4,
		margin: 5,
		alignItems: 'center',
		marginBottom: 10,
		padding: 0,
	},
	box: {
		width: getWidthnHeight(80).width,
		height: getWidthnHeight(60).width,
		borderWidth: 1,
		borderColor: colors.golden,
		margin: 10,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	markerFixed: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		marginTop: -24,
		marginLeft: -9,
	},
	btnContainer: {
		marginTop: 20,
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
	addressChangeBtn: {
		backgroundColor: colors.darkRed,
		borderRadius: 50,
		paddingVertical: 5,
		paddingHorizontal: 15,
	},
	btnText: {
		color: 'white',
		textTransform: 'uppercase',
		textAlign: 'center',
		fontFamily: 'Ovo',
		fontSize: RFValue(16),
	},
});

export default AddressDetails;
