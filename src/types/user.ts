import { Region } from 'react-native-maps';

export type Address = {
	id: string;
	label: string;
	address: string;
	floor: string;
	landmark: string;
	coords: Region;
};

export type ChipType =
	| 'All'
	| 'Birthday'
	| 'Engagement'
	| 'Wedding'
	| 'Anniversary';

export type MyDatesDataType = {
	occassion: ChipType;
	data: Array<{ name: string; date: string }>;
};
