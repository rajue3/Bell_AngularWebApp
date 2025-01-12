import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './customer/customer.component';
import { CustomOrdersComponent } from './orders/orders.component';
import { DemoComponent } from './demo/demo.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { WeeklyReportComponent } from './sales-report/weekly-report.component';
import { WeeklyItemsCountComponent } from './sales-report/weekly-itemscount.component';
//import { ViewItemslistComponent } from './orders/view-itemslist/view-itemslist.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers';
import { SalesReportByItemComponent } from './sales-report/sales-report-byitem.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { UpdateMRPComponent } from './update-mrp/update-mrp.component';
import { UpdatePRateComponent } from './stock-report/update-prate.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  //{ path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  { path: 'cust', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'sales', component: SalesReportComponent,canActivate: [AuthGuard]},
  { path: 'weekly', component: WeeklyReportComponent,canActivate: [AuthGuard]},
  { path: 'weeklyrepo2', component: WeeklyItemsCountComponent,canActivate: [AuthGuard]},
  { path: 'salebyitem', component: SalesReportByItemComponent,canActivate: [AuthGuard]},
  { path: 'stockdetails', component: StockReportComponent,canActivate: [AuthGuard]},
  { path: 'updatemrp', component: UpdateMRPComponent,canActivate: [AuthGuard]},
  { path: 'updateprate', component: UpdatePRateComponent,canActivate: [AuthGuard]},
  
  { path: 'demo', component: DemoComponent},
  //{ path: 'orders', component: CustomOrdersComponent},

    // otherwise redirect to home
  { path: '**', redirectTo: '' }
  //{ path: 'items', component: ViewItemslistComponent},
  //{ path:'orders', component:ErReportComponent},
];

@NgModule({
  declarations: [],

  //imports: [  CommonModule  ]
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [CustomOrdersComponent, DemoComponent, AdminComponent];
}
