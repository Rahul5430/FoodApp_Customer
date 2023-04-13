import React from 'react';
import {
	Animated,
	ImageBackground,
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

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { getWidthnHeight } from '../helpers/responsiveFontSize';
import { fonts } from '../themes';

type ScrollViewWithImageHeaderProps = {
	children: React.ReactNode;
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
	containerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
	statusBarProps?: StatusBarProps;
};

const ScrollViewWithImageHeader = ({
	children,
	title = "Baker's in",
	titleStyle,
	containerStyle,
	statusBarProps,
}: ScrollViewWithImageHeaderProps) => {
	const screenWidth = getWidthnHeight(100).width;
	const aspectRatio = 237 / 428;
	const imageHeight = aspectRatio * screenWidth;
	const imageHeightPercent =
		(imageHeight * 100) / getWidthnHeight(100, 100, 'screen').height;

	const { bottom } = useSafeAreaInsets();
	const bottomSafeAreaInset = Math.max(bottom, getWidthnHeight(5).width);

	return (
		<View style={{ flexGrow: 1 }}>
			<FocusAwareStatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
				{...statusBarProps}
			/>
			<ImageBackground
				source={require('../assets/cakebanner.png')}
				style={{
					width: screenWidth,
					height: imageHeight,
					justifyContent: 'center',
				}}
			>
				<Text style={[styles.heading, titleStyle]}>{title}</Text>
			</ImageBackground>
			<Surface
				style={[
					styles.container,
					{
						marginBottom: bottomSafeAreaInset,
						paddingBottom: bottomSafeAreaInset,
						height: getWidthnHeight(
							100,
							100 - imageHeightPercent - 7,
							'screen'
						).height,
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
		borderRadius: 16,
		backgroundColor: 'white',
		marginHorizontal: getWidthnHeight(5).width,
		paddingHorizontal: getWidthnHeight(5).width,
		marginTop: -getWidthnHeight(100, 5, 'screen').height,
	},
});

export default ScrollViewWithImageHeader;
