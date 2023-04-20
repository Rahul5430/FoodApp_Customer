import type { ItemType, PossibleDaysInMonth } from './types';

type Config = {
	numberOfDays?: PossibleDaysInMonth;
	startYear?: number;
	endYear?: number;
};

export function numberOfDaysIn(
	month: number,
	year: number
): PossibleDaysInMonth {
	const monthWith30Days = [4, 6, 9, 11];
	let days: PossibleDaysInMonth = 31;
	if (monthWith30Days.includes(month)) {
		days = 30;
	} else if (month === 2) {
		if (_isLeapYear(year)) {
			days = 29;
		} else {
			days = 28;
		}
	}
	return days;
}

export function getDateData(
	index: 0 | 1 | 2,
	{ numberOfDays = 31, startYear = 1950, endYear = 2050 }: Config = {}
): Array<ItemType> {
	if (index === 0) {
		switch (numberOfDays) {
			case 31:
				return date31Data;
			case 30:
				return date30Data;
			case 29:
				return date29Data;
			case 28:
				return date28Data;
		}
	} else if (index === 1) {
		return monthData;
	} else {
		return _addEmptySlots(getYearArray(startYear, endYear));
	}
}

function _addEmptySlots(array: Array<ItemType>): Array<ItemType> {
	return [
		{ value: -1, text: '', id: '#-1' },
		...array,
		{ value: -1, text: '', id: '#-2' },
	];
}

function _isLeapYear(year: number): boolean {
	// If a year is multiple of 400,
	// then it is a leap year
	if (year % 400 === 0) return true;

	// Else If a year is multiple of 100,
	// then it is not a leap year
	if (year % 100 === 0) return false;

	// Else If a year is multiple of 4,
	// then it is a leap year
	if (year % 4 === 0) return true;
	return false;
}

function _generateArray(limit: number, valueModifier = 0) {
	return Array.from({ length: limit }, (_, i) => ({
		value: i + 1 + valueModifier,
		text: ('0' + (i + 1 + valueModifier)).slice(-2),
		id: `#${i + 1}`,
	}));
}

function getYearArray(startYear: number, endYear: number) {
	const array = [];
	for (let i = startYear; i <= endYear; i++) {
		array.push({ value: i, text: `${i}`, id: `#${i}` });
	}
	return array;
}

function getMonthArray() {
	return [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	].map((month, index) => ({
		value: index,
		text: month.slice(0, 3),
		id: month,
	}));
}

const getDateArray = () => _generateArray(31);

const monthData = _addEmptySlots(getMonthArray());
const tempDateData = getDateArray();
const date31Data = _addEmptySlots(tempDateData);
const date30Data = _addEmptySlots(tempDateData.slice(0, 30));
const date29Data = _addEmptySlots(tempDateData.slice(0, 29));
const date28Data = _addEmptySlots(tempDateData.slice(0, 28));

export function debounce(func: any, wait = 500, immediate?: boolean) {
	// 'private' variable for instance
	// The returned function will be able to reference this due to closure.
	// Each call to the returned function will share this common timer.
	let timeout: any;

	// Calling debounce returns a new anonymous function
	return (...args: any) => {
		// reference the context and args for the setTimeout function
		// const context: any = this;
		// args = arguments;

		// Should the function be called now? If immediate is true
		//   and not already in a timeout then the answer is: Yes
		const callNow = immediate && !timeout;

		// This is the basic debounce behaviour where you can call this
		//   function several times, but it will only execute once
		//   [before or after imposing a delay].
		//   Each time the returned function is called, the timer starts over.
		clearTimeout(timeout);

		// Set the new timeout
		timeout = setTimeout(function () {
			// Inside the timeout function, clear the timeout variable
			// which will let the next execution run when in 'immediate' mode
			timeout = null;

			// Check if the function already ran with the immediate flag
			if (!immediate) {
				// Call the original function with apply
				// apply lets you define the 'this' object as well as the arguments
				//    (both captured before setTimeout)
				func(args);
			}
		}, wait);

		// Immediate mode and no wait timer? Execute the function..
		if (callNow) func(args);
	};
}
