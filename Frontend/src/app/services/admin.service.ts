import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	adminLogin(data: any) {
		return this.httpClient.post(
			this.url + '/adminUser/login',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	createBusinessCode(data: any) {
		return this.httpClient.post(
			this.url + '/adminUser/createCode',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	deleteBusinessCode(data: any) {
		return this.httpClient.delete(
			this.url + '/adminUser/deleteCode/' + data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	adminGetCodes() {
		return this.httpClient.get(this.url + '/adminUser/getCodes', {
			withCredentials: true,
		});
	}

	adminCheckLogin() {
		return this.httpClient.get(this.url + '/adminUser/checkLogin', {
			withCredentials: true,
		});
	}

	adminLogout() {
		return this.httpClient.get(this.url + '/adminUser/logout', {
			withCredentials: true,
		});
	}
}
