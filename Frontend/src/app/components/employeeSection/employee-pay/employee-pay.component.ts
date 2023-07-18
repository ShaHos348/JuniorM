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
	selector: 'app-employee-pay',
	templateUrl: './employee-pay.component.html',
	styleUrls: ['./employee-pay.component.scss'],
})
export class EmployeePayComponent implements OnInit {
	employeeData: any[] = [];
	res: any;
	responseMessage: any;

	constructor(
		private router: Router,
		private snackbarService: SnackbarService,
		private userService: UserService,
		private employeeService: EmployeeService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['employee/pay']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	getData(date: any) {
		let messageTable = document.getElementById('data-table') as HTMLElement;
		let printBtn = document.getElementById('print-btn') as HTMLElement;
		if (date.length == 0) {
			messageTable.style.display = 'none';
			printBtn.style.display = 'none';
			return;
		}
		this.employeeData = [];
		this.employeeService.getEmployeePay(date).subscribe(
			(response: any) => {
				this.res = response;
				this.parseData(date);
			},
			(error) => {
				messageTable.style.display = 'none';
				printBtn.style.display = 'none';
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

	parseData(date: any) {
		let messageTable = document.getElementById('data-table') as HTMLElement;
		let printBtn = document.getElementById('print-btn') as HTMLElement;
		let employees = this.res.employees;
		let clockins = this.res.clockins;

		for (let e = 0; e < employees.length; e++) {
			let oneEmployee: any = {
				idnum: null,
				name: null,
				mon: 0,
				tue: 0,
				wed: 0,
				thu: 0,
				fri: 0,
				sat: 0,
				sun: 0,
				total: 0,
				pay: 0,
			};
			const employee = employees[e];
			oneEmployee.idnum = employee.idnum;
			oneEmployee.name = employee.name;
			for (let c = 0; c < clockins.length; c++) {
				const clockin = clockins[c];
				if (employee.idnum == clockin.idnum) {
					let tempDate = new Date(date);
					tempDate.setDate(tempDate.getUTCDate());
					for (let index = 0; index < 7; index++) {
						let chosenDate =
							String(tempDate.getFullYear()) +
							'-' +
							String(tempDate.getMonth() + 1).padStart(2, '0') +
							'-' +
							String(tempDate.getDate()).padStart(2, '0');
						if (chosenDate == clockin.clockedin.substring(0, 10)) {
							switch (index) {
								case 0:
									oneEmployee.mon = Number(clockin.hours);
									break;
								case 1:
									oneEmployee.tue = Number(clockin.hours);
									break;
								case 2:
									oneEmployee.wed = Number(clockin.hours);
									break;
								case 3:
									oneEmployee.thu = Number(clockin.hours);
									break;
								case 4:
									oneEmployee.fri = Number(clockin.hours);
									break;
								case 5:
									oneEmployee.sat = Number(clockin.hours);
									break;
								case 6:
									oneEmployee.sun = Number(clockin.hours);
									break;
								default:
									break;
							}
						}
						tempDate.setUTCDate(tempDate.getUTCDate() + 1);
					}
					oneEmployee.total += Number(clockin.hours);
				}
			}
			oneEmployee.pay = oneEmployee.total * employee.salary;
			this.employeeData.push(oneEmployee);
		}

		if (this.res.length != 0) {
			messageTable.style.display = 'table';
			printBtn.style.display = 'inline-block';
		} else {
			messageTable.style.display = 'none';
			printBtn.style.display = 'none';
		}
	}

	printPDF(date: any) {
		let employeeRows = [
			['Index', 'Id', 'Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Total Hours', 'Pay']
		];
		for (let i = 0; i < this.employeeData.length; i +=1) {
			let e = this.employeeData[i];
			employeeRows.push([i+1, e.idnum, e.name, e.mon, e.tue, e.wed, e.thu, e.fri, e.sat, e.sun, e.total, "$" + e.pay]);
		};


		let docDefinition = {
			content: [
				{
					text: 'Employee Pay Check',
					style: 'title',
				},
				{
					text: "Week of " + this.formatDate(date),
					style: 'header',
				},
				{
					table: {
						headerRows: 1,
						widths: ['auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','*'],
						body: employeeRows,
					},
					style: 'table',
				},
			],
			styles: {
				title: {
					bold: true,
					alignment: 'center',
					decoration: 'underline',
					fontSize: 20,
					color: 'blue',
					margin: [0, 15, 0, 15],
				},
				header: {
					alignment: 'center',
					fontSize: 15,
					color: 'black',
					margin: [0, 5, 0, 5],
				},
				table: {
					alignment: 'center',
					fontSize: 10,
					color: 'black',
				}
			},
		};

		pdfMake.createPdf(docDefinition).open();
	}

	formatDate(dateInput: any) {
		const year = dateInput.substring(0, 4);
		const date = new Date();
		const monthNumber = dateInput.substring(5, 7);
		date.setMonth(monthNumber - 1);
		const month = date.toLocaleString('en-US', { month: 'long' });
		const day = dateInput.substring(8, 10);
		return month + ' ' + day + ', ' + year;
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
