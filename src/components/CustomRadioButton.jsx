import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../themes';

const CustomRadioButton = ({ searchResult, checked, setChecked }) => {
	return (
		<Pressable
			style={styles.radioBtnView}
			onPress={() => setChecked(searchResult.name)}
			android_ripple={{
				color: colors.lightGrey,
				borderless: false,
			}}
		>
			<Text style={styles.radioBtnLabel}>{searchResult.name}</Text>
			<View
				style={{
					...styles.radioBtn,
					borderColor:
						checked === searchResult.name
							? colors.primaryButton
							: colors.lightGrey,
					backgroundColor:
						checked === searchResult.name
							? colors.primaryButton
							: colors.bgGrey,
				}}
			>
				{checked === searchResult.name ? (
					<View style={styles.activeRadioBtn}></View>
				) : null}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	radioBtnView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: colors.lightGrey,
		padding: 15,
	},
	radioBtnLabel: {
		fontWeight: '500',
	},
	radioBtn: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: colors.lightGrey,
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeRadioBtn: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: colors.bgGrey,
	},
});

export default CustomRadioButton;
