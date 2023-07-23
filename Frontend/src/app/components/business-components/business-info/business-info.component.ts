import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnInit {
	info: any;
	citizenship: any;
	responseMessage: any;
	inputs: any;
	business: any = {
		idnum: null,
		name: null,
		address: null,
		city: null,
		state: null,
		zipcode: null,
		country: null,
		phone: null,
		mobile: null,
		email: null,
		username: null,
		password: null,
	};

	constructor(
		private router: Router,
		private snackbarService: SnackbarService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['business/info']);
				this.getInfo();
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	showOptionBox(div: any) {
		let optionBoxes = document.getElementsByClassName(
			'option-results'
		) as HTMLCollectionOf<HTMLElement>;
		for (let index = 0; index < optionBoxes.length; index++) {
			const element = optionBoxes[index];
			element.style.display = 'none';
		}
		this.prefill();
		let section = document.getElementById(div) as HTMLElement;
		section.style.display = 'initial';
		let printBtn = document.getElementById('print-btn') as HTMLElement;
		if (div == 'infoPDF') {
			printBtn.style.display = 'initial';
		} else {
			printBtn.style.display = 'none';
		}
	}

	update() {
		this.inputs = document.getElementsByClassName(
			'input'
		) as HTMLCollectionOf<HTMLInputElement>;

		var data = {
			name: this.inputs[0].value,
			address: this.inputs[1].value,
			city: this.inputs[2].value,
			state: this.inputs[3].value,
			zipcode: this.inputs[4].value,
			country: this.inputs[5].value,
			phone: this.inputs[6].value,
			mobile: this.inputs[7].value,
			email: this.inputs[8].value,
			username: this.inputs[9].value,
			password: this.inputs[10].value
		};

		this.userService.updateBusinessInfo(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.getInfo();
				this.showOptionBox('infoPDF');
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
		let infoTable = document.getElementById('infoPDF') as HTMLElement;
		let updateForm = document.getElementById('updateForm') as HTMLElement;
		this.userService.getBusinessInfo().subscribe((response: any) => {
			this.info = response;
			this.prefill();
			if (this.info.length != 0) {
				updateForm.style.display = 'none';
				infoTable.style.display = 'table';
			} else {
				infoTable.style.display = 'none';
				updateForm.style.display = 'block';
			}
		});
	}

	prefill() {
		this.business.idnum = this.info.idnum;
		this.business.name = this.info.name;
		this.business.address = this.info.address;
		this.business.city = this.info.city;
		this.business.state = this.info.state;
		this.business.zipcode = this.info.zipcode;
		this.business.country = this.info.country;
		this.business.phone = this.info.phone;
		this.business.mobile = this.info.mobile;
		this.business.email = this.info.email;
		this.business.username = this.info.username;
		this.business.password = this.info.password;
	}

	printPDF() {
		let docDefinition = {
			content: [
				{
					text: 'Business Information',
					style: 'header',
				},
				{
					text: "Id: " + this.business.idnum,
					style: 'info',
				},
				{
					text: "Name: " + this.business.name,
					style: 'info',
				},
				{
					text: "Address: " + this.business.address,
					style: 'info',
				},
				{
					text: this.business.city + ", " + this.business.state + " " + this.business.zipcode + " " + this.business.country,
					style: 'info',
				},
				{
					text: "Phone: " + this.business.phone,
					style: 'info',
				},
				{
					text: "Mobile: " + this.business.mobile,
					style: 'info',
				},
				{
					text: "Email: " + this.business.email,
					style: 'info',
				},
				{
					text: "Username: " + this.business.username,
					style: 'info',
				},
				{
					text: "Password: " + this.business.password,
					style: 'info',
				}
			],
			styles: {
				header: {
					bold: true,
					alignment: 'center',
					decoration: 'underline',
					fontSize: 20,
					color: 'blue',
					margin: [0, 15, 0, 15],
				},
				info: {
					alignment: 'left',
					fontSize: 15,
					color: 'black',
					margin: [0, 5, 0, 0],
				},
			},
		};

		pdfMake.createPdf(docDefinition).open();
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
