import React, {
	memo,
	MutableRefObject,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	Animated,
	FlatList,
	FlatListProps,
	Platform,
	Pressable,
	StyleSheet,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { getWidthnHeight } from '../../helpers/responsiveFontSize';
import { colors } from '../../themes';
import type { ItemType } from './types';

type Props = {
	data: Array<ItemType>;
	selectedValue: MutableRefObject<number | Date>;
	onChange: () => void;
	style?: ViewStyle;
	listItemStyle?: TextStyle;
	itemHeight: number;
	initialScrollIndex: number;
	flatListProps?: Partial<FlatListProps<ItemType>>;
};

const List = memo(
	({
		data,
		itemHeight,
		selectedValue,
		onChange,
		initialScrollIndex,
		style,
		listItemStyle,
		flatListProps = {},
	}: Props) => {
		const [currentIndex, setCurrentIndex] = useState(initialScrollIndex);
		const scrollY = useRef(new Animated.Value(0)).current;
		const flatListRef = useRef<FlatList>(null);

		const {
			flatListStyle,
			iosTextVerticalCenter,
			textStyle,
			dividerStyle,
		} = useMemo(
			() => ({
				flatListStyle: { height: itemHeight * 3 },
				iosTextVerticalCenter: { lineHeight: itemHeight },
				textStyle: { height: itemHeight },
				dividerStyle: {
					height: itemHeight,
					marginVertical: itemHeight,
				},
			}),
			[itemHeight]
		);

		const calculateStyle = (i: number) => {
			const arr = new Array(data.length).fill(1);
			const mainStyle = 1;
			const secondaryStyle = 0.5;
			const opacity = scrollY.interpolate({
				inputRange: [...arr.map((_, index) => index * itemHeight)],
				outputRange: [
					...arr.map((_, index) => {
						switch (i) {
							case index + 1:
								return mainStyle;
							default:
								return secondaryStyle;
						}
					}),
				],
				extrapolate: 'clamp',
			}) as unknown as number;
			return { opacity };
		};

		const {
			data: _data,
			snapToInterval,
			decelerationRate,
			showsVerticalScrollIndicator,
			style: _style,
			initialScrollIndex: _initialScrollIndex,
			keyExtractor,
			renderItem,
			getItemLayout,
			onScroll,
			...rest
		} = flatListProps;

		const scrollOnPress = (step: 'next' | 'previous') => {
			const nextIndex =
				step === 'next' ? currentIndex + 1 : currentIndex - 1;
			const lowerLimit = -1;
			const upperLimit = data.length - 2;
			if (nextIndex > lowerLimit && nextIndex < upperLimit) {
				flatListRef.current?.scrollToIndex({ index: nextIndex });
				setCurrentIndex(nextIndex);
			}
		};

		return (
			<View style={[style]}>
				<Pressable onPress={() => scrollOnPress('previous')}>
					<AntDesign
						name='caretup'
						color='black'
						size={getWidthnHeight(5).width}
					/>
				</Pressable>
				<Animated.FlatList
					ref={flatListRef}
					data={data}
					snapToInterval={itemHeight}
					decelerationRate='fast'
					showsVerticalScrollIndicator={false}
					style={flatListStyle}
					initialScrollIndex={initialScrollIndex}
					keyExtractor={(item) => `${item.id}`}
					renderItem={({ item, index }) => {
						return (
							<Animated.Text
								style={[
									styles.text,
									textStyle,
									Platform.OS === 'android'
										? styles.androidTextVerticalCenter
										: iosTextVerticalCenter,
									calculateStyle(index),
									listItemStyle,
								]}
							>
								{item.text}
							</Animated.Text>
						);
					}}
					getItemLayout={(_, index) => ({
						length: itemHeight,
						offset: itemHeight * index,
						index,
					})}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										y: scrollY,
									},
								},
							},
						],
						{
							useNativeDriver: true,
							listener: (e: any) => {
								const index = Math.round(
									e.nativeEvent.contentOffset.y / itemHeight
								);
								setCurrentIndex(index);
								const value = data[index + 1]?.value ?? -1;
								if (value !== -1) {
									selectedValue.current = value;
									onChange();
								}
							},
						}
					)}
					{...rest}
				/>
				<View
					pointerEvents='box-none'
					style={[styles.divider, dividerStyle]}
				/>
				<Pressable onPress={() => scrollOnPress('next')}>
					<AntDesign
						name='caretdown'
						color='black'
						size={getWidthnHeight(5).width}
					/>
				</Pressable>
			</View>
		);
	}
);

const styles = StyleSheet.create({
	androidTextVerticalCenter: {
		textAlignVertical: 'center',
	},
	text: {
		color: 'black',
		textAlign: 'center',
	},
	divider: {
		position: 'absolute',
		top: getWidthnHeight(5).width,
		width: '100%',
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderColor: colors.primaryRed,
	},
});

export default List;
