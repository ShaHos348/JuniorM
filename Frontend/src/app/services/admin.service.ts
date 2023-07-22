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
			this.url + '/adminUser/deleteCode/' + data.code,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getBusinessCodes() {
		return this.httpClient.get(this.url + '/adminUser/getCodes', {
			withCredentials: true,
		});
	}

	destorySession(data: any) {
		return this.httpClient.delete(
			this.url + '/adminUser/destroySession/' + data.id,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getSessions() {
		return this.httpClient.get(this.url + '/adminUser/getSessions', {
			withCredentials: true,
		});
	}

	clearDatabase(data: any) {
		return this.httpClient.delete(
			this.url + '/adminUser/clearDatabase/' + data.input,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
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
