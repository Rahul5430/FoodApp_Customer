import React, {
	RefObject,
	forwardRef,
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
			<View style={[inputContainerStyles, focused && focusStyles]}>
				<TextInput
					autoFocus={autoFocus}
					onBlur={() => setFocused(false)}
					onChangeText={handleTextChange}
					onFocus={() => setFocused(true)}
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
