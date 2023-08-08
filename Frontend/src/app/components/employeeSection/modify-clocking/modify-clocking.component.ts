import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-modify-clocking',
	templateUrl: './modify-clocking.component.html',
	styleUrls: ['./modify-clocking.component.scss'],
})
export class ModifyClockingComponent implements OnInit {
	clockingInfo: any;
	oldClockingInfo: any;
	responseMessage: any;
	employee: any = {
		sl: null,
		idnum: null,
		clockin: null,
		clockout: null,
		hours: null,
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
				this.router.navigate(['employee/modifyClocking']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	getClockingInfo(input: any) {
		let infoTable = document.getElementById('clocking-table') as HTMLElement;
		if (input.idnum.length != 8 || input.date == "") {
			infoTable.style.display = 'none';
			return;
		}
		this.employeeService.getClocking(input).subscribe(
			(response: any) => {
				this.oldClockingInfo = response;
				this.clockingInfo = this.oldClockingInfo.map((x: any) =>
					Object.assign({}, x)
				);
				if (this.clockingInfo.length != 0) {
					for (let index = 0; index < this.clockingInfo.length; index++) {
						const clockin = this.clockingInfo[index];
						let hour = Number(clockin.clockin.substring(11, 13));
						var AmOrPm = hour >= 12 ? 'PM' : 'AM';
						hour = hour % 12 || 12;
						clockin.clockin =
							clockin.clockin.substring(0, 10) +
							' ' +
							hour.toString().padStart(2, '0') +
							clockin.clockin.substring(13, 16) +
							' ' +
							AmOrPm;

						const clockout = this.clockingInfo[index];
						let hourout = Number(clockout.clockout.substring(11, 13));
						let AmOrPmout = hourout >= 12 ? 'PM' : 'AM';
						hourout = hourout % 12 || 12;
						clockout.clockout =
							clockout.clockout.substring(0, 10) +
							' ' +
							hourout.toString().padStart(2, '0') +
							clockout.clockout.substring(13, 16) +
							' ' +
							AmOrPmout;
					}
					infoTable.style.display = 'table';
				} else {
					infoTable.style.display = 'none';
				}
			},
			(error) => {
				infoTable.style.display = 'none';
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
		let info = this.oldClockingInfo[index];
		this.employee.sl = info.sl;
		this.employee.idnum = info.idnum;
		this.employee.clockin = info.clockin.substring(0, 16);
		this.employee.clockout = info.clockout.substring(0, 16);
		this.employee.hours = info.hours;
		let infoTable = document.getElementById(
			'clocking-table'
		) as HTMLTableElement;
		let updateForm = document.getElementById('updateForm') as HTMLFormElement;
		infoTable.style.display = 'none';
		updateForm.style.display = 'block';
	}

	update(data: any) {
		let input = {
			sl: this.employee.sl,
			clockin: data.clockin,
			clockout: data.clockout,
		};
		this.employeeService.updateClocking(input).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.back();
				let idnum = document.getElementById('id-input') as HTMLInputElement;
				this.getClockingInfo(idnum.value);
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
		let infoTable = document.getElementById(
			'clocking-table'
		) as HTMLTableElement;
		let updateForm = document.getElementById('updateForm') as HTMLFormElement;
		infoTable.style.display = 'table';
		updateForm.style.display = 'none';
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
