import {TestBed} from '@angular/core/testing';

import {MapsService} from './maps.service';

fdescribe('MapsService', () => {
	let service: MapsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MapsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('Tests for getCurrentPosition', () => {
		it('should save the center position', () => {
			spyOn(navigator.geolocation, 'getCurrentPosition').and
				.callFake((successCallback) => {
					const mockResponse = {
						coords: {
							accuracy: 0,
							altitude: 123,
							altitudeAccuracy: 0,
							heading: 0,
							latitude: 123,
							longitude: 123,
							speed: 0,
						},
						timestamp: 123123,
					}
					successCallback(mockResponse);
				});
			service.getCurrentPosition();
			expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
			expect(service.center.lng).toEqual(123);
			expect(service.center.lat).toEqual(123);
		});
	});
});
