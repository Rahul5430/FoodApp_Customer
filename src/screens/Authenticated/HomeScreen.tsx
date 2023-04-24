import { useState } from 'react';
import {
	FlatList,
	Image,
	ImageBackground,
	ImageSourcePropType,
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

import Cake1 from '../../assets/images/cakes/cake1.webp';
import Cake2 from '../../assets/images/cakes/cake2.webp';
import Cake3 from '../../assets/images/cakes/cake3.webp';
import Cake4 from '../../assets/images/cakes/cake4.webp';
import CartoonUser from '../../assets/images/cartoonuser.png';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {
	getWidthnHeight,
	responsiveFontSize,
} from '../../helpers/responsiveFontSize';
import { colors, fonts } from '../../themes';
import { DashboardTabScreenProps } from '../../types/navigation';

type TrendingProduct = {
	image: ImageSourcePropType;
	name: string;
	location: string;
	rating: string;
	offer: string;
	liked: boolean;
};

type Data =
	| {
			label: 'Carousel';
			data: [];
	  }
	| {
			label: 'Category';
			data: [];
	  }
	| {
			label: 'Trending Product';
			data: TrendingProduct[];
	  };

const trendingProductData: TrendingProduct[] = [
	{
		image: Cake1,
		name: "Baker's in",
		location: 'Sahibzada Ajit Singh Nagar',
		rating: '4.1',
		offer: 'Flat \u20B9125 Off above \u20B9249',
		liked: false,
	},
	{
		image: Cake2,
		name: "Baker's in",
		location: 'Sahibzada Ajit Singh Nagar',
		rating: '3.2',
		offer: '',
		liked: false,
	},
	{
		image: Cake3,
		name: "Baker's in",
		location: 'Sahibzada Ajit Singh Nagar',
		rating: '5.0',
		offer: '',
		liked: false,
	},
	{
		image: Cake4,
		name: "Baker's in",
		location: 'Sahibzada Ajit Singh Nagar',
		rating: '4.2',
		offer: '',
		liked: false,
	},
];

const data: Data[] = [
	{
		label: 'Carousel',
		data: [],
	},
	{
		label: 'Category',
		data: [],
	},
	{
		label: 'Trending Product',
		data: trendingProductData,
	},
];

const Categories = () => {
	return <View></View>;
};

const TrendingProduct = ({ product }: { product: TrendingProduct }) => {
	return (
		<ImageBackground
			source={product.image}
			style={styles.product}
			imageStyle={{ borderRadius: 12 }}
		>
			<View
				style={[
					styles.productHeader,
					!product.offer && { justifyContent: 'flex-end' },
				]}
			>
				{product.offer && (
					<View style={styles.offer}>
						<MaterialCommunityIcons
							name='water-percent'
							color='white'
							size={responsiveFontSize(22)}
						/>
						<Text style={styles.offerText}>{product.offer}</Text>
					</View>
				)}
				<FontAwesome
					name={product.liked ? 'heart' : 'heart-o'}
					color={product.liked ? colors.primaryRed : 'white'}
					size={responsiveFontSize(22)}
				/>
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
						size={getWidthnHeight(10).width}
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
							<Entypo
								name='chevron-down'
								size={responsiveFontSize(22)}
								color={'black'}
							/>
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
					<View style={styles.listItem}>
						<Text style={styles.label}>{item.label}</Text>
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
	label: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(22),
	},
	listItem: {},
	product: {
		width: '100%',
		height: getWidthnHeight(58).width,
		marginVertical: getWidthnHeight(2.5).width,
		justifyContent: 'space-between',
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
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(22),
		lineHeight: responsiveFontSize(28),
	},
	productLoc: {
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
