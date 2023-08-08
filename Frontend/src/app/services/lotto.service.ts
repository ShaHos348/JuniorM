import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LottoService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	/**
	 * Call to backend for lotto active entry.
	 *
	 * @param data lotto to be activated
	 * @returns confirmation of entry
	 */
	entry(data: any) {
		return this.httpClient.post(this.url + '/lotto/entry', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting lotto actives.
	 *
	 * @param data shift to get lotto active for
	 * @returns lotto actives
	 */
	lottoActive(data: any) {
		return this.httpClient.get(
			this.url + '/lotto/getlottoactive/' + data.shift + '&' + data.date,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for adding lotto to registry.
	 *
	 * @param data lotto to add
	 * @returns confirmation of insertion
	 */
	registerLotto(data: any) {
		return this.httpClient.post(this.url + '/lotto/lottoRegistry', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting all lottos in registry.
	 *
	 * @returns all lottos
	 */
	getLottos() {
		return this.httpClient.get(this.url + '/lotto/getLottos', {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting info of spesific lotto.
	 *
	 * @param lottoid spesific lotto id
	 * @returns specific lotto
	 */
	getSpecificLotto(lottoid: any) {
		return this.httpClient.get(
			this.url + '/lotto/getSpecificLotto/' + lottoid,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for delting lotto.
	 *
	 * @param lottoid lotto to delete
	 * @returns confirmation of deletion
	 */
	deleteLotto(lottoid: any) {
		return this.httpClient.delete(this.url + '/lotto/deleteLotto/' + lottoid, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for inserting lotto sales.
	 *
	 * @param sale array of lotto sales to enter
	 * @returns confirmation of insertion
	 */
	enterLottoSales(sale: any) {
		return this.httpClient.post(this.url + '/lotto/lottoSaleEntry', sale, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting lotto sales.
	 *
	 * @param data shift to get lotto sale for
	 * @returns lotto sales for shift
	 */
	getLottoSale(data: any) {
		return this.httpClient.get(
			this.url + '/lotto/getLottoSale/' + data.shift + '&' + data.date + '&' + data.prev,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}
}
