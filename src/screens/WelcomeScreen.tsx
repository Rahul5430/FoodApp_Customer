import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MaterialTextInput from '../components/MaterialTextInput/MaterialTextInput';
import { getWidthnHeight, RFValue } from '../helpers/responsiveFontSize';
import { validatePhone } from '../helpers/utils';

const WelcomeScreen = () => {
	const [error, setError] = useState('');
	const [userPhone, setUserPhone] = useState('');

	const screenWidth = getWidthnHeight(100).width;
	const aspectRatio = 237 / 428;
	const imageHeight = aspectRatio * screenWidth;

	return (
		<View>
			<FocusAwareStatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
			/>
			<ImageBackground
				source={require('../assets/cakebanner.png')}
				style={{
					width: screenWidth,
					height: imageHeight,
					justifyContent: 'center',
				}}
			>
				<Text style={styles.heading}>{"Baker's in"}</Text>
			</ImageBackground>
			<Surface style={styles.container}>
				<View style={styles.avatar}>
					<Fontisto name='person' size={40} />
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={styles.text}>Hi.</Text>
					<MaterialCommunityIcons
						name='hand-wave'
						size={getWidthnHeight(5).width}
						style={{ paddingLeft: 10 }}
					/>
				</View>
				<Text style={styles.text}>{"Let's get started"}</Text>
				<MaterialTextInput
					value={userPhone}
					onChangeText={(text: string) => {
						if (!validatePhone(text)) {
							setError('Please enter valid phone number');
						} else {
							setError('');
						}
						setUserPhone(text);
					}}
					variant='standard'
					label='Mobile number'
					placeholder='Enter your number'
					leadingContainerStyle={{ width: 30 }}
					style={{
						marginTop: 10,
						marginBottom: error ? 0 : 10,
						marginHorizontal: getWidthnHeight(5).width,
					}}
					leading={
						<Text
							style={{
								fontFamily: 'Ovo',
								fontSize: RFValue(16),
								color: 'black',
							}}
							adjustsFontSizeToFit
							numberOfLines={1}
						>
							+91
						</Text>
					}
					helperText={error}
					autoComplete='tel'
					inputMode='numeric'
					keyboardType='numeric'
					textContentType='telephoneNumber'
					onEndEditing={({ nativeEvent }) => {
						if (!validatePhone(nativeEvent.text)) {
							setError('Please enter valid phone number');
						} else {
							setError('');
						}
					}}
				/>
				<Button mode='contained' style={styles.button}>
					Continue
				</Button>
			</Surface>
		</View>
	);
};

const styles = StyleSheet.create({
	heading: {
		color: 'white',
		textAlign: 'center',
		fontSize: getWidthnHeight(10).width,
		textAlignVertical: 'center',
	},
	container: {
		borderRadius: 10,
		backgroundColor: 'white',
		marginHorizontal: 20,
		marginTop: -30,
		flexGrow: 1,
	},
	avatar: {
		backgroundColor: 'red',
		borderRadius: 50,
		width: getWidthnHeight(20).width,
		height: getWidthnHeight(20).width,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginVertical: getWidthnHeight(6).width,
	},
	text: {
		color: 'black',
		fontSize: getWidthnHeight(5).width,
		textAlign: 'center',
	},
	button: {
		margin: getWidthnHeight(5).width,
	},
});

export default WelcomeScreen;
