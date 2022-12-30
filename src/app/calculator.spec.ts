import {Calculator} from "./calculator";

describe('Test for calculator', () => {
	it('#multiply should return a nine', () => {
		// ? : AAA
		// ? : Arrange
		// ? : Act
		// ? : Assert
		const calculator = new Calculator();
		const rta = calculator.multitply(3, 3);
		expect(rta).toEqual(9);
	});
	it('#multiply should return a four', () => {
		const calculator = new Calculator();
		const rta = calculator.multitply(2, 2);
		expect(rta).toEqual(4);
	});
	it('#divide should return some numbers', () => {
		const calculator = new Calculator();
		const rta = calculator.divide(2, 2);
		const rta2 = calculator.divide(4, 2);
		expect(rta).toEqual(1);
		expect(rta2).toEqual(2);
	});
});
