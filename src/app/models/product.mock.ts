import {Product} from "./product.model";
import {faker} from '@faker-js/faker';

export const generateOneProduct = (): Product => ({
	id: +faker.datatype.uuid(),
	title: faker.commerce.productName(),
	price: +faker.random.numeric(4),
	description: faker.commerce.productDescription(),
	category: {
		id: +faker.datatype.uuid(),
		name: faker.commerce.department(),
	},
	images: [
		faker.image.imageUrl(),
		faker.image.imageUrl(),
	]
});

export const generateManyProduct = (limit = 10): Product[] => {
	const products: Product[] = [];
	for (let i = 0; i < limit; i++)
		products.push(generateOneProduct());
	return [...products];
}
