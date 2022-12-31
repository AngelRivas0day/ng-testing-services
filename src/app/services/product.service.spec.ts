import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";

fdescribe('ProductService', () => {
	let productService: ProductService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ProductService
			],
			imports: [
				HttpClientTestingModule,
			]
		});
		productService = TestBed.inject(ProductService);
		httpController = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(productService).toBeTruthy();
	});

	describe('Tests for getAllSimple', () => {
		it('should return product list', (doneFn) => {
			const mock: Product[] = [
				{
					id: 12,
					title: 'Mock title',
					price: 1500,
					description: 'Lorem ipsum',
					category: {
						id: 1,
						name: 'Category 1',
					},
					images: ['asd','asd']
				},
			];
			productService.getAllSimple()
				.subscribe(response => {
					expect(response).toEqual(mock);
					expect(response.length).toEqual(1);
					doneFn();
				});

			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
			req.flush(mock);
			httpController.verify();
		});
	});
});
