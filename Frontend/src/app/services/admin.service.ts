import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	/**
	 * Call to backend for admin login.
	 *
	 * @param data admin login info.
	 * @returns confirmation of login
	 */
	adminLogin(data: any) {
		return this.httpClient.post(this.url + '/adminUser/login', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for business code creation
	 *
	 * @param data code to create.
	 * @returns confirmation of creation
	 */
	createBusinessCode(data: any) {
		return this.httpClient.post(this.url + '/adminUser/createCode', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for business code deletion.
	 *
	 * @param data code to delete.
	 * @returns confirmation of deletion
	 */
	deleteBusinessCode(data: any) {
		return this.httpClient.delete(
			this.url + '/adminUser/deleteCode/' + data.code,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for getting all business codes.
	 *
	 * @returns business codes
	 */
	getBusinessCodes() {
		return this.httpClient.get(this.url + '/adminUser/getCodes', {
			withCredentials: true,
		});
	}

	/**
	 * Call to backend for destroying sessions.
	 *
	 * @param data session id to destroy
	 * @returns confirmation of destruction
	 */
	destorySession(data: any) {
		return this.httpClient.delete(
			this.url + '/adminUser/destroySession/' + data.id,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for getting session ids.
	 *
	 * @returns session ids
	 */
	getSessions() {
		return this.httpClient.get(this.url + '/adminUser/getSessions', {
			withCredentials: true,
		});
	}

	/**
	 * Call to backend for clearing parts of database.
	 * @param data data to be cleared
	 * @returns confirmation of clearing
	 */
	clearDatabase(data: any) {
		return this.httpClient.delete(
			this.url + '/adminUser/clearDatabase/' + data.input,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for checking admin login.
	 *
	 * @returns confirmation of login
	 */
	adminCheckLogin() {
		return this.httpClient.get(this.url + '/adminUser/checkLogin', {
			withCredentials: true,
		});
	}

	/**
	 * Call to backend for logging out admin.
	 *
	 * @returns confirmation of admin logout.
	 */
	adminLogout() {
		return this.httpClient.get(this.url + '/adminUser/logout', {
			withCredentials: true,
		});
	}
}
