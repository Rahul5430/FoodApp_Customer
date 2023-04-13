import React from 'react';
import {
	ActivityIndicator,
	ActivityIndicatorProps,
	StyleProp,
	Text,
	View,
	ViewStyle,
} from 'react-native';

import { RFValue } from '../helpers/responsiveFontSize';
import { fonts } from '../themes';

interface SpinnerProps extends ActivityIndicatorProps {
	loading: boolean;
	style: StyleProp<ViewStyle>;
	label?: string;
}

const Spinner = ({ loading, style, label = 'Loading...' }: SpinnerProps) => {
	return (
		<View
			style={[
				{
					flexDirection: 'row',
					minWidth: '50%',
					backgroundColor: 'transparent',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'absolute',
					height: '10%',
					shadowOffset: { width: 100, height: 100 },
					shadowColor: '#330000',
					shadowOpacity: 0,
					shadowRadius: 5,
					elevation: 10,
					left: '25%',
					top: '40%',
				},
				style,
			]}
		>
			{loading ? (
				<React.Fragment>
					<ActivityIndicator
						size='large'
						color='rgb(19,111,232)'
						style={{ paddingHorizontal: 5 }}
					/>
					<Text
						style={{
							fontSize: RFValue(16),
							fontFamily: fonts.Ovo,
							paddingHorizontal: 5,
						}}
					>
						{label}
					</Text>
				</React.Fragment>
			) : null}
		</View>
	);
};

export default Spinner;
