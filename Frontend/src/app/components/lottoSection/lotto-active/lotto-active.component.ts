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

	inputs = {
		box: '',
		lottoid: '',
		name: '',
		quantity: '',
		shift: '',
	};

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

	insert() {
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.addLotto();
		this.lottoService.entry(this.inputs).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.getLottoActives();
				this.emptyInputs();
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

	getLottoInfo() {
		let name = document.getElementById('name-input') as HTMLInputElement;
		if ((this.inputs.lottoid == '')) {
			this.responseMessage = 'Error: LottoId is NOT GIVEN!';
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.lottoService.getSpecificLotto(this.inputs.lottoid).subscribe(
			(response: any) => {
				this.inputs.name = response.name;
				this.inputs.quantity = response.quantity;
			},
			(error) => {
				name.focus();
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

	addLotto() {
		this.lottoService.registerLotto(this.inputs).subscribe(
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

	getLottoActives() {
		if (!this.checkShiftInput()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		let data = {
			shift: this.inputs.shift,
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

	emptyInputs() {
		this.inputs.box = '';
		this.inputs.lottoid = '';
		this.inputs.name = '';
		this.inputs.quantity = '';
		this.inputs.shift = '';
	}

	checkInputs() {
		if (
			this.inputs.box == '' ||
			this.inputs.lottoid == '' ||
			this.inputs.name == '' ||
			this.inputs.quantity == '' ||
			this.inputs.shift == null
		) {
			this.responseMessage = 'Error: Some Field is NOT GIVEN!';
			return false;
		}

		return true;
	}

	checkShiftInput() {
		if (this.inputs.shift == null) {
			this.responseMessage = 'Error: Shift is NOT GIVEN!';
			return false;
		}

		return true;
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
