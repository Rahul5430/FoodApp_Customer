import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
	Animated,
	Easing,
	FlatList,
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import CartoonUser from '../../assets/images/cartoonuser.png';
import FadeInOutCarousel from '../../components/FadeInOutCarousel';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { carouselData, categoryData, trendingProductData } from '../../data';
import {
	getWidthnHeight,
	responsiveFontSize,
} from '../../helpers/responsiveFontSize';
import { responsiveImageHeight } from '../../helpers/responsiveImageSize';
import { colors, fonts } from '../../themes';
import {
	CarouselType,
	CategoryType,
	TrendingProductType,
} from '../../types/data';
import {
	DashboardNavigationProps,
	DashboardTabScreenProps,
} from '../../types/navigation';

type Data =
	| {
			label: 'Carousel';
			data: CarouselType[];
	  }
	| {
			label: 'Category';
			data: CategoryType[];
	  }
	| {
			label: 'Trending Product';
			data: TrendingProductType[];
	  };

const data: Data[] = [
	{
		label: 'Carousel',
		data: carouselData,
	},
	{
		label: 'Category',
		data: categoryData,
	},
	{
		label: 'Trending Product',
		data: trendingProductData,
	},
];

const Categories = ({ product }: { product: CategoryType }) => {
	const { height, width } = Image.resolveAssetSource(product.image);
	const navigation = useNavigation<DashboardNavigationProps<'HomeScreen'>>();

	return (
		<Pressable
			onPress={() => navigation.navigate('CategoryScreen')}
			style={styles.categoryProductContainer}
		>
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
		</Pressable>
	);
};

const TrendingProduct = ({ product }: { product: TrendingProductType }) => {
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
			<View style={styles.overlay}>
				<View
					style={[
						styles.productHeader,
						!product.offer && { justifyContent: 'flex-end' },
					]}
				>
					{product.offer ? (
						<View style={styles.offer}>
							<MaterialCommunityIcons
								name='water-percent'
								color='white'
								size={responsiveFontSize(22)}
							/>
							<Text style={styles.offerText}>
								{product.offer}
							</Text>
						</View>
					) : null}
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
			</View>
			<View style={styles.productDetails}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text style={styles.productName}>{product.name}</Text>
					<View style={styles.ratingsContainer}>
						<Text style={styles.ratingsText}>{product.rating}</Text>
						<Octicons name='star-fill' color='white' size={14} />
					</View>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FontAwesome5
						name='map-marker-alt'
						size={responsiveFontSize(18)}
						color={colors.primaryRed}
						style={{ paddingRight: 10 }}
					/>
					<Text style={styles.productLoc}>{product.location}</Text>
				</View>
			</View>
		</ImageBackground>
	);
};

const HomeScreen: React.FC<DashboardTabScreenProps<'HomeScreen'>> = ({
	navigation,
}) => {
	const [searchText, setSearchText] = useState('');

	return (
		<SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
			<FocusAwareStatusBar
				barStyle={'dark-content'}
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
			/>
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<FontAwesome5
						name='map-marker-alt'
						size={getWidthnHeight(9).width}
						color={colors.black}
					/>
					<View
						style={{
							flex: 1,
							paddingLeft: getWidthnHeight(3).width,
						}}
					>
						<Text
							style={[
								styles.addressText,
								{ fontSize: responsiveFontSize(22) },
							]}
						>
							{'Phase 8B'}
							<Pressable
								onPress={() =>
									navigation.navigate('AddressScreen')
								}
							>
								<Entypo
									name='chevron-down'
									size={responsiveFontSize(22)}
									color={'black'}
								/>
							</Pressable>
						</Text>
						<Text style={styles.addressText}>
							{
								'Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055'
							}
						</Text>
					</View>
					<Pressable
						style={styles.avatar}
						onPress={() => navigation.navigate('MyProfile')}
					>
						<Image source={CartoonUser} style={styles.image} />
					</Pressable>
				</View>
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
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.label}
				renderItem={({ item }) => (
					<View>
						{item.label !== 'Carousel' && (
							<View style={styles.labelContainer}>
								<Text style={styles.label}>{item.label}</Text>
								{item.label === 'Category' && (
									<Pressable
										onPress={() =>
											navigation.navigate(
												'CategoryScreen'
											)
										}
									>
										<Text style={styles.seeAll}>
											See All
										</Text>
									</Pressable>
								)}
							</View>
						)}
						{item.label === 'Carousel' && (
							<FadeInOutCarousel data={item.data} />
						)}
						{item.label === 'Category' && (
							<FlatList
								data={item.data}
								keyExtractor={(item) =>
									`${item.name}-${item.bg}`
								}
								renderItem={(subItem) => (
									<Categories product={subItem.item} />
								)}
								ItemSeparatorComponent={() => (
									<View
										style={{
											marginHorizontal:
												getWidthnHeight(2.5).width,
										}}
									/>
								)}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						)}
						{item.label === 'Trending Product' && (
							<FlatList
								data={item.data}
								keyExtractor={(subItem, subIndex) =>
									`${subItem.name}-${subIndex}`
								}
								renderItem={(subitem) => (
									<TrendingProduct product={subitem.item} />
								)}
							/>
						)}
					</View>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: colors.bgGrey,
		paddingHorizontal: getWidthnHeight(5).width,
		paddingBottom: getWidthnHeight(5).width,
		flex: 1,
	},
	headerContainer: {
		paddingVertical: getWidthnHeight(5).width,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: getWidthnHeight(4).width,
	},
	addressText: {
		color: 'black',
		fontSize: responsiveFontSize(14),
		fontFamily: fonts.OxygenBold,
	},
	avatar: {
		backgroundColor: colors.primaryRed,
		borderRadius: 50,
		width: getWidthnHeight(10).width,
		height: getWidthnHeight(10).width,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	image: {
		width: getWidthnHeight(8).width,
		height: getWidthnHeight(8).width,
		marginBottom: getWidthnHeight(0.4).width,
	},
	labelContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	label: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(22),
		color: 'black',
		lineHeight: responsiveFontSize(23.67),
	},
	seeAll: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(18),
		color: colors.lightInput,
		lineHeight: responsiveFontSize(23.67),
	},
	categoryProductContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: getWidthnHeight(3.312).width,
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
		width: '100%',
		height: getWidthnHeight(58).width,
		marginVertical: getWidthnHeight(2.5).width,
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.41)',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	productHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: getWidthnHeight(3).width,
	},
	offer: {
		backgroundColor: colors.primaryRed,
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: getWidthnHeight(1).width,
		paddingHorizontal: getWidthnHeight(3).width,
	},
	offerText: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(16),
		color: 'white',
		lineHeight: responsiveFontSize(20),
	},
	productDetails: {
		height: getWidthnHeight(18).width,
		width: '100%',
		backgroundColor: 'white',
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
		paddingVertical: getWidthnHeight(2.5).width,
		paddingHorizontal: getWidthnHeight(5).width,
	},
	productName: {
		color: 'black',
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(22),
		lineHeight: responsiveFontSize(28),
	},
	productLoc: {
		color: 'black',
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(16),
		lineHeight: responsiveFontSize(21),
	},
	ratingsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primaryRed,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.primaryRed,
		height: 25,
		width: getWidthnHeight(15.18).width,
	},
	ratingsText: {
		fontSize: 15,
		fontFamily: fonts.PoppinsMedium,
		color: 'white',
		paddingHorizontal: getWidthnHeight(1).width,
	},
});

export default HomeScreen;
