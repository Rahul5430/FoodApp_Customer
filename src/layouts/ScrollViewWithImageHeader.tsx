import React from 'react';
import {
	Animated,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	ScrollViewProps,
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
	scrollViewProps?: ScrollViewProps;
};

const ScrollViewWithImageHeader = ({
	children,
	title = "Baker's in",
	titleStyle,
	containerStyle,
	statusBarProps,
	scrollViewProps,
}: ScrollViewWithImageHeaderProps) => {
	const screenWidth = getWidthnHeight(100).width;
	const aspectRatio = 237 / 428;
	const imageHeight = aspectRatio * screenWidth;
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

	return (
		<View style={{ flexGrow: 1 }}>
			<FocusAwareStatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
				{...statusBarProps}
			/>
			<KeyboardAvoidingView
				style={{ flexGrow: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView
					contentContainerStyle={[
						{ flexGrow: 1 },
						scrollViewProps &&
							scrollViewProps.contentContainerStyle,
					]}
					keyboardShouldPersistTaps='handled'
					{...scrollViewProps}
				>
					<ImageBackground
						source={require('../assets/cakebanner.png')}
						style={{
							width: screenWidth,
							height: imageHeight,
							justifyContent: 'center',
						}}
					>
						<Text style={[styles.heading, titleStyle]}>
							{title}
						</Text>
					</ImageBackground>
					<Surface
						style={[
							styles.container,
							{
								marginBottom: bottomSafeAreaInset,
								minHeight: remainingHeight,
							},
							containerStyle,
						]}
						elevation={2}
					>
						{children}
					</Surface>
				</ScrollView>
			</KeyboardAvoidingView>
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
