import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LottoService } from 'src/app/services/lotto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-lotto-sale',
	templateUrl: './lotto-sale.component.html',
	styleUrls: ['./lotto-sale.component.scss'],
})
export class LottoSaleComponent implements OnInit {
	responseMessage: any;
	boxes: any[] = [];
	numOfBoxes: number = 80;
	shift: any;
	lottoActives: any;
	startAmounts: any;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private userService: UserService,
		private snackbarService: SnackbarService,
		private lottoService: LottoService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['lotto/sale']);
				this.makeBoxesArray();
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	submitLottoSale() {
		if (!this.checkShiftInput()) {
			return;
		}
		let data = {
			shift: this.shift,
			boxes: this.boxes,
		};
		this.lottoService.enterLottoSales(data).subscribe(
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

	retrieveData() {
		if (!this.checkShiftInput()) {
			return;
		}
		this.makeBoxesArray();
		let data = {
			shift: this.shift,
		};
		this.lottoService.lottoActive(data).subscribe(
			(response: any) => {
				this.lottoActives = response;
				this.setLottoActives();
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
				this.startAmounts = response;
				this.setStartEndAmounts();
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

	setLottoActives() {
		this.boxes.forEach((element) => {
			element.active = null;
		});
		for (let index = 0; index < this.lottoActives.length; index++) {
			const lotto = this.lottoActives[index];
			this.boxes[Number(lotto.box) - 1].active += Number(lotto.quantity);
			this.boxes[Number(lotto.box) - 1].value = 300 / Number(lotto.quantity);
		}
	}

	setStartEndAmounts() {
		this.boxes.forEach((element) => {
			element.start = 0;
			element.end = 0;
		});
		for (let index = 0; index < this.startAmounts.length; index++) {
			const lotto = this.startAmounts[index];
			this.boxes[Number(lotto.box) - 1].start = Number(lotto.end);
			this.boxes[Number(lotto.box) - 1].end = Number(lotto.end);
		}
	}

	focusNext(col: any, i: any) {
		let endInput = document.getElementById(col + (i + 1)) as HTMLInputElement;
		if (i < this.numOfBoxes) {
			endInput.focus();
		}
	}

	makeBoxesArray() {
		this.boxes = [];
		for (let index = 0; index < this.numOfBoxes; index++) {
			let singleBox = {
				box: index + 1,
				start: 0,
				end: null,
				active: null,
				value: null,
				sale: 0,
				total: 0,
			};
			this.boxes.push(singleBox);
		}
	}

	calculate(row: any, col: any) {
		switch (col) {
			case 'sale':
				this.boxes[row].sale =
					this.boxes[row].active - this.boxes[row].start + this.boxes[row].end;
				return this.boxes[row].sale;
			case 'total':
				this.boxes[row].total = this.boxes[row].value * this.boxes[row].sale;
				return this.boxes[row].total;
			default:
				return 0;
		}
	}

	checkShiftInput() {
		if (this.shift == null || this.shift == '') {
			this.responseMessage = 'Error: Shift is NOT GIVEN!';
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return false;
		}
		return true;
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
