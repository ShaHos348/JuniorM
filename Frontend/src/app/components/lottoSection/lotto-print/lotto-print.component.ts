import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LottoService } from 'src/app/services/lotto.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-lotto-print',
  templateUrl: './lotto-print.component.html',
  styleUrls: ['./lotto-print.component.scss']
})
export class LottoPrintComponent implements OnInit {
	responseMessage: any;
	shiftDate: any = String(new Date());
	shift: any;
	data: any;

	lottoActives: any[] = [];
	lottoSale: any[] = [];
	printWhat: any;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private userService: UserService,
		private snackbarService: SnackbarService,
		private lottoService: LottoService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['lotto/print']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	getLottoActives() {
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.setData();
		let lottoTable = document.getElementById('lotto-active-table') as HTMLElement;
		this.lottoService.lottoActive(this.data).subscribe(
			(response: any) => {
				this.lottoActives = response;
				if (this.lottoActives.length != 0) {
					this.formatTime();
					this.setPrint("active");
					lottoTable.style.display = 'table';
				} else {
					lottoTable.style.display = 'none';
				}
			},
			(error) => {
				this.goInvisible();
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

	getLottoSales() {
		if (!this.checkInputs()) {
			this.snackbarService.openSnackbar(this.responseMessage, '');
			return;
		}
		this.setData();
		let lottoTable = document.getElementById('lotto-sale-table') as HTMLElement;
		this.lottoService.getLottoSale(this.data).subscribe(
			(response: any) => {
				this.lottoSale = response;
				if (this.lottoSale.length != 0) {
					this.setPrint("sale");
					lottoTable.style.display = 'table';
				} else {
					lottoTable.style.display = 'none';
				}
			},
			(error) => {
				this.goInvisible();
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

	setData() {
		this.goInvisible();
		this.data = {
			date: this.shiftDate,
			shift: this.shift
		};
	}

	setPrint(what: any) {
		let printBtn = document.getElementById('print-btn') as HTMLElement;
		printBtn.style.display = "inline-block";
		this.printWhat = what;
	}

	print() {
		let printRows = [];
		let title = " Report";
		if (this.printWhat == null) {
			return;
		} else if (this.printWhat == "active") {
			title = "Lotto Active" + title;
			printRows.push(['Activated Date/Time', 'LottoID']);
			this.lottoActives.forEach(element => {
				printRows.push([element.date, element.lottoid]);
			});
			printRows.push(["Total Packs Activated:", this.lottoActives.length]);
		} else {
			title = "Lotto Sale" + title;
			printRows.push(['Box', 'Start', 'End', 'Sale', 'Amount']);
			this.lottoSale.forEach(element => {
				printRows.push([element.box, element.start, element.end, element.sale, element.total]);
			});
		}


		let docDefinition = {
			content: [
				{
					text: title,
					style: 'title',
				},
				{
					text: this.formatDate(this.shiftDate) + ' ' + this.shift + ' Shift',
					style: 'header',
				},
				{
					table: {
						headerRows: 1,
						body: printRows,
					},
					style: 'table'
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

	formatTime() {
		for (let index = 0; index < this.lottoActives.length; index++) {
			const lotto = this.lottoActives[index];
			lotto.date = lotto.date.substring(0,10) + " " + lotto.date.substring(11,19);
		}
	}

	checkInputs() {
		if (this.shiftDate == null || this.shift == null) {
			this.responseMessage =
				'Error: Shift Date and/or Shift time was no given!';
			return false;
		}

		return true;
	}

	goInvisible() {
		let lottoActiveTable = document.getElementById('lotto-active-table') as HTMLElement;
		let lottoSaleTable = document.getElementById('lotto-sale-table') as HTMLElement;
		let printBtn = document.getElementById('print-btn') as HTMLElement;
		printBtn.style.display = "none";
		lottoActiveTable.style.display = "none";
		lottoSaleTable.style.display = "none";
		this.printWhat = null;
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
