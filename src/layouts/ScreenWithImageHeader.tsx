import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
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
import { responsiveImageHeight } from '../helpers/responsiveImageSize';
import { fonts } from '../themes';

type ScreenWithImageHeaderProps = {
	children: React.ReactNode;
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
	containerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
	statusBarProps?: StatusBarProps;
	withBottomSheet?: boolean;
	bottomSheetChildren?: React.ReactNode;
};

const ScreenWithImageHeader = ({
	children,
	title = "Baker's in",
	titleStyle,
	containerStyle,
	statusBarProps,
	withBottomSheet = false,
	bottomSheetChildren,
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

	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['40%'], []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

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
				source={require('../assets/images/cakebanner.png')}
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
			{withBottomSheet && (
				<BottomSheet
					ref={bottomSheetRef}
					index={0}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}
					handleComponent={null}
				>
					{bottomSheetChildren}
				</BottomSheet>
			)}
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

export default ScreenWithImageHeader;
