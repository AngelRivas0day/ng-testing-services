import {Observable, of} from "rxjs";

export class FakeValueService {


	constructor() {
	}

	getValue(): string {
		return 'fake value';
	}

	setValue(value: string): void {}

	getPromise(): Promise<string> {
		return Promise.resolve('fake value');
	}

	getObservable(): Observable<string> {
		return of('fake value');
	}

}
