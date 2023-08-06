import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	/**
	 * Call to backend for entering item into orderlist.
	 *
	 * @param data item to add into orderlist
	 * @returns confirmation of entry
	 */
	entry(data: any) {
		return this.httpClient.post(this.url + '/order/entry', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting current orderlist.
	 *
	 * @returns current orderlist
	 */
	getCurrentList() {
		return this.httpClient.get(this.url + '/order/getOrder', {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting all orderids for business.
	 *
	 * @returns all orderlist ids for business
	 */
	getAllOrders() {
		return this.httpClient.get(this.url + '/order/getOrders', {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for starting new orderlist.
	 *
	 * @returns confirmation of new orderlist
	 */
	new() {
		return this.httpClient.get(this.url + '/order/new', {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for deleting item from orderlist.
	 *
	 * @param id orderlist item to be deleted
	 * @returns confirmation of deletion
	 */
	delete(id: any) {
		return this.httpClient.delete(this.url + '/order/delete/' + id, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for printing orderlist.
	 *
	 * @param data orderid for orderlist
	 * @returns orderlist pdf
	 */
	print(data: any) {
		return this.httpClient.post(this.url + '/order/print', data, {
			withCredentials: true,
			responseType: 'blob',
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for adding item to registry.
	 *
	 * @param data item to add
	 * @returns confirmation of insertion
	 */
	registerItem(data: any) {
		return this.httpClient.post(this.url + '/order/itemRegistry', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting all items in registry.
	 *
	 * @returns all items in registry
	 */
	getItems() {
		return this.httpClient.get(this.url + '/order/getItems', {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting specific item.
	 *
	 * @param barcode item to get
	 * @returns item info
	 */
	getSpecificItems(barcode: any) {
		return this.httpClient.get(this.url + '/order/getSpecificItem/' + barcode, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for deleting item from registry.
	 *
	 * @param barcode item to delete
	 * @returns confirmation of deletion
	 */
	deleteItem(barcode: any) {
		return this.httpClient.delete(this.url + '/order/deleteItem/' + barcode, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}
}
