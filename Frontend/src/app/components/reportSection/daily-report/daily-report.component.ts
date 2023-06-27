import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { ReportService } from 'src/app/services/report.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-daily-report',
	templateUrl: './daily-report.component.html',
	styleUrls: ['./daily-report.component.scss'],
})
export class DailyReportComponent implements OnInit {
	responseMessage: any;
	report: any;
	shiftDate: any = String(new Date());
	shift: any;
	companyNames: any[] = [];
	companyAmounts: number[] = [];
	lottoActiveNames: any[] = [];
	lottoActiveBox: number[] = [];
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
				this.router.navigate(['report/daily']);
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
			date: this.shiftDate,
			shift: this.shift,
		};

		let table = document.getElementById('main-table') as HTMLElement;
		let printBtn = document.getElementById('print-btn') as HTMLElement;

		this.reportService.dailyReport(data).subscribe(
			(response: any) => {
				this.report = response;
				if (this.report == null) {
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
		for (let index = 0; index < 10; index++) {
			let element = eval('this.report.company' + (index + 1));
			this.companyNames[index] = element;
			if (this.companyNames[index] == 'undefined') {
				this.companyNames[index] = '';
			}

			element = eval('this.report.comamount' + (index + 1));
			this.companyAmounts[index] = element;

			element = eval('this.report.box' + (index + 1));
			this.lottoActiveBox[index] = element;

			element = eval('this.report.lotto' + (index + 1));
			this.lottoActiveNames[index] = element;
			if (this.lottoActiveNames[index] == 'undefined') {
				this.lottoActiveNames[index] = '';
			}

			element = eval('this.report.shreport' + (index + 1));
			this.shreportAmounts[index] = element;
		}
		this.shreportAmounts[10] = this.report.shreporttotal;
		for (let index = 0; index < this.shiftCountNames.length; index++) {
			let element = eval('this.report.shcount' + (index + 1));
			this.shcountAmounts[index] = element;
		}
		this.shcountAmounts[8] = this.report.paidout;
		this.shcountAmounts[9] = this.report.shcounttotal;
		this.shcountAmounts[10] = this.report.overshoot;
	}

	print() {
		let doc = new jsPDF('p', 'px', 'letter');

		const div = document.getElementById('main-table') as HTMLElement;

		doc.html(div, {
			html2canvas: {
				scale: 0.8,
			},
			x: 20,
			filename: "Daily Report Worksheet",
			callback: function (doc) {
				doc.output('dataurlnewwindow');
			}
		});
	}

	formatDate(dateInput: any) {
		const year = dateInput.substring(0,4);
		const date = new Date();
		const monthNumber = dateInput.substring(5,7);
		date.setMonth(monthNumber - 1);
		const month = date.toLocaleString('en-US', { month: 'long' });
		const day = dateInput.substring(8,10);
		return month + " " + day + ", " + year;
	}

	checkInputs() {
		if (this.shiftDate == null || this.shift == null) {
			this.responseMessage =
				'Error: Shift Date and/or Shift time was no given!';
			return false;
		}

		return true;
	}
}
