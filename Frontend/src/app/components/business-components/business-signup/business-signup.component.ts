import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../../../shared/global-constants';

@Component({
	selector: 'app-business-signup',
	templateUrl: './business-signup.component.html',
	styleUrls: ['./business-signup.component.scss'],
})
export class BusinessSignupComponent implements OnInit {
	signupForm: any = FormGroup;
	responseMessage: any;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private snackbarService: SnackbarService,
		private dialogRef: MatDialogRef<BusinessSignupComponent>
	) {}

	ngOnInit(): void {
		this.signupForm = this.formBuilder.group({
			code: [null, [Validators.required]],
			name: [
				null,
				[Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
			],
			address: [null, [Validators.required]],
			city: [null, [Validators.required]],
			state: [null, [Validators.required]],
			zipcode: [
				null,
				[Validators.required, Validators.pattern(GlobalConstants.zipcodeRegex)],
			],
			country: [null, [Validators.required]],
			phone: [
				null,
				[
					Validators.required,
					Validators.pattern(GlobalConstants.contectNumberRegex),
				],
			],
			mobile: [
				null,
				[
					Validators.required,
					Validators.pattern(GlobalConstants.contectNumberRegex),
				],
			],
			email: [
				null,
				[Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
			],
			username: [null, [Validators.required]],
			password: [
				null,
				[
					Validators.required,
					Validators.pattern(GlobalConstants.passwordRegex),
				],
			],
		});
	}

	handleSubmit() {
		var formData = this.signupForm.value;
		var data = {
			code: formData.code.replaceAll(' ', ''),
			name: formData.name.replaceAll(' ', ''),
			address: formData.address,
			city: formData.city,
			state: formData.state,
			zipcode: formData.zipcode.replaceAll(' ', ''),
			country: formData.country,
			phone: formData.phone.replaceAll(' ', ''),
			mobile: formData.mobile.replaceAll(' ', ''),
			email: formData.email.replaceAll(' ', ''),
			username: formData.username.replaceAll(' ', ''),
			password: formData.password.replaceAll(' ', ''),
		};
		this.userService.signup(data).subscribe(
			(response: any) => {
				this.dialogRef.close();
				this.responseMessage = response?.message;
				this.snackbarService.openSnackbar(this.responseMessage, '');
				this.router.navigate(['/']);
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
}
