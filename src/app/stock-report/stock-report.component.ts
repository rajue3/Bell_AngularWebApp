import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from "src/app/shared.service";
import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { ItemDetails, Areas, tblSalesReport } from '../shared/interfaces';
import { AlertService } from '../shared/_alert';
import { interval, Subscription } from 'rxjs';
// import * as _moment from 'moment';
//import { Moment } from 'moment';
import { formatDate } from "@angular/common";
import { DateAdapter } from '@angular/material/core';
//import { ItemsByCustIDComponent } from './itemslist.component';
import { MatDialog, } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

// export interface SelectedRowDetails {
//   ShopName: string;
//   Area: string;
//   TotalItems: number;
//   TotalAmount: number;
// }
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}
interface Categories {
  Category: string;
}
@Component({
  selector: 'stock-report',
  templateUrl: './stock-report.component.html',
  styleUrl: './stock-report.component.css'
})
export class StockReportComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  dataSource: ItemDetails[] = [];
  filteredItems: ItemDetails[] = [];
  
  dataSource2: any;
  dataTable: any[] = [];
  dynamicColumns: any[] = [];
  dynamicTableRows?:string;

  totalRecords: number = 0;
  pageSize: number = 10;
  showSpinner: boolean = false;
  value = 0;
  loading = false;
  //selectedArea: string = 'all';
  //selectedShop: string = 'all';
  date1: any;
  date2: any;
  pFromDate: any;
  pToDate: any;  //Date | undefined;
  
  billDate1 = new FormControl(new Date());
  billDate2 = new FormControl(new Date());
  
  //serializedDate = new FormControl(new Date().toISOString());
  clickedRows = new Set<ItemDetails>();
  searchByBillDate: boolean = false;
  submitting1 = false;
  submitting2 = false;
  submitting3 = false;
  filtertext: string = '';
  reportHeader:string = '';
  reportName:string='';
  selectedCategory:string='all';
  selectedTransType:string='all';
  selectedUser:string='all';
  objUsers!: Areas[];

  showGrid1:boolean = false;
  showGrid2:boolean = false;
  cols!: Column[];
  exportColumns!: ExportColumn[];

  objCategories!: Areas[];
  selectedCategories!:Areas[];

  constructor(private router: Router, private dataService: DataService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private dataFilter: DataFilterService, private sharedService: SharedService,
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy - to change date format for Mat datepicker
  }

  ngOnInit(): void {    
    this.pFromDate = formatDate(new Date(),'dd-MMM-yyyy','en-US');
    this.pToDate = formatDate(new Date(),'dd-MMM-yyyy','en-US');
    //alert(this.pFromDate);
    this.BindAllCategories();
    this.BindAllUserNames();

    if (sessionStorage.getItem('billDate1'))
      {
          let sessionDate1 = new Date(sessionStorage.getItem('billDate1')!)
          let sessionDate2 = new Date(sessionStorage.getItem('billDate2')!)
          this.billDate1 = new FormControl(new Date(sessionDate1));
          this.billDate2 = new FormControl(new Date(sessionDate2));
      }
    this.ViewOutofStockItemsClicked('MinOrder');
  }
  
  ngAfterViewInit() {
    //alert(this.sharedService.ShowOutofStockAlert());
    //this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Few Items are running out of stock.View outof Stock Items and place an order...', sticky: true });
  }
  
  BindAllCategories()
  {  
      this.sharedService.getBellAreas('category','n','n').subscribe((response: Areas[]) => {
        this.objCategories = response;
        //console.log('BindAllCategories(): ', this.objCategories);
      },
      (err: any) => console.log(err),
      () => console.log('BindAllCategories() retrieved Categories'));
  }
  BindAllUserNames()
  {  
      this.sharedService.getBellAreas('users','n','n').subscribe((response: Areas[]) => {
        this.objUsers = response;
        //console.log('BindAllUserNames(): ', this.objUsers);
      },
      (err: any) => console.log(err),
      () => console.log('BindAllUserNames() retrieved Users'));
  }
  BindReportFromSession() {
    this.showGrid1 = true;
    this.showGrid2 = false;
    var sessionDataSource = sessionStorage.getItem('Report5_DataSource') || '';
    if (!sessionDataSource) { this.filteredItems = []; return };
    this.reportName = sessionStorage.getItem('reportName') || '';
    this.dataSource = this.filteredItems = JSON.parse(sessionDataSource);
    //console.log('sesson data from ngAfterViewInit: ', JSON.parse(sessionDataSource));
    this.submitting1 = false;
  }

