import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet } from 'react-native';

import {
	getWidthnHeight,
	responsiveFontSize,
} from '../helpers/responsiveFontSize';
import { responsiveImageHeight } from '../helpers/responsiveImageSize';
import { checkContrast } from '../helpers/utils';
import { CarouselType } from '../screens/Authenticated/HomeScreen';
import { fonts } from '../themes';

type FadeInOutCarouselProps = {
	data: CarouselType[];
};

const FadeInOutCarousel = ({ data }: FadeInOutCarouselProps) => {
	const numberOfItems = data.length;

	const [description, setDescription] = useState(data[0].description);
	const [image, setImage] = useState(data[0].image);
	const [imageResolvedAsset, setImageResolvedAsset] = useState(
		Image.resolveAssetSource(data[0].image)
	);
	const [currentIndex, setCurrentIndex] = useState(0);

	const animatedBG = useRef(new Animated.Value(0)).current;
	const animatedText = useRef(new Animated.Value(1)).current;

	const inputRange = [
		...Array.from(Array(numberOfItems).keys()),
		numberOfItems + 1,
	];
	const outputRange = [...data.map((item) => item.bg), data[0].bg];

	useEffect(() => {
		const bgAnimations = [];
		for (let i = 0; i < numberOfItems; i++) {
			const animation = Animated.timing(animatedBG, {
				toValue: i + 1,
				duration: 400,
				delay: 1000,
				useNativeDriver: false,
			});
			bgAnimations.push(animation);
		}
		const textAnimations = [];
		for (let i = 0; i < numberOfItems; i++) {
			const animation1 = Animated.timing(animatedText, {
				toValue: 0,
				duration: 300,
				delay: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			});
			textAnimations.push(animation1);
			const animation2 = Animated.timing(animatedText, {
				toValue: 1,
				duration: 400,
				easing: Easing.linear,
				useNativeDriver: false,
			});
			textAnimations.push(animation2);
		}
		Animated.loop(
			Animated.parallel([
				Animated.sequence(bgAnimations),
				Animated.sequence(textAnimations),
			])
		).start();
	}, []);

	useEffect(() => {
		animatedBG.addListener(({ value }) => {
			// console.log(value);
			const currentIndex =
				Math.ceil(value) === numberOfItems ? 0 : Math.ceil(value);
			// console.log(currentIndex);
			setCurrentIndex(currentIndex);
			setDescription(data[currentIndex].description);
			setImage(data[currentIndex].image);
			setImageResolvedAsset(
				Image.resolveAssetSource(data[currentIndex].image)
			);
		});

		return () => animatedBG.removeAllListeners();
	}, []);

	const animateBackgroungColor = animatedBG.interpolate({
		inputRange: inputRange,
		outputRange: outputRange,
		extrapolate: 'clamp',
	});

	return (
		<Animated.View
			style={[
				styles.carousel,
				{ backgroundColor: animateBackgroungColor },
			]}
		>
			<Animated.Image
				source={image}
				style={{
					width: getWidthnHeight(28.738).width,
					height: responsiveImageHeight(
						imageResolvedAsset.width,
						imageResolvedAsset.height,
						getWidthnHeight(28.738).width
					),
					marginRight: getWidthnHeight(3.972).width,
					opacity: animatedText,
				}}
				resizeMode='contain'
			/>
			<Animated.Text
				style={[
					styles.carouselDescription,
					!checkContrast(data[currentIndex].bg) && {
						color: 'white',
					},
					{ opacity: animatedText },
				]}
			>
				{description}
			</Animated.Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	carousel: {
		width: getWidthnHeight(90).width,
		height: getWidthnHeight(38).width,
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: getWidthnHeight(9.346).width,
		paddingVertical: getWidthnHeight(7.243).width,
		marginBottom: getWidthnHeight(4).width,
	},
	carouselDescription: {
		flex: 1,
		flexWrap: 'wrap',
		fontFamily: fonts.OxygenBold,
		fontSize: responsiveFontSize(20.18),
		lineHeight: responsiveFontSize(26.54),
		color: 'black',
	},
});

export default FadeInOutCarousel;
