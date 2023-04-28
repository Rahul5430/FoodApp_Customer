import AmazonPeLogo from '../assets/images/logos/amazonPayLogo.png';
import MasterCardLogo from '../assets/images/logos/mastercardLogo.png';
import MasterCardText from '../assets/images/logos/mastercardText.png';
import PaytmLogo from '../assets/images/logos/paytmLogo.png';
import PhonePeLogo from '../assets/images/logos/phonpeLogo.png';
import VisaLogo from '../assets/images/logos/visaLogo.png';
import VisaText from '../assets/images/logos/visaText.png';
import { CardsType, UPIType, WalletsType } from '../types/payment';
import { Address, MyDatesDataType } from '../types/user';

export const addressData: Address[] = [
	{
		id: 'Home-1',
		label: 'Home',
		address:
			'XEAM Tower, E-202, Sector 74 A, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055',
		floor: '',
		landmark: '',
		coords: {
			latitude: 30.709597189331838,
			longitude: 76.68947006872848,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		},
	},
	{
		id: 'Work-1',
		label: 'Work',
		address:
			'XEAM Tower, E-202, Sector 74 A, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055',
		floor: '',
		landmark: '',
		coords: {
			latitude: 30.709597189331838,
			longitude: 76.68947006872848,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		},
	},
	{
		id: 'Home-2',
		label: 'Home',
		address:
			'XEAM Tower, E-202, Sector 74 A, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055',
		floor: '',
		landmark: '',
		coords: {
			latitude: 30.709597189331838,
			longitude: 76.68947006872848,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		},
	},
	{
		id: 'Work-2',
		label: 'Work',
		address:
			'XEAM Tower, E-202, Sector 74 A, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055',
		floor: '',
		landmark: '',
		coords: {
			latitude: 30.709597189331838,
			longitude: 76.68947006872848,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		},
	},
	{
		id: 'Other-1',
		label: 'Club',
		address:
			'XEAM Tower, E-202, Sector 74 A, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055',
		floor: '',
		landmark: '',
		coords: {
			latitude: 30.709597189331838,
			longitude: 76.68947006872848,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		},
	},
	{
		id: 'Home-3',
		label: 'Home',
		address:
			'XEAM Tower, E-202, Sector 74 A, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055',
		floor: '',
		landmark: '',
		coords: {
			latitude: 30.709597189331838,
			longitude: 76.68947006872848,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		},
	},
	{
		id: 'Work-3',
		label: 'Work',
		address:
			'XEAM Tower, E-202, Sector 74 A, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055',
		floor: '',
		landmark: '',
		coords: {
			latitude: 30.709597189331838,
			longitude: 76.68947006872848,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		},
	},
	{
		id: 'Other-2',
		label: 'School',
		address:
			'XEAM Tower, E-202, Sector 74 A, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, 160055',
		floor: '',
		landmark: '',
		coords: {
			latitude: 30.709597189331838,
			longitude: 76.68947006872848,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		},
	},
];

export const myDatesData: MyDatesDataType[] = [
	{
		occassion: 'Birthday',
		data: [
			{
				name: 'Manthan',
				date: 'Turns 23!',
			},
			{
				name: 'Rahul',
				date: 'Turns 21!',
			},
		],
	},
	{
		occassion: 'Engagement',
		data: [
			{
				name: 'Manthan',
				date: '11/02 - Turns 24!',
			},
		],
	},
	{
		occassion: 'Wedding',
		data: [
			{
				name: 'Manthan',
				date: '11/02 - Turns 24!',
			},
		],
	},
	{
		occassion: 'Anniversary',
		data: [
			{
				name: 'Manthan',
				date: '11/02 - Turns 24!',
			},
		],
	},
];

export const userCards: CardsType[] = [
	{
		name: 'Visa',
		cardType: VisaText,
		logo: VisaLogo,
		number: '1234567891232345',
	},
	{
		name: 'MasterCard',
		cardType: MasterCardText,
		logo: MasterCardLogo,
		number: '1234567891232345',
	},
];
export const userUPIs: UPIType[] = [
	{
		name: 'Paytm UPI',
		logo: PaytmLogo,
		linked: true,
	},
	{
		name: 'Phonepe',
		logo: PhonePeLogo,
		linked: true,
	},
];
export const userWallets: WalletsType[] = [
	{
		name: 'Phonepe',
		logo: PhonePeLogo,
		balance: '',
		phoneNumber: '',
		linked: false,
	},
	{
		name: 'Paytm',
		logo: PaytmLogo,
		balance: '1500.60',
		phoneNumber: '9889290880',
		linked: true,
	},
	{
		name: 'Amazon Pay',
		logo: AmazonPeLogo,
		balance: '',
		phoneNumber: '',
		linked: false,
	},
];
