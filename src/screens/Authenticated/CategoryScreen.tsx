import React, { useRef, useState } from 'react';
import {
	Animated,
	Easing,
	FlatList,
	Image,
	ImageBackground,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Searchbar } from 'react-native-paper';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Cake1 from '../../assets/images/cakes/cake1.webp';
import Cake2 from '../../assets/images/cakes/cake2.webp';
import Cake3 from '../../assets/images/cakes/cake3.webp';
import Cake4 from '../../assets/images/cakes/cake4.webp';
import Cake5 from '../../assets/images/cakes/cake5.jpeg';
import Cake6 from '../../assets/images/cakes/cake6.webp';
import Cake7 from '../../assets/images/cakes/cake7.webp';
import Cake8 from '../../assets/images/cakes/cake8.jpeg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {
	getWidthnHeight,
	responsiveFontSize,
} from '../../helpers/responsiveFontSize';
import { responsiveImageHeight } from '../../helpers/responsiveImageSize';
import { colors, fonts } from '../../themes';
import { AuthenticatedStackScreenProps } from '../../types/navigation';
import { categoryData, CategoryType } from './HomeScreen';

type FilterData = {
	name: string;
	icon?: string;
	dropdown?: Array<string>;
};

type ProductType = {
	image: ImageSourcePropType;
	name: string;
	price: string;
	liked: boolean;
};

type Data =
	| {
			label: 'Category';
			data: CategoryType[];
	  }
	| {
			label: 'Product';
			data: ProductType[];
	  };

const filterData: FilterData[] = [
	{
		name: 'Sort',
		icon: 'swap-vert',
		dropdown: [],
	},
	{
		name: 'Nearest',
	},
	{
		name: 'Greatest offers',
	},
	{
		name: 'Rating 4.0+',
	},
	{
		name: 'More',
		dropdown: [],
	},
];

const ProductData: ProductType[] = [
	{
		image: Cake1,
		name: 'Strawberry Cheesecake',
		price: '920.00 for one',
		liked: false,
	},
	{
		image: Cake2,
		name: 'Blueberry Cheesecake',
		price: '850.00 for one',
		liked: false,
	},
	{
		image: Cake3,
		name: 'Chocolate Mini Cake',
		price: '230.00 for one',
		liked: false,
	},
	{
		image: Cake4,
		name: 'Dry Cake',
		price: '850.00 for one',
		liked: false,
	},
	{
		image: Cake5,
		name: 'Doraemon Cake',
		price: '350.00 for one',
		liked: false,
	},
	{
		image: Cake6,
		name: 'Dry Fruit Cake',
		price: '850.00 for one',
		liked: false,
	},
	{
		image: Cake7,
		name: 'Batman Cake',
		price: '1600.00 for one',
		liked: false,
	},
	{
		image: Cake8,
		name: 'Red Velvet Cake',
		price: '550.00 for one',
		liked: false,
	},
];

const data: Data[] = [
	{
		label: 'Category',
		data: categoryData,
	},
	{
		label: 'Product',
		data: ProductData,
	},
];

const Categories = ({ product }: { product: CategoryType }) => {
	const { height, width } = Image.resolveAssetSource(product.image);

	return (
		<View style={styles.categoryProductContainer}>
			<View
				style={[
					styles.categoryProduct,
					{ backgroundColor: product.bg },
				]}
			>
				<Image
					source={product.image}
					style={{
						width: getWidthnHeight(7).width,
						height: responsiveImageHeight(
							width,
							height,
							getWidthnHeight(7).width
						),
					}}
					resizeMode='contain'
				/>
			</View>
			<Text style={styles.categoryProductName}>{product.name}</Text>
		</View>
	);
};

