import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-employee-signup',
	templateUrl: './employee-signup.component.html',
	styleUrls: ['./employee-signup.component.scss'],
})
export class EmployeeSignupComponent implements OnInit {
	responseMessage: any;
	inputs: any;
	citizenship: any;
	id: any;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private userService: UserService,
		private snackbarService: SnackbarService,
		private employeeService: EmployeeService
	) {}

	ngOnInit(): void {
		this.userService.managerCheckLogin().subscribe(
			(response: any) => {
				this.router.navigate(['employee/signup']);
			},
			(error) => {
				this.router.navigate(['home']);
			}
		);
	}

	signUp() {
		this.inputs = document.getElementsByClassName(
			'input'
		) as HTMLCollectionOf<HTMLInputElement>;

		var data = {
			name: this.inputs[0].value + ' ' + this.inputs[1].value,
			address:
				this.inputs[2].value +
				', ' +
				this.inputs[3].value +
				', ' +
				this.inputs[4].value +
				' ' +
				this.inputs[5].value,
			phone: this.inputs[7].value,
			email: this.inputs[9].value,
			birth: this.inputs[6].value,
			ssn: this.inputs[8].value,
			password: this.inputs[10].value,
			citizenship: this.citizenship,
			salary: this.inputs[11].value,
		};

		this.employeeService.signup(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.id = response?.idnum;
				let idLabel = document.getElementById('id') as HTMLLabelElement;
				idLabel.style.display = "initial";
				for (var i = 0; i < this.inputs.length; i++) {
					this.inputs[i].value = null;
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

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
