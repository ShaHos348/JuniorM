import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	signup(data: any) {
		return this.httpClient.post(
			this.url + '/businessUser/businessSignup',
			data,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	login(data: any) {
		return this.httpClient.post(
			this.url + '/businessUser/businessLogin',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	forgot(data: any) {
		return this.httpClient.post(
			this.url + '/businessUser/businessForgotPassword',
			data,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getBusinessInfo() {
		return this.httpClient.get(
			this.url + '/businessUser/businessInfo',
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	updateBusinessInfo(data: any) {
		return this.httpClient.patch(
			this.url + '/businessUser/updateInfo',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	checkLogin() {
		return this.httpClient.get(this.url + '/businessUser/checkLogin', {
			withCredentials: true,
		});
	}

	logout() {
		return this.httpClient.get(this.url + '/businessUser/logout', {
			withCredentials: true,
		});
	}

	managerLogin(data: any) {
		return this.httpClient.post(
			this.url + '/managerUser/managerLogin',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	managerCheckLogin() {
		return this.httpClient.get(this.url + '/managerUser/checkLogin', {
			withCredentials: true,
		});
	}

	managerLogout() {
		return this.httpClient.get(this.url + '/managerUser/logout', {
			withCredentials: true,
		});
	}
}
