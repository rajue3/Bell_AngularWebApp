import {OnInit,AfterViewInit, Component,ViewChild } from '@angular/core';
import {FormGroup, FormControl,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from "src/app/shared.service";
import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { ItemDetails,BellCustDetails,BellAreaWiseOrders,Areas,Shops, IOrder, IPagedResults } from '../shared/interfaces';
import { AlertService } from '../shared/_alert';
import { interval, Subscription } from 'rxjs';
import { formatDate } from "@angular/common";
import { MatDialog} from '@angular/material/dialog';
//import { ItemsByCustIDComponent } from './itemslist.component';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Table,TableModule } from 'primeng/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

  interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}
interface City {
  name: string,
  code: string
}
interface ExportColumn {
    title: string;
    dataKey: string;
}
export interface SelectedRowDetails {
  ShopName: string;
  Area: string;
  TotalItems: number;
  TotalAmount: number;
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  })

  export class AdminComponent implements OnInit {

//  @ViewChild(MatPaginator) paginator?: MatPaginator;
//  @ViewChild(MatSort) sort?: MatSort;
  clickedRows = new Set<SelectedRowDetails>();

  //dataSource?: IRow[];
  filteredItems: any[] = [];
  //dataSource: any[] = [];
  dataSource: any;
  dataTable: any[] = [];
  dynamicColumns: any[] = [];
  dynamicTableRows?:string;

  dynamicHtmlTableRows?: SafeHtml;

  selectedProducts!: any[];
  //filteredItems?: MatTableDataSource<IRow>
  //matDataSource: MatTableDataSource<IRow>;

  displayedColumnsTest: string[] = ['Area'];
  displayedColumns: string[] = ['Area','CustomerName','ItemName','Week1','Week2','Week3','Week4','Week5'];

  submitting4:boolean = false;
  totalRecords: number = 0;
  pageSize: number = 10;
  showSpinner: boolean=false;
  value = 0;
  loading = false;
  selectedLine: string = '';
  selectedArea2: string = '';
  selectedShop:string = 'all';
  //selectedArea: Areas[] = [];
  //selectedShop: any[] = [];
  objLines!: Areas[];
  objAreas!: Areas[];
  objShops!: Areas[];

  strTableData:any;
  reportName:any;
  errorMsg:any;
  IsValid:boolean = false;
  filterTotalAmount:any;
  cols!: Column[];
  exportColumns!: ExportColumn[];
  //totalShops:any = 0;
  reportHeader:string = '';

   constructor(private router: Router, private dataService: DataService,
      private formBuilder: FormBuilder,public dialog: MatDialog,
      private dataFilter: DataFilterService, private sharedService: SharedService
      ,private sanitizer: DomSanitizer)
    {

    }

  ngOnInit(): void {
    this.bindAreasList('area');
    this.bindLinesList();
    // if (sessionStorage.getItem('custArea'))
    //   {
    //     this.selectedArea2 = sessionStorage.getItem('custArea') !;
    //     this.reportName = sessionStorage.getItem('custreportName');
    //     //this.filterTotalAmount = sessionStorage.getItem('custtotalAmount') ?? '0';
    //   }
    //   if (sessionStorage.getItem('custShop'))
    //   {
    //     this.selectedShop = sessionStorage.getItem('custShop') !;
    //   }
  }
  ngAfterViewInit() {
    //this.matDataSource.paginator = this.paginator!;
    //this.matDataSource.sort = this.sort || null;
    if (sessionStorage.getItem('custreportName'))
    { this.BindReportFromSession(); }
  }

  //**this is to show columns in the same order without sorting. */ only for manual binding with table. not required for primeng table
  //unsorted(a: any, b: any): number { return 0; }

  generateReport(reportName:string)
  {
    this.ValidateInputValues();
    if (!this.IsValid)   { return;}
    sessionStorage.setItem('custArea',this.selectedArea2);
    sessionStorage.setItem('custShop',this.selectedShop);
    sessionStorage.setItem('custreportName',reportName);
    //sessionStorage.setItem('custtotalAmount',this.filterTotalAmount);
    this.reportName = reportName;
    //Clear session data and table
    sessionStorage.removeItem('customerdetails');
    if (reportName == "Active Shops")
      this.ShowAllShops(this.selectedLine);

  }
  generateTableWithDynamicCols()
  {
    this.dataTable = JSON.parse(this.dataSource);
    //const obj = JSON.parse(this.dataSource);
    //this.dataTable = Object.values(obj);

    this.dynamicColumns = Object.keys(this.dataTable[0]);
    this.dynamicTableRows = "";
      //<td *ngFor="let item of row | keyvalue">{{item.value}}</td>
    //for(let row=0;row<this.dataTable.length;row++){

      for(var item in this.dataTable){
        this.dynamicTableRows = this.dynamicTableRows + "<tr>"
        for(var row in this.dataTable[item]){
          //console.log('Dynamic table rows =', this.dataTable[item][row]); //is working
          this.dynamicTableRows = this.dynamicTableRows + "<td>" + this.dataTable[item][row] + "</td>";
        }
        this.dynamicTableRows = this.dynamicTableRows +  "</tr>"
      }
      console.log('Dynamic table rows =', this.dynamicTableRows);
  }

  ValidateInputValues()
   {
      if (this.selectedLine == '')
      {
          this.errorMsg = "Please select Line name";
      }
      else { this.errorMsg = "";}

      // if (this.selectedArea2 == '')
      // {
      //     //this.errorMsg = "Please select Area";
      //     this.errorMsg = this.errorMsg + "\n Please select Area";
      // }
      //else { this.errorMsg = this.errorMsg + "\n";}

      // if (this.selectedShop =='')
      // {  this.errorMsg = this.errorMsg + "\n Please select Shop.\n"; }
      // //else { this.errorMsg = this.errorMsg + "\n";}

      //alert(this.errorMsg);
      if (this.errorMsg.length > 2)
      { this.IsValid = false;   }
      else { this.IsValid = true;   }
      //alert(this.IsValid);
      this.errorMsg.replace("\n", "<br>");
   }
   BindReportFromSession()
   {
      var sessionDataSource = sessionStorage.getItem('customerdetails') || '';
      if (!sessionDataSource) { this.filteredItems = []; return };
      this.dataTable = this.filteredItems = JSON.parse(sessionDataSource);
      console.log('sesson data from ngAfterViewInit: ',JSON.parse(sessionDataSource));

      this.reportHeader = "Total Items " + this.filteredItems.length;
      this.dynamicColumns = Object.keys(this.dataTable[0]);
      let newCol:any;
      this.cols = [];
      for(var item in this.dynamicColumns){
        if(this.dynamicColumns[item] == 'SHOPNAME')
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:true};
        else
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false};
        //console.log('newcol=',newCol);
        this.cols.push(newCol);
      }
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
      //console.log('column names from loop =',this.cols);
      //this.submitting = false;
   }

  ShowAllShops(strArea:any) {
    this.submitting4 = true;
      this.sharedService.getBell_GetAllCustomers(this.selectedLine,strArea,this.selectedShop).subscribe((response: BellCustDetails[]) => {
      //this.dataSource = response;
      this.dataSource = <any>response;
      //this.findTotals(response);
      //console.log('Customer details by Area and Shop' ,<any>response)
      //this.generateTableWithDynamicCols();
      sessionStorage.setItem('customerdetails',JSON.stringify(this.dataSource));
      this.dataTable = this.filteredItems = this.dataSource;
      //const obj = JSON.parse(this.dataSource);
      //this.dataTable = Object.values(obj);
      this.reportHeader = "Total Active Shops " + this.filteredItems.length;
      this.dynamicColumns = Object.keys(this.dataTable[0]);
      let newCol:any;
      this.cols = [];
      for(var item in this.dynamicColumns){
        if(this.dynamicColumns[item] == 'SHOPNAME')
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:true};
        else
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false};
        //console.log('newcol=',newCol);
        this.cols.push(newCol);
      }
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
      //console.log('column names from loop =',this.cols);
      this.submitting4 = false;
     },
     (err: any) => console.log(err),
     () => console.log('Retrieved Customer details'));
      //this.submitting4 = false;
  }

  onRowClicked(rowItem: any)
  {
  //   alert(rowItem.NAME);
  //   console.log('row clicked',rowItem);
     return;
  }

