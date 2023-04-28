import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Celebrate from '../../assets/images/celebrate.png';
import { myDatesData } from '../../data/user';
import { getWidthnHeight } from '../../helpers/responsiveFontSize';
import ScreenWithImageHeader from '../../layouts/ScreenWithImageHeader';
import { colors, fonts } from '../../themes';
import { AuthenticatedStackScreenProps } from '../../types/navigation';
import { ChipType, MyDatesDataType } from '../../types/user';

const chipsData: ChipType[] = [
	'All',
	'Birthday',
	'Engagement',
	'Wedding',
	'Anniversary',
];

const MyDates: React.FC<AuthenticatedStackScreenProps<'MyDates'>> = () => {
	const [selectedChip, setSelectedChip] = useState<ChipType>('All');
	const [filteredDatesData, setFilteredDatesData] = useState<
		MyDatesDataType[]
	>([]);

	useEffect(() => {
		if (selectedChip === 'All') {
			setFilteredDatesData(myDatesData);
		} else if (selectedChip === 'Birthday') {
			setFilteredDatesData(
				myDatesData.filter((item) => item.occassion === 'Birthday')
			);
		} else if (selectedChip === 'Engagement') {
			setFilteredDatesData(
				myDatesData.filter((item) => item.occassion === 'Engagement')
			);
		} else if (selectedChip === 'Wedding') {
			setFilteredDatesData(
				myDatesData.filter((item) => item.occassion === 'Wedding')
			);
		} else if (selectedChip === 'Anniversary') {
			setFilteredDatesData(
				myDatesData.filter((item) => item.occassion === 'Anniversary')
			);
		}
	}, [selectedChip]);

	return (
		<ScreenWithImageHeader
			title='My Dates'
			titleStyle={{ fontFamily: fonts.Ovo }}
			containerStyle={{ paddingVertical: getWidthnHeight(5).width }}
			backButton={true}
		>
			<View style={{ marginVertical: getWidthnHeight(2).width }}>
				<FlatList
					data={chipsData}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Chip
							selected={selectedChip === item}
							selectedColor='white'
							onPress={() => setSelectedChip(item)}
							style={[
								styles.chip,
								selectedChip === item && {
									backgroundColor: colors.primaryRed,
									borderColor: colors.primaryRed,
								},
							]}
							textStyle={[
								styles.chipText,
								selectedChip === item && {
									color: 'white',
								},
							]}
						>
							{item}
						</Chip>
					)}
					ItemSeparatorComponent={() => (
						<View
							style={{
								paddingHorizontal: getWidthnHeight(1).width,
							}}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			</View>
			<FlatList
				data={filteredDatesData}
				keyExtractor={(item) => item.occassion}
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						<View style={styles.headingContainer}>
							<Text style={styles.heading}>{item.occassion}</Text>
						</View>
						<FlatList
							data={item.data}
							keyExtractor={(item) => item.name}
							renderItem={(subItem) => (
								<View style={styles.listSubItem}>
									<View style={styles.leftSubItem}>
										<Text style={styles.subItemName}>
											{subItem.item.name}
										</Text>
										{item.occassion === 'Birthday' ? (
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'flex-start',
												}}
											>
												<MaterialCommunityIcons
													name='cake'
													color={colors.primaryRed}
													size={
														getWidthnHeight(5).width
													}
													style={{
														marginRight:
															getWidthnHeight(2)
																.width,
													}}
												/>
												<Text
													style={
														styles.subItemBirthday
													}
												>
													{subItem.item.date}
												</Text>
											</View>
										) : (
											<Text style={styles.subItemDate}>
												{subItem.item.date}
											</Text>
										)}
									</View>
									<Image
										source={Celebrate}
										style={styles.rightImage}
									/>
								</View>
							)}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenWithImageHeader>
	);
};

const styles = StyleSheet.create({
	chip: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: colors.lightInputGrey,
		backgroundColor: 'white',
	},
	chipText: {
		fontFamily: fonts.Ovo,
		fontSize: getWidthnHeight(4).width,
		color: 'black',
	},
	listItem: {
		paddingVertical: getWidthnHeight(2).width,
	},
	headingContainer: {
		borderBottomColor: colors.lightInputGrey,
		borderBottomWidth: 1,
		paddingBottom: getWidthnHeight(3).width,
	},
	heading: {
		fontFamily: fonts.PoppinsSemiBold,
		fontSize: getWidthnHeight(4.6).width,
		color: 'black',
	},
	listSubItem: {
		flexDirection: 'row',
		padding: getWidthnHeight(2.5).width,
		borderBottomColor: colors.lightInputGrey,
		borderBottomWidth: 1,
	},
	leftSubItem: {
		flex: 1,
	},
	subItemName: {
		fontFamily: fonts.PoppinsSemiBold,
		fontSize: getWidthnHeight(3.6).width,
		color: 'black',
	},
	subItemDate: {
		fontFamily: fonts.PoppinsSemiBold,
		fontSize: getWidthnHeight(3.6).width,
		color: 'grey',
	},
	subItemBirthday: {
		fontFamily: fonts.PoppinsSemiBold,
		fontSize: getWidthnHeight(3.6).width,
		color: colors.primaryRed,
		textAlignVertical: 'bottom',
		paddingTop: getWidthnHeight(1).width,
	},
	rightImage: {
		width: getWidthnHeight(8.9).width,
		height: getWidthnHeight(8.9).width,
	},
});

export default MyDates;
