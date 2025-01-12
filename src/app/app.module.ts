import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedService } from "./shared.service";
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './services/test.product.service';  //for testing edit table using primeng

import { UpdateMRPComponent } from './update-mrp/update-mrp.component';
import { UpdatePRateComponent } from './stock-report/update-prate.component';


import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './customer/customer.component';
import { CustomOrdersComponent } from './orders/orders.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { WeeklyReportComponent } from './sales-report/weekly-report.component';
import { WeeklyItemsCountComponent } from './sales-report/weekly-itemscount.component';
import { SalesReportByItemComponent } from './sales-report/sales-report-byitem.component';
import { StockReportComponent } from './stock-report/stock-report.component';

//import { ViewItemslistComponent } from './orders/view-itemslist/view-itemslist.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// used to create fake backend
 import { fakeBackendProvider } from './_helpers';
 import { JwtInterceptor, ErrorInterceptor } from './_helpers';
 import { AlertComponent } from './_components';
 import { HomeComponent } from './home/home.component';

//import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from "@angular/material/button";
//import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import {MatSort,MatSortModule} from '@angular/material/sort';
//import {MatSortModule} from '@angular/material/sort';
//import { MatPaginatorModule } from '@angular/material/paginator';
//import { MatTableDataSource } from '@angular/material/table';

import {CurrencyPipe} from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMATS } from './my-date-formats';

import { Table,TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent,AdminComponent,CustomOrdersComponent,SalesReportComponent,
    //ViewItemslistComponent,
    WeeklyReportComponent,WeeklyItemsCountComponent, DemoComponent,
    //AllOrdersComponent,
    AlertComponent, HomeComponent,SalesReportByItemComponent, StockReportComponent,UpdateMRPComponent,UpdatePRateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,MatIconModule,MatToolbarModule,MatSidenavModule,MatDividerModule,MatMenuModule,MatListModule
    ,MatDialogModule,MatProgressSpinnerModule,MatSelectModule,MatFormFieldModule,MatDatepickerModule,MatInputModule,
    MatPaginatorModule,MatPaginator,MatSort,MatSortModule,
    CurrencyPipe,
    TableModule,InputTextModule,TagModule,
    IconFieldModule,InputIconModule,DropdownModule,FormsModule,MultiSelectModule,CardModule,
    ButtonModule,ToastModule,RippleModule,AvatarModule,CalendarModule,
  ],
  providers: [SharedService, provideAnimationsAsync(),provideNativeDateAdapter(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    [ ProductService ],
    // provider used to create fake backend
    fakeBackendProvider,MessageService
    //{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    //{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