getselectedCategories()
  {
    this.selectedCategory = 'all';
    if (this.selectedCategories)
    {
      if (this.selectedCategories.length == this.objCategories.length)
      {
        //alert('all areas selected');
        this.selectedCategory = 'all';
      }
      else{
        //console.log('selectedCategories.length= ',this.selectedCategories.length)
        for(var item in this.selectedCategories)
          {
            //console.log(this.selectedAreas[item].Area);
            if (item == "0")
            {
              this.selectedCategory = '[' + this.selectedCategories[item].Line  + ']';
            }
            else
            {
              this.selectedCategory = this.selectedCategory + ',' + '[' + this.selectedCategories[item].Line + ']';
            }
          }
        }
    }    
    //console.log ('this.selectedCategory = ', this.selectedCategory);
    return this.selectedCategory;
  }
  ViewOutofStockItemsClicked(strOption: any) {
    this.showGrid1 = true;
    this.showGrid2 = false;
    this.sharedService.GetStockDetails(strOption,this.selectedCategory).subscribe((response: ItemDetails[]) => {
      //this.dataSource = response;
      this.dataSource = this.filteredItems = response;
      this.dataSource2 = <any>response;
      //console.log('received items :',this.filteredItems)
      this.reportHeader = "Total Items " + this.filteredItems.length;
      this.reportName = 'Report :: View outof Stock Items';
      sessionStorage.setItem('Report5_DataSource', JSON.stringify(this.filteredItems));      
      if (this.dataSource.length == 0) { this.submitting1 = false; }

      this.cols = [
        { field: 'ItemCode', header: 'ItemCode', customExportHeader: 'Item Code' },
        { field: 'ItemName', header: 'ItemName', customExportHeader: 'Item Name' },
        { field: 'CATEGORY', header: 'CATEGORY', customExportHeader: 'Category' },
        { field: 'MRP', header: 'MRP' },
        { field: 'Rate', header: 'Rate' },
        { field: 'Description', header: 'Description', customExportHeader: 'Min Order Alert' },
        { field: 'Qty', header: 'Qty', customExportHeader: 'Stock in Box'},
        { field: 'STOCK', header: 'STOCK', customExportHeader:'Packets' }
      ];
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

      //console.log('EXPORT column names from loop =',this.exportColumns);
      this.submitting1 = false;
      //console.log('exportColumns Details :', this.dynamicColumns);
    },
      (err: any) => console.log('Error occured at ViewOutofStockItemsClicked :',err),
      () => this.submitting1 = false);
  }
  
  ViewAllItemsClicked(strOption: any) {   
    this.showGrid1 = true;
    this.showGrid2 = false;

    this.submitting1 = false;    
    this.submitting2 = true;    
    this.submitting3 = false;    
    
    this.sharedService.GetStockDetails(strOption,this.selectedCategory).subscribe((response: ItemDetails[]) => {
      //this.dataSource = response;
      this.dataSource = this.filteredItems = response;
      this.reportHeader = "Total Items " + this.filteredItems.length;
      this.reportName = 'View All Items';
      if (this.dataSource.length == 0) { this.submitting2 = false; }
      //sessionStorage.setItem('Report5_DataSource', JSON.stringify(this.filteredItems));
      //console.log('ViewAllItems Stock Details :',response);
      this.cols = [
        { field: 'ItemCode', header: 'ItemCode', customExportHeader: 'Item Code' },
        { field: 'ItemName', header: 'ItemName', customExportHeader: 'Item Name' },
        { field: 'CATEGORY', header: 'CATEGORY', customExportHeader: 'Category' },
        { field: 'MRP', header: 'MRP' },
        { field: 'Rate', header: 'Rate' },
        { field: 'Description', header: 'Description', customExportHeader: 'Min Order Alert' },
        { field: 'Qty', header: 'Qty', customExportHeader: 'Stock in Box'},
        { field: 'STOCK', header: 'STOCK', customExportHeader:'Packets' }
      ];
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    },
      (err: any) => console.log('Error occured at ViewAllItemsClicked:',err),
      () => this.submitting2 = false);    
  }

  //this is to get all StockEntries using given filters.
  ViewRawMaterialsUsageClicked(strOption:any) {

    //alert(formatDate(this.pFromDate,'dd-MMM-yyyy','en-US'));
    this.showGrid1 = false;
    this.showGrid2 = true;
    this.submitting1 = false;    
    this.submitting2 = false;    
    this.submitting3 = true;   
    //this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.pFromDate,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.pToDate,'dd-MMM-yyyy','en-US');
    sessionStorage.setItem('billDate1',JSON.stringify(this.date1));
    sessionStorage.setItem('billDate2',JSON.stringify(this.date2));

    this.sharedService.GetStockTransactions(this.selectedCategory,this.selectedTransType,this.date1,this.date2,this.selectedUser).subscribe((response: any[]) => {
      //this.dataSource = response;
      this.dataSource2 = <any>response;
      this.dataTable = this.filteredItems = JSON.parse(this.dataSource2);
      this.reportHeader = "Total Items " + this.dataTable.length;
      this.reportName = 'Stock Entries : ' + this.selectedTransType;      
      //console.log('Stock Transactions this.dataTable[0]:',this.dataTable[0]);

      this.dynamicColumns = Object.keys(this.dataTable[0]);
      let newCol:any;
      this.cols = [];
      console.log('this.dataTable.length :',this.dataTable.length)
      if (this.dataTable.length == 0) { this.submitting3 = false; }
      for(var item in this.dynamicColumns){
        if(this.dynamicColumns[item] == 'ITEMNAME')
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:true};
        else
          newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false};
        //console.log('newcol=',newCol);
        this.cols.push(newCol);
      }
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
      //console.log('eXPORT column names from loop =',this.exportColumns);
      //this.submitting3 = false;
    },
      (err: any) => console.log('Error occured at ViewRawMaterialsUsageClicked:',err),
      () => this.submitting3 = false   );
    //this.submitting3 = false;
  }  

  formatFieldValue(colHeader:any,colValue:any)
   {
      //console.log('colHeader indexOf = ',colHeader.includes('QTY'));
      if (colHeader != 'SNO.' && colHeader != 'SHOPNAME' && colHeader != 'NAME' && !colHeader.includes('QTY') )
      {
          //console.log('formatFieldValue',Number(colValue).toFixed(2));
          return Number(colValue).toFixed(2);
      }
      else
      {
        return colValue || 0;
      }
   }

  onRowClicked(rowItem: any) {
    //alert(rowItem);
    console.log('onclicked rowdata=',rowItem)
    //const dialogRef = this.dialog.open(ItemsByCustIDComponent, {
    //  data: { reportName: "itemsbyareadate", selectedArea: rowItem.Area, selectedDate: formatDate(rowItem.BillDate, 'dd-MMM-yyyy', 'en-US'), totalBills: rowItem.TotalBills },
    //  height: '500px',
    //  width: '450px',
    //  position: { left: '2px' }
    //});
  }
  onClearClicked() {
    //this.filtertext = '';    
    this.filterChanged('');
  }
  filterChanged(filterText: string) {
    if (filterText && this.dataSource) {
      //let props = ['ShopName', 'Area', 'TotalAmount','TotalItems'];
      let props = ['ItemName', 'CATEGORY', 'ItemCode'];
      this.filteredItems = this.dataFilter.filter(this.dataSource, props, filterText);
    }
    else {
      this.filteredItems = this.dataSource;
    }
  }

  changeSearchByDateOption(event: any) {
    this.searchByBillDate = event.target.checked;
    //console.log(event.target.checked);
  }
  
  loadContent() {
    this.loading = true;
    const subs$: Subscription = interval(200).subscribe(res => {
      this.value = this.value + 10;
      if (this.value === 120) {
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

  // visible: boolean = false;
  // showConfirm() {
  //   if (!this.visible) {
  //       this.messageService.add({ key: 'confirm', sticky: true, severity: 'success', summary: 'Can you send me the report?' });
  //       this.visible = true;
  //   }
  // }
  // onConfirm() {
  //   this.messageService.clear('confirm');
  //   this.visible = false;    
  //   this.router.navigate(['/stockrepor']);
  // }
  // onReject() {
  //   this.messageService.clear('confirm');
  //   this.visible = false;
  // }

}
