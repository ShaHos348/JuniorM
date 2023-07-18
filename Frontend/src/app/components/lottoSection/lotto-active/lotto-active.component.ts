import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LottoService } from 'src/app/services/lotto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-lotto-active',
	templateUrl: './lotto-active.component.html',
	styleUrls: ['./lotto-active.component.scss'],
})
export class LottoActiveComponent implements OnInit {
	responseMessage: any;
	lottoActives: any;

	shift: any;

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
				this.router.navigate(['lotto/active']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	insert(input: any) {
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		let data = {
			box: input.box,
			lottoid: input.lottoid,
			name: input.name,
			quantity: input.quantity,
			shift: this.shift,
		};
		this.lottoService.entry(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.getLottoActives();
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

	getLottoActives() {
		if (!this.checkShiftInput()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		let data = {
			shift: this.shift,
		};
		let lottoAcTable = document.getElementById('lottoAcTable') as HTMLElement;
		this.lottoService.lottoActive(data).subscribe(
			(response: any) => {
				this.lottoActives = response;
				if (this.lottoActives.length != 0) {
					lottoAcTable.style.display = 'table';
				} else {
					lottoAcTable.style.display = 'none';
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

	checkInputs() {
		let box = document.getElementById('box-input') as HTMLInputElement;
		let lottoid = document.getElementById('lottoid-input') as HTMLInputElement;
		let name = document.getElementById('name-input') as HTMLInputElement;
		let quantity = document.getElementById(
			'quantity-input'
		) as HTMLInputElement;
		if (
			box.value == '' ||
			lottoid.value == '' ||
			name.value == '' ||
			quantity.value == '' ||
			this.shift == null
		) {
			this.responseMessage = 'Error: Some Field is NOT GIVEN!';
			return false;
		}

		return true;
	}

	checkShiftInput() {
		if (this.shift == null) {
			this.responseMessage = 'Error: Shift is NOT GIVEN!';
			return false;
		}

		return true;
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
