import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
	selector: 'app-monthly-report',
	templateUrl: './monthly-report.component.html',
	styleUrls: ['./monthly-report.component.scss'],
})
export class MonthlyReportComponent implements OnInit {
	responseMessage: any;
	report: any;
	month: any;
	year: any;
	shreportAmounts: number[] = [];
	shcountAmounts: number[] = [];

	listOfTen = new Array(10);
	shiftReportNames: any[] = [
		'Grocery Sales:',
		'Tax:',
		'EBT:',
		'Lotto Online:',
		'Lotto Inside:',
		'Gasoline:',
		'Money Order:',
		'Check:',
		'Paid In:',
		'Others:',
		'Total:',
	];
	shiftCountNames: any[] = [
		'Cash:',
		'Check:',
		'Credit:',
		'Debit:',
		'Mobile:',
		'EBT:',
		'Lotto Pay Online:',
		'Lotto Pay Inside:',
		'Payout:',
		'Total:',
		'Overshoot:',
	];

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private userService: UserService,
		private snackbarService: SnackbarService,
		private reportService: ReportService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['report/monthly']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}

	handleSubmit() {
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}

		var data = {
			month: this.month,
			year: this.year,
		};

		let table = document.getElementById('main-table') as HTMLElement;
		let printBtn = document.getElementById('print-btn') as HTMLElement;

		this.reportService.monthlyReport(data).subscribe(
			(response: any) => {
				this.report = response;
				if (this.report.length == 0) {
					this.responseMessage = 'Error: No Worksheet Found!';
					this.snackbarService.openSnackbar(this.responseMessage, '');
					return;
				}
				this.parseReport();
				table.style.display = 'table';
				printBtn.style.display = 'initial';
			},
			(error) => {
				table.style.display = 'none';
				printBtn.style.display = 'none';
				if (error.error?.message) {
					this.responseMessage = error.error?.message;
				} else {
					this.responseMessage = GlobalConstants.genericError;
				}
				this.snackbarService.openSnackbar(
					this.responseMessage,
					GlobalConstants.error
				);
			}
		);
	}

	parseReport() {
		this.shreportAmounts = [0,0,0,0,0,0,0,0,0,0,0];
		this.shcountAmounts = [0,0,0,0,0,0,0,0,0,0,0];

		this.report.forEach((item: { shreporttotal: number; paidout: number; shcounttotal: number; overshoot: number; }) => {
			for (let index = 0; index < 10; index++) {
				let element = eval('item.shreport' + (index + 1));
				this.shreportAmounts[index] += Number(element);
			}
			this.shreportAmounts[10] += Number(item.shreporttotal);
			for (let index = 0; index < this.shiftCountNames.length-1; index++) {
				let element = eval('item.shcount' + (index + 1));
				this.shcountAmounts[index] += Number(element);
			}
			this.shcountAmounts[8] += Number(item.paidout);
			this.shcountAmounts[9] += Number(item.shcounttotal);
			this.shcountAmounts[10] += Number(item.overshoot);
		});

	}

	print() {
		let shiftReportRows = [
			['Shift Report', 'Amount']
		];
		let shiftCountRows = [
			['Shift Count', 'Amount']
		];
		for (let i = 0; i < this.listOfTen.length; i +=1) { // i suggest a for-loop since you need both arrays at a time
			shiftReportRows.push([this.shiftReportNames[i], this.shreportAmounts[i]]);
		};
		shiftReportRows.push([this.shiftReportNames[10], this.shreportAmounts[10]]);
		for (let i = 0; i < this.shiftCountNames.length; i++) {
			shiftCountRows.push([this.shiftCountNames[i], this.shcountAmounts[i]]);
		}
		shiftCountRows.pop();
		shiftCountRows.pop();
		shiftCountRows.pop();
		shiftCountRows.push([this.shiftCountNames[this.shiftCountNames.length-3], this.shcountAmounts[this.shiftCountNames.length-3]]);
		shiftCountRows.push([this.shiftCountNames[this.shiftCountNames.length-2], this.shcountAmounts[this.shiftCountNames.length-2]]);
		shiftCountRows.push([this.shiftCountNames[this.shiftCountNames.length-1], this.shcountAmounts[this.shiftCountNames.length-1]]);


		let docDefinition = {
			content: [
				{
					text: 'Monthly Worksheet Report',
					style: 'title',
				},
				{
					text: this.getMonthName(this.month) + " " + this.year + " Monthly Report",
					style: 'header',
				},
				{
					table: {
						headerRows: 1,
						widths: ['*','*'],
						body: [
							[
								[
									{
										table: {
											headerRows: 1,
											widths: ['*', '*'],
											body: shiftReportRows,
										},
									},
								],
							],
							[
								[
									{
										table: {
											headerRows: 1,
											widths: ['*', '*'],
											body: shiftCountRows,
										},
									},
								],
							],
						],
					},
					style: 'table',
				},
			],
			styles: {
				title: {
					bold: true,
					alignment: 'center',
					decoration: 'underline',
					fontSize: 20,
					color: 'blue',
					margin: [0, 15, 0, 15],
				},
				header: {
					alignment: 'center',
					fontSize: 15,
					color: 'black',
					margin: [0, 5, 0, 5],
				},
				table: {
					alignment: 'center',
					fontSize: 10,
					color: 'black',
				}
			},
		};

		pdfMake.createPdf(docDefinition).open();
	}

	getMonthName(monthNumber: number) {
		const date = new Date();
		date.setMonth(monthNumber - 1);

		return date.toLocaleString('en-US', { month: 'long' });
	}

	checkInputs() {
		if (this.month == null || this.year == null) {
			this.responseMessage =
				'Error: Month/Year was no given!';
			return false;
		}

		return true;
	}
}
