import React, {
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Animated, Easing, StyleSheet, View, ViewProps } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../themes';
import { MaterialTextInputProps } from './MaterialTextInput/MaterialTextInput';
import MaterialText from './MaterialTextInput/MaterialText';
import { RFValue } from '../helpers/responsiveFontSize';

type dataType = {
	label: string;
	value: string;
};

interface MaterialDropDownProps extends ViewProps, MaterialTextInputProps {
	data: Array<dataType>;
	label?: string;
	onChangeText: (item: any) => void;
	onChange: (item: any) => void;
	onFocus: () => void;
	onBlur: () => void;
}

const MaterialDropDown = React.forwardRef(
	(
		{
			data,
			label,
			required = false,
			leading,
			trailing,
			style,
			inputContainerStyle,
			helperText,
			helperTextIcon,
			helperTextStyle,
			inputStyle,
			placeholder,
			onFocus,
			onBlur,
			onChangeText,
			onChange,
		}: MaterialDropDownProps,
		ref
	) => {
		const [value, setValue] = useState<string | null>(null);
		const [focused, setFocused] = useState(false);

		const focusAnimation = useMemo(() => new Animated.Value(0), []);

		useEffect(() => {
			Animated.timing(focusAnimation, {
				toValue: focused ? 1 : 0,
				duration: 200,
				easing: Easing.out(Easing.ease),
				useNativeDriver: true,
			}).start();
		}, [focused]);

		const active = useMemo(
			() => focused || (value?.length || 0) > 0,
			[focused, value]
		);

		const activeAnimation = useMemo(
			() => new Animated.Value(active ? 1 : 0),
			[]
		);

		useEffect(() => {
			Animated.timing(activeAnimation, {
				toValue: active ? 1 : 0,
				duration: 200,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start();
		}, [active]);

		const shake = useRef(new Animated.Value(0.5)).current;

		const translateXAnim = shake.interpolate({
			inputRange: [0, 1],
			outputRange: [-16, 16],
		});

		const getAnimationStyles = () => ({
			transform: [
				{
					translateX: translateXAnim,
				},
			],
		});

		const runAnimation = () => {
			Animated.sequence([
				Animated.timing(shake, {
					delay: 300,
					toValue: 1,
					duration: 200,
					easing: Easing.out(Easing.sin),
					useNativeDriver: true,
				}),
				Animated.timing(shake, {
					toValue: 0,
					duration: 100,
					easing: Easing.out(Easing.sin),
					useNativeDriver: true,
				}),
				Animated.timing(shake, {
					toValue: 1,
					duration: 100,
					easing: Easing.out(Easing.sin),
					useNativeDriver: true,
				}),
				Animated.timing(shake, {
					toValue: 0,
					duration: 100,
					easing: Easing.out(Easing.sin),
					useNativeDriver: true,
				}),
				Animated.timing(shake, {
					toValue: 0.5,
					duration: 200,
					easing: Easing.out(Easing.sin),
					useNativeDriver: true,
				}),
			]).start();
		};

		const firstUpdate = useRef(true);
		useLayoutEffect(() => {
			if (firstUpdate.current) {
				firstUpdate.current = false;
				return;
			}

			if (
				helperText ===
					'Enter correct mobile number, an OTP will be generated on this number' ||
				helperText === 'You cannot change unique business later' ||
				helperText === '' ||
				value
			) {
				return;
			}
			runAnimation();
		}, [helperText, value]);

		return (
			<View style={[style]}>
				<View
					style={[
						styles.inputContainer,
						{
							borderTopStartRadius: 50,
							borderTopEndRadius: 50,
							borderBottomStartRadius: 50,
							borderBottomEndRadius: 50,
							borderWidth: focused ? 2 : 1,
							borderColor: focused
								? colors.darkRed
								: value?.length
								? colors.darkGrey
								: '#949494',
						},
						inputContainerStyle,
					]}
				>
					{label && (
						<View
							style={[
								{
									justifyContent: 'center',
									position: 'absolute',
									top: 0,
									start: leading ? 48 : 16,
									height: 56,
								},
							]}
							pointerEvents='none'
						>
							<Animated.View
								style={[
									{
										position: 'absolute',
										top: 0,
										start: -4,
										end: -4,
										height: focused ? 2 : 1,
										backgroundColor: colors.white,
									},
									{
										transform: [
											{ scaleX: activeAnimation },
										],
									},
								]}
							/>
							<Animated.Text
								style={[
									{
										fontSize: RFValue(16),
										letterSpacing: 0.15,
										fontFamily: 'Ovo',
									},
									{
										// color: activeAnimation.interpolate({
										// 	inputRange: [0, 1],
										// 	outputRange: [
										// 		colors.lightInputGrey,
										// 		colors.black,
										// 	],
										// }),
										// fontSize: activeAnimation.interpolate({
										// 	inputRange: [0, 1],
										// 	outputRange: [16, 14],
										// }),
										color: active
											? colors.black
											: colors.lightInputGrey,
										fontSize: active
											? RFValue(14)
											: RFValue(16),
										transform: [
											{
												translateY:
													activeAnimation.interpolate(
														{
															inputRange: [0, 1],
															outputRange: [
																0, -28,
															],
														}
													),
											},
										],
										backgroundColor: 'white',
										paddingLeft: 2,
									},
								]}
							>
								{label}
								{required && (
									<Animated.Text
										style={{
											color: colors.golden,
											fontSize: RFValue(16),
										}}
									>
										*
									</Animated.Text>
								)}
							</Animated.Text>
						</View>
					)}

					<Dropdown
						style={[
							{
								minHeight: 56,
								paddingStart: leading ? 12 : 16,
								paddingEnd: trailing ? 10 : 16,
								// color: colors.black,
								// fontSize: 16,
								// letterSpacing: 0.15,
								paddingTop: 0,
							},
						]}
						containerStyle={[
							{
								// minHeight: 56,
								// paddingStart: leading ? 12 : 16,
								// paddingEnd: trailing ? 10 : 16,
								// color: colors.black,
								// fontSize: 16,
								// letterSpacing: 0.15,
								// paddingTop: 0,
							},
							inputStyle,
						]}
						itemTextStyle={{
							fontSize: RFValue(16),
							fontFamily: 'Ovo',
						}}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						data={data}
						search
						maxHeight={300}
						labelField='label'
						valueField='value'
						placeholder={
							focused
								? !placeholder
									? 'Select item'
									: placeholder
								: ''
						}
						searchPlaceholder={'Search...'}
						value={value}
						onFocus={() => {
							onFocus();
							setFocused(true);
						}}
						onBlur={() => {
							onBlur();
							setFocused(false);
						}}
						onChangeText={onChangeText}
						onChange={(item) => {
							setValue(item.value);
							setFocused(false);
							onChange(item);
						}}
						renderRightIcon={() => (
							<MaterialCommunityIcons
								name='chevron-down'
								size={24}
								color='black'
							/>
						)}
					/>
				</View>
				<Animated.View
					style={[
						{
							marginTop: 4,
							marginHorizontal: 1,
							alignSelf: 'flex-start',
						},
						getAnimationStyles(),
					]}
				>
					{helperTextIcon && helperText ? (
						<View style={{ flexDirection: 'row' }}>
							{helperTextIcon}
							<MaterialText
								variant='body2'
								style={[
									{ color: colors.darkRed },
									helperTextStyle,
									{ flex: 1, flexWrap: 'wrap' },
								]}
							>
								{helperText}
							</MaterialText>
						</View>
					) : (
						helperText && (
							<MaterialText
								variant='body2'
								style={[
									{ color: colors.darkRed },
									helperTextStyle,
								]}
							>
								{helperText}
							</MaterialText>
						)
					)}
				</Animated.View>
			</View>
		);
	}
);

export default MaterialDropDown;

const styles = StyleSheet.create({
	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: RFValue(14),
		fontFamily: 'Ovo',
	},
	placeholderStyle: {
		fontSize: RFValue(16),
		fontFamily: 'Ovo',
		color: '#999999',
	},
	selectedTextStyle: {
		fontSize: RFValue(16),
		fontFamily: 'Ovo',
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: RFValue(16),
		fontFamily: 'Ovo',
	},
	inputContainer: {
		// flexDirection: 'row',
		backgroundColor: colors.white,
	},
	leading: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 24,
		height: 24,
		marginStart: 12,
		marginVertical: 16,
	},
	trailing: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 24,
		marginStart: 0,
		marginEnd: 16,
		marginVertical: 16,
	},
});
