import { useState } from 'react';
import { Text, Animated, TouchableOpacity } from 'react-native';
import styles, { _buttonContainer, _textStyle } from './DuoToggleSwitch.style';

const DuoToggleSwitch = ({
	style,
	activeColor = '#FBA928',
	inactiveColor = '#fff',
	primaryTextStyle,
	secondaryTextStyle,
	activeTextColor = '#f1f1f1',
	inactiveTextColor = '#757575',
	primaryText,
	secondaryButtonStyle,
	secondaryText,
	primaryButtonStyle,
	TouchableComponent = TouchableOpacity,
	onPrimaryPress,
	onSecondaryPress,
	...rest
}) => {
	const [activeTab, setActiveTab] = useState(2);
	const [animation, setAnimation] = useState(new Animated.Value(1)); // NOSONAR

	const primaryTextColor =
		activeTab === 1 ? inactiveTextColor : activeTextColor;

	const springAnimation = () => {
		animation.setValue(0.95);
		Animated.spring(animation, {
			toValue: 1,
			friction: 3,
			useNativeDriver: true,
		}).start();
	};

	const setActiveTabColor = (alignment) => {
		if (!alignment)
			return activeTab === 0 || activeTab === 2
				? inactiveColor
				: activeColor;
		return activeTab === 1 || activeTab === 2 ? inactiveColor : activeColor;
	};

	const handlePrimaryPress = () => {
		springAnimation();
		setActiveTab(0);
		onPrimaryPress && onPrimaryPress();
	};

	const handleSecondaryPress = () => {
		springAnimation();
		setActiveTab(1);
		onSecondaryPress && onSecondaryPress();
	};

	return (
		<Animated.View
			style={[
				styles.container,
				style,
				{ transform: [{ scale: animation }] },
			]}
		>
			<TouchableComponent
				style={[
					_buttonContainer(setActiveTabColor(true), true),
					primaryButtonStyle,
				]}
				onPress={handlePrimaryPress}
				{...rest}
			>
				<Text
					style={[
						_textStyle(
							activeTab === 2
								? inactiveTextColor
								: primaryTextColor
						),
						primaryTextStyle,
					]}
				>
					{primaryText}
				</Text>
			</TouchableComponent>
			<TouchableComponent
				onPress={handleSecondaryPress}
				style={[
					_buttonContainer(setActiveTabColor(false), false),
					secondaryButtonStyle,
				]}
				{...rest}
			>
				<Text
					style={[
						_textStyle(
							activeTab === 0 || activeTab === 2
								? inactiveTextColor
								: activeTextColor
						),
						secondaryTextStyle,
					]}
				>
					{secondaryText}
				</Text>
			</TouchableComponent>
		</Animated.View>
	);
};

export default DuoToggleSwitch;
