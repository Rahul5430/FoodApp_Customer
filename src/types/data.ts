import { ImageSourcePropType } from 'react-native';

export type CarouselType = {
	image: ImageSourcePropType;
	bg: string;
	description: string;
};

export type CategoryType = {
	name: string;
	bg: string;
	image: ImageSourcePropType;
};

export type TrendingProductType = {
	image: ImageSourcePropType;
	name: string;
	location: string;
	rating: string;
	offer: string;
	liked: boolean;
};

export type ProductType = {
	restaurantID: string;
	image: ImageSourcePropType;
	name: string;
	price: string;
	liked: boolean;
	description: string;
	preferences: Array<string>;
};

export type Order = {
	restaurantID: string;
	items: Array<{
		name: string;
		quantity: string;
		type: 'veg' | 'nonveg';
	}>;
	date: string;
	amount: string;
	status: 'Delivered' | 'Rejected';
};

export type Restaurant = {
	id: string;
	name: string;
	logo: any;
	rating: string;
	reviews: string;
};
