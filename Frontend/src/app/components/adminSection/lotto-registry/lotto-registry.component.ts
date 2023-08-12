import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { LottoService } from 'src/app/services/lotto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-lotto-registry',
  templateUrl: './lotto-registry.component.html',
  styleUrls: ['./lotto-registry.component.scss']
})
export class LottoRegistryComponent implements OnInit {
	responseMessage: any;
	items: any;

	barcode: any;
	name: any;
	quantity: any;

	constructor(
		private router: Router,
		private snackbarService: SnackbarService,
		private adminService: AdminService,
		private lottoService: LottoService
	) {}

	ngOnInit(): void {
		this.adminService.adminCheckLogin().subscribe(
			(response: any) => {
				this.router.navigate(['lotto/registry']);
				this.getItems();
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	register() {
		let barcode = document.getElementById("barcode-input") as HTMLInputElement;
		this.barcode = String(this.barcode).substring(0,4);
		if (this.barcode == '' || this.name == '' || this.quantity == '') {
			this.responseMessage = 'A field is empty';
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		let lotto = {
			lottoid: this.barcode,
			name: this.name,
			quantity: this.quantity
		};
		console.log(lotto);
		this.lottoService.registerLotto(lotto).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.barcode = '';
				this.name = '';
				this.quantity = '';
				barcode.focus();
				this.getItems();
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

	getItems() {
		let itemsTable = document.getElementById('items-table') as HTMLElement;
		this.lottoService.getLottos().subscribe((response: any) => {
			this.items = response;
			if (this.items.length != 0) {
				itemsTable.style.display = 'table';
			} else {
				itemsTable.style.display = 'none';
			}
		});
	}

	deleteItem() {
		if (this.barcode == '') {
			this.responseMessage = 'Error: Barcode is NOT GIVEN!';
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.barcode = String(this.barcode).substring(0,4);
		this.lottoService.deleteLotto(this.barcode).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.barcode = '';
				this.getItems();
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

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