bindLinesList()
{
  var sessionLinesList = sessionStorage.getItem('custLinesList') || '';
  if (!sessionLinesList)
  {
    let strArea = 'lines'
    this.sharedService.getBellAreas(strArea,'n','n').subscribe((response: Areas[]) => {
      sessionStorage.setItem('custLinesList',JSON.stringify(response));
      this.objLines = response;
      //console.log('Line names : ', response);
    },
    (err: any) => console.log(err),
    () => console.log('bindLinesList() retrieved Lines'));
  }
  else
  { this.objLines = JSON.parse(sessionLinesList);
    //console.log('Lines retrieved from Session: ', this.objLines);
  }
}
bindAreasList(strType:string)
{
  //sessionStorage.removeItem('custAreasList')
  const sessionAreasList = sessionStorage.getItem('custAreasList');    
  //const sessionAreasList = sessionAreaNames ? JSON.parse(sessionAreaNames) : [];
  //const sessionAreasList = JSON.parse(sessionStorage.getItem('custAreasList') || '[]');
  //if (sessionAreasList) { this.filteredItems = []; return };
  //console.log('sessionAreasList : ', sessionAreasList);
    //if (sessionAreasList === null || sessionAreasList === 'undefined' || sessionAreasList === undefined || sessionAreasList === '' || sessionAreasList === '[]')
    if (!sessionAreasList)  
    {
      //console.log('session is empty ') 
      this.sharedService.getBellAreas('area','n','n').subscribe((response: Areas[]) => {
        sessionStorage.setItem('custAreasList',JSON.stringify(response));
        //this.objAreas = response;
        this.objAreas = response.filter(item => item.Line === strType)
        //console.log('Area names : ', this.objAreas);
    },
      (err: any) => console.log(err),
      () => console.log('getCustomersPage() retrieved customers'));      
    }  
  else
  {
      console.log('getting from session') 
      var AllAreas:Areas[];
      AllAreas = JSON.parse(sessionStorage.getItem('custAreasList') || '[]')
      //console.log('Areas retrieved from Session: ', AllAreas);
      if (AllAreas)
      {this.objAreas = AllAreas.filter(item => item.Line === strType);}
  }
  
  }
bindShopNames(strArea:any)
  {
    //alert(strArea);
    if (strArea)
    {
      //this.totalShops = 0;
      this.reportHeader = "";
      if (strArea =='all')
      {
        this.objShops = [];
      }
      else
      {
        this.sharedService.getBellAreas(strArea,'n','n').subscribe((response: Areas[]) => {
          this.objShops = response;
          //console.log('shopnames :', response);
          //console.log(response);
        },
        (err: any) => console.log(err),
        () => console.log('getCustomersPage() retrieved customers'));
      }
    }
  }


// onChange(event:any) {
//   console.log('event.value: ',event.value.Area);
//   this.bindShopNames(event.value.Area);

//   for(var item in this.selectedArea){

//     console.log(this.selectedArea[item]);
//     //for(var row in this.selectedArea[item]){
//       //console.log('selected area =', this.dataTable[item][row]); //is working
//     //}
//   }
//   console.log('selected area  :' + this.selectedArea[0].Area);
// }
// onShopsChange(event:any) {
//   console.log('selected Shop  :' + this.selectedShop);
//   console.log('event.value: ',event.value.Shop);
// }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
