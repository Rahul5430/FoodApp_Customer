import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DatePicker from '../../components/DatePicker';
import MaterialTextInput from '../../components/MaterialTextInput/MaterialTextInput';
import { getWidthnHeight } from '../../helpers/responsiveFontSize';
import ScreenWithImageHeader from '../../layouts/ScreenWithImageHeader';
import { colors, fonts } from '../../themes';
import { AuthenticatedStackScreenProps } from '../../types/navigation';

type DetailsError = {
	name: string;
	occasion: string;
	date: string;
};

const aspectRatio = getWidthnHeight().height / getWidthnHeight().width;
let paddingOffset = 0;
if (aspectRatio > 2) {
	paddingOffset = getWidthnHeight(1, 1).height;
}

const AddDate: React.FC<AuthenticatedStackScreenProps<'AddDate'>> = ({
	navigation,
}) => {
	const [userName, setUserName] = useState('');
	const [value, setValue] = useState('');
	const [focus, setIsFocus] = useState(false);
	const [date, setDate] = useState(new Date());
	const [error, setError] = useState<DetailsError>({
		name: '',
		occasion: '',
		date: '',
	});

	const dropdownData = [
		{
			label: 'Birthday',
			value: 'Birthday',
		},
		{
			label: 'Engagement',
			value: 'Engagement',
		},
		{
			label: 'Wedding',
			value: 'Wedding',
		},
		{
			label: 'Anniversary',
			value: 'Anniversary',
		},
	];

	const saveDate = () => {
		const userNameError = !userName;
		const occasionError = !value;
		const dateError = !date;
		if (userNameError || occasionError || dateError) {
			setError({
				name: userNameError ? 'Please enter name' : '',
				occasion: occasionError ? 'Please choose occasion' : '',
				date: dateError ? 'Please choose date' : '',
			});
		} else {
			navigation.navigate('MyDates');
		}
	};

	return (
		<ScreenWithImageHeader
			title='Add Date'
			titleStyle={{ fontFamily: fonts.Ovo }}
			containerStyle={{ paddingVertical: getWidthnHeight(5).width }}
			backButton={true}
		>
			<MaterialTextInput
				value={userName}
				onChangeText={(text: string) => {
					if (!text) {
						setError({ ...error, name: 'Please enter name' });
					} else {
						setError({ ...error, name: '' });
					}
					setUserName(text);
				}}
				variant='standard'
				label=''
				placeholder='Name'
				style={{
					marginTop: getWidthnHeight(1, 1).height,
					marginBottom: getWidthnHeight(8, 4).height,
				}}
				inputStyle={{ fontFamily: fonts.Ovo }}
				helperText={error.name}
				autoComplete='name'
				inputMode='text'
				keyboardType='default'
				textContentType='name'
				onEndEditing={({ nativeEvent }) => {
					if (!nativeEvent.text) {
						setError({ ...error, name: 'Please enter name' });
					} else {
						setError({ ...error, name: '' });
					}
				}}
			/>
			<Dropdown
				data={dropdownData}
				placeholder='Choose Your Occasion'
				labelField={'label'}
				valueField={'value'}
				value={value}
				onChange={(item) => setValue(item.value)}
				fontFamily={fonts.Ovo}
				style={[
					styles.dropdown,
					!focus && {
						borderBottomLeftRadius: 9,
						borderBottomRightRadius: 9,
					},
				]}
				placeholderStyle={styles.placeholderStyle}
				containerStyle={styles.dropdownContainerStyle}
				selectedTextStyle={styles.dropdownItemSelectedTextStyle}
				renderItem={(item) => (
					<View style={styles.item}>
						<Text style={styles.dropdownItemTextStyle}>
							{item.label}
						</Text>
					</View>
				)}
				renderRightIcon={() => (
					<AntDesign
						name='caretdown'
						color='black'
						size={getWidthnHeight(4).width}
						style={{ paddingRight: getWidthnHeight(4).width }}
					/>
				)}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
			/>
			<View style={styles.dateContainer}>
				<View style={styles.dateHeadingContainer}>
					<MaterialCommunityIcons
						name='cake'
						color={'black'}
						size={getWidthnHeight(6.7).width}
					/>
					<Text style={styles.dateHeading}>
						Set your special Date
					</Text>
				</View>
				<DatePicker
					onChange={setDate}
					containerStyle={styles.containerStyle}
					listContainerStyle={styles.listContainerStyle}
					listItemStyle={styles.listItemStyle}
				/>
				<Button
					buttonColor={colors.green}
					style={styles.button}
					labelStyle={styles.buttonText}
					onPress={() => saveDate()}
				>
					Save
				</Button>
			</View>
		</ScreenWithImageHeader>
	);
};

const styles = StyleSheet.create({
	placeholderStyle: {
		fontSize: getWidthnHeight(4.5).width,
		paddingLeft: getWidthnHeight(5).width,
		color: 'black',
	},
	dropdown: {
		borderColor: colors.primaryRed,
		borderWidth: 1,
		borderRadius: 9,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		paddingVertical: getWidthnHeight(2, 0.5).height + paddingOffset,
	},
	dropdownContainerStyle: {
		borderColor: colors.primaryRed,
		borderWidth: 1,
		borderRadius: 9,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		overflow: 'hidden',
		marginTop: -getWidthnHeight(0.7).width,
		marginLeft: 0.2,
	},
	dropdownItemTextStyle: {
		flex: 1,
		fontFamily: fonts.Ovo,
		fontSize: getWidthnHeight(4.5).width,
		color: 'black',
		paddingVertical: 0,
	},
	dropdownItemSelectedTextStyle: {
		fontSize: getWidthnHeight(4.5).width,
		color: 'black',
		paddingLeft: getWidthnHeight(5).width,
	},
	item: {
		paddingVertical: getWidthnHeight(2).width,
		paddingHorizontal: getWidthnHeight(5).width,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	dateContainer: {
		marginTop: getWidthnHeight(4, 1).height + paddingOffset,
		flex: 1,
	},
	dateHeadingContainer: {
		flexDirection: 'row',
		paddingTop: getWidthnHeight(2).width,
		paddingBottom: getWidthnHeight(4).width,
		borderBottomColor: colors.lightGrey,
		borderBottomWidth: 1,
		alignItems: 'flex-start',
	},
	dateHeading: {
		fontSize: getWidthnHeight(4.5).width,
		fontFamily: fonts.OxygenBold,
		color: 'black',
		textAlignVertical: 'bottom',
		paddingLeft: getWidthnHeight(4).width,
		paddingTop: getWidthnHeight(2).width,
	},
	containerStyle: {
		paddingVertical: getWidthnHeight(7, 3).height,
	},
	listContainerStyle: {
		width: getWidthnHeight(15).width,
		alignItems: 'center',
	},
	listItemStyle: {
		fontFamily: fonts.Ovo,
		fontSize: getWidthnHeight(4.5).width,
	},
	button: {
		borderRadius: 9,
		marginTop: getWidthnHeight(2, 1).height,
	},
	buttonText: {
		fontSize: getWidthnHeight(5, 2.5).height,
		fontFamily: fonts.OxygenBold,
		color: 'white',
		paddingVertical: getWidthnHeight(1, 0.53).height,
	},
});

export default AddDate;
