import {AfterViewInit, Component,ViewChild } from '@angular/core';
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
import { ItemsByCustIDComponent } from './itemslist.component';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Table,TableModule } from 'primeng/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//import { ConsoleReporter } from 'jasmine';

  // import {ModuleRegistry, ColDef, ValueGetterParams } from 'ag-grid-community'; // Column Definition Type Interface
  // import {ColGroupDef,GridApi,GridOptions,createGrid} from "ag-grid-community";
  // import { ClientSideRowModelModule } from "ag-grid-community";
  // ModuleRegistry.registerModules([ClientSideRowModelModule]);

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
    selector: 'weekly-itemscount',
    templateUrl: './weekly-itemscount.component.html',
    styleUrl: './weekly-report.component.css'
  })

export class  WeeklyItemsCountComponent {
  billDate1 = new FormControl(new Date());
  billDate2 = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
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

  submitting1:boolean = false;
  submitting2:boolean = false;
  submitting3:boolean = false;
  submitting4:boolean = false;
  submitting5:boolean = false;
  submitting6:boolean = false;
  totalRecords: number = 0;
  pageSize: number = 10;
  showSpinner: boolean=false;
  value = 0;
  loading = false;
  selectedArea2: string = '';
  selectedShop:string = 'all';
  selectedArea: Areas[] = [];
  //selectedShop: any[] = [];
  objAreas!: Areas[];
  objShops!: Areas[];
  date1:any;
  date2:any;
  Total_Week1 : number = 0;
  Total_Week2 : number = 0;
  Total_Week3 : number = 0;
  Total_Week4 : number = 0;
  Total_Week5 : number = 0;
  Total_Week6 : number = 0;
  Total_Week7 : number = 0;
  Total_Week8 : number = 0;
  GrandTotal : number = 0;
  private tempData:any;
  strTableData:any;
  reportName:any;
  errorMsg:any;
  IsValid:boolean = false;
  filterTotalAmount:any;
   constructor(private router: Router, private dataService: DataService,
      private formBuilder: FormBuilder,public dialog: MatDialog,
      private dataFilter: DataFilterService, private sharedService: SharedService
      ,private sanitizer: DomSanitizer)
    {
        const currentDate = new Date();
        //const priorDate = new Date().setDate(currentDate.getDate() - 30);
        //console.log('previous month:', new Date(priorDate).toDateString());
        //this.billDate1 = new FormControl(new Date(priorDate));
        //this.matDataSource = new MatTableDataSource(this.dataSource);
    }
    cols!: Column[];
    exportColumns!: ExportColumn[];
    //totalShops:any = 0;
    reportHeader:string = '';
    
  ngOnInit(): void {
    this.bindAreasList('lines');
    if (sessionStorage.getItem('Area'))
      {
        this.selectedArea2 = sessionStorage.getItem('Area') !;
        this.reportName = sessionStorage.getItem('reportName');
        this.filterTotalAmount = sessionStorage.getItem('totalAmount') ?? '0';
      }
      if (sessionStorage.getItem('Shop'))
      {
        this.selectedShop = sessionStorage.getItem('Shop') !;
      }
      if (sessionStorage.getItem('billDate1'))
      {
          let sessionDate1 = new Date(sessionStorage.getItem('billDate1')!)
          let sessionDate2 = new Date(sessionStorage.getItem('billDate2')!)
          this.billDate1 = new FormControl(new Date(sessionDate1));
          this.billDate2 = new FormControl(new Date(sessionDate2));
      }
  }

  ngAfterViewInit() {
    //this.matDataSource.paginator = this.paginator!;
    //this.matDataSource.sort = this.sort || null;
    this.reportHeader = "Total Items " + this.filteredItems.length;
    if (sessionStorage.getItem('reportName'))
    { this.BindReportFromSession(); }
  }

  //**this is to show columns in the same order without sorting. */ only for manual binding with table. not required for primeng table
  //unsorted(a: any, b: any): number { return 0; }

