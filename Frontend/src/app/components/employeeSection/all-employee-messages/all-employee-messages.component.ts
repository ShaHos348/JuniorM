import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-all-employee-messages',
  templateUrl: './all-employee-messages.component.html',
  styleUrls: ['./all-employee-messages.component.scss']
})
export class AllEmployeeMessagesComponent implements OnInit {
	messages: any;
	responseMessage: any;
	message: any = {
		slno: null,
		date: null,
		idnum: null,
		name: null,
		message: null,
		sender: null
	};

	constructor(
		private router: Router,
		private snackbarService: SnackbarService,
		private userService: UserService,
		private employeeService: EmployeeService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['employee/messages']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	getMessages(idnum: any) {
		let messageTable = document.getElementById('messages-table') as HTMLElement;
		if (idnum.length == 0) {
			messageTable.style.display = 'none';
			return;
		}
		this.employeeService.getPrevMessages(idnum).subscribe(
			(response: any) => {
				this.messages = response;
				if (this.messages.length != 0) {
					for (let index = 0; index < this.messages.length; index++) {
						const date = this.messages[index];
						let hour = Number(date.date.substring(11, 13));
						var AmOrPm = hour >= 12 ? 'PM' : 'AM';
						hour = hour % 12 || 12;
						date.date =
							date.date.substring(0, 10) +
							' ' +
							hour.toString().padStart(2, '0') +
							date.date.substring(13, 16) +
							' ' +
							AmOrPm;
					}
					messageTable.style.display = 'table';
				} else {
					messageTable.style.display = 'none';
				}
			},
			(error) => {
				messageTable.style.display = 'none';
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

	prefill(index: any) {
		let info = this.messages[index];
		this.message.slno = info.slno;
		this.message.date = info.date;
		this.message.idnum = info.idnum;
		this.message.name = info.name;
		this.message.message = info.message;
		this.message.sender = info.sender;
		let infoTable = document.getElementById('messages-table') as HTMLTableElement;
		let updateForm = document.getElementById('deleteForm') as HTMLFormElement;
		infoTable.style.display = 'none';
		updateForm.style.display = "block";
	}

	delete() {
		let input = {
			slno: this.message.slno
		};
		this.employeeService.deleteMessages(input).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.back();
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

	back() {
		this.getMessages("00000000");
		let infoTable = document.getElementById('messages-table') as HTMLTableElement;
		let updateForm = document.getElementById('deleteForm') as HTMLFormElement;
		infoTable.style.display = 'table';
		updateForm.style.display = "none";
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
