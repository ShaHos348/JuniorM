import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BusinessLoginComponent } from './components/business-components/business-login/business-login.component';
import { BusinessFPComponent } from './components/forgotInfoSection/business-fp/business-fp.component';
import { EmployeeSignupComponent } from './components/employeeSection/employee-signup/employee-signup.component';
import { EmployeeInfoComponent } from './components/employeeSection/employee-info/employee-info.component';
import { ModifyClockingComponent } from './components/employeeSection/modify-clocking/modify-clocking.component';
import { ClockinOutComponent } from './components/employeeSection/clockin-out/clockin-out.component';
import { EmployeeMessageComponent } from './components/employeeSection/employee-message/employee-message.component';
import { AllEmployeeMessagesComponent } from './components/employeeSection/all-employee-messages/all-employee-messages.component';
import { EmployeePayComponent } from './components/employeeSection/employee-pay/employee-pay.component';
import { ManagerHomeComponent } from './components/managerSection/manager-home/manager-home.component';
import { LogReportComponent } from './components/reportSection/log-report/log-report.component';
import { DailyReportComponent } from './components/reportSection/daily-report/daily-report.component';
import { MonthlyReportComponent } from './components/reportSection/monthly-report/monthly-report.component';
import { OrderEntryComponent } from './components/orderSection/order-entry/order-entry.component';
import { OrderPrintComponent } from './components/orderSection/order-print/order-print.component';
import { LottoActiveComponent } from './components/lottoSection/lotto-active/lotto-active.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessLoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'forgotBusinessLogin',
    component: BusinessFPComponent
  },
  {
    path: 'employee/signup',
    component: EmployeeSignupComponent,
  },

  {
    path: 'employee/info',
    component: EmployeeInfoComponent,
  },
  {
    path: 'employee/modifyClocking',
    component: ModifyClockingComponent,
  },
  {
    path: 'employee/clocking',
    component: ClockinOutComponent,
  },
  {
    path: 'employee/messages',
    component: AllEmployeeMessagesComponent
  },
  {
    path: 'employee/messaging',
    component: EmployeeMessageComponent
  },
  {
    path: 'employee/pay',
    component: EmployeePayComponent
  },
	{
    path: 'report/log',
    component: LogReportComponent
  },
	{
    path: 'report/daily',
    component: DailyReportComponent
  },
	{
    path: 'report/monthly',
    component: MonthlyReportComponent
  },
	{
    path: 'manager/home',
    component: ManagerHomeComponent
  },
	{
    path: 'order/entry',
    component: OrderEntryComponent
  },
	{
    path: 'order/print',
    component: OrderPrintComponent
  },
	{
    path: 'lotto/active',
    component: LottoActiveComponent
  },
  { path: '**', component: BusinessLoginComponent },

  /*{
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      }
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
