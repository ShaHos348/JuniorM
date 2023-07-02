import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	signup(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/employeeSignup',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	lookup(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/employeeClockingLookup',
			data,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	clocker(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/employeeClocking',
			data,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	sendMessage(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/employeeSendMessage',
			data,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getMessages(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/employeeGetMessages',
			data,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getEmployees() {
		return this.httpClient.get(
			this.url + '/employeeUser/getEmployees',
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	updateInfo(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/employeeUpdateInfo',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	deleteEmployee(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/deleteEmployee',
			data
		);
	}
}
