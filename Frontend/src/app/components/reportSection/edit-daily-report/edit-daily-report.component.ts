import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { pdfMake } from 'pdfmake/build/vfs_fonts';
import { ReportService } from 'src/app/services/report.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-edit-daily-report',
	templateUrl: './edit-daily-report.component.html',
	styleUrls: ['./edit-daily-report.component.scss'],
})
export class EditDailyReportComponent implements OnInit {
	responseMessage: any;
	report: any;
	shiftDate: any = String(new Date());
	shift: any;
	companyNames: any[] = [];
	companyAmounts: any[] = [];
	lottoActiveNames: any[] = [];
	lottoActiveBox: number[] = [];
	shreportAmounts: number[] = [];
	shcountAmounts: number[] = [];

	payoutTotal: number = 0;
	shiftReportTotal: number = 0;
	shiftCountTotal: number = 0;
	overshoot: number = 0;

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
				this.router.navigate(['report/edit']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}

	getReport() {
		if (!this.checkDateInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}

		var data = {
			date: this.shiftDate,
			shift: this.shift,
		};

		let table = document.getElementById('main-table') as HTMLElement;
		let updateBtn = document.getElementById('update-btn') as HTMLElement;

		this.reportService.dailyReport(data).subscribe(
			(response: any) => {
				this.report = response;
				if (this.report == null) {
					this.responseMessage = 'Error: No Worksheet Found!';
					this.snackbarService.openSnackbar(this.responseMessage, '');
					table.style.display = 'none';
					updateBtn.style.display = 'none';
					return;
				}
				this.parseReport();
				table.style.display = 'table';
				updateBtn.style.display = 'initial';
			},
			(error) => {
				table.style.display = 'none';
				updateBtn.style.display = 'none';
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
		this.shiftReportTotal = this.report.shreporttotal;
		for (let index = 0; index < this.shiftCountNames.length; index++) {
			let element = eval('this.report.shcount' + (index + 1));
			this.shcountAmounts[index] = element;
		}
		this.payoutTotal = this.report.paidout;
		this.shiftCountTotal = this.report.shcounttotal;
		this.overshoot = this.report.overshoot;
	}

	formatDate(dateInput: any) {
		const year = dateInput.substring(0, 4);
		const date = new Date();
		const monthNumber = dateInput.substring(5, 7);
		date.setMonth(monthNumber - 1);
		const month = date.toLocaleString('en-US', { month: 'long' });
		const day = dateInput.substring(8, 10);
		return month + ' ' + day + ', ' + year;
	}

	checkDateInputs() {
		if (this.shiftDate == null || this.shift == null) {
			this.responseMessage =
				'Error: Shift Date and/or Shift time was no given!';
			return false;
		}

		return true;
	}

	calculate(output: string) {
		this.companyAmounts = this.companyAmounts.map((num) => {
			return Number(num);
		});
		this.shreportAmounts = this.shreportAmounts.map((num) => {
			return Number(num);
		});
		this.shcountAmounts = this.shcountAmounts.map((num) => {
			return Number(num);
		});

		this.payoutTotal = this.companyAmounts.reduce((sum, num) => sum + num, 0);
		this.shiftReportTotal = this.shreportAmounts.reduce(
			(sum, num) => sum + num,
			0
		);
		this.shiftCountTotal =
			this.shcountAmounts.reduce((sum, num) => sum + num, 0) + this.payoutTotal;
		this.overshoot = this.shiftCountTotal - this.shiftReportTotal;

		switch (output) {
			case 'payout':
				return this.payoutTotal;
			case 'report':
				return this.shiftReportTotal;
			case 'count':
				return this.shiftCountTotal;
			case 'overshoot':
				return this.overshoot;
			default:
				return 0;
		}
	}

	handleSubmit() {
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}

		this.lottoActiveNames = this.lottoActiveNames.filter((element) => element);
		this.lottoActiveBox = this.lottoActiveBox.filter((element) => element);

		var data = {
			date: this.shiftDate,
			shift: this.shift,
			companyNames: this.companyNames,
			companyAmounts: this.companyAmounts,
			shreportAmounts: this.shreportAmounts,
			shcountAmounts: this.shcountAmounts,
			lottoNames: this.lottoActiveNames,
			lottoBoxes: this.lottoActiveBox,
			payoutTotal: this.payoutTotal,
			shiftReportTotal: this.shiftReportTotal,
			shiftCountTotal: this.shiftCountTotal,
			overshoot: this.overshoot,
		};

		this.reportService.logReport(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
			},
			(error) => {
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

	checkInputs() {
		if (this.shiftDate == null || this.shift == null) {
			this.responseMessage =
				'Error: Shift Date and/or Shift time was no given!';
			return false;
		}

		for (let index = 0; index < 10; index++) {
			let comName = this.companyNames[index];
			let comAmount = this.companyAmounts[index];
			let lottoName = this.lottoActiveNames[index];
			let lottoBox = this.lottoActiveBox[index];
			if (comAmount == 0) {
				comAmount = null;
			}
			if (
				(comName == null && comAmount != null) ||
				(comName != null && comAmount == null) ||
				(lottoName == null && lottoBox != null) ||
				(lottoName != null && lottoBox == null)
			) {
				this.responseMessage =
					'Error: Not all company/lotto names have an amount/box or company/lotto name was not given for an amount/box!';
				return false;
			}
		}

		if (this.shreportAmounts[0] == null || this.shreportAmounts[1] == null) {
			this.responseMessage =
				'Error: Shift report for Grocery Sales and/or Tax was not given!';
			return false;
		}

		return true;
	}
}
