import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Button, Searchbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { getWidthnHeight } from '../helpers/responsiveFontSize';
import { setLoggedIn } from '../store/reducers/userSlice';
import { AppDispatch } from '../store/store';
import { colors } from '../themes';
import { WelcomeStackScreenProps } from '../types/navigation';

const LocationScreen: React.FC<
	WelcomeStackScreenProps<'LocationScreen'>
> = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { top, bottom } = useSafeAreaInsets();
	const bottomSafeAreaInset =
		bottom < getWidthnHeight(3).width ? getWidthnHeight(3).width : bottom;

	const [searchText, setSearchText] = useState('');
	const [coords, setCoords] = useState<Region>({
		latitude: 30.709597189331838,
		longitude: 76.68947006872848,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	});

	const mapRef = useRef<MapView>(null);

	const getCurrentLocation = () => {
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
				dispatch(setLoggedIn(true));
				AsyncStorage.setItem('token', JSON.stringify({}));
			},
			(error) => Toast.show(error.message)
		);
	};

	const skip = () => {
		console.log('skip');
		dispatch(setLoggedIn(true));
	};

	const onRegionChangeComplete = (region: Region) => {
		console.log('onRegionChangeComplete: ', region);
	};

	useEffect(() => {
		getCurrentLocation();
	}, []);

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
							<Ionicons
								name='chevron-back-circle'
								size={getWidthnHeight(11).width}
								color={colors.primaryRed}
								style={{ alignSelf: 'center' }}
							/>
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
						<View style={styles.markerFixed} pointerEvents='none'>
							<Text
								style={[
									styles.markerText,
									{ fontWeight: 'bold' },
								]}
							>
								Current Location
							</Text>
							<Text style={[styles.markerText]}>
								Industrial Area, Sector 74, Sahibzada Ajit Singh
								Nagar, Punjab 160055
							</Text>
						</View>
						<View
							style={{
								position: 'absolute',
								borderRadius: 9,
								bottom: '50%',
								left: getWidthnHeight(47.5).width,
							}}
							pointerEvents='none'
						>
							<View style={[styles.TriangleShapeCSS]} />
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
									Phase 8B
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
									Industrial Area, Sector 74, Sahibzada Ajit
									Singh Nagar, Punjab 160055
								</Text>
							</View>
						</View>
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
								style={[{ width: getWidthnHeight(20).width }]}
								contentStyle={{ flexDirection: 'row-reverse' }}
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
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
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
});

export default LocationScreen;
