import {MasterService} from './master.service';
import {ValueService} from "./value.service";
import {FakeValueService} from "./value-fake.service";
import {TestBed} from "@angular/core/testing";

describe('MasterService', () => {
	let masterService: MasterService;
	let valueServiceSpy: jasmine.SpyObj<ValueService>;

	beforeEach(() => {
		// ? : Create the Jasmine Spy Object referencing all the methods to mock. In this case 'getValue'.
		const spy = jasmine.createSpyObj('ValueService', ['getValue']);
		TestBed.configureTestingModule({
			providers: [
				MasterService,
				// ? : Pass the Jasmine Spy Object as useValue property when resolving ValueService dep.
				{ provide: ValueService, useValue: spy },
			],
		});
		masterService = TestBed.inject(MasterService);
		// ? : Assign the value with a forced type to make it match.
		valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
	});

	it('should be created', () => {
		expect(masterService).toBeTruthy();
	})

	// it('should return "my value" from the real service', () => {
	// 	let valueService: ValueService = new ValueService();
	// 	masterService = new MasterService(valueService);
	// 	expect(masterService.getValue()).toBe('my value');
	// });
	//
	// it('should return "fake value" from a fake service', () => {
	// 	let valueService: FakeValueService = new FakeValueService();
	// 	masterService = new MasterService(valueService as unknown as ValueService);
	// 	expect(masterService.getValue()).toBe('fake value');
	// });
	//
	// it('should return "fake value from obj" from fake object', () => {
	// 	let fake: any = {
	// 		getValue: () => 'fake value from obj'
	// 	};
	// 	masterService = new MasterService(fake as unknown as ValueService);
	// 	expect(masterService.getValue()).toBe('fake value from obj');
	// });

	it('should call getValue from valueService', () => {
		valueServiceSpy.getValue.and.returnValue('fake value');
		expect(masterService.getValue()).toBe('fake value');
		expect(valueServiceSpy.getValue).toHaveBeenCalled();
		expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
	});
});
