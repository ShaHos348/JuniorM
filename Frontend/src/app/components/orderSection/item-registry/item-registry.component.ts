import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-item-registry',
  templateUrl: './item-registry.component.html',
  styleUrls: ['./item-registry.component.scss']
})
export class ItemRegistryComponent implements OnInit {
	responseMessage: any;
	items: any;

	constructor(
		private router: Router,
		private snackbarService: SnackbarService,
		private userService: UserService,
		private orderService: OrderService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['order/registry']);
				this.getItems();
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	register() {
		let barcode = document.getElementById('barcode-input') as HTMLInputElement;
		let name = document.getElementById('name-input') as HTMLInputElement;
		if (barcode.value == "" || name.value == "") {
			this.responseMessage = "Barcode/Name field is empty";
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		let item = {
			barcode: barcode.value,
			name: name.value
		}
		this.orderService.registerItem(item).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				barcode.value = '';
				name.value = '';
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
		this.orderService.getItems().subscribe((response: any) => {
			this.items = response;
			if (this.items.length != 0) {
				itemsTable.style.display = 'table';
			} else {
				itemsTable.style.display = 'none';
			}
		});
	}

	deleteItem() {
		let barcode = document.getElementById('barcode-input') as HTMLInputElement;
		if (barcode.value == '') {
			this.responseMessage = 'Error: Barcode is NOT GIVEN!';
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		let itemBarcode = barcode.value;
		this.orderService.deleteItem(itemBarcode).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				barcode.value = '';
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
