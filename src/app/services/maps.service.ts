import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MapsService {

	center: { lat: number, lng: number } = { lat: 0, lng: 0 };

	constructor() {
	}

	getCurrentPosition(): void {
		navigator.geolocation.getCurrentPosition((response) => {
			const { latitude, longitude } = response.coords;
			this.center = { lat: latitude, lng: longitude };
		});
	}

}
