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

  // import {ModuleRegistry, ColDef, ValueGetterParams } from 'ag-grid-community'; // Column Definition Type Interface
  // import {ColGroupDef,GridApi,GridOptions,createGrid} from "ag-grid-community";
  // import { ClientSideRowModelModule } from "ag-grid-community";
  // ModuleRegistry.registerModules([ClientSideRowModelModule]);

  interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
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
// export interface IRow {
//     Area: string;
//     ShopName: string;
//     CustomerName: string;
//     Week1: number;
//     Week2: number;
//     Week3: number;
//     Week4: number;
//     TotalAmount: number;
//   }

  @Component({
    selector: 'weekly-report',
    templateUrl: './weekly-report.component.html',
    styleUrl: './weekly-report.component.css'
  })

export class  WeeklyReportComponent {
  billDate = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  clickedRows = new Set<SelectedRowDetails>();

  //dataSource?: IRow[];
  filteredItems: any[] = [];
  dataSource: any[] = [];
  selectedProducts!: any[];
  //filteredItems?: MatTableDataSource<IRow>
  //matDataSource: MatTableDataSource<IRow>;

  displayedColumnsTest: string[] = ['Area'];
  displayedColumns: string[] = ['Area','CustomerName','ShopName','Week1','Week2','Week3','Week4','TotalAmount'];

  totalRecords: number = 0;
  pageSize: number = 10;
  showSpinner: boolean=false;
  value = 0;
  loading = false;
  selectedArea: string = 'all';
  objAreas!: Areas[];
  objShops!: Areas[];
  date1:any;
  //date2:any;
  Total_Week1 : number = 0;
  Total_Week2 : number = 0;
  Total_Week3 : number = 0;
  Total_Week4 : number = 0;
  Total_Week5 : number = 0;
  GrandTotal : number = 0;
  private tempData:any;

  //public rowData?: any[] | null = [];
  //rowData: any[] = [];
  //public columnDefs: ColDef[] = [{ field: "Area" },{ field: "ShopName" },{ field: "CustomerName" },{ field: "Week1" },{ field: "Week2" }];

   constructor(private router: Router, private dataService: DataService,
      private formBuilder: FormBuilder,public dialog: MatDialog,
      private dataFilter: DataFilterService, private sharedService: SharedService)
    {
        //this.matDataSource = new MatTableDataSource(this.dataSource);
    }

    cols!: Column[];
    exportColumns!: ExportColumn[];

  ngOnInit(): void {
    this.bindAreasList('lines');
    this.cols = [
      { field: 'Area', header: 'Area', customExportHeader: 'Area' },
      { field: 'CustomerName', header: 'CustomerName' },
      { field: 'ShopName', header: 'ShopName' },
      { field: 'Week1', header: 'Week1' },
      { field: 'Week2', header: 'Week2' },
      { field: 'Week3', header: 'Week3' },
      { field: 'Week4', header: 'Week4' },
      { field: 'TotalAmount', header: 'TotalAmount' }
    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

    //this.ViewClicked('');
    //this.matDataSource = new MatTableDataSource(this.dataSource);
    //this.matDataSource.paginator = this.paginator!;
    //this.matDataSource.sort = this.sort || null;
  }

  ngAfterViewInit() {
    //this.matDataSource.paginator = this.paginator!;
    //this.matDataSource.sort = this.sort || null;
  }

  getTotalWeek1() {
    //this.Total_Week1 = this.filteredItems.map(t => t.Week1).reduce((acc, value) => acc + value, 0);
    //console.log('Total_Week1 = ', this.Total_Week1);
    return this.Total_Week1;
    //return this.filteredItems.map(t => t.Week1).reduce((acc, value) => acc + value, 0);
  }
  getTotalWeek2() {
    return this.Total_Week2;
    //return this.filteredItems.map(t => t.Week2).reduce((acc, value) => acc + value, 0);
  }
  getTotalWeek3() {
    return this.Total_Week3;
    //return this.filteredItems.map(t => t.Week3).reduce((acc, value) => acc + value, 0);
  }
  getTotalWeek4() {
    return this.Total_Week4;
    //return this.filteredItems.map(t => t.Week4).reduce((acc, value) => acc + value, 0);
  }
  getTotalAll() {
    return this.GrandTotal;
   // return this.filteredItems.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
  }

  formateMyDate(params:any) {
    return params.value.format('MM/DD/YYYY HH:mm');
  }

   ViewClicked(strArea:any) {
    //alert(this.billDate.value);
    //this.date1 = this.range.controls.start.value;
    this.date1 = this.billDate.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    //alert(this.date1);

    this.sharedService.getBellWeeklyReport(strArea,this.date1).subscribe((response: any[]) => {
      //this.dataSource = response;
      this.dataSource = this.filteredItems = response;
      this.findTotals(response);
      //this.filteredItems = response;
      //this.matDataSource = new MatTableDataSource(this.dataSource);
      //console.log('ViewClicked',response);
     },
     (err: any) => console.log(err),
     () => console.log('Retrieved LS Items using getBellWeeklyReport() '));
  }
  findTotals(data:any){
    //debugger
    this.Total_Week1=0;
    this.Total_Week2=0;
    this.Total_Week3=0;
    this.Total_Week4=0;
    this.GrandTotal=0;
    this.tempData=data;
    for(let j=0;j<data.length;j++){
        //console.log(Number(this.tempData[j].Week1));
        this.Total_Week1 += Number(this.tempData[j].Week1)
        this.Total_Week2 += Number(this.tempData[j].Week2)
        this.Total_Week3 += Number(this.tempData[j].Week3)
        this.Total_Week4 += Number(this.tempData[j].Week4)
        this.GrandTotal += Number(this.tempData[j].TotalAmount)
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
      //let props = ['ShopName', 'Area', 'TotalAmount','TotalItems'];
      //alert(filterText);
      let props = ['Area','ShopName','CustomerName'];
      this.filteredItems = this.dataFilter.filter(this.dataSource, props, filterText);
    }
    else {
      this.filteredItems = this.dataSource;
    }
    //this.rowData = this.filteredItems;
    this.findTotals(this.filteredItems);
  }

bindAreasList(strArea:string)
{
  //alert(strArea);
  this.sharedService.getBellAreas(strArea,'n','n').subscribe((response: Areas[]) => {
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

}
