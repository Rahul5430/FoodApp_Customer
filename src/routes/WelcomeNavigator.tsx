import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import SearchLocationHeader from '../components/Headers/SearchLocationHeader';
// import LocationScreen from '../screens/LocationScreen';
// import OTPScreen from '../screens/OTPScreen';
// import SearchLocation from '../screens/SearchLocation';
// import SigninScreen from '../screens/SigninScreen';
// import SignupScreen from '../screens/SignupScreen';
// import VendorSignUpScreen from '../screens/VendorSignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
// import { colors } from '../themes';

const Stack = createNativeStackNavigator();

const WelcomeNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='welcomeScreen' component={WelcomeScreen} />
			{/* <Stack.Screen name='signin' component={SigninScreen} /> */}
			{/* <Stack.Screen name='signup' component={SignupScreen} /> */}
			{/* <Stack.Screen name='vendorSignup' component={VendorSignUpScreen} />
			<Stack.Screen
				name='otp'
				component={OTPScreen}
				options={{
					headerShown: true,
					title: 'Back',
					headerTintColor: colors.headerOrange,
					headerTitleAlign: 'left',
				}}
			/>
			<Stack.Screen name='locationScreen' component={LocationScreen} />
			<Stack.Screen
				name='searchLocation'
				component={SearchLocation}
				options={{
					headerShown: true,
					header: () => <SearchLocationHeader />,
				}}
			/> */}
		</Stack.Navigator>
	);
};

export default WelcomeNavigator;
