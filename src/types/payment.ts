import { ImageSourcePropType } from 'react-native';

import { CustomBottomSheetProps } from '../components/BottomSheetComponent';

export type CommonTypes = {
	setCustomBottomSheet: (data: CustomBottomSheetProps) => void;
};

export type CardsType = {
	name: string;
	cardType: ImageSourcePropType;
	logo: ImageSourcePropType;
	number: string;
};

export type UPIType = {
	name: string;
	logo: ImageSourcePropType;
	linked: boolean;
};

export type WalletsType = {
	name: string;
	logo: ImageSourcePropType;
	balance: string;
	phoneNumber: string;
	linked: boolean;
};

export type WalletComponentType = {
	item: WalletsType;
	phoneNumber: string;
	setPhoneNumber: (phoneNumber: string) => void;
} & CommonTypes;

export type PaymentsDataType =
	| {
			heading: 'Cards';
			data: CardsType[];
	  }
	| {
			heading: 'UPI';
			data: UPIType[];
	  }
	| {
			heading: 'Wallets';
			data: WalletsType[];
	  };
