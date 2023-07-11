import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { jsPDF } from 'jspdf';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-employee-info',
	templateUrl: './employee-info.component.html',
	styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
	info: any;
	citizenship: any;
	responseMessage: any;
	inputs: any;
	print: boolean = false;
	employee: any = {
		idnum: null,
		fname: null,
		lname: null,
		street: null,
		city: null,
		state: null,
		zip: null,
		phone: null,
		email: null,
		birth: null,
		ssn: null,
		password: null,
		citizen: null,
		salary: null,
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
				this.router.navigate(['employee/info']);
				this.getInfo();
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	showOptionBox(btn: any) {
		let optionBoxes = document.getElementsByClassName(
			'options'
		) as HTMLCollectionOf<HTMLElement>;
		for (let index = 0; index < optionBoxes.length; index++) {
			const element = optionBoxes[index];
			element.style.display = 'none';
		}
		let input = document.getElementById('id-input') as HTMLButtonElement;
		input.style.display = 'initial';
		if (btn == '') {
			input.style.display = 'none';
			return;
		}
		this.print = false;
		if (btn == 'print-btn') {
			let button = document.getElementById('search-btn') as HTMLButtonElement;
			button.style.display = 'initial';
			this.print = true;
		}
		let button = document.getElementById(btn) as HTMLButtonElement;
		button.style.display = 'initial';
	}

	update() {
		this.inputs = document.getElementsByClassName(
			'input'
		) as HTMLCollectionOf<HTMLInputElement>;

		var data = {
			idnum: this.inputs[0].value,
			name: this.inputs[1].value + ' ' + this.inputs[2].value,
			address:
				this.inputs[3].value +
				', ' +
				this.inputs[4].value +
				', ' +
				this.inputs[5].value +
				', ' +
				this.inputs[6].value,
			phone: this.inputs[8].value,
			email: this.inputs[10].value,
			birth: this.inputs[7].value,
			ssn: this.inputs[9].value,
			password: this.inputs[11].value,
			citizenship: this.citizenship,
			salary: this.inputs[12].value,
		};

		this.employeeService.updateInfo(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				for (var i = 0; i < this.inputs.length; i++) {
					this.inputs[i].value = null;
				}
				this.emptyPrefill();
				this.getInfo();
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

	getInfo() {
		let infoTable = document.getElementById('info-table') as HTMLElement;
		this.employeeService.getEmployees().subscribe((response: any) => {
			this.info = response;
			if (this.info.length != 0) {
				for (let index = 0; index < this.info.length; index++) {
					const element = this.info[index].citizenship;
					if (element == 0) {
						this.info[index].citizenship = 'No';
					} else {
						this.info[index].citizenship = 'Yes';
					}
				}
				infoTable.style.display = 'table';
			} else {
				infoTable.style.display = 'none';
			}
		});
	}

	delete(idnum: any) {
		this.emptyPrefill();
		let employeeId = {
			idnum: idnum,
		};
		this.employeeService.deleteEmployee(employeeId).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.getInfo();
			},
			(error) => {
				console.log(error);
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

	prefill(idnum: any) {
		this.emptyPrefill();
		let index = 1000;
		for (let i = 0; i < this.info.length; i++) {
			const id = this.info[i].idnum;
			if (id == idnum) {
				index = i + 1;
				break;
			}
		}
		if (this.info.length < index) {
			let optionResult = document.getElementById('info-table') as HTMLElement;
			optionResult.style.display = 'table';
			return;
		}
		this.employee.idnum = this.info[index - 1].idnum;
		let name = this.info[index - 1].name.split(' ');
		this.employee.fname = name[0];
		this.employee.lname = name[name.length - 1];
		let address = this.info[index - 1].address.split(', ');
		this.employee.street = address[0];
		this.employee.city = address[1];
		this.employee.state = address[2];
		this.employee.zip = address[3];
		this.employee.phone = this.info[index - 1].phone;
		this.employee.email = this.info[index - 1].email;
		this.employee.birth = this.info[index - 1].birth;
		this.employee.ssn = this.info[index - 1].ssn;
		this.employee.password = this.info[index - 1].password;
		this.employee.citizen = this.info[index - 1].citizenship;
		this.employee.salary = this.info[index - 1].salary;

		if (this.print) {
			let optionResult = document.getElementById('infoPdf') as HTMLElement;
			optionResult.style.display = 'initial';
		} else {
			let optionResult = document.getElementById('updateForm') as HTMLElement;
			optionResult.style.display = 'initial';
		}
	}

	emptyPrefill() {
		let optionResults = document.getElementsByClassName(
			'option-results'
		) as HTMLCollectionOf<HTMLElement>;
		for (let index = 0; index < optionResults.length; index++) {
			const element = optionResults[index];
			element.style.display = 'none';
		}
		this.employee.idnum = null;
		this.employee.fname = null;
		this.employee.lname = null;
		this.employee.street = null;
		this.employee.city = null;
		this.employee.state = null;
		this.employee.zip = null;
		this.employee.phone = null;
		this.employee.email = null;
		this.employee.birth = null;
		this.employee.ssn = null;
		this.employee.password = null;
		this.employee.citizen = null;
		this.employee.salary = null;
	}

	printPDF() {
		let doc = new jsPDF('p', 'px', 'letter');

		const div = document.getElementById('infoPdf') as HTMLElement;

		doc.html(div, {
			html2canvas: {
				scale: 0.5,
			},
			x: 10,
			y: 10,
			filename: 'Employee Information',
			callback: function (doc) {
				doc.output('dataurlnewwindow');
			},
		});
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
