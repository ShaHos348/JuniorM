import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { ReportService } from 'src/app/services/report.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

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
		let doc = new jsPDF('p', 'px', 'letter');

		const div = document.getElementById('main-table') as HTMLElement;

		doc.html(div, {
			html2canvas: {
				scale: 0.9,
			},
			x: 15,
			filename: 'Monthly Report Worksheet',
			callback: function (doc) {
				doc.output('dataurlnewwindow');
			},
		});
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
