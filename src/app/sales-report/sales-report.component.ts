import { Component } from '@angular/core';
import {FormGroup, FormControl,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from "src/app/shared.service";
import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { ItemDetails,Areas,tblSalesReport } from '../shared/interfaces';
import { AlertService } from '../shared/_alert';
import { interval, Subscription } from 'rxjs';
// import * as _moment from 'moment';
//import { Moment } from 'moment';
import { formatDate } from "@angular/common";
import { DateAdapter } from '@angular/material/core';
import { ItemsByCustIDComponent } from './itemslist.component';
import { MatDialog,} from '@angular/material/dialog';

  export interface SelectedRowDetails {
    ShopName: string;
    Area: string;
    TotalItems: number;
    TotalAmount: number;
  }
@Component({
  selector: 'app-sales-report',
  //standalone: true,
  //imports: [],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.css'
})
export class SalesReportComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  dataSource: tblSalesReport[] = [];
  filteredItems: tblSalesReport[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;
  showSpinner: boolean=false;
  value = 0;
  loading = false;
  selectedArea: string = 'all';
  selectedShop: string= 'all';
  objAreas!: Areas[];
  objShops!: Areas[];
  date1:any;
  date2:any;
  billDate1 = new FormControl(new Date());
  clickedRows = new Set<tblSalesReport>();
  searchByBillDate:boolean = false;
  submitting = false;

  constructor(private router: Router, private dataService: DataService,
    private formBuilder: FormBuilder,
    private dataFilter: DataFilterService, private sharedService: SharedService,
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog) {

      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy - to change date format for Mat datepicker
    }

  ngOnInit(): void {
    this.bindAreasList('lines');
    if (sessionStorage.getItem('Report1_Area'))
      {
        this.selectedArea = sessionStorage.getItem('Report1_Area') !;
        this.BindReportFromSession();
      }
    if (sessionStorage.getItem('Report1_billDate1'))
    {
        let sessionDate1 = new Date(sessionStorage.getItem('Report1_billDate1')!)
        this.billDate1 = new FormControl(new Date(sessionDate1));
        this.date1 = this.billDate1;
        this.date2 = sessionStorage.getItem('Report1_billDate2')!;
    }

  }

  BindReportFromSession()
   {
      var sessionDataSource = sessionStorage.getItem('Report1_DataSource') || '';
      if (!sessionDataSource) { this.filteredItems = []; return };
      this.dataSource = this.filteredItems = JSON.parse(sessionDataSource);
      //console.log('sesson data from ngAfterViewInit: ',JSON.parse(sessionDataSource));
      this.submitting = false;
   }
  onSubmitClicked(strArea:any) {
    //if (!strArea) {strArea='all';}
    if (strArea === 'undefined') strArea='all';
    this.submitting = true;
    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    if (this.searchByBillDate)
      this.date2 = 'BILLDATE';
    else
      this.date2 = 'ACTIONDATE';

    sessionStorage.setItem('Report1_Area',this.selectedArea);
    sessionStorage.setItem('Report1_billDate1',JSON.stringify(this.date1));
    sessionStorage.setItem('Report1_billDate2',this.date2);

    this.sharedService.getLSTotalSalesByArea(strArea,this.date1,this.date2).subscribe((response: tblSalesReport[]) => {
      //this.dataSource = response;
      this.dataSource = this.filteredItems = response;
      sessionStorage.setItem('Report1_DataSource',JSON.stringify(this.filteredItems));
       console.log(response);
     },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using getLSTotalSalesByArea() '));
     this.submitting = false;
  }
  onRowClicked(rowItem: any)
  {
    //alert(rowItem.Area);
    const dialogRef = this.dialog.open(ItemsByCustIDComponent, {
      data: {reportName:"itemsbyareadate",selectedArea: rowItem.Area, selectedDate: formatDate(rowItem.BillDate,'dd-MMM-yyyy','en-US'),totalBills:rowItem.TotalBills},
      height: '500px',
	    width: '450px',
	    position: {left:'2px' }
    });
  }
  filterChanged(filterText: string) {
    if (filterText && this.dataSource) {
      //let props = ['ShopName', 'Area', 'TotalAmount','TotalItems'];
      let props = ['Area','Amount','TotalBills','BillDate','UserName'];
      this.filteredItems = this.dataFilter.filter(this.dataSource, props, filterText);
    }
    else {
      this.filteredItems = this.dataSource;
    }
  }

  changeSearchByDateOption(event:any)
  {
    this.searchByBillDate=event.target.checked;
    //console.log(event.target.checked);
  }
bindAreasList(strType:string)
{
  this.sharedService.getBellAreas(strType,'n','n').subscribe((response: Areas[]) => {
    this.objAreas = response;
    //console.log(response);
  },
  (err: any) => console.log(err),
  () => console.log('getCustomersPage() retrieved customers'));
}
bindShopNames(areaName:string)
{
  if (areaName=='all')
  {
    this.objShops = [];
  }
  else
  {
    this.sharedService.getBellAreas(areaName,'n','n').subscribe((response: Areas[]) => {
      this.objShops = response;
      //console.log('shopnames');
      //console.log(response);
    },
    (err: any) => console.log(err),
    () => console.log('getCustomersPage() retrieved customers'));
  }
}
getBellLSOrdersbyShopArea(strArea: any,strShop:any) {
    //alert('strArea=' + strArea);
    //alert('strShop=' + strShop);
    //this.loadContent();
    this.loading = true;
    //this.sharedService.getOrdersByStatus(strArea,strShop)
    //this.sharedService.getBellItemsbyShop(strArea,strShop)
    //this.sharedService.getBellLSOrdersbyShopArea(strArea,strShop)
      //.subscribe((response: BellAreaWiseOrders[]) => {

      this.sharedService.getBell_GetAllCustomers('',strArea,strShop)
        .subscribe((response: tblSalesReport[]) => {
        this.dataSource = this.filteredItems = response;
        //console.log(response);
      //alert('refresh clicked on main page. count=' + this.customers.length);
      //alert(this.customers[0].AREA);
      this.loading = false;
      this.value = 0;
    },
      (err: any) => console.log(err),
      () => console.log('getCustomersPage() retrieved customers'));
  }

  //** TODO */
//   getEmployees() {
//     return this.firestore.collection<Employee>('employees')
//       .snapshotChanges()
//       .pipe(
//         map(actions => actions.map(a => {
//           const data = a.payload.doc.data();
//           const id = a.payload.doc.id;
//           return { id, ...data } as Employee;
//        })
//         )
//       );
// }
  loadContent() {
    this.loading = true;
    const subs$: Subscription = interval(200).subscribe(res => {
      this.value = this.value + 10;
      if(this.value === 120) {
        subs$.unsubscribe();
        this.loading = false;
        this.value = 0;
        console.log('Spinner is terminated! ');
      }
    });
  }

  //TestGet working after adding CORS in web.config and controller header.
  getCustomersPage_working(strStatus: any): void {
    this.sharedService.testGet()
      .subscribe(
        responseData => {
          this.dataSource = responseData;
          //alert(responseData);
          console.log(responseData);
        },
        error => {
          console.log(error);
        });
  }

}
