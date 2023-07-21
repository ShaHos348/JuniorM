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
		return this.httpClient.get(
			this.url + '/employeeUser/employeeClockingLookup/' + data.idnum + "&" + data.password,
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

	getClocking(data: any) {
		return this.httpClient.get(
			this.url + '/employeeUser/getEmployeeClocking/' + data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	updateClocking(data: any) {
		return this.httpClient.patch(
			this.url + '/employeeUser/updateClocking',
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
		return this.httpClient.get(
			this.url + '/employeeUser/employeeGetMessages/' + data.idnum,
			{
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	getPrevMessages(data: any) {
		return this.httpClient.get(
			this.url + '/employeeUser/employeeGetPrevMessages/' + data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	deleteMessages(data: any) {
		return this.httpClient.delete(
			this.url + '/employeeUser/deleteMessages/' + data.slno
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

	getEmployeePay(date: any) {
		return this.httpClient.get(
			this.url + '/employeeUser/employeePay/' + date,
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
		return this.httpClient.delete(
			this.url + '/employeeUser/deleteEmployee/' + data.idnum
		);
	}
}
