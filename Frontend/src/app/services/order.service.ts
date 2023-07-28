import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	entry(data: any) {
		return this.httpClient.post(
			this.url + '/order/entry',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getCurrentList() {
		return this.httpClient.get(
			this.url + '/order/getOrder',
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getAllOrders() {
		return this.httpClient.get(
			this.url + '/order/getOrders',
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	new() {
		return this.httpClient.get(
			this.url + '/order/new',
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	delete(id: any) {
		return this.httpClient.delete(
			this.url + '/order/delete/' + id,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	print(data: any) {
		return this.httpClient.post(
			this.url + '/order/print',
			data,
			{
				withCredentials: true,
				responseType: 'blob',
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	registerItem(data: any) {
		return this.httpClient.post(
			this.url + '/order/itemRegistry',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getItems() {
		return this.httpClient.get(
			this.url + '/order/getItems',
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	deleteItem(barcode: any) {
		return this.httpClient.delete(
			this.url + '/order/deleteItem/' + barcode,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}
}
