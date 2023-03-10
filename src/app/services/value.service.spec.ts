import {ValueService} from './value.service';
import {TestBed} from "@angular/core/testing";

fdescribe('ValueService', () => {
	let service: ValueService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ ValueService ]
		});
		service = TestBed.inject(ValueService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	fdescribe('Tests for getValue', () => {
		it('should return "my value"', () => {
			expect(service.getValue()).toEqual('my value');
		});
	});

	fdescribe('Tests for setValue', () => {
		it('should change the value', () => {
			expect(service.getValue()).toEqual('my value');
			service.setValue('new value');
			expect(service.getValue()).toEqual('new value');
		});
	});

	fdescribe('Tests for getPromise', () => {
		it('should return "promise value" from promise with then', (doneFn) => {
			service.setValue("promise value");
			service.getPromise()
				.then((value: string) => {
					expect(value).toEqual('promise value');
					doneFn();
				});
		});

		it('should return "promise value" from promise with async', async () => {
			service.setValue("promise value");
			let value = await service.getPromise();
			expect(value).toEqual('promise value');
		});
	});
});
