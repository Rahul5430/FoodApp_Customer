import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { getWidthnHeight } from '../helpers/responsiveFontSize';
import { colors } from '../themes';
import { WelcomeStackScreenProps } from '../types/navigation';

const LocationScreen = (props: WelcomeStackScreenProps<'LocationScreen'>) => {
	const [searchText, setSearchText] = useState('');

	const getCurrentLocation = () => {
		console.log('getCurrentLocation');
	};

	const skip = () => {
		console.log('skip');
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
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps='handled'
				>
					<View style={styles.topBox}>
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
									flexGrow: 1,
									backgroundColor: 'white',
									borderRadius: 9,
									marginLeft: getWidthnHeight(5).width,
								}}
								elevation={2}
							/>
						</View>
					</View>
					<View style={{ flexGrow: 1 }}></View>
					<View style={styles.bottomBox}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
								marginBottom: getWidthnHeight(6).width,
							}}
						>
							<FontAwesome5
								name='map-marker-alt'
								size={getWidthnHeight(12).width}
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
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Button
								mode='contained'
								style={[{ flexGrow: 5, borderRadius: 9 }]}
								onPress={getCurrentLocation}
								buttonColor={colors.primaryRed}
								labelStyle={styles.btnText}
							>
								Use Current Location
							</Button>
							<Button
								mode='text'
								style={[{ flexGrow: 1 }]}
								contentStyle={{ flexDirection: 'row-reverse' }}
								onPress={skip}
								buttonColor={'white'}
								textColor='black'
								icon={() => (
									<Ionicons
										name='chevron-forward-circle'
										size={getWidthnHeight(6).width}
										color={colors.primaryRed}
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
		position: 'absolute',
		width: getWidthnHeight(90).width,
		marginHorizontal: getWidthnHeight(5).width,
		marginTop: getWidthnHeight(100, 7).height,
		zIndex: 999,
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
