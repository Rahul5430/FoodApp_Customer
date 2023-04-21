import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../themes';

type Props = {
	type?: 'veg' | 'nonveg';
	style?: StyleProp<ViewStyle>;
};

const VegNonveg = ({ type = 'veg', style }: Props) => {
	return (
		<View
			style={[
				styles.square,
				{ borderColor: type === 'veg' ? colors.green : colors.darkRed },
				style,
			]}
		>
			<View
				style={[
					styles.circle,
					{
						backgroundColor:
							type === 'veg' ? colors.green : colors.darkRed,
					},
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	square: {
		borderRadius: 2,
		borderWidth: 1,
		width: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	circle: {
		borderRadius: 50,
		width: '80%',
		height: '80%',
	},
});

export default VegNonveg;
