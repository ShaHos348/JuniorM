import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-admin-home',
	templateUrl: './admin-home.component.html',
	styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
	user: string = '';
	codes: any;
	responseMessage: any;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private adminService: AdminService,
		private snackbarService: SnackbarService
	) {}

	ngOnInit(): void {
		this.adminService.adminCheckLogin().subscribe(
			(response: any) => {
				this.router.navigate(['admin/home']);
				this.user = response.message;
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	submitCode(input: any) {
		if (input == '' || input == null) {
			return;
		}
		let data = {
			code: input,
		};
		this.adminService.createBusinessCode(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
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

	deleteCode(input: any) {
		if (input == '' || input == null) {
			return;
		}
		let data = {
			code: input,
		};
		this.adminService.deleteBusinessCode(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
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

	getBusinessCodes() {
		this.adminService.getBusinessCodes().subscribe(
			(response: any) => {
				this.codes = response;
				if (this.codes.length != 0) {
					this.displayCodeList();
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

	displayCodeList() {
		let editDiv = document.getElementById('codes-edit') as HTMLDivElement;
		let codeListDiv = document.getElementById('codes-list') as HTMLDivElement;
		if (codeListDiv.style.display == 'none') {
			editDiv.style.display = 'none';
			codeListDiv.style.display = 'block';
		} else {
			editDiv.style.display = 'block';
			codeListDiv.style.display = 'none';
		}
	}

	logout() {
		this.adminService.adminLogout().subscribe((Response) => {
			this.router.navigate(['']);
		});
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
