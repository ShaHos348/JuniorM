import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
	url = environment.apiUrl;

	constructor(private httpClient: HttpClient) {}

	logReport(data: any) {
		return this.httpClient.post(
			this.url + '/report/log',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	dailyReport(data: any) {
		return this.httpClient.post(
			this.url + '/report/daily',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}

	monthlyReport(data: any) {
		return this.httpClient.post(
			this.url + '/report/monthly',
			data,
			{
				withCredentials: true,
				headers: new HttpHeaders().set('Content-Type', 'application/json'),
			}
		);
	}
}
