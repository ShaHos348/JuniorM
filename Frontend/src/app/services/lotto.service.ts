import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LottoService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	entry(data: any) {
		return this.httpClient.post(
			this.url + '/lotto/entry',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	lottoActive(data: any) {
		return this.httpClient.get(
			this.url + '/lotto/getlottoactive/' + data.shift + "&" + data.date,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}
}
