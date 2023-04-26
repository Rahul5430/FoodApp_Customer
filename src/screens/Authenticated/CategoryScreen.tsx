import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
	getWidthnHeight,
	responsiveFontSize,
} from '../../helpers/responsiveFontSize';
import ScreenWithImageHeader from '../../layouts/ScreenWithImageHeader';
import { colors, fonts } from '../../themes';
import { AuthenticatedStackScreenProps } from '../../types/navigation';

const CategoryScreen: React.FC<
	AuthenticatedStackScreenProps<'CategoryScreen'>
> = () => {
	const [searchText, setSearchText] = useState('');

	return (
		<ScreenWithImageHeader
			title='Category'
			titleStyle={{ fontFamily: fonts.Ovo }}
			containerStyle={{ paddingVertical: getWidthnHeight(5).width }}
			backButton={true}
		>
			<Searchbar
				placeholder='Search here...'
				value={searchText}
				onChangeText={setSearchText}
				iconColor={colors.primaryRed}
				traileringIcon={() => (
					<FontAwesome
						name='microphone'
						size={getWidthnHeight(6).width}
						color={colors.primaryRed}
					/>
				)}
				inputStyle={{
					fontFamily: fonts.Oxygen,
					fontSize: responsiveFontSize(18),
				}}
				style={{
					backgroundColor: 'white',
					borderRadius: 9,
				}}
				elevation={2}
			/>
		</ScreenWithImageHeader>
	);
};

export default CategoryScreen;
