export const responsiveImageWidth = (
	imageWidth: number,
	imageHeight: number,
	requiredHeight: number
) => {
	const aspectRatio = imageWidth / imageHeight;
	return aspectRatio * requiredHeight;
};

export const responsiveImageHeight = (
	imageWidth: number,
	imageHeight: number,
	requiredWidth: number
) => {
	const aspectRatio = imageHeight / imageWidth;
	return aspectRatio * requiredWidth;
};
