import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { FullComponent } from './layouts/full/full.component';
import { BusinessLoginComponent } from './business-login/business-login.component';

const routes: Routes = [
  { 
    path: '', 
    component: BusinessLoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
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
