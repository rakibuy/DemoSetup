import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CountryService {

	constructor(private http: HttpClient) { }

	getCountries() {
		return this.http.get<any>('assets/layout/data/countries.json')
			.toPromise()
			.then(res => res.data as any[])
			.then(data => data);
	}

	getDropdownList() {
		return this.http.get<any>('assets/layout/data/document.json')
			.toPromise()
			.then(res => res.data as any[])
			.then(data => data);
	}
}

