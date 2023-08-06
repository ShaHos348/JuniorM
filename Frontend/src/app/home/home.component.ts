import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	user: string = '';
	responseMessage: any;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private userService: UserService,
		private snackbarService: SnackbarService
	) {}

	ngOnInit(): void {
		this.userService.checkLogin().subscribe(
			(response: any) => {
				this.userService.managerCheckLogin().subscribe(
					(response: any) => {
						this.navigater('manager/home');
					},
					(error) => {
						this.router.navigate(['home']);
						this.user = response.message;
					}
				);
			},
			(error) => {
				this.router.navigate(['']);
			}
		);
	}

	managerOpenLogin() {
		let managerLoginForm = document.getElementById(
			'managerLoginForm'
		) as HTMLFormElement;
		if (managerLoginForm.style.display == 'none') {
			managerLoginForm.style.display = 'block';
		} else {
			managerLoginForm.style.display = 'none';
		}
	}

	managerLogin(formData: any) {
		var data = {
			username: formData.username.replaceAll(' ', ''),
			password: formData.password.replaceAll(' ', ''),
		};
		this.userService.managerLogin(data).subscribe(
			(response: any) => {
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.router.navigate(['manager/home']);
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
		this.userService.logout().subscribe((Response) => {
			this.router.navigate(['']);
		});
	}

	navigater(route: string) {
		this.router.navigate([route]);
	}
}
