import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
	Animated,
	ImageBackground,
	Platform,
	Pressable,
	StatusBarProps,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import { Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { getWidthnHeight } from '../helpers/responsiveFontSize';
import { responsiveImageHeight } from '../helpers/responsiveImageSize';
import { fonts } from '../themes';

type ScreenWithImageHeaderProps = {
	children: React.ReactNode;
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
	containerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
	statusBarProps?: StatusBarProps;
	backButton?: boolean;
};

const ScreenWithImageHeader = ({
	children,
	title = "Baker's in",
	titleStyle,
	containerStyle,
	statusBarProps,
	backButton = false,
}: ScreenWithImageHeaderProps) => {
	const screenWidth = getWidthnHeight(100).width;
	const imageHeight = responsiveImageHeight(428, 237, screenWidth);
	const { top, bottom } = useSafeAreaInsets();
	const remainingHeight =
		getWidthnHeight(100, 100).height + top - imageHeight;
	const bottomSafeAreaInset = Math.max(
		bottom,
		getWidthnHeight(100, 100).height -
			(imageHeight +
				remainingHeight -
				getWidthnHeight(100, 5, 'screen').height)
	);

	const navigation = useNavigation();

	return (
		<View style={{ flexGrow: 1, backgroundColor: 'white' }}>
			<FocusAwareStatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
				{...statusBarProps}
			/>
			<ImageBackground
				source={require('../assets/images/cakebanner.png')}
				style={{
					width: screenWidth,
					height: imageHeight,
					justifyContent: 'center',
				}}
			>
				{backButton && (
					<Pressable
						onPress={() => navigation.goBack()}
						style={{
							position: 'absolute',
							top: top + 10,
							left: 10,
						}}
					>
						<Feather
							name='chevron-left'
							color='white'
							size={getWidthnHeight(10).width}
						/>
					</Pressable>
				)}
				<Text style={[styles.heading, titleStyle]}>{title}</Text>
			</ImageBackground>
			<Surface
				style={[
					styles.container,
					{ marginBottom: bottomSafeAreaInset },
					Platform.OS === 'ios'
						? {
								height:
									remainingHeight -
									getWidthnHeight(100, 5, 'screen').height,
						  }
						: {
								minHeight:
									remainingHeight -
									getWidthnHeight(100, 5, 'screen').height,
								maxHeight: remainingHeight,
						  },
					containerStyle,
				]}
				elevation={2}
			>
				{children}
			</Surface>
		</View>
	);
};

const styles = StyleSheet.create({
	heading: {
		color: 'white',
		textAlign: 'center',
		fontSize: getWidthnHeight(11).width,
		textAlignVertical: 'center',
		fontFamily: fonts.Pattaya,
	},
	container: {
		borderRadius: 23,
		backgroundColor: 'white',
		marginHorizontal: getWidthnHeight(5).width,
		paddingHorizontal: getWidthnHeight(5).width,
		marginTop: -getWidthnHeight(100, 5, 'screen').height,
	},
});

export default ScreenWithImageHeader;
