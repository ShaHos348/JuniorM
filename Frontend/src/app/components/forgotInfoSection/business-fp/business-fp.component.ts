import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
	selector: 'app-business-fp',
	templateUrl: './business-fp.component.html',
	styleUrls: ['./business-fp.component.scss'],
})
export class BusinessFPComponent implements OnInit {
	responseMessage: any;

	constructor(
		private router: Router,
		private userService: UserService,
		private snackbarService: SnackbarService
	) {}

	ngOnInit(): void {}

	validate_forgot(formData: any) {
		var data = {
			username: formData.username,
			email: formData.email,
		};
		if (formData.username.length == 0 && formData.email.length == 0) {
			this.snackbarService.openSnackbar('Login name or Email is required!', '');
			this.responseMessage = null;
		} else {
			this.userService.forgot(data).subscribe(
				(response: any) => {
					this.responseMessage = response;
				},
				(error) => {
					if (error.error?.message) {
						this.responseMessage = error.error?.message;
					} else {
						this.responseMessage = GlobalConstants.genericError;
					}
				}
			);
		}
	}
}
