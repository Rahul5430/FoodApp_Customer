import * as shape from 'd3-shape';
import { scale } from 'react-native-size-scaling';

export const getCurve = (width: number, height: number, offset: number) => {
	height = scale(height);

	const path = (shape as any)
		.line()
		.x((d: { x: any }) => d.x)
		.y((d: { y: any }) => d.y)
		.curve(shape.curveBasis)([
		// right
		{ x: width, y: scale(0) },
		{ x: width, y: height + scale(offset) },
		{ x: width, y: height + scale(offset) },
		// bottom
		{ x: width, y: height + scale(offset) },
		{ x: (3 * width) / 4, y: height + scale(offset + 20) },
		{ x: width / 2, y: height },
		{ x: width / 4, y: height - scale(offset + 20) },
		{ x: 0, y: height - scale(offset) },
		// left
		{ x: 0, y: height - scale(offset) },
		{ x: 0, y: height - scale(offset) },
		{ x: 0, y: scale(0) },
	]);

	return path;
};
