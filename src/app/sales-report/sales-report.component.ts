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
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { ItemsByCustIDComponent } from './itemslist.component';
import { MatDialog,} from '@angular/material/dialog';
import { User } from '../_models';
import { AccountService } from '../_services';

  export interface SelectedRowDetails {
    ShopName: string;
    Area: string;
    TotalItems: number;
    TotalAmount: number;
  }
  interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}
interface ExportColumn {
    title: string;
    dataKey: string;
}
@Component({
  selector: 'app-sales-report',
  //standalone: true,
  //imports: [],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.css',
  providers: [DatePipe]
})
export class SalesReportComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  dataSource: tblSalesReport[] = [];
  filteredItems: tblSalesReport[] = [];
  shopVisitsDataSource: any[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;
  showSpinner: boolean=false;
  value = 0;
  loading = false;
  selectedArea: string = 'all';
  selectedShop: string= 'all';
  objAreas!: Areas[];
  objShops!: Areas[];
  varTotalShops: number = 0;
  varTotalAreas: number = 0
  date1:any;
  date2:any;
  billDate1 = new FormControl(new Date());
  billDate2 = new FormControl(new Date());
  clickedRows = new Set<tblSalesReport>();
  searchByBillDate:boolean = false;
  searchBy : string = '';
  submitting1 = false;
  submitting2 = false;
  reportType:string = 'report1';
  selectedVisitStatus:string = 'all';
  user?: User | null;
  exportColumns!: ExportColumn[];
  cols!: Column[];
  dataSource2: any;
  dataTable2: any[] = [];
  dynamicColumns: any[] = [];
  dynamicRowColor:any = 'black';

  constructor(private accountService: AccountService,private router: Router, private dataService: DataService,
    private formBuilder: FormBuilder,
    private dataFilter: DataFilterService, private sharedService: SharedService,
    private dateAdapter: DateAdapter<Date>,public datePipe: DatePipe,
    public dialog: MatDialog) {
      this.accountService.user.subscribe(x => this.user = x);
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy - to change date format for Mat datepicker
    }

  ngOnInit(): void {
    this.bindAreasList('lines');
    if (sessionStorage.getItem('Report1_Area'))
      {
        this.selectedArea = sessionStorage.getItem('Report1_Area') !;
        //this.BindReportFromSession();
      }
    if (sessionStorage.getItem('Report1_billDate1'))
    {
        let sessionDate1 = new Date(sessionStorage.getItem('Report1_billDate1')!)
        let sessionDate2 = new Date(sessionStorage.getItem('Report1_billDate2')!)
        this.billDate1 = new FormControl(new Date(sessionDate1));
        this.date1 = this.billDate1;
        this.billDate2 = new FormControl(new Date(sessionDate2));
        this.date2 = this.billDate2;        
        this.searchBy = sessionStorage.getItem('Report1_SearchBy')!;
    }
  }

  BindReportFromSession()
   {
      var sessionDataSource = sessionStorage.getItem('Report1_DataSource') || '';
      if (!sessionDataSource) { this.filteredItems = []; return };
      this.dataSource = this.filteredItems = JSON.parse(sessionDataSource);
      //console.log('sesson data from ngAfterViewInit: ',JSON.parse(sessionDataSource));
      this.submitting1 = false;
   }
 formatDate(date: any, format: string) {
    return formatDate(date, format, 'en-US');
  }

 onVisitShopsClicked(strArea:any) {
    this.reportType = 'report2';
    if (strArea === 'undefined') strArea='all';
    this.submitting2 = true;
    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');

    this.sharedService.GetShopVisitsBySalesman('DATEWISEREPORT',strArea,'all',this.selectedVisitStatus,this.date1,this.date2).subscribe((response: any[]) => {
      console.log('response from DATEWISEREPORT SP =', response);
      this.dataSource2 = <any>response;
      this.submitting2 = false;
      //sessionStorage.setItem('filteredItems',this.dataSource);
      this.dataTable2 = this.shopVisitsDataSource = JSON.parse(this.dataSource2.objJSONData);
      this.varTotalAreas = this.dataSource2.TotalAreas;
      this.varTotalShops = this.dataSource2.TotalShops;
       console.log('Shop Visit details: ',this.dataTable2);
      //this.reportHeader = "Total Items " + this.filteredItems.length;
      this.dynamicColumns = Object.keys(this.dataTable2[0]);
      let newCol:any;
      this.cols = [];
      if (this.dataTable2.length == 0) { this.submitting2 = false; return; }
      for(var item in this.dynamicColumns){
        // if(this.dynamicColumns[item] === 'SHOPNAME')
        //   newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:true};
        // else
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false};
        console.log('newcol=',newCol);
        this.cols.push(newCol);
      }
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
      //console.log('column names from loop =',this.cols);
      //this.showHideControlls(false);  //this is to show/hide common controlls.
     },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using onVisitShopsClicked() '));

    // this.sharedService.Get_ShopVisitDetails(strArea,this.date1,this.date2,this.selectedVisitStatus,this.searchBy).subscribe((response: tblSalesReport[]) => {
    //   this.shopVisitsDataSource = response;
    //   //sessionStorage.setItem('Report1_DataSource',JSON.stringify(this.filteredItems));
    //    console.log('Shop Visit details: ',response);
    //    this.submitting2 = false;
    //  },
    //  (err: any) => console.log(err),
    //  () => console.log('Retrieved LS Items using getLSTotalSalesByArea() '));
    //  //this.submitting2 = false;
  }
  onSubmitClicked(strArea:any) {
    //if (!strArea) {strArea='all';}
    this.reportType = 'report1';
    if (strArea === 'undefined') strArea='all';
    this.submitting1 = true;
    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');
    if (this.searchByBillDate)
      this.searchBy = 'BILLDATE';
    else
      this.searchBy = 'ACTIONDATE';

    sessionStorage.setItem('Report1_Area',this.selectedArea);
    sessionStorage.setItem('Report1_billDate1',JSON.stringify(this.date1));
    sessionStorage.setItem('Report1_billDate2',JSON.stringify(this.date2));
    sessionStorage.setItem('Report1_SearchBy',this.searchBy);

    this.sharedService.getLSTotalSalesByArea(strArea,this.date1,this.date2,this.searchBy).subscribe((response: tblSalesReport[]) => {
      //this.dataSource = response;
      this.dataSource = this.filteredItems = response;
      sessionStorage.setItem('Report1_DataSource',JSON.stringify(this.filteredItems));
       console.log(response);
       this.submitting1 = false;
     },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using getLSTotalSalesByArea() '));
     //this.submitting1 = false;
  }
  onRowClicked(rowItem: any)
  {
    //alert(rowItem.Area);
    const dialogRef = this.dialog.open(ItemsByCustIDComponent, {
      data: {reportName:"itemsbyareadate",selectedArea: rowItem.Area, selectedDate: formatDate(rowItem.BillDate,'dd-MMM-yyyy','en-US'),totalBills:rowItem.TotalBills},
      height: '400px',
	    width: '450px',
	    position: {left:'100px' }
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
// bindShopNames(areaName:string)
// {
//   if (areaName=='all')
//   {
//     this.objShops = [];
//   }
//   else
//   {
//     this.sharedService.getBellAreas(areaName,'n','n').subscribe((response: Areas[]) => {
//       this.objShops = response;
//       //console.log('shopnames');
//       //console.log(response);
//     },
//     (err: any) => console.log(err),
//     () => console.log('getCustomersPage() retrieved customers'));
//   }
// }
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
  
   formatFieldValue(colHeader:any,colValue:any,rowindex:number)
   {
      this.dynamicRowColor = 'black';
      //console.log('formatFieldValue called with colHeader=',colHeader,' colValue=',colValue,' rowindex=',rowindex);
      if (colHeader.includes(' ') && colValue===null )
      {
        //this.dynamicRowColor = 'red'; //not working
        return 'Not Visited';
      }     
      else
      {     
        //this.dynamicRowColor = 'black';
        return colValue || '';
      }
   }
  getTimeDiff(date1Str: string, date2Str: string): string {
    console.log('getTimeDiff called with date1Str:', date1Str, 'date2Str:', date2Str);
    if (!date1Str || !date2Str) return '';
    if (date1Str.indexOf('0001') > -1 || date2Str.indexOf('0001') > -1) return '';
    // Convert strings to Date objects
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);

    // Get difference in milliseconds
    const diffMs = date2.getTime() - date1.getTime();
    console.log('Time difference in milliseconds:', diffMs);
    if (isNaN(diffMs) || diffMs < 0) return 'oh:0m:2s';
    // Convert to hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${diffHours}h:${diffMinutes}m:${diffSeconds}s`;
  }
}
