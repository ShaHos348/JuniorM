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

	insert(data: any) {
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.orderService.entry(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
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

	checkInputs() {
		let name = document.getElementById('name-input') as HTMLInputElement;
		let quantity = document.getElementById(
			'quantity-input'
		) as HTMLInputElement;
		if (name.value == '' || quantity.value == '') {
			this.responseMessage = 'Error: Name/Quantity is NOT GIVEN!';
			return false;
		}

		return true;
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
