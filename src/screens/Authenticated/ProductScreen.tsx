import { useEffect, useRef, useState } from 'react';
import {
	Animated,
	Easing,
	ImageBackground,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Surface } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { restaurantData } from '../../data/orders';
import {
	getWidthnHeight,
	responsiveFontSize,
} from '../../helpers/responsiveFontSize';
import { colors, fonts } from '../../themes';
import { Restaurant } from '../../types/data';
import { AuthenticatedStackScreenProps } from '../../types/navigation';

const ProductScreen: React.FC<
	AuthenticatedStackScreenProps<'ProductScreen'>
> = ({ navigation, route }) => {
	const { product } = route.params;

	const screenWidth = getWidthnHeight(100).width;
	const { top } = useSafeAreaInsets();

	const [gradTop, setGradTop] = useState(105.33333587646484);
	const [gradBottom, setGradBottom] = useState(42.66668701171875);
	const [isLiked, setIsLiked] = useState(product.liked);
	const [price, setPrice] = useState(product.price);
	const [quantity, setQuantity] = useState(0);

	const heartScale = useRef(new Animated.Value(1)).current;
	const imageScale = useRef(new Animated.Value(0.5)).current;

	const restaurant = restaurantData.find(
		(restaurant) => restaurant.id === product.restaurantID
	) as Restaurant;

	const handleLike = () => {
		setIsLiked(!isLiked);
		Animated.timing(heartScale, {
			toValue: isLiked ? 1 : 1.2,
			duration: 200,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	};

	const checkOut = () => {
		console.log('Check Out');
		if (quantity === 0) {
			return Toast.show('Please select atleast one item', {
				position: -80,
			});
		}
		console.log(price);
	};

	const handleQuantityChange = (change: 'increase' | 'decrease') => {
		if (change === 'increase') {
			if (quantity > 0) {
				setPrice(
					(parseFloat(price) + parseFloat(product.price)).toString()
				);
			}
			setQuantity(quantity + 1);
		} else {
			if (quantity === 1) {
				setPrice(product.price);
			} else {
				setPrice(
					(parseFloat(price) - parseFloat(product.price)).toString()
				);
			}
			setQuantity(quantity - 1);
		}
	};

	useEffect(() => {
		Animated.parallel([
			Animated.timing(imageScale, {
				toValue: 1,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	return (
		<SafeAreaView edges={['bottom', 'left', 'right']} style={styles.screen}>
			<FocusAwareStatusBar
				barStyle='light-content'
				translucent={true}
				backgroundColor={'transparent'}
				hidden={false}
			/>
			<ImageBackground
				source={product.image}
				style={{
					width: screenWidth,
					height: screenWidth,
				}}
				blurRadius={5}
			>
				<LinearGradient
					colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.2)']}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={styles.overlay}
				>
					<Animated.View
						style={{
							transform: [{ scale: imageScale }],
							zIndex: 1,
						}}
					>
						<ImageBackground
							source={product.image}
							style={{
								width: screenWidth,
								height: screenWidth,
							}}
						>
							<LinearGradient
								colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.2)']}
								start={{ x: 0, y: 0 }}
								end={{ x: 0, y: 1 }}
								style={styles.overlay}
							>
								<View
									style={[styles.imageHeader, { top: top }]}
								>
									<Pressable
										onPress={() => navigation.goBack()}
										style={[styles.backButton]}
									>
										<Feather
											name='chevron-left'
											color='white'
											size={getWidthnHeight(10).width}
										/>
									</Pressable>
									<Pressable onPress={handleLike}>
										<Animated.View
											style={{
												transform: [
													{ scale: heartScale },
												],
											}}
										>
											{isLiked ? (
												<FontAwesome
													name='heart'
													color={colors.primaryRed}
													size={responsiveFontSize(
														22
													)}
												/>
											) : (
												<FontAwesome
													name='heart-o'
													color={'white'}
													size={responsiveFontSize(
														22
													)}
												/>
											)}
										</Animated.View>
									</Pressable>
								</View>
							</LinearGradient>
						</ImageBackground>
					</Animated.View>
				</LinearGradient>
			</ImageBackground>
			<View style={[styles.product]}>
				<Text style={styles.restaurantName}>{restaurant.name}</Text>
				<Text style={styles.productName}>{product.name}</Text>
				<View style={styles.reviewBox}>
					<View style={styles.ratings}>
						<Octicons
							name='star-fill'
							color={colors.yellow}
							size={responsiveFontSize(18)}
						/>
						<Text
							style={[
								styles.productName,
								{
									paddingHorizontal: responsiveFontSize(5),
								},
							]}
						>
							{restaurant.rating}
						</Text>
						<Text
							style={[
								styles.productName,
								{ color: colors.lightInput },
							]}
						>
							({restaurant.reviews} Reviews)
						</Text>
					</View>
					{quantity === 0 ? (
						<Button
							buttonColor={colors.primaryButton}
							style={{ borderRadius: 8 }}
							labelStyle={[
								styles.buttonText,
								{ marginVertical: responsiveFontSize(5) },
							]}
							contentStyle={{
								flexDirection: 'row-reverse',
								width: getWidthnHeight(22.5).width,
								height: getWidthnHeight(9).width,
							}}
							icon={() => (
								<MaterialIcons
									name='add'
									color='white'
									size={responsiveFontSize(20)}
								/>
							)}
							onPress={() => handleQuantityChange('increase')}
						>
							Add
						</Button>
					) : (
						<View style={styles.segmentedButtonContainer}>
							<Pressable
								style={[
									styles.segmentedButton,
									{
										borderTopLeftRadius: 8,
										borderBottomLeftRadius: 8,
									},
								]}
								onPress={() => handleQuantityChange('decrease')}
							>
								<MaterialCommunityIcons
									name='minus'
									size={responsiveFontSize(18)}
									color='white'
								/>
							</Pressable>
							<Text
								style={[
									styles.productName,
									{ flex: 1, textAlign: 'center' },
								]}
							>
								{quantity}
							</Text>
							<Pressable
								style={[
									styles.segmentedButton,
									{
										borderTopRightRadius: 8,
										borderBottomRightRadius: 8,
									},
								]}
								onPress={() => handleQuantityChange('increase')}
							>
								<MaterialIcons
									name='add'
									size={responsiveFontSize(18)}
									color='white'
								/>
							</Pressable>
						</View>
					)}
				</View>
				<View
					onLayout={({ nativeEvent }) =>
						setGradTop(nativeEvent.layout.y)
					}
				/>
				<View style={[styles.scrollViewGradient, { top: gradTop }]}>
					<LinearGradient
						colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
						style={[getWidthnHeight(90, 4)]}
						pointerEvents='none'
					/>
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ paddingTop: getWidthnHeight(5).width }}>
						<Text style={styles.description}>
							{product.description}
						</Text>
						<View style={styles.preferencesBox}>
							<View>
								<Text style={styles.productName}>
									Choose your preference
								</Text>
								<Text style={styles.priceText}>
									Select {product.preferences.length} out of{' '}
									{product.preferences.length} options
								</Text>
							</View>
							<Surface style={styles.preference} elevation={1}>
								<Text style={styles.description}>
									{product.preferences[0]}
								</Text>
							</Surface>
						</View>
					</View>
				</ScrollView>
				<View
					style={[styles.scrollViewGradient, { bottom: gradBottom }]}
				>
					<LinearGradient
						colors={['rgba(255,255,255,.4)', 'rgba(255,255,255,1)']}
						style={[getWidthnHeight(90, 4)]}
						pointerEvents='none'
					/>
				</View>
				<View
					style={styles.productBottom}
					onLayout={({ nativeEvent }) =>
						setGradBottom(nativeEvent.layout.height)
					}
				>
					<View style={styles.price}>
						<Text
							style={[
								styles.priceText,
								{ color: colors.lightInput },
							]}
						>
							Price
						</Text>
						<Text style={styles.priceText}>
							{`\u20B9`}
							<Text style={{ color: colors.primaryRed }}>
								{price}
							</Text>
						</Text>
					</View>
					<Button
						buttonColor={colors.primaryButton}
						style={{ flex: 3, borderRadius: 12 }}
						labelStyle={styles.buttonText}
						onPress={() => checkOut()}
					>
						Check Out
					</Button>
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
	overlay: {
		flex: 1,
	},
	imageHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: getWidthnHeight(5).width,
	},
	backButton: {
		zIndex: 999,
	},
	product: {
		flex: 1,
		paddingHorizontal: getWidthnHeight(5).width,
		paddingTop: getWidthnHeight(5).width,
	},
	restaurantName: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(24),
		lineHeight: responsiveFontSize(31.56),
		color: 'black',
	},
	productName: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(18),
		lineHeight: responsiveFontSize(23.67),
		color: 'black',
	},
	segmentedButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: getWidthnHeight(22.5).width,
		height: getWidthnHeight(9).width,
	},
	segmentedButton: {
		backgroundColor: colors.primaryRed,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	reviewBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	ratings: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	description: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(16),
		color: 'black',
	},
	preferencesBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: getWidthnHeight(5).width,
		paddingBottom: getWidthnHeight(8).width,
	},
	preference: {
		backgroundColor: 'white',
		paddingVertical: getWidthnHeight(2.5).width,
		paddingHorizontal: getWidthnHeight(2.5).width,
		marginRight: 2,
		borderRadius: 8,
	},
	scrollViewGradient: {
		position: 'absolute',
		left: getWidthnHeight(5).width,
		zIndex: 999,
	},
	productBottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	price: {
		flex: 1,
	},
	priceText: {
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(16),
		lineHeight: responsiveFontSize(21.04),
		color: 'black',
	},
	buttonText: {
		fontSize: responsiveFontSize(16),
		fontFamily: fonts.OxygenBold,
		color: 'white',
	},
});

export default ProductScreen;
