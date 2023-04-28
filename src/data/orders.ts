import BakerLogo1 from '../assets/images/bakerLogos/bakerLogo1.png';
import BakerLogo2 from '../assets/images/bakerLogos/bakerLogo2.png';
import { Order, Restaurant } from '../types/data';

export const restaurantData: Restaurant[] = [
	{
		id: '1',
		name: "Baker's in",
		logo: BakerLogo2,
		rating: '4.0',
		reviews: '27.8K',
	},
	{
		id: '2',
		name: "Baker's in",
		logo: BakerLogo1,
		rating: '4.1',
		reviews: '37.8K',
	},
];

export const ordersData: Order[] = [
	{
		restaurantID: '1',
		items: [
			{
				name: 'Cupcakes',
				quantity: '1',
				type: 'veg',
			},
			{
				name: 'Celebration Cupcakes',
				quantity: '1',
				type: 'veg',
			},
		],
		date: '29 Mar 2023 at 4:14pm',
		amount: '160.00',
		status: 'Delivered',
	},
	{
		restaurantID: '2',
		items: [
			{
				name: 'Ice cream',
				quantity: '2',
				type: 'veg',
			},
			{
				name: 'Vanilla Ice cream',
				quantity: '2',
				type: 'veg',
			},
		],
		date: '21 Mar 2023 at 2:14pm',
		amount: '190.00',
		status: 'Rejected',
	},
	{
		restaurantID: '1',
		items: [
			{
				name: 'Cupcakes',
				quantity: '1',
				type: 'veg',
			},
			{
				name: 'Celebration Cupcakes',
				quantity: '1',
				type: 'veg',
			},
		],
		date: '29 Mar 2023 at 4:14pm',
		amount: '160.00',
		status: 'Delivered',
	},
	{
		restaurantID: '2',
		items: [
			{
				name: 'Ice cream',
				quantity: '2',
				type: 'veg',
			},
			{
				name: 'Vanilla Ice cream',
				quantity: '2',
				type: 'veg',
			},
		],
		date: '21 Mar 2023 at 2:14pm',
		amount: '190.00',
		status: 'Rejected',
	},
];
