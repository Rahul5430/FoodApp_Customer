import dayjs from 'dayjs';
import React, { Ref, useCallback, useRef, useState } from 'react';
import {
	FlatListProps,
	StyleSheet,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';

import DateList from './DateList';
import { debounce, getDateData, numberOfDaysIn } from './helpers';
import type { ItemType, PossibleDaysInMonth } from './types';

type Props = {
	/**
	 * Initial Date to scroll to
	 */
	initialValue?: Date;
	/**
	 * Callback to be called every time user change date
	 */
	onChange: ($date: Date) => void;
	/**
	 * Height of single item in list
	 */
	itemHeight?: number;
	/**
	 * Outermost View style
	 */
	containerStyle?: ViewStyle;
	/**
	 * Style for individual list item text
	 */
	listContainerStyle?: ViewStyle;
	/**
	 * Style for individual list item text
	 */
	listItemStyle?: TextStyle;
	/**
	 * Flat list props
	 */
	flatListProps?: Partial<FlatListProps<ItemType>>;
	dateRef?: Ref<TextInput>;
};

const DatePicker = ({
	initialValue = new Date(),
	onChange,
	itemHeight = 40,
	containerStyle,
	listContainerStyle,
	listItemStyle,
	flatListProps,
}: Props) => {
	const [numberOfDays, setNumberOfDays] = useState<PossibleDaysInMonth>(
		numberOfDaysIn(initialValue.getMonth() + 1, initialValue.getFullYear())
	);
	// Start List
	const startListData = getDateData(0, { numberOfDays });
	const selectedStartItem = useRef<number>(initialValue.getDate());
	// Middle List
	const middleListData = getDateData(1);
	const selectedMiddleItem = useRef<number>(initialValue.getMonth());
	// End List
	const endListData = getDateData(2);
	const selectedEndItem = useRef<number>(initialValue.getFullYear());

	const getInitialScrollIndex = (
		preSelected: number | Date,
		data: Array<ItemType>,
		isDate?: boolean
	) => {
		if (preSelected === -1) {
			return data.length - 2;
		}

		let index = data.findIndex((item) => {
			if (isDate)
				return (
					dayjs(item.value).format('DD/MM/YYYY') ===
					dayjs(preSelected).format('DD/MM/YYYY')
				);
			return item.value === preSelected;
		});
		index = index - 1;
		index = index < 0 ? 0 : index;

		return index;
	};

	const calculateNewDate = useCallback(() => {
		const newDate = new Date(initialValue.getTime());

		const year = selectedEndItem.current;
		const month = selectedMiddleItem.current;
		const day = selectedStartItem.current;
		newDate.setFullYear(year, month, day);
		return newDate;
	}, [initialValue]);

	const handleChange = useCallback(() => {
		const newNumberOfDays = numberOfDaysIn(
			selectedMiddleItem.current + 1, //month
			selectedEndItem.current // year
		);

		if (newNumberOfDays !== numberOfDays) {
			setNumberOfDays(newNumberOfDays);
		}
		onChange(calculateNewDate());
	}, [onChange, calculateNewDate, numberOfDays]);

	const debouncedHandleChange = debounce(handleChange, 100);

	return (
		<View style={containerStyle}>
			<View style={styles.row}>
				<DateList
					data={startListData}
					itemHeight={itemHeight}
					selectedValue={selectedStartItem}
					onChange={debouncedHandleChange}
					listItemStyle={listItemStyle}
					style={listContainerStyle}
					initialScrollIndex={getInitialScrollIndex(
						selectedStartItem.current,
						startListData
					)}
					flatListProps={flatListProps}
				/>
				<DateList
					data={middleListData}
					itemHeight={itemHeight}
					selectedValue={selectedMiddleItem}
					onChange={debouncedHandleChange}
					listItemStyle={listItemStyle}
					style={listContainerStyle}
					initialScrollIndex={getInitialScrollIndex(
						selectedMiddleItem.current,
						middleListData
					)}
					flatListProps={flatListProps}
				/>
				<DateList
					data={endListData}
					itemHeight={itemHeight}
					selectedValue={selectedEndItem}
					onChange={debouncedHandleChange}
					listItemStyle={listItemStyle}
					style={listContainerStyle}
					initialScrollIndex={getInitialScrollIndex(
						selectedEndItem.current,
						endListData
					)}
					flatListProps={flatListProps}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
});

export default DatePicker;
