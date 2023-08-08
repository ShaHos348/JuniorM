import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	/**
	 * Call to backend for employee entry.
	 *
	 * @param data employee info
	 * @returns confirmation of employee registration
	 */
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

	/**
	 * Call to backend for employee clocking lookup.
	 *
	 * @param data employee id
	 * @returns if employee needs to clockin or clockout
	 */
	lookup(data: any) {
		return this.httpClient.get(
			this.url +
				'/employeeUser/employeeClockingLookup/' +
				data.idnum +
				'&' +
				data.password,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for employee clocking.
	 *
	 * @param data employee id and clocking action
	 * @returns confirmation of clocking
	 */
	clocker(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/employeeClocking',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for getting times employee clocked in.
	 *
	 * @param data employee id
	 * @returns employee clockings
	 */
	getClocking(data: any) {
		return this.httpClient.get(
			this.url + '/employeeUser/getEmployeeClocking/' + data.idnum + "&" + data.date,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for updating employee clocking
	 *
	 * @param data new clocking times for employee clockin
	 * @returns confirmation of updating
	 */
	updateClocking(data: any) {
		return this.httpClient.patch(
			this.url + '/employeeUser/updateClocking',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for sending employee messages.
	 *
	 * @param data message to be sent
	 * @returns confirmation of sending
	 */
	sendMessage(data: any) {
		return this.httpClient.post(
			this.url + '/employeeUser/employeeSendMessage',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for getting employee messages
	 *
	 * @param data employee id for messages
	 * @returns messages for employee
	 */
	getMessages(data: any) {
		return this.httpClient.get(
			this.url + '/employeeUser/employeeGetMessages/' + data.idnum,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for getting past employee messages.
	 *
	 * @param data employee id for messages to get
	 * @returns all messages for employee
	 */
	getPrevMessages(data: any) {
		return this.httpClient.get(
			this.url + '/employeeUser/employeeGetPrevMessages/' + data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for delting employee message
	 *
	 * @param data message to delete
	 * @returns confirmation of deletion
	 */
	deleteMessages(data: any) {
		return this.httpClient.delete(
			this.url + '/employeeUser/deleteMessages/' + data.slno,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for getting employees in business.
	 *
	 * @returns all employees for business
	 */
	getEmployees() {
		return this.httpClient.get(this.url + '/employeeUser/getEmployees', {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting employee pay.
	 *
	 * @param date starting date to get weekly pay from
	 * @returns all employee clockins from date
	 */
	getEmployeePay(date: any) {
		return this.httpClient.get(this.url + '/employeeUser/employeePay/' + date, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for updating employee info.
	 *
	 * @param data employee info
	 * @returns confirmation of updating
	 */
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

	/**
	 * Call to backend for employee deletion.
	 *
	 * @param data employee id
	 * @returns confirmation of deletion
	 */
	deleteEmployee(data: any) {
		return this.httpClient.delete(
			this.url + '/employeeUser/deleteEmployee/' + data.idnum,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}
}
