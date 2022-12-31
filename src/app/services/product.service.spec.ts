import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CreateProductDTO, Product, UpdateProductDTO} from "../models/product.model";
import {environment} from "../../environments/environment";
import {generateManyProduct, generateOneProduct} from "../models/product.mock";
import {HTTP_INTERCEPTORS, HttpStatusCode} from "@angular/common/http";
import {TokenInterceptor} from "../interceptors/token.interceptor";
import {TokenService} from "./token.service";

describe('ProductService', () => {
	let productService: ProductService;
	let httpController: HttpTestingController;
	let tokenService: TokenService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ProductService,
				TokenService,
				{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
			],
			imports: [
				HttpClientTestingModule,
			],
		});
		productService = TestBed.inject(ProductService);
		httpController = TestBed.inject(HttpTestingController);
		tokenService = TestBed.inject(TokenService);
	});

	afterEach(() => {
		httpController.verify();
	});

	it('should be created', () => {
		expect(productService).toBeTruthy();
	});

	describe('Tests for getAllSimple', () => {
		it('should return product list', (doneFn) => {
			const mock: Product[] = generateManyProduct(2);
			spyOn(tokenService, 'getToken').and.returnValue('123token123');
			productService.getAllSimple()
				.subscribe(response => {
					expect(response).toEqual(mock);
					expect(response.length).toEqual(2);
					doneFn();
				});

			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
			expect(req.request.headers.get('Authorization')).toEqual('Bearer 123token123');
			req.flush(mock);
		});
	});

	describe('Tests for getAll', () => {
		it('should return product list', (doneFn) => {
			const mock: Product[] = generateManyProduct(3);
			productService.getAll()
				.subscribe(response => {
					expect(response.length).toEqual(3);
					doneFn();
				});
			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
			req.flush(mock);
		});

		it('should return a product list with taxes', (doneFn) => {
			const mock: Product[] = [
				{
					...generateOneProduct(),
					price: 100, // 19
				},
				{
					...generateOneProduct(),
					price: 200, // 38
				},
				{
					...generateOneProduct(),
					price: 0, // 0
				},
				{
					...generateOneProduct(),
					price: -100, // 0
				},
			];
			productService.getAll()
				.subscribe(response => {
					expect(response[0].taxes).toEqual(19);
					expect(response[1].taxes).toEqual(38);
					expect(response[2].taxes).toEqual(0);
					expect(response[3].taxes).toEqual(0);
					expect(response.length).toEqual(4);
					doneFn();
				});
			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
			req.flush(mock);
		});

		it('should return product list with limit 10 and offset 2', (doneFn) => {
			const mock: Product[] = generateManyProduct(3);
			const limit: number = 10;
			const offset: number = 2;
			productService.getAll(limit, offset)
				.subscribe(response => {
					expect(response.length).toEqual(3);
					doneFn();
				});
			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`);
			req.flush(mock);
			const params = req.request.params;
			// ? : Assert params of request
			expect(params.get('limit')).toEqual(limit.toString());
			expect(params.get('offset')).toEqual(offset.toString());
		});
	});

	describe('Tests for create', () => {
		it('should return a new product', (doneFn) => {
			const mock: Product = generateOneProduct();
			const dto: CreateProductDTO = {
				title: 'new product',
				price: 100,
				images: ['img-src'],
				description: 'Lorem ipsum dolor sit amet',
				categoryId: 5,
			};

			productService.create({...dto})
				.subscribe(response => {
					expect(response).toEqual(mock);
					doneFn();
				});

			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products`);
			req.flush(mock);
			expect(req.request.body).toEqual(dto);
			expect(req.request.method).toBe('POST');
		});
	});

	describe('Tests for getOne', () => {
		it('should return a product', (doneFn) => {
			const mock: Product = generateOneProduct();
			const id: string = '5';
			productService.getOne(id)
				.subscribe(response => {
					expect(response).toEqual(mock);
					doneFn();
				});

			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
			req.flush(mock);
			expect(req.request.method).toEqual('GET');
		});

		it('should return the right msg when status code equals 404', (doneFn) => {
			const id: string = '5';
			const errorMsg = '404 message';
			const errorMock = {
				status: HttpStatusCode.NotFound,
				statusText: errorMsg,
			};
			productService.getOne(id)
				.subscribe({
					error: error => {
						expect(error).toEqual('El producto no existe');
						doneFn();
					},
				});

			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
			req.flush(errorMsg, errorMock);
			expect(req.request.method).toEqual('GET');
		});
	});

	describe('Tests for update', () => {
		it('should return a updated product', (doneFn) => {
			const mock: Product = generateOneProduct();
			const id: string = '5';
			const dto: UpdateProductDTO = {
				title: 'new product',
				price: 100,
			};
			productService.update(id, {...dto})
				.subscribe(response => {
					expect(response).toEqual(mock);
					doneFn();
				});

			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
			req.flush(mock);
			expect(req.request.body).toEqual(dto);
			expect(req.request.method).toEqual('PUT');
		});
	});

	describe('Tests for delete', () => {
		it('should return true for a deleted product', (doneFn) => {
			const id: string = '5';
			productService.delete(id)
				.subscribe((response) => {
					expect(response).toBeTrue();
					doneFn();
				});

			// ? : HTTP Config
			const req = httpController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
			req.flush(true);
			expect(req.request.method).toBe('DELETE');
		});
	});
});
