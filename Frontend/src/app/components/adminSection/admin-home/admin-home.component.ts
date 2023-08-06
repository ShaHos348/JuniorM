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
	codes: any;
	sessions: any;
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
					this.displayList('codes-edit', 'codes-list');
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

	endSession(input: any) {
		if (input == '' || input == null) {
			return;
		}
		let data = {
			id: input,
		};
		this.adminService.destorySession(data).subscribe(
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

	getSessionIDs() {
		this.adminService.getSessions().subscribe(
			(response: any) => {
				this.sessions = response;
				if (this.sessions.length != 0) {
					for (let i = 0; i < this.sessions.length; i++) {
						const session = this.sessions[i];
						let index = session.data.indexOf('business');
						if (index < 0) {
							session.data = '{Business not Signed in}';
						} else {
							session.data = '{{' + session.data.substring(index + 10);
						}
					}
					this.displayList('session-edit', 'sessions-list');
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

	displayList(main: any, list: any) {
		let editDiv = document.getElementById(main) as HTMLDivElement;
		let listDiv = document.getElementById(list) as HTMLDivElement;
		if (listDiv.style.display == 'none') {
			editDiv.style.display = 'none';
			listDiv.style.display = 'block';
		} else {
			editDiv.style.display = 'block';
			listDiv.style.display = 'none';
		}
	}

	clearDatabase(clearInput: any) {
		if (clearInput == '' || clearInput == null) {
			return;
		}
		let data = {
			input: clearInput,
		};
		this.adminService.clearDatabase(data).subscribe(
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

	logout() {
		this.adminService.adminLogout().subscribe((Response) => {
			this.router.navigate(['']);
		});
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
