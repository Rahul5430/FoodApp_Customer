import React, { useRef, useState } from 'react';
import {
	Animated,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollViewProps,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';

import { getWidthnHeight } from '../../helpers/responsiveFontSize';

interface Props extends ScrollViewProps {
	backgroundColor?: string;
	backgroundScrollSpeed?: number;
	fadeOutForeground?: boolean;
	fadeOutBackground?: boolean;
	contentBackgroundColor?: string;
	onChangeHeaderVisibility?: (visible: boolean) => void;
	parallaxHeaderHeight: number;
	renderBackground?: () => JSX.Element;
	renderContentBackground?: () => JSX.Element;
	renderFixedHeader?: () => JSX.Element;
	renderForeground?: () => JSX.Element;
	renderScrollComponent?: (props: ScrollViewProps) => JSX.Element;
	renderStickyHeader?: () => JSX.Element;
	stickyHeaderHeight?: number;
	contentContainerStyle?: StyleProp<ViewStyle>;
	outputScaleValue?: number;
	scrollEvent?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
	children?: React.ReactNode;
}

const ParallaxScrollView = (props: Props) => {
	const {
		backgroundColor = 'black',
		backgroundScrollSpeed = 5,
		children,
		contentBackgroundColor = 'white',
		fadeOutForeground = true,
		fadeOutBackground,
		onChangeHeaderVisibility,
		parallaxHeaderHeight,
		renderBackground = () => <View />,
		renderContentBackground = () => <View style={{ display: 'none' }} />,
		renderFixedHeader,
		renderForeground = null,
		renderScrollComponent = (props: ScrollViewProps) => (
			<Animated.ScrollView {...props} />
		),
		renderStickyHeader,
		stickyHeaderHeight = 0,
		style,
		contentContainerStyle = null,
		outputScaleValue = 5,
		...scrollViewProps
	} = props;

	if (props.renderStickyHeader && !props.stickyHeaderHeight) {
		console.warn(
			'Property `stickyHeaderHeight` must be set if `renderStickyHeader` is used.'
		);
	}

	const [state, setState] = useState({
		viewHeight: getWidthnHeight().height,
		viewWidth: getWidthnHeight().width,
	});

	const scrollY = useRef(new Animated.Value(0)).current;

	let _footerComponent = { setNativeProps() {} }; // Initial stub
	let _footerHeight = 0;

	const _onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { onScroll: prevOnScroll = () => {} } = props;

		props.scrollEvent && props.scrollEvent(e);

		const p = parallaxHeaderHeight - stickyHeaderHeight;

		if (onChangeHeaderVisibility) {
			if (e.nativeEvent.contentOffset.y >= p) {
				onChangeHeaderVisibility(false);
			} else {
				onChangeHeaderVisibility(true);
			}
		}

		prevOnScroll(e);
	};

	const maybeUpdateViewDimensions = (width: number, height: number) => {
		if (width !== state.viewWidth || height !== state.viewHeight) {
			setState({
				viewWidth: width,
				viewHeight: height,
			});
		}
	};

	const background = () => {
		const p = parallaxHeaderHeight - stickyHeaderHeight;
		return (
			<Animated.View
				style={[
					styles.backgroundImage,
					{
						backgroundColor: backgroundColor,
						height: parallaxHeaderHeight,
						width: state.viewWidth,
						opacity: fadeOutBackground
							? scrollY.interpolate({
									inputRange: [
										0,
										p * (1 / 2),
										p * (3 / 4),
										p,
									],
									outputRange: [1, 0.3, 0.1, 0],
									extrapolate: 'clamp',
							  })
							: 1,
						transform: [
							{
								translateY: scrollY.interpolate({
									inputRange: [0, p],
									outputRange: [
										0,
										-(p / backgroundScrollSpeed),
									],
									extrapolateRight: 'extend',
									extrapolateLeft: 'clamp',
								}),
							},
							{
								scale: scrollY.interpolate({
									inputRange: [-state.viewHeight, 0],
									outputRange: [outputScaleValue * 1.5, 1],
									extrapolate: 'clamp',
								}),
							},
						],
					},
				]}
			>
				<View>{renderBackground()}</View>
			</Animated.View>
		);
	};

	const foreground = () => {
		const p = parallaxHeaderHeight - stickyHeaderHeight;

		return (
			<View style={styles.parallaxHeaderContainer}>
				<Animated.View
					style={[
						styles.parallaxHeader,
						{
							height: parallaxHeaderHeight,
							opacity: fadeOutForeground
								? scrollY.interpolate({
										inputRange: [
											0,
											p * (1 / 2),
											p * (3 / 4),
											p,
										],
										outputRange: [1, 0.3, 0.1, 0],
										extrapolate: 'clamp',
								  })
								: 1,
						},
					]}
				>
					<View style={{ height: parallaxHeaderHeight }}>
						{renderForeground && renderForeground()}
					</View>
				</Animated.View>
			</View>
		);
	};

	const bodyComponent = () => {
		const containerStyles: StyleProp<ViewStyle> = [
			{ backgroundColor: contentBackgroundColor },
		];

		if (contentContainerStyle) containerStyles.push(contentContainerStyle);

		let containerHeight = state.viewHeight;

		React.Children.forEach(children, (item) => {
			if (item && Object.keys(item).length != 0) {
				containerHeight = 0;
			}
		});

		return (
			<View
				style={[containerStyles, { minHeight: containerHeight }]}
				onLayout={(e) => {
					const { height } = e.nativeEvent.layout;

					const footerHeight = Math.max(
						0,
						state.viewHeight - height - stickyHeaderHeight
					);

					if (_footerHeight !== footerHeight) {
						_footerComponent.setNativeProps({
							style: { height: footerHeight },
						});
						_footerHeight = footerHeight;
					}
				}}
			>
				{renderContentBackground()}
				{children}
			</View>
		);
	};

	const footerSpacer = () => (
		<View
			ref={(ref) => {
				if (ref) {
					_footerComponent = ref;
				}
			}}
			style={{ backgroundColor: contentBackgroundColor }}
		/>
	);

	const maybeStickyHeader = () => {
		if (renderStickyHeader || renderFixedHeader) {
			const p = parallaxHeaderHeight - stickyHeaderHeight;

			return (
				<View
					style={[
						styles.stickyHeader,
						{
							width: state.viewWidth,
							...(stickyHeaderHeight
								? { height: stickyHeaderHeight }
								: null),
						},
					]}
				>
					{renderStickyHeader ? (
						<Animated.View
							style={{
								backgroundColor: backgroundColor,
								height: stickyHeaderHeight,
								opacity: scrollY.interpolate({
									inputRange: [0, p],
									outputRange: [0, 1],
									extrapolate: 'clamp',
								}),
							}}
						>
							<Animated.View
								style={{
									transform: [
										{
											translateY: scrollY.interpolate({
												inputRange: [0, p],
												outputRange: [
													stickyHeaderHeight,
													0,
												],
												extrapolate: 'clamp',
											}),
										},
									],
								}}
							>
								{renderStickyHeader()}
							</Animated.View>
						</Animated.View>
					) : null}
					{renderFixedHeader && renderFixedHeader()}
				</View>
			);
		} else {
			return null;
		}
	};

	const scrollElement = renderScrollComponent(scrollViewProps);

	return (
		<View
			style={[style, styles.container]}
			onLayout={({ nativeEvent }) =>
				maybeUpdateViewDimensions(
					nativeEvent.layout.width,
					nativeEvent.layout.height
				)
			}
		>
			{background()}
			{React.cloneElement(
				scrollElement,
				{
					// ref: 'ScrollView',
					style: [styles.scrollView, scrollElement.props.style],
					scrollEventThrottle: 1,
					onScroll: Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: { y: scrollY },
								},
							},
						],
						{
							useNativeDriver: true,
							listener: (e) =>
								_onScroll(
									e as NativeSyntheticEvent<NativeScrollEvent>
								),
						}
					),
				},
				foreground(),
				bodyComponent(),
				footerSpacer()
			)}
			{maybeStickyHeader()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	parallaxHeaderContainer: {
		backgroundColor: 'transparent',
		overflow: 'hidden',
	},
	parallaxHeader: {
		backgroundColor: 'transparent',
		overflow: 'hidden',
	},
	backgroundImage: {
		position: 'absolute',
		backgroundColor: 'transparent',
		overflow: 'hidden',
		top: 0,
	},
	stickyHeader: {
		backgroundColor: 'transparent',
		position: 'absolute',
		overflow: 'hidden',
		top: 0,
		left: 0,
	},
	scrollView: {
		backgroundColor: 'transparent',
	},
});

export default ParallaxScrollView;
