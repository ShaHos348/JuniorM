import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BusinessSignupComponent } from './components/business-components/business-signup/business-signup.component';
import { BusinessLoginComponent } from './components/business-components/business-login/business-login.component';
import { BusinessFPComponent } from './components/forgotInfoSection/business-fp/business-fp.component';
import { ClockinOutComponent } from './components/employeeSection/clockin-out/clockin-out.component';
import { EmployeeMessageComponent } from './components/employeeSection/employee-message/employee-message.component';
import { EmployeeSignupComponent } from './components/employeeSection/employee-signup/employee-signup.component';
import { ModifyClockingComponent } from './components/employeeSection/modify-clocking/modify-clocking.component';
import { ManagerHomeComponent } from './components/managerSection/manager-home/manager-home.component';
import { OrderEntryComponent } from './components/orderSection/order-entry/order-entry.component';
import { OrderPrintComponent } from './components/orderSection/order-print/order-print.component';
import { LottoActiveComponent } from './components/lottoSection/lotto-active/lotto-active.component';
import { LogReportComponent } from './components/reportSection/log-report/log-report.component';
import { DailyReportComponent } from './components/reportSection/daily-report/daily-report.component';
import { MonthlyReportComponent } from './components/reportSection/monthly-report/monthly-report.component';
import { EmployeeInfoComponent } from './components/employeeSection/employee-info/employee-info.component';
import { AllEmployeeMessagesComponent } from './components/employeeSection/all-employee-messages/all-employee-messages.component';
import { EmployeePayComponent } from './components/employeeSection/employee-pay/employee-pay.component';
import { EditDailyReportComponent } from './components/reportSection/edit-daily-report/edit-daily-report.component';
import { AdminHomeComponent } from './components/adminSection/admin-home/admin-home.component';
import { BusinessInfoComponent } from './components/business-components/business-info/business-info.component';
import { ItemRegistryComponent } from './components/adminSection/item-registry/item-registry.component';
import { LottoSaleComponent } from './components/lottoSection/lotto-sale/lotto-sale.component';
import { LottoPrintComponent } from './components/lottoSection/lotto-print/lotto-print.component';
import { LottoRegistryComponent } from './components/adminSection/lotto-registry/lotto-registry.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusinessSignupComponent,
    BusinessLoginComponent,
    BusinessFPComponent,
    ClockinOutComponent,
    EmployeeMessageComponent,
    EmployeeSignupComponent,
    ModifyClockingComponent,
    ManagerHomeComponent,
    OrderEntryComponent,
    OrderPrintComponent,
    LottoActiveComponent,
    LogReportComponent,
    DailyReportComponent,
    MonthlyReportComponent,
    EmployeeInfoComponent,
    AllEmployeeMessagesComponent,
    EmployeePayComponent,
    EditDailyReportComponent,
    AdminHomeComponent,
    BusinessInfoComponent,
    ItemRegistryComponent,
    LottoSaleComponent,
    LottoPrintComponent,
    LottoRegistryComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
