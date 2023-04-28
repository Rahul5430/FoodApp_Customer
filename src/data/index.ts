import Bread from '../assets/images/bread.png';
import Cake from '../assets/images/cake.png';
import Cake1 from '../assets/images/cakes/cake1.webp';
import Cake2 from '../assets/images/cakes/cake2.webp';
import Cake3 from '../assets/images/cakes/cake3.webp';
import Cake4 from '../assets/images/cakes/cake4.webp';
import Cake5 from '../assets/images/cakes/cake5.jpeg';
import Cake6 from '../assets/images/cakes/cake6.webp';
import Cake7 from '../assets/images/cakes/cake7.webp';
import Cake8 from '../assets/images/cakes/cake8.jpeg';
import ChocolateCake1 from '../assets/images/cakes/chocolate_cake1.png';
import ChocolateCake2 from '../assets/images/cakes/chocolate_cake2.png';
import PineappleCake from '../assets/images/cakes/pineapple_cake.png';
import Cookies from '../assets/images/cookies.png';
import Muffin from '../assets/images/muffin.png';
import Pudding from '../assets/images/pudding.png';
import {
	CarouselType,
	CategoryType,
	ProductType,
	TrendingProductType,
} from '../types/data';

export const carouselData: CarouselType[] = [
	{
		image: PineappleCake,
		bg: 'rgb(255, 218, 124)',
		description: 'Pineapple Cake Collection 60% OFF',
	},
	{
		image: ChocolateCake2,
		bg: 'rgb(255, 22, 71)',
		description: 'Chocolate Cake Collection 60% OFF',
	},
	{
		image: ChocolateCake1,
		bg: 'rgb(238, 232, 219)',
		description: 'Chocolate Cake Collection 50% OFF',
	},
];

export const categoryData: CategoryType[] = [
	{
		name: 'Bread',
		bg: '#71C0A3',
		image: Bread,
	},
	{
		name: 'Cake',
		bg: '#FEBC02',
		image: Cake,
	},
	{
		name: 'Pudding',
		bg: '#FC816F',
		image: Pudding,
	},
	{
		name: 'Muffin',
		bg: '#A8D7F3',
		image: Muffin,
	},
	{
		name: 'Cookies',
		bg: '#FF6988',
		image: Cookies,
	},
];

export const trendingProductData: TrendingProductType[] = [
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

export const ProductData: ProductType[] = [
	{
		restaurantID: '1',
		image: Cake1,
		name: 'Strawberry Cheesecake',
		price: '920.00',
		liked: false,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		preferences: ['Eggless'],
	},
	{
		restaurantID: '1',
		image: Cake2,
		name: 'Blueberry Cheesecake',
		price: '850.00',
		liked: false,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		preferences: ['Eggless'],
	},
	{
		restaurantID: '1',
		image: Cake3,
		name: 'Chocolate Mini Cake',
		price: '230.00',
		liked: false,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		preferences: ['Eggless'],
	},
	{
		restaurantID: '1',
		image: Cake4,
		name: 'Dry Cake',
		price: '850.00',
		liked: false,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		preferences: ['Eggless'],
	},
	{
		restaurantID: '1',
		image: Cake5,
		name: 'Doraemon Cake',
		price: '350.00',
		liked: false,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		preferences: ['Eggless'],
	},
	{
		restaurantID: '1',
		image: Cake6,
		name: 'Dry Fruit Cake',
		price: '850.00',
		liked: false,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		preferences: ['Eggless'],
	},
	{
		restaurantID: '1',
		image: Cake7,
		name: 'Batman Cake',
		price: '1600.00',
		liked: false,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		preferences: ['Eggless'],
	},
	{
		restaurantID: '1',
		image: Cake8,
		name: 'Red Velvet Cake',
		price: '550.00',
		liked: false,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		preferences: ['Eggless'],
	},
];
