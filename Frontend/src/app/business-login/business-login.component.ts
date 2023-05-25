import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BusinessSignupComponent } from '../business-signup/business-signup.component';

@Component({
  selector: 'app-business-login',
  templateUrl: './business-login.component.html',
  styleUrls: ['./business-login.component.scss']
})
export class BusinessLoginComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  businessSignupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(BusinessSignupComponent),dialogConfig;
  }

}
