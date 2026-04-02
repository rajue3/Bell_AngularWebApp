import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './customer/customer.component';
import { CustomOrdersComponent } from './orders/orders.component';
import { DemoComponent } from './demo/demo.component';
import { TableFrozenColumnsDemo } from './demo/table-frozen-columns-demo';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { ItemWiseSalesComponent } from './sales-report/itemwise-sales.component';
import { WeeklyReportComponent } from './sales-report/weekly-report.component';
import { WeeklyItemsCountComponent } from './sales-report/weekly-itemscount.component';
//import { ViewItemslistComponent } from './orders/view-itemslist/view-itemslist.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard, AdminGuard } from './_helpers';
import { SalesReportByItemComponent } from './sales-report/sales-report-byitem.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { UpdateMRPComponent } from './update-mrp/update-mrp.component';
import { UpdatePRateComponent } from './stock-report/update-prate.component';
import { UpdateOnlinePaymentsComponent } from './dailycashtrans/update-online-payments-received/update-online-payments-received.component';
import { UpdatePendingDuesComponent } from './dailycashtrans/update-pending-dues/update-pending-dues.component';
import { ItemDetailsComponent } from './itemdetails/itemslist.component'
import { EdititemComponent } from "./itemdetails/edititem/edititem.component";

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  //{ path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard, AdminGuard] },
  { path: 'account', loadChildren: accountModule },

  { path: 'cust', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'sales', component: SalesReportComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'itemwise-sales', component: ItemWiseSalesComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'weekly', component: WeeklyReportComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'weeklyrepo2', component: WeeklyItemsCountComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'salebyitem', component: SalesReportByItemComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'stockdetails', component: StockReportComponent, canActivate: [AuthGuard]},
  { path: 'updatemrp', component: UpdateMRPComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'updateprate', component: UpdatePRateComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'updateonlinepayments', component: UpdateOnlinePaymentsComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'updatesalesmandues', component: UpdatePendingDuesComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'updateitems', component: ItemDetailsComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'items/:id', component: EdititemComponent },
    
  { path: 'demo', component: DemoComponent},
  { path: 'table-frozen-col', component: TableFrozenColumnsDemo},
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
