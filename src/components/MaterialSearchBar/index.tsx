import * as React from 'react';
import {
	Animated,
	GestureResponderEvent,
	ImageSourcePropType,
	StyleProp,
	StyleSheet,
	TextInput,
	TextInputProps,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { forwardRef } from './forwardRef';
import { colors } from '../../themes';

interface Style {
	marginRight: number;
}

export type Props = React.ComponentPropsWithRef<typeof TextInput> & {
	/**
	 * Hint text shown when the input is empty.
	 */
	placeholder?: string;
	/**
	 * Callback that is called when the text input's text changes.
	 */
	onChangeText?: (query: string) => void;
	/**
	 * @supported Available in v5.x with theme version 3
	 * Search layout mode, the default value is "bar".
	 */
	mode?: 'bar' | 'view';
	/**
	 * Icon name for the left icon button (see `onIconPress`).
	 */
	icon?: IconSource;
	/**
	 * Custom color for icon, default will be derived from theme
	 */
	iconColor?: string;
	/**
	 * Callback to execute if we want the left icon to act as button.
	 */
	onIconPress?: (e: GestureResponderEvent) => void;

	/**
	 * Callback to execute if we want to add custom behaviour to close icon button.
	 */
	onClearIconPress?: (e: GestureResponderEvent) => void;
	/**
	 * Accessibility label for the button. This is read by the screen reader when the user taps the button.
	 */
	searchAccessibilityLabel?: string;
	/**
	 * Custom icon for clear button, default will be icon close. It's visible when `loading` is set to `false`.
	 * In v5.x with theme version 3, `clearIcon` is visible only `right` prop is not defined.
	 */
	clearIcon?: IconSource;
	/**
	 * Accessibility label for the button. This is read by the screen reader when the user taps the button.
	 */
	clearAccessibilityLabel?: string;
	/**
	 * Whether to display search icon on right side.
	 */
	searchIconOnRight?: boolean;
	/**
	 * @supported Available in v5.x with theme version 3
	 * Icon name for the right trailering icon button.
	 * Works only when `mode` is set to "bar". It won't be displayed if `loading` is set to `true`.
	 */
	traileringIcon?: IconSource;
	/**
	 * @supported Available in v5.x with theme version 3
	 * Custom color for the right trailering icon, default will be derived from theme
	 */
	traileringIconColor?: string;
	/**
	 * @supported Available in v5.x with theme version 3
	 * Callback to execute on the right trailering icon button press.
	 */
	onTraileringIconPress?: (e: GestureResponderEvent) => void;
	/**
	 * Accessibility label for the right trailering icon button. This is read by the screen reader when the user taps the button.
	 */
	traileringIconAccessibilityLabel?: string;
	/**
	 * @supported Available in v5.x with theme version 3
	 * Callback which returns a React element to display on the right side.
	 * Works only when `mode` is set to "bar".
	 */
	right?: (props: {
		color: string;
		style: Style;
		testID: string;
	}) => React.ReactNode;
	/**
	 * @supported Available in v5.x with theme version 3
	 * Whether to show `Divider` at the bottom of the search.
	 * Works only when `mode` is set to "view". True by default.
	 */
	showDivider?: boolean;
	/**
	 * @supported Available in v5.x with theme version 3
	 * Changes Searchbar shadow and background on iOS and Android.
	 */
	elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;
	/**
	 * Set style of the TextInput component inside the searchbar
	 */
	inputStyle?: StyleProp<TextStyle>;
	style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
	/**
	 * Custom flag for replacing clear button with activity indicator.
	 */
	loading?: boolean;
	/**
	 * TestID used for testing purposes
	 */
	testID?: string;
};

type TextInputHandles = Pick<
	TextInput,
	'setNativeProps' | 'isFocused' | 'clear' | 'blur' | 'focus'
>;

type IconProps = {
	size: number;
	allowFontScaling?: boolean;
};

type IconSourceBase = string | ImageSourcePropType;

type IconSource =
	| IconSourceBase
	| Readonly<{ source: IconSourceBase; direction: 'rtl' | 'ltr' | 'auto' }>
	| ((props: IconProps & { color: string }) => React.ReactNode);

const MaterialSearchbar = forwardRef<TextInputHandles, Props>(
	(
		{
			icon,
			iconColor: customIconColor,
			onIconPress,
			searchAccessibilityLabel = 'search',
			searchIconOnRight = false,
			right,
			inputStyle,
			placeholder,
			style,
			loading = false,
			...rest
		}: Props,
		ref
	) => {
		const root = React.useRef<TextInput>(null);

		React.useImperativeHandle(ref, () => {
			const input = root.current;

			if (input) {
				return {
					focus: () => input.focus(),
					clear: () => input.clear(),
					setNativeProps: (args: TextInputProps) =>
						input.setNativeProps(args),
					isFocused: () => input.isFocused(),
					blur: () => input.blur(),
				};
			}

			const noop = () => {
				throw new Error('TextInput is not available');
			};

			return {
				focus: noop,
				clear: noop,
				setNativeProps: noop,
				isFocused: noop,
				blur: noop,
			};
		});

		const placeholderTextColor = colors.lightInputGrey;
		const textColor = 'rgba(73, 69, 79, 1)';
		const iconColor = customIconColor || 'rgba(73, 69, 79, 1)';
		const rippleColor = 'rgba(73, 69, 79, 0.32)';

		return (
			<View
				style={[
					{ borderRadius: 4 },
					{
						backgroundColor: 'rgb(238, 232, 244)',
						borderRadius: 4 * 7,
					},
					styles.container,
					style,
				]}
			>
				{!searchIconOnRight && (
					<IconButton
						accessibilityRole='button'
						borderless
						rippleColor={rippleColor}
						onPress={onIconPress}
						iconColor={iconColor}
						icon={
							icon ||
							(({ size, color }) => (
								<MaterialCommunityIcons
									name='magnify'
									color={color}
									size={size}
								/>
							))
						}
						accessibilityLabel={searchAccessibilityLabel}
					/>
				)}
				<TextInput
					style={[
						styles.input,
						{
							color: textColor,
						},
						styles.barModeInput,
						searchIconOnRight && {
							paddingLeft: 12,
						},
						inputStyle,
					]}
					placeholder={placeholder || ''}
					placeholderTextColor={placeholderTextColor}
					underlineColorAndroid='transparent'
					returnKeyType='search'
					accessibilityRole='search'
					ref={root}
					{...rest}
				/>
				{loading ? (
					<ActivityIndicator
						testID='activity-indicator'
						style={styles.v3Loader}
					/>
				) : searchIconOnRight ? (
					<IconButton
						accessibilityRole='button'
						borderless
						rippleColor={rippleColor}
						onPress={onIconPress}
						iconColor={iconColor}
						icon={
							icon ||
							(({ size, color }) => (
								<MaterialCommunityIcons
									name='magnify'
									color={color}
									size={size}
								/>
							))
						}
						accessibilityLabel={searchAccessibilityLabel}
					/>
				) : null}
			</View>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		fontSize: 18,
		paddingLeft: 8,
		alignSelf: 'stretch',
		textAlign: 'left',
		minWidth: 0,
	},
	barModeInput: {
		paddingLeft: 0,
		minHeight: 56,
	},
	viewModeInput: {
		paddingLeft: 0,
		minHeight: 72,
	},
	elevation: {
		elevation: 4,
	},
	loader: {
		margin: 10,
	},
	v3Loader: {
		marginHorizontal: 16,
	},
	rightStyle: {
		marginRight: 16,
	},
	v3ClearIcon: {
		position: 'absolute',
		right: 0,
		marginLeft: 16,
	},
	v3ClearIconHidden: {
		display: 'none',
	},
	divider: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
});

export default MaterialSearchbar;
