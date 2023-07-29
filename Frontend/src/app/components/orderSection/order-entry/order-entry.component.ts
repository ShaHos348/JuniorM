import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-order-entry',
	templateUrl: './order-entry.component.html',
	styleUrls: ['./order-entry.component.scss'],
})
export class OrderEntryComponent implements OnInit {
	orderItems: any;
	responseMessage: any;

	barcode: any;
	name: any;
	quantity: any;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private userService: UserService,
		private snackbarService: SnackbarService,
		private orderService: OrderService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['order/entry']);
				this.getOrderList();
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	getItem() {
		let name = document.getElementById('name-input') as HTMLInputElement;
		if ((this.barcode == '')) {
			this.responseMessage = 'Error: Barcode is NOT GIVEN!';
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.orderService.getSpecificItems(this.barcode).subscribe(
			(response: any) => {
				this.name = response.name;
				this.quantity = 1;
			},
			(error) => {
				name.focus();
				this.quantity = 1;
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

	insert() {
		let barcodeInput = document.getElementById('name-input') as HTMLInputElement;
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.addItem();
		let data = {
			barcode: this.barcode,
			name: this.name,
			quantity: this.quantity,
		};
		this.orderService.entry(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.barcode = '';
				this.name = '';
				this.quantity = '';
				barcodeInput.focus();
				this.getOrderList();
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

	delete() {
		let input = document.getElementById('delete-input') as HTMLInputElement;
		if (input.value == '') {
			this.responseMessage = 'Error: Item Barcode is NOT GIVEN!';
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		let itemID = input.value;
		this.orderService.delete(itemID).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				input.value = '';
				this.getOrderList();
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

	getOrderList() {
		let orderTable = document.getElementById('orderTable') as HTMLElement;
		this.orderService.getCurrentList().subscribe((response: any) => {
			this.orderItems = response;
			if (this.orderItems.length != 0) {
				orderTable.style.display = 'table';
			} else {
				orderTable.style.display = 'none';
			}
		});
	}

	newOrder() {
		this.orderService.new().subscribe((response: any) => {
			this.responseMessage = response?.message;
			this.snackbarService.openSnackbar(this.responseMessage, '');
			this.getOrderList();
		});
	}

	addItem() {
		let item = {
			barcode: this.barcode,
			name: this.name
		}
		this.orderService.registerItem(item).subscribe(
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
		if (this.barcode == '' || this.name == '' || this.quantity == '') {
			this.responseMessage = 'Error: Name/Quantity is NOT GIVEN!';
			return false;
		}

		return true;
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
