import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BusinessSignupComponent } from '../business-signup/business-signup.component';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-business-login',
  templateUrl: './business-login.component.html',
  styleUrls: ['./business-login.component.scss']
})
export class BusinessLoginComponent implements OnInit {
  responseMessage: any;

  constructor(
    private dialog:MatDialog,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
  }

  handleSubmit(formData: any) {
    var data = {
      username: formData.username,
      password: formData.password,
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

  businessSignupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(BusinessSignupComponent),dialogConfig;
  }

}
