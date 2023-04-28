import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetProps,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback } from 'react';
import {
	LayoutChangeEvent,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { getWidthnHeight } from '../helpers/responsiveFontSize';
import { colors, fonts } from '../themes';

export interface CustomBottomSheetProps {
	handleTitle: string;
	bottomSheetChildren: React.ReactNode;
	buttonText: string;
}

interface BottomSheetComponentProps extends BottomSheetProps {
	customHandle: CustomBottomSheetProps;
	handleContentLayout: (event: LayoutChangeEvent) => void;
	buttonOnpress?: () => void;
}

const BottomSheetComponent = React.forwardRef<
	BottomSheet,
	BottomSheetComponentProps
>(
	(
		{
			snapPoints,
			handleHeight,
			contentHeight,
			onChange,
			customHandle,
			handleContentLayout,
			buttonOnpress,
		},
		bottomSheetRef
	) => {
		const { bottom } = useSafeAreaInsets();

		const renderBackdrop = useCallback(
			(props: BottomSheetBackdropProps) => (
				<BottomSheetBackdrop
					{...props}
					disappearsOnIndex={-1}
					appearsOnIndex={0}
					pressBehavior={'none'}
				/>
			),
			[]
		);

		return (
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				onChange={onChange}
				backdropComponent={renderBackdrop}
				snapPoints={snapPoints}
				handleHeight={handleHeight}
				contentHeight={contentHeight}
				keyboardBlurBehavior='restore'
				enableContentPanningGesture={false}
				enableHandlePanningGesture={false}
				handleComponent={() => (
					<View
						style={{
							flexDirection: 'row',
							paddingVertical: getWidthnHeight(6).width,
							paddingHorizontal: getWidthnHeight(4).width,
							justifyContent: 'space-between',
							alignItems: 'center',
							borderBottomColor: colors.lightGrey,
							borderBottomWidth: 1,
						}}
					>
						<Text
							style={{
								fontSize: getWidthnHeight(6).width,
								color: 'black',
								fontFamily: fonts.OxygenBold,
							}}
						>
							{customHandle.handleTitle}
						</Text>
						<Pressable
							onPress={() => {
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-expect-error
								bottomSheetRef?.current.close();
							}}
						>
							<AntDesign
								name='closecircle'
								size={getWidthnHeight(8).width}
								color={'black'}
							/>
						</Pressable>
					</View>
				)}
			>
				<BottomSheetView
					style={{ paddingHorizontal: getWidthnHeight(4).width }}
					onLayout={handleContentLayout}
					// keyboardShouldPersistTaps='handled'
				>
					{customHandle.bottomSheetChildren}
					<Button
						mode='contained'
						style={{
							borderRadius: 9,
							marginBottom: Math.max(
								bottom,
								getWidthnHeight(4).width
							),
						}}
						onPress={() => {
							console.log('Verifying...');
							if (buttonOnpress) {
								buttonOnpress();
							}
						}}
						buttonColor={colors.primaryButton}
						labelStyle={styles.btnText}
						contentStyle={{
							minHeight: getWidthnHeight(5).width,
						}}
					>
						{customHandle.buttonText}
					</Button>
				</BottomSheetView>
			</BottomSheet>
		);
	}
);

const styles = StyleSheet.create({
	btnText: {
		fontSize: getWidthnHeight(3.7).width,
		fontFamily: fonts.OxygenBold,
	},
});

export default BottomSheetComponent;
