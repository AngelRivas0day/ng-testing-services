import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {TokenService} from "./token.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Auth} from "../models/auth.model";
import {environment} from "../../environments/environment";

fdescribe('AuthService', () => {
	let authService: AuthService;
	let tokenService: TokenService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
			]
		});
		authService = TestBed.inject(AuthService);
		tokenService = TestBed.inject(TokenService);
		httpController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpController.verify();
	});

	it('should be created', () => {
		expect(authService).toBeTruthy();
	});

	describe('Tests for login', () => {
		it('should return a token', (doneFn) => {
			const mock: Auth = {
				access_token: '123token123',
			};
			authService.login('test@test.com', '123123123')
				.subscribe((data) => {
					expect(data).toEqual(mock);
					doneFn();
				})
			const req = httpController.expectOne(`${environment.API_URL}/api/auth/login`);
			req.flush(mock);
		});

		it('should return and save token', (doneFn) => {
			const mock: Auth = {
				access_token: '123token123',
			};
			spyOn(tokenService, 'saveToken')
				.and.callThrough();
			authService.login('test@test.com', '123123123')
				.subscribe((data) => {
					expect(data).toEqual(mock);
					expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
					expect(tokenService.saveToken).toHaveBeenCalled();
					expect(tokenService.saveToken).toHaveBeenCalledWith(mock.access_token);
					doneFn();
				})
			const req = httpController.expectOne(`${environment.API_URL}/api/auth/login`);
			req.flush(mock);
		});
	});
});
