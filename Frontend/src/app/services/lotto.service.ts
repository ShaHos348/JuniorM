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

	registerLotto(data: any) {
		return this.httpClient.post(
			this.url + '/lotto/lottoRegistry',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getLottos() {
		return this.httpClient.get(
			this.url + '/lotto/getLottos',
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getSpecificLotto(lottoid: any) {
		return this.httpClient.get(
			this.url + '/lotto/getSpecificLotto/' + lottoid,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	deleteLotto(lottoid: any) {
		return this.httpClient.delete(
			this.url + '/lotto/deleteLotto/' + lottoid,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}
}
