import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BusinessSignupComponent } from '../business-signup/business-signup.component';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { UserService } from '../../../services/user.service';
import { GlobalConstants } from '../../../shared/global-constants';
import { AdminService } from 'src/app/services/admin.service';

@Component({
	selector: 'app-business-login',
	templateUrl: './business-login.component.html',
	styleUrls: ['./business-login.component.scss'],
})
export class BusinessLoginComponent implements OnInit {
	responseMessage: any;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private userService: UserService,
		private adminService: AdminService,
		private snackbarService: SnackbarService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.router.navigate(['home']);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	handleSubmit(formData: any) {
		var data = {
			username: formData.username.replaceAll(' ', ''),
			password: formData.password.replaceAll(' ', ''),
		};
		this.userService.login(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.router.navigate(['home']);
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

	adminSubmit(formData: any) {
		var data = {
			username: formData.username.replaceAll(' ', ''),
			password: formData.password.replaceAll(' ', ''),
			code: formData.code.replaceAll(' ', ''),
		};
		this.adminService.adminLogin(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.router.navigate(['admin/home']);
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

	businessSignupAction() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.width = '550px';
		this.dialog.open(BusinessSignupComponent), dialogConfig;
	}

	adminForm() {
		let adminForm = document.getElementById('admin-form') as HTMLFormElement;
		if (adminForm.style.display == 'block') {
			adminForm.style.display = 'none';
		} else {
			adminForm.style.display = 'block';
		}
	}

	businessFP() {
		this.router.navigate(['forgotBusinessLogin']);
	}
}
