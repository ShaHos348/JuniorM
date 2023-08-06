import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ReportService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	/**
	 * Call to backend for inserting report.
	 *
	 * @param data report info to be logged
	 * @returns confirmation of insertion
	 */
	logReport(data: any) {
		return this.httpClient.post(this.url + '/report/log', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}

	/**
	 * Call to backend for getting shift report.
	 *
	 * @param data date to get report from
	 * @returns report
	 */
	dailyReport(data: any) {
		return this.httpClient.get(
			this.url + '/report/daily/' + data.date + '&' + data.shift,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for getting reports for month.
	 *
	 * @param data month and year to get report for
	 * @returns report for month
	 */
	monthlyReport(data: any) {
		return this.httpClient.get(
			this.url + '/report/monthly/' + data.year + '&' + data.month,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	/**
	 * Call to backend for updating report.
	 *
	 * @param data report info to be updated
	 * @returns confirmation of updating
	 */
	updateReport(data: any) {
		return this.httpClient.post(this.url + '/report/update', data, {
			withCredentials: true,
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
		});
	}
}