  generateReport(reportName:string)
  {
    //alert(reportName);
    this.ValidateInputValues();
    if (!this.IsValid)   { return;}
    sessionStorage.setItem('Area',this.selectedArea2);
    sessionStorage.setItem('Shop',this.selectedShop);
    sessionStorage.setItem('reportName',reportName);
    sessionStorage.setItem('totalAmount',this.filterTotalAmount);
    this.reportName = reportName;
    //Clear session data and table
    sessionStorage.removeItem('filteredItems');

    //this.BindReportFromSession();
    //alert(this.billDate1.value);
    //this.date1 = this.range.controls.start.value;
    //console.log(JSON.parse(this.selectedShop));
    //JSON.stringify(this.selectedShop)
    //console.log('selectedShop :', JSON.stringify(this.selectedShop[0].Shop));
    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');
    sessionStorage.setItem('billDate1',JSON.stringify(this.date1));
    sessionStorage.setItem('billDate2',JSON.stringify(this.date2));

    if (reportName != "Shop wise Total Sales")
      this.filterTotalAmount = '0';

    if (reportName == "Item wise Sales")
      this.ViewItemWiseSales(this.selectedArea2);
    if (reportName == "Shop wise Sales with BillNo")
    {
      if (this.selectedArea2 == '' || this.selectedArea2 == 'all')
        {
            alert("Please select Line/Area");
            return;
        }
      this.ViewShopWiseSalesWithBill(this.selectedArea2,'SHOPWISEWITHBILL');
    }
    if (reportName == "Shop Wise Sales")
    {
      if (this.selectedArea2 == '' || this.selectedArea2 == 'all')
        {
            alert("Please select Line/Area");
            return;
        }
      this.ViewShopWiseSalesWithBill(this.selectedArea2,'SHOPWISEWITHOUTBILL');
    }
    if (reportName == "Shop wise Total Sales") //this with filter on total sales
      this.ViewShopWiseTotalSales(this.selectedArea2);
    if (reportName == "Bill wise Sales")
    {
      if (this.selectedArea2 == '' || this.selectedArea2 == 'all')
        {
            alert("Please select Line/Area");
            return;
        }
      this.ViewBillWiseSales(this.selectedArea2);
    }
    if (reportName == "InActive Shops")
    {
      if (this.selectedArea2 == '' || this.selectedArea2 == 'all')
        {
            alert("Please select Line/Area");
            return;
        }
      this.ShowInactiveShops(this.selectedArea2);
    }
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
      if (this.selectedArea2 =='')
      {
          this.errorMsg = "Please select Line/Area";
      }
      else { this.errorMsg = "";}

      if (this.selectedShop =='')
      {  this.errorMsg = this.errorMsg + "\n Please select Shop"; }
      else { this.errorMsg = this.errorMsg + "\n";}

      //alert(this.errorMsg);
      if (this.errorMsg.length > 2)
      { this.IsValid = false;   }
      else { this.IsValid = true;   }
      //alert(this.IsValid);
   }
   BindReportFromSession()
   {
      var sessionDataSource = sessionStorage.getItem('filteredItems') || '';
      if (!sessionDataSource) { this.filteredItems = []; return };
        this.dataTable = this.filteredItems = JSON.parse(sessionDataSource);
        console.log('sesson data from ngAfterViewInit: ',JSON.parse(sessionDataSource));
        if (this.dataTable.length == 0)    {   return;    }
        //this.reportHeader = "Total Items " + this.filteredItems.length;
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

   formatFieldValue(colHeader:any,colValue:any)
   {
      //console.log('colHeader indexOf = ',colHeader.includes('QTY'));
      if (colHeader != 'BILLNUMBER' && colHeader != 'SNO.' && colHeader != 'SHOPNAME' && colHeader != 'NAME' && !colHeader.includes('QTY') )
      {
          //console.log('formatFieldValue',Number(colValue).toFixed(2));
          return Number(colValue).toFixed(2);
      }
      else
      {
        return colValue || 0;
      }
   }

   ViewItemWiseSales(strArea:any) {
    this.submitting1 = true;
    this.sharedService.GetSaleItemsbyBillDate(strArea,this.selectedShop,this.date1,this.date2).subscribe((response: any[]) => {
      //this.dataSource = response;
      this.dataSource = <any>response;
      if (!response || response.length == 2) {
        console.log('request is empty or null =', response);
         this.submitting1 = false;
         this.submitting2 = false;
         this.submitting3 = false;
         this.submitting4 = false;
         this.submitting5 = false;
         this.submitting6 = false;
         this.dataTable = this.filteredItems = [];
         this.cols = [];
         return;
        }
      // console.log('getBellWeeklyReportNew raw response' ,response)
      // if (response)
      // {
      //   console.log('response is not empty' ,response)
      // }
      // else
      // {
      //   this.submitting1 = false;
      //   console.log('response is empty' ,response)
      // }
      //this.generateTableWithDynamicCols();
      sessionStorage.setItem('filteredItems',this.dataSource);
      this.dataTable = this.filteredItems = JSON.parse(this.dataSource);
      if (this.dataTable.length == 0) {
          this.submitting1 = false;
           return;    }
      //const obj = JSON.parse(this.dataSource);
      //this.dataTable = Object.values(obj);
      this.reportHeader = "Total Items " + this.filteredItems.length;
      this.dynamicColumns = Object.keys(this.dataTable[0]);
      let newCol:any;
      this.cols = [];
      console.log('received items :',this.dataTable)
      if (this.dataTable.length == 0) { this.submitting1 = false; }
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
      this.submitting1 = false;
      this.submitting2 = false;
      this.submitting3 = false;
      this.submitting4 = false;
      this.submitting5 = false;
      this.submitting6 = false;
     },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using getBellWeeklyReportNew() '));
      //this.submitting1 = false;
  }

  // onRowClicked(rowItem: any)
  // {
  //   alert(rowItem.NAME);
  //   console.log('row clicked',rowItem);
  //   return;
  // }
  ViewShopWiseSalesWithBill(strArea:any,reportType:string) {
    if (reportType=='SHOPWISEWITHBILL')
    {
      this.submitting2 = true;
      this.submitting5 = false;
    }
    else
    {
      this.submitting2 = false;
      this.submitting5 = true;
    }
      // this.reportName = "Shop wise Sales with Bill No.";
    // sessionStorage.setItem('reportName',this.reportName);
    // this.date1 = this.billDate1.value;
    // this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    // this.date2 = this.billDate2.value;
    // this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');

    this.sharedService.GetSalebyShopsBillDateWithBillNo(reportType,strArea,this.selectedShop,this.date1,this.date2).subscribe((response: any[]) => {
      //console.log('request if null =', response);
      if (!response || response.length == 2) {
        console.log('request is empty or null =', response);
         this.submitting1 = false;
         this.submitting2 = false;
         this.submitting3 = false;
         this.submitting4 = false;
         this.submitting5 = false;
         this.submitting6 = false;
         this.dataTable = this.filteredItems = [];
         this.cols = [];
         return;
        }
      this.dataSource = <any>response;
      sessionStorage.setItem('filteredItems',this.dataSource);
      this.dataTable = this.filteredItems = JSON.parse(this.dataSource);
      this.reportHeader = "Total Items " + this.filteredItems.length;
      this.dynamicColumns = Object.keys(this.dataTable[0]);
      let newCol:any;
      this.cols = [];
      if (this.dataTable.length == 0) { this.submitting2 = false; return; }
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
      this.submitting1 = false;
      this.submitting2 = false;
      this.submitting3 = false;
      this.submitting4 = false;
      this.submitting5 = false;
      this.submitting6 = false;
     },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using getBellWeeklyReportNew() '));
      //this.submitting2 = false;
  }
  ViewShopWiseTotalSales(strArea:any) {
    this.submitting6 = true;
    if (this.filterTotalAmount == "" || this.filterTotalAmount == undefined)
    {this.filterTotalAmount = 0;}

    this.sharedService.GetTotalSalesByShop(strArea,this.selectedShop,this.date1,this.date2,this.filterTotalAmount ?? 0 ).subscribe((response: any[]) => {
      if (!response || response.length == 2) {
        console.log('request is empty or null =', response);
         this.submitting1 = false;
         this.submitting2 = false;
         this.submitting3 = false;
         this.submitting4 = false;
         this.submitting5 = false;
         this.submitting6 = false;
        this.dataTable = this.filteredItems = [];
         this.cols = [];
         return;
        }
      this.dataSource = <any>response;
      sessionStorage.setItem('filteredItems',this.dataSource);
      this.dataTable = this.filteredItems = JSON.parse(this.dataSource);
      this.reportHeader = "Total Items " + this.filteredItems.length;
      this.dynamicColumns = Object.keys(this.dataTable[0]);
      let newCol:any;
      this.cols = [];
      if (this.dataTable.length == 0) { this.submitting5 = false; }
      for(var item in this.dynamicColumns){
        if(this.dynamicColumns[item] == 'SHOPNAME')
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:true};
        else
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false};
        //console.log('newcol=',newCol);
        this.cols.push(newCol);
      }
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
      console.log('column names from loop =',this.cols);
      this.submitting1 = false;
      this.submitting2 = false;
      this.submitting3 = false;
      this.submitting4 = false;
      this.submitting5 = false;
      this.submitting6 = false;
    },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using GetTotalSalesByShop() '));
      //this.submitting5 = false;
  }

  ViewBillWiseSales(strArea:any) {
     this.submitting3 = true;
    this.sharedService.GetSalebyBillNumber(strArea,this.selectedShop,this.date1,this.date2).subscribe((response: any[]) => {
      //console.log('ViewBillWiseSales API response =', response);
      if (!response || response.length == 2) {
        console.log('request is empty or null =', response);
         this.submitting1 = false;
         this.submitting2 = false;
         this.submitting3 = false;
         this.submitting4 = false;
         this.submitting5 = false;
        this.submitting6 = false;
        this.dataTable = this.filteredItems = [];
         this.cols = [];
         return;
        }
      this.dataSource = <any>response;
      sessionStorage.setItem('filteredItems',this.dataSource);
      this.dataTable = this.filteredItems = JSON.parse(this.dataSource);
      //console.log('ViewBillWiseSales API response =', this.filteredItems);
      this.reportHeader = "Total Items " + this.filteredItems.length;
      this.dynamicColumns = Object.keys(this.dataTable[0]);
      let newCol:any;
      this.cols = [];
      if (this.dataTable.length == 0) { this.submitting3 = false; }
      for(var item in this.dynamicColumns){
        if(this.dynamicColumns[item] == 'BILLNUMBER')
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:true};
        else
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false};
        //console.log('newcol=',newCol);
        this.cols.push(newCol);
      }
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
      //console.log('column names from loop =',this.cols);
      this.submitting1 = false;
      this.submitting2 = false;
      this.submitting3 = false;
      this.submitting4 = false;
      this.submitting5 = false;
      this.submitting6 = false;
    },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using getBellWeeklyReportNew() '));
      //this.submitting3 = false;
  }

  ShowInactiveShops(strArea:any) {
    this.submitting4 = true;
    this.sharedService.GetInactiveShops(strArea,this.selectedShop,this.date1,this.date2).subscribe((response: any[]) => {
      if (!response || response.length == 2) {
        console.log('request is empty or null =', response);
         this.submitting1 = false;
         this.submitting2 = false;
         this.submitting3 = false;
         this.submitting4 = false;
         this.submitting5 = false;
        this.submitting6 = false;
        this.dataTable = this.filteredItems = [];
         this.cols = [];
         return;
        }
      //this.dataSource = response;
      this.dataSource = <any>response;
      //this.findTotals(response);
      //console.log('getBellWeeklyReportNew' ,<any>response)
      //this.generateTableWithDynamicCols();
      sessionStorage.setItem('filteredItems',this.dataSource);
      this.dataTable = this.filteredItems = JSON.parse(this.dataSource);
      //const obj = JSON.parse(this.dataSource);
      //this.dataTable = Object.values(obj);
      this.reportHeader = "Total InActive Shops " + this.filteredItems.length;
      this.dynamicColumns = Object.keys(this.dataTable[0]);
      let newCol:any;
      this.cols = [];
      if (this.dataTable.length == 0) { this.submitting4 = false; }
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
      this.submitting1 = false;
      this.submitting2 = false;
      this.submitting3 = false;
      this.submitting4 = false;
      this.submitting5 = false;
      this.submitting6 = false;
    },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using getBellWeeklyReportNew() '));
      //this.submitting4 = false;
  }
  // getTotalWeek1() {
  //   //this.Total_Week1 = this.filteredItems.map(t => t.Week1).reduce((acc, value) => acc + value, 0);
  //   //console.log('Total_Week1 = ', this.Total_Week1);
  //   return this.Total_Week1;
  //   //return this.filteredItems.map(t => t.Week1).reduce((acc, value) => acc + value, 0);
  // }
  // getTotalWeek2() {
  //   return this.Total_Week2;
  //   //return this.filteredItems.map(t => t.Week2).reduce((acc, value) => acc + value, 0);
  // }
  // getTotalWeek3() {
  //   return this.Total_Week3;
  //   //return this.filteredItems.map(t => t.Week3).reduce((acc, value) => acc + value, 0);
  // }
  // getTotalWeek4() {
  //   return this.Total_Week4;
  //   //return this.filteredItems.map(t => t.Week4).reduce((acc, value) => acc + value, 0);
  // }
  // getTotalAll() {
  //   return this.GrandTotal;
  //  // return this.filteredItems.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
  // }

  formateMyDate(params:any) {
    return params.value.format('MM/DD/YYYY HH:mm');
  }

  findTotals(data:any){
    //debugger
    this.Total_Week1=0;
    this.Total_Week2=0;
    this.Total_Week3=0;
    this.Total_Week4=0;
    this.Total_Week5=0;
    this.Total_Week6=0;
    this.Total_Week7=0;
    this.Total_Week8=0;
    this.GrandTotal=0;
    this.tempData=data;
    for(let j=0;j<data.length;j++){
        //console.log('Total count = ',Number(this.tempData[j].Week1));
        this.Total_Week1 += Number(this.tempData[j].Week1)
        this.Total_Week2 += Number(this.tempData[j].Week2)
        this.Total_Week3 += Number(this.tempData[j].Week3)
        this.Total_Week4 += Number(this.tempData[j].Week4)
        this.Total_Week5 += Number(this.tempData[j].Week5)
        //this.GrandTotal += Number(this.tempData[j].TotalAmount)
    }
  }

  //clickedRows = new Set<IRow>();
  showItemsByCustID(rowItem:any)
  {
      //console.log('selected row',event);
      //alert(rowItem.ShopName);
      const dialogRef = this.dialog.open(ItemsByCustIDComponent, {
        data: {selectedID:rowItem.CustID,selectedArea: rowItem.Area, selectedShop: rowItem.ShopName,selectedDate:this.date1},
        height: '500px',
        width: '450px',
        position: {left:'10px' }
      });
  }

  filterChanged(filterText: string) {

    if (filterText && this.dataSource) {
      let props = ['ITEMNAME'];
      this.filteredItems = this.dataFilter.filter(this.dataTable, props, filterText);
      console.log('filtered items= ',this.filteredItems);
    }
    else {
      this.filteredItems = this.dataTable;
    }
    //this.rowData = this.filteredItems;
    this.findTotals(this.filteredItems);
  }

bindAreasList(strArea:string)
{
  var sessionAreasList = sessionStorage.getItem('AreasList') || '';
  //if (sessionAreasList) { this.filteredItems = []; return };
  if (!sessionAreasList)
  {
    this.sharedService.getBellAreas(strArea,'n','n').subscribe((response: Areas[]) => {
      this.objAreas = response;
      sessionStorage.setItem('AreasList',JSON.stringify(this.objAreas));
      //console.log('Area names : ', response);
    },
    (err: any) => console.log(err),
    () => console.log('getCustomersPage() retrieved customers'));
  }
  else
  { this.objAreas = JSON.parse(sessionAreasList);
    //console.log('Areas retrieved from Session: ', this.objAreas);
  }
}

onChange(event:any) {
  console.log('event.value: ',event.value.Area);
  this.bindShopNames(event.value.Area);

  for(var item in this.selectedArea){

    console.log(this.selectedArea[item]);
    //for(var row in this.selectedArea[item]){
      //console.log('selected area =', this.dataTable[item][row]); //is working
    //}
  }
  console.log('selected area  :' + this.selectedArea[0].Area);
}
onShopsChange(event:any) {
  console.log('selected Shop  :' + this.selectedShop);
  console.log('event.value: ',event.value.Shop);
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

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
