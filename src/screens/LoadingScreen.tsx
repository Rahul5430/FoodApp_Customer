import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { RFValue } from '../helpers/responsiveFontSize';
import {
	setLoggedIn,
	setOrders,
	setUserLocation,
	setUserObj,
} from '../store/reducers/userSlice';
import { colors } from '../themes';

const LoadingScreen = () => {
	const dispatch = useDispatch();

	const getToken = async () => {
		AsyncStorage.getItem('token').then((token) => {
			console.log('token: ' + token);
			if (token) {
				dispatch(setLoggedIn(true));
				dispatch(setUserObj(token));
			} else {
				dispatch(setLoggedIn(false));
			}
		});
		AsyncStorage.getItem('location').then((location) => {
			if (location) {
				dispatch(setUserLocation(location));
			}
		});
		AsyncStorage.getItem('orders').then((orders) => {
			dispatch(setOrders(orders));
		});
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<View style={styles.screen}>
			<FocusAwareStatusBar
				barStyle='dark-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
			/>
			<ActivityIndicator
				size={RFValue(50)}
				color={colors.primaryButton}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loading: {
		color: colors.black,
	},
});

export default LoadingScreen;
