import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BusinessLoginComponent } from './components/business-components/business-login/business-login.component';
import { BusinessFPComponent } from './components/forgotInfoSection/business-fp/business-fp.component';
import { ClockinOutComponent } from './components/employeeSection/clockin-out/clockin-out.component';
import { EmployeeMessageComponent } from './components/employeeSection/employee-message/employee-message.component';
import { ManagerHomeComponent } from './components/managerSection/manager-home/manager-home.component';
import { DailyReportComponent } from './components/shiftSection/daily-report/daily-report.component';
import { OrderEntryComponent } from './components/orderSection/order-entry/order-entry.component';
import { OrderPrintComponent } from './components/orderSection/order-print/order-print.component';

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
    path: 'employee/clocking',
    component: ClockinOutComponent,
  },
  {
    path: 'employee/messaging',
    component: EmployeeMessageComponent
  },
	{
    path: 'report/daily',
    component: DailyReportComponent
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
