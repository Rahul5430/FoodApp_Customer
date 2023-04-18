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

export type PaymentCardType<T extends 'Cards'> = {
	heading: T;
	data: CardsType[];
};

export type PaymentUPIType<T extends 'UPI'> = {
	heading: T;
	data: UPIType[];
};

export type PaymentWalletType<T extends 'Wallets'> = {
	heading: T;
	data: WalletsType[];
};

export type PaymentsDataType<T extends 'Cards' | 'UPI' | 'Wallets'> =
	T extends 'Cards'
		? PaymentCardType<T>
		: T extends 'UPI'
		? PaymentUPIType<T>
		: T extends 'Wallets'
		? PaymentWalletType<T>
		: null;
