import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	/**
	 * Call to backend for signing up business.
	 *
	 * @param data business information for entry
	 * @returns confirmation of business creation
	 */
	signup(data: any) {
		return this.httpClient.post(
			this.url + '/businessUser/businessSignup',
			data,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for logging in business.
	 *
	 * @param data business login info
	 * @returns confirmation of login
	 */
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

	/**
	 * Call to backend for getting business login info.
	 *
	 * @param data business username/email
	 * @returns business login info
	 */
	forgot(data: any) {
		return this.httpClient.post(
			this.url + '/businessUser/businessForgotPassword',
			data,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for getting business info.
	 *
	 * @returns business info
	 */
	getBusinessInfo() {
		return this.httpClient.get(this.url + '/businessUser/businessInfo', {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for updating business info.
	 *
	 * @param data info to be updated
	 * @returns confirmation of updating
	 */
	updateBusinessInfo(data: any) {
		return this.httpClient.patch(this.url + '/businessUser/updateInfo', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for checking business login.
	 *
	 * @returns confirmation of business login.
	 */
	checkLogin() {
		return this.httpClient.get(this.url + '/businessUser/checkLogin', {
			withCredentials: true,
		});
	}

	/**
	 * Call to backend for logging out business.
	 *
	 * @returns confirmation of business logout
	 */
	logout() {
		return this.httpClient.get(this.url + '/businessUser/logout', {
			withCredentials: true,
		});
	}

	/**
	 * Call to backend for logging in manager for business.
	 *
	 * @param data business login info
	 * @returns confirmation of login
	 */
	managerLogin(data: any) {
		return this.httpClient.post(this.url + '/managerUser/managerLogin', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for checking manager login.
	 *
	 * @returns confirmation of manger login.
	 */
	managerCheckLogin() {
		return this.httpClient.get(this.url + '/managerUser/checkLogin', {
			withCredentials: true,
		});
	}

	/**
	 * Call to backend for logging out manager.
	 *
	 * @returns confirmation of manager logout
	 */
	managerLogout() {
		return this.httpClient.get(this.url + '/managerUser/logout', {
			withCredentials: true,
		});
	}
}
