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

	delete(name: any) {
		return this.httpClient.delete(
			this.url + '/order/delete/' + name,
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
}
