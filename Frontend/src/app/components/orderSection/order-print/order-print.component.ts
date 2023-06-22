import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-order-print',
  templateUrl: './order-print.component.html',
  styleUrls: ['./order-print.component.scss']
})
export class OrderPrintComponent implements OnInit {
	orders: any;
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
				this.router.navigate(['order/print']);
				this.getOrderList();
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	getOrderList() {
		let orderTable = document.getElementById('orderTable') as HTMLElement;
		this.orderService.getAllOrders().subscribe((response: any) => {
			this.orders = response;
			if (this.orders.length != 0) {
				this.orders.forEach((element: { datecompleted: string | null; }) => {
					if (element.datecompleted == null) {
						element.datecompleted = "Currently Open";
					} else {
						element.datecompleted = element.datecompleted.substring(0,10);
					}
				});
				orderTable.style.display = 'table';
			} else {
				orderTable.style.display = 'none';
			}
		});
	}

	print(data: any) {
		data = {
			orderid: data
		}
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.orderService.print(data).subscribe((response: any) => {
			const fileObjectURL = URL.createObjectURL(response);
			window.open(fileObjectURL, '_blank_');
		});
	}

	checkInputs() {
		let orderid = document.getElementById('order-input') as HTMLInputElement;
		if (orderid.value == "") {
			this.responseMessage =
				'Error: Order Id is NOT GIVEN!';
			return false;
		}

		return true;
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