const Product = ({ product }: { product: ProductType }) => {
	const [isLiked, setIsLiked] = useState(product.liked);
	const heartScale = useRef(new Animated.Value(1)).current;

	const handleLike = () => {
		setIsLiked(!isLiked);
		Animated.timing(heartScale, {
			toValue: isLiked ? 1 : 1.2,
			duration: 200,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	};

	return (
		<ImageBackground
			source={product.image}
			style={styles.product}
			imageStyle={{ borderRadius: 12 }}
		>
			<LinearGradient
				colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,1)']}
				start={{ x: 0, y: 0.3 }}
				end={{ x: 0, y: 1 }}
				style={styles.overlay}
			>
				<View style={styles.productHeader}>
					<Pressable onPress={handleLike}>
						<Animated.View
							style={{ transform: [{ scale: heartScale }] }}
						>
							{isLiked ? (
								<FontAwesome
									name='heart'
									color={colors.primaryRed}
									size={responsiveFontSize(22)}
								/>
							) : (
								<FontAwesome
									name='heart-o'
									color={'white'}
									size={responsiveFontSize(22)}
								/>
							)}
						</Animated.View>
					</Pressable>
				</View>
				<View style={styles.productDetails}>
					<Text style={styles.productText} numberOfLines={1}>
						{product.name}
					</Text>
					<Text style={styles.productText} numberOfLines={1}>
						{product.price}
					</Text>
				</View>
			</LinearGradient>
		</ImageBackground>
	);
};

const CategoryScreen: React.FC<
	AuthenticatedStackScreenProps<'CategoryScreen'>
> = ({ navigation }) => {
	const screenWidth = getWidthnHeight(100).width;
	const imageHeight = responsiveImageHeight(428, 237, screenWidth);
	const { top } = useSafeAreaInsets();

	const [searchText, setSearchText] = useState('');

	return (
		<SafeAreaView edges={['bottom', 'left', 'right']} style={styles.screen}>
			<FocusAwareStatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
			/>
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<ImageBackground
					source={require('../../assets/images/cakebanner.png')}
					style={{
						width: screenWidth,
						height: imageHeight,
						justifyContent: 'center',
						marginTop: -getWidthnHeight(10.5).width,
					}}
				>
					<Pressable
						onPress={() => navigation.goBack()}
						style={[styles.backButton, { top: top + 10 }]}
					>
						<Feather
							name='chevron-left'
							color='white'
							size={getWidthnHeight(10).width}
						/>
					</Pressable>
					<Text style={styles.heading}>Category</Text>
				</ImageBackground>
				<View style={styles.container}>
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
							marginVertical: getWidthnHeight(5).width,
						}}
						elevation={2}
					/>
					<FlatList
						data={filterData}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => (
							<Pressable
								style={[
									styles.filterItem,
									!!item.icon && {
										paddingHorizontal:
											getWidthnHeight(2).width,
									},
								]}
							>
								{item.icon && (
									<MaterialIcons
										name={item.icon}
										color={colors.primaryRed}
										size={responsiveFontSize(18)}
										style={{ paddingRight: 5 }}
									/>
								)}
								<Text style={styles.filterItemText}>
									{item.name}
								</Text>
								{item.dropdown && (
									<AntDesign
										name='caretdown'
										color='black'
										size={responsiveFontSize(10)}
										style={{ paddingLeft: 5 }}
									/>
								)}
							</Pressable>
						)}
						ItemSeparatorComponent={() => (
							<View
								style={{
									paddingHorizontal: responsiveFontSize(7),
								}}
							/>
						)}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					/>
					<FlatList
						data={data}
						keyExtractor={(item) => item.label}
						renderItem={({ item }) => (
							<View>
								{item.label === 'Category' && (
									<FlatList
										data={item.data}
										keyExtractor={(item) =>
											`${item.name}-${item.bg}`
										}
										renderItem={(subItem) => (
											<Categories
												product={subItem.item}
											/>
										)}
										ItemSeparatorComponent={() => (
											<View
												style={{
													marginHorizontal:
														getWidthnHeight(2.5)
															.width,
												}}
											/>
										)}
										horizontal
										showsHorizontalScrollIndicator={false}
									/>
								)}
								{item.label === 'Product' && (
									<FlatList
										data={item.data}
										keyExtractor={(subItem, subIndex) =>
											`${subItem.name}-${subIndex}`
										}
										renderItem={(subitem) => (
											<Product product={subitem.item} />
										)}
										columnWrapperStyle={{
											justifyContent: 'space-between',
										}}
										showsVerticalScrollIndicator={false}
										numColumns={2}
									/>
								)}
							</View>
						)}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: colors.white,
		flex: 1,
	},
	heading: {
		color: 'white',
		fontSize: responsiveFontSize(50),
		lineHeight: responsiveFontSize(65.75),
		fontFamily: fonts.Ovo,
		textAlign: 'center',
		textAlignVertical: 'center',
		marginTop: getWidthnHeight(15).width,
	},
	backButton: {
		position: 'absolute',
		left: 10,
		marginTop: getWidthnHeight(10.5).width,
		zIndex: 999,
	},
	container: {
		paddingHorizontal: getWidthnHeight(5).width,
		flex: 1,
	},
	filterItem: {
		borderWidth: 1,
		borderColor: colors.placeholderGrey,
		borderRadius: 7,
		marginVertical: getWidthnHeight(5).width,
		paddingHorizontal: getWidthnHeight(3).width,
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'space-between',
		alignItems: 'center',
		minHeight: responsiveFontSize(28),
	},
	filterItemText: {
		fontFamily: fonts.PoppinsRegular,
		color: 'black',
		fontSize: responsiveFontSize(16),
		lineHeight: responsiveFontSize(24),
	},
	categoryProductContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: responsiveFontSize(20),
	},
	categoryProduct: {
		width: getWidthnHeight(13).width,
		height: getWidthnHeight(13).width,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	categoryProductName: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(18),
		lineHeight: responsiveFontSize(23.67),
		color: colors.lightInput,
		marginTop: getWidthnHeight(1).width,
	},
	product: {
		width: getWidthnHeight(42.5).width,
		height: getWidthnHeight(47.2).width,
		marginVertical: getWidthnHeight(2.5).width,
	},
	overlay: {
		flex: 1,
		borderRadius: 12,
	},
	productHeader: {
		flex: 1,
		alignItems: 'flex-end',
		padding: getWidthnHeight(3).width,
	},
	productDetails: {
		paddingBottom: getWidthnHeight(1).width,
		paddingHorizontal: getWidthnHeight(1).width,
	},
	productText: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(16),
		lineHeight: responsiveFontSize(21.04),
		color: 'white',
		textAlign: 'right',
	},
});

export default CategoryScreen;
