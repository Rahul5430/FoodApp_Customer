import { Platform } from 'react-native';

export const colors = {
	primaryRed: '#FF2C58',
	primaryButton: '#FF1647',
	darkRed: '#6C001F',
	lightInputGrey: '#919191',
	secondaryButton: '#315991',
	lightInput: '#F4F4F4',
	headerOrange: '#F37965',
	lightGrey: '#D3D3D3',
	darkGrey: '#5A5A5A',
	white: '#FFFFFF',
	bgGrey: '#F2F2F2',
	black: '#000000',
	golden: '#EBB55F',
	pink: '#FFC0CB',
	orange: '#FFA500',
	lightBlack: '#343A40',
};

export const fonts = {
	...Platform.select({
		ios: {
			Ovo: 'Ovo',
			Pattaya: 'Pattaya-Regular',
			Oxygen: 'Oxygen-Regular',
			OxygenLight: 'Oxygen-Light',
			OxygenBold: 'Oxygen-Bold',
		},
		android: {
			Ovo: 'Ovo-Regular',
			Pattaya: 'Pattaya-Regular',
			Oxygen: 'Oxygen-Regular',
			OxygenLight: 'Oxygen-Light',
			OxygenBold: 'Oxygen-Bold',
		},
	}),
};
