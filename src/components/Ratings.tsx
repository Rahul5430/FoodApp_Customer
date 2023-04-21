import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import { getWidthnHeight } from '../helpers/responsiveFontSize';
import { colors, fonts } from '../themes';

type Props = {
	rating: string;
	reviews: string;
	style?: StyleProp<ViewStyle>;
};

const Ratings = ({ rating = '5.0', reviews = '50k', style }: Props) => {
	return (
		<View style={style}>
			<View style={styles.ratingsContainer}>
				<Text style={styles.ratingsText}>{rating}</Text>
				<Octicons name='star-fill' color='white' size={14} />
			</View>
			<View style={styles.reviewsContainer}>
				<Text style={styles.reviewsText}>{reviews}</Text>
				<Text style={styles.reviewsText}>Reviews</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	ratingsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primaryRed,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		borderWidth: 1,
		borderColor: colors.primaryRed,
		height: 25,
	},
	ratingsText: {
		fontSize: 15,
		fontFamily: fonts.PoppinsMedium,
		color: 'white',
		paddingHorizontal: getWidthnHeight(1).width,
	},
	reviewsContainer: {
		alignItems: 'center',
		justifyContent: 'space-around',
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: colors.lightGrey,
		height: 33,
	},
	reviewsText: {
		fontSize: 10,
		fontFamily: fonts.PoppinsMedium,
		color: 'black',
	},
});

export default Ratings;
