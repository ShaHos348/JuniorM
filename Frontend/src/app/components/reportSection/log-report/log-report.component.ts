import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LottoService } from 'src/app/services/lotto.service';
import { ReportService } from 'src/app/services/report.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-log-report',
	templateUrl: './log-report.component.html',
	styleUrls: ['./log-report.component.scss'],
})
export class LogReportComponent implements OnInit {
	responseMessage: any;
	shiftDate: any;
	shift: any;
	companyNames: any[] = [];
	companyAmounts: number[] = [];
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
		private reportService: ReportService,
		private lottoService: LottoService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['report/log']);
				let input = document.getElementById(
					'shreport-amount-input4'
				) as HTMLInputElement;
				input.disabled = true;
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}

	calculate(output: string) {
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

				this.companyNames = [];
				this.companyAmounts = [];
				this.lottoActiveNames = [];
				this.lottoActiveBox = [];
				this.shreportAmounts = [];
				this.shcountAmounts = [];
				this.payoutTotal = 0;
				this.shiftReportTotal = 0;
				this.shiftCountTotal = 0;
				this.overshoot = 0;
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

	focusNext(col: any, i: any) {
		let endInput = document.getElementById(col + (i + 1)) as HTMLInputElement;
		if (i < 9) {
			endInput.focus();
		}
	}

	getLottoActives() {
		if (!this.checkShiftInput()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		let data = {
			shift: this.shift,
			date: this.shiftDate,
		};
		this.lottoService.lottoActive(data).subscribe(
			(response: any) => {
				let lottoActives = response;
				let length = lottoActives.length <= 10 ? lottoActives.length : 10;
				for (let index = 0; index < length; index++) {
					const lotto = lottoActives[index];
					this.lottoActiveNames[index] = lotto.name;
					this.lottoActiveBox[index] = lotto.box;
				}
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
		this.lottoService.getLottoSale(data).subscribe(
			(response: any) => {
				let lottoSale = response;
				if (lottoSale.length != 0) {
					this.shreportAmounts[4] = 0;
					for (let index = 0; index < lottoSale.length; index++) {
						const sale = lottoSale[index];
						this.shreportAmounts[4] += sale.total;
					}
				}
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

	checkShiftInput() {
		if (this.shift == null || this.shiftDate == null) {
			this.responseMessage = 'Error: Shift/Date is NOT GIVEN!';
			return false;
		}
		return true;
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
