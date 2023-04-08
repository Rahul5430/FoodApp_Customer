import {
	Animated,
	StyleSheet,
	View,
	ViewStyle,
	useWindowDimensions,
} from 'react-native';
import { PagerData } from '../screens/VendorSignUpScreen';

export interface IndicatorProps {
	containerStyle: ViewStyle;
	dotStyle: ViewStyle;
	scrollX: Animated.Value;
	data: PagerData[];
	inActiveDotOpacity?: number;
	inActiveDotColor?: string;
	expandingDotWidth?: number;
	activeDotColor?: string;
}

const Indicators = ({
	containerStyle,
	dotStyle,
	scrollX,
	data,
	inActiveDotOpacity,
	inActiveDotColor,
	expandingDotWidth,
	activeDotColor,
}: IndicatorProps) => {
	const { width } = useWindowDimensions();

	const defaultProps = {
		inActiveDotColor: inActiveDotColor || '#000',
		inActiveDotOpacity: inActiveDotOpacity || 0.5,
		expandingDotWidth: expandingDotWidth || 20,
		dotWidth: (dotStyle.width as number) || 10,
		activeDotColor: activeDotColor || '#347AF0',
	};

	return (
		<View
			pointerEvents='none'
			style={[styles.containerStyle, containerStyle]}
		>
			{data.map((_, index) => {
				if (_.key === 1 || _.key === 0) {
					return;
				}
				const inputRange = [
					(index - 1) * width,
					index * width,
					(index + 1) * width,
				];

				const color = scrollX.interpolate({
					inputRange,
					outputRange: [
						defaultProps.inActiveDotColor,
						defaultProps.activeDotColor,
						defaultProps.activeDotColor,
					],
					extrapolate: 'clamp',
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [defaultProps.inActiveDotOpacity, 1, 1],
					extrapolate: 'clamp',
				});

				const expand = scrollX.interpolate({
					inputRange,
					outputRange: [
						defaultProps.dotWidth,
						defaultProps.expandingDotWidth,
						defaultProps.dotWidth,
					],
					extrapolate: 'clamp',
				});

				return (
					<Animated.View
						key={`dot=${index}`}
						style={[
							styles.dotStyle,
							dotStyle,
							{ width: expand },
							{ opacity },
							{ backgroundColor: color },
						]}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	containerStyle: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	dotStyle: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 5,
	},
});

export default Indicators;
