import React, {
	forwardRef,
	RefObject,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	NativeSyntheticEvent,
	Platform,
	StyleProp,
	TextInput,
	TextInputKeyPressEventData,
	TextInputProps,
	View,
	ViewStyle,
} from 'react-native';

type Props = TextInputProps & {
	inputContainerStyles?: StyleProp<ViewStyle>;
	firstInput: boolean;
	focusStyles?: StyleProp<ViewStyle>;
	activeStyles?: StyleProp<ViewStyle>;
	inputStyles?: StyleProp<ViewStyle>;
	numberOfInputs: number;
	handleTextChange: (text: string) => void;
	inputValue: string;
	handleKeyPress: (
		keyPressEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
	) => void;
};

const majorVersionIOS: number = parseInt(`${Platform.Version}`, 10);
const isOTPSupported: boolean = Platform.OS === 'ios' && majorVersionIOS >= 12;

const OtpInput = forwardRef<TextInput, Props>(
	(
		{
			autoFocus,
			focusStyles,
			activeStyles,
			handleKeyPress,
			handleTextChange,
			inputContainerStyles,
			inputStyles,
			inputValue,
			placeholder,
			selectTextOnFocus,
			secureTextEntry,
			...rest
		},
		ref
	) => {
		const [focused, setFocused] = useState(false);
		const [active, setActive] = useState(false);

		useEffect(() => {
			(ref as RefObject<TextInput>)?.current?.setNativeProps({
				value: inputValue,
				text: inputValue,
				secureTextEntry,
			});
		}, [ref, inputValue, secureTextEntry]);

		const restProps = useMemo(
			() =>
				Platform.select({
					default: rest,
					web: { value: inputValue, ...rest },
				}),
			[inputValue, rest]
		);

		return (
			<View
				style={[
					inputContainerStyles,
					focused && focusStyles,
					active && activeStyles,
				]}
			>
				<TextInput
					autoFocus={autoFocus}
					onBlur={() => setFocused(false)}
					onChangeText={(text) => {
						if (text.length > 0) {
							setActive(true);
						} else {
							setActive(false);
						}
						handleTextChange(text);
					}}
					onFocus={(e) => {
						if (restProps.onFocus) {
							restProps.onFocus(e);
						}
						setFocused(true);
					}}
					onKeyPress={handleKeyPress}
					placeholder={placeholder}
					ref={ref}
					secureTextEntry={secureTextEntry}
					selectTextOnFocus={Platform.select({
						ios: selectTextOnFocus,
						android: true,
					})}
					style={inputStyles}
					textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
					underlineColorAndroid='transparent'
					{...restProps}
				/>
			</View>
		);
	}
);

export default React.memo(OtpInput);
