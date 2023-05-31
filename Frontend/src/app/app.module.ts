import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BusinessSignupComponent } from './components/business-components/business-signup/business-signup.component';
import { BusinessLoginComponent } from './components/business-components/business-login/business-login.component';
import { BusinessFPComponent } from './components/forgotInfoSection/business-fp/business-fp.component';
import { ClockinOutComponent } from './components/employeeSection/clockin-out/clockin-out.component';
import { EmployeeMessageComponent } from './components/employeeSection/employee-message/employee-message.component';
@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    BusinessSignupComponent,
    BusinessLoginComponent,
    BusinessFPComponent,
    ClockinOutComponent,
    EmployeeMessageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
