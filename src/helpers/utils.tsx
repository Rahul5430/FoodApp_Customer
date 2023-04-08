import { Dimensions, Platform } from 'react-native';

export const isIOS = () => {
	return Platform.OS === 'ios';
};

export const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

export const validatePassword = (password: string) => {
	const re = /^.{8,}$/;
	return re.test(password);
};

export const validatePhone = (phone: string) => {
	const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
	return re.test(phone);
};

export const validateBankAccountNumber = (accountNumber: string) => {
	const regex = new RegExp(/^[0-9]{9,18}$/);

	if (accountNumber === null) {
		return false;
	}

	if (regex.test(accountNumber) === true) {
		return true;
	} else {
		return false;
	}
};

export const validateIFSCCode = (ifscCode: string) => {
	const regex = new RegExp(/^[A-Za-z]{4}\d{7}$/);

	if (ifscCode === null) {
		return false;
	}

	if (regex.test(ifscCode) === true) {
		return true;
	} else {
		return false;
	}
};

export const validateUPIID = (upiID: string) => {
	const regex = new RegExp(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/);

	if (upiID === null) {
		return false;
	}

	if (regex.test(upiID) === true) {
		return true;
	} else {
		return false;
	}
};

export const generateOTP = (length = 4) => {
	const digits = '0123456789';
	let OTP = '';
	for (let i = 0; i < length; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
};

export const isIphoneX = () => {
	const dimen = Dimensions.get('window');
	return (
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTV &&
		(dimen.height === 780 ||
			dimen.width === 780 ||
			dimen.height === 812 ||
			dimen.width === 812 ||
			dimen.height === 844 ||
			dimen.width === 844 ||
			dimen.height === 896 ||
			dimen.width === 896 ||
			dimen.height === 926 ||
			dimen.width === 926)
	);
};
