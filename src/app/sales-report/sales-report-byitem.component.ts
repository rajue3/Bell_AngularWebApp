import {AfterViewInit, Component,ElementRef,ViewChild } from '@angular/core';
import {FormGroup, Validators, FormControl,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from "src/app/shared.service";
import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { formatDate } from "@angular/common";
import { MatDialog} from '@angular/material/dialog';
import { ItemsByCustIDComponent } from './itemslist.component';
import { DateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

import { ItemDetails,BellCustDetails,BellAreaWiseOrders,Areas,Shops, IOrder, IPagedResults } from '../shared/interfaces';
// import { AlertService } from '../shared/_alert';
// import { interval, Subscription } from 'rxjs';
// import { MatPaginator } from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';
// import { Table,TableModule } from 'primeng/table';

// interface searchRequest {
//   reporttype: string,
//   area: string,
//   shop: string
//   itemname: string
//   date1: string
//   date2: string
// }

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
    isFrozenColumn: boolean;
}
interface ExportColumn {
    title: string;
    dataKey: string;
}
  @Component({
    selector: 'sales-by-item',
    templateUrl: './sales-report-byitem.component.html',
    styleUrl: './weekly-report.component.css'
  })

export class  SalesReportByItemComponent {

  //objSearch!: searchRequest[];
  //selectedCities!: City[];

  billDate1 = new FormControl(new Date());
  billDate2 = new FormControl(new Date());
  //serializedDate = new FormControl(new Date().toISOString());

  //dataSource?: IRow[];
  filteredItems: any[] = [];
  filteredItems22: any[] = [];
  dataSource: any;
  dataTable: any[] = [];
  dynamicColumns: any[] = [];
  dataSource22: any;
  dataTable22: any[] = [];
  dynamicColumns22: any[] = [];

  selectedProducts!: any[];

  totalRecords: number = 0;
  pageSize: number = 10;
  showSpinner: boolean=false;
  value = 0;
  loading = false;
  selectedArea: string = 'all';
  selectedShop: string = 'all';
  selectedItem: string = 'all';
  objAreas!: Areas[];
  selectedAreas!:Areas[];
  objShops!: Areas[];
  objItems!: any[];
  totalShops:any = 0;
  date1:any;
  date2:any;
  form!: FormGroup;
  submitting1:boolean = false;
  submitting2:boolean = false;
  submitting3:boolean = false;
  submitting4:boolean = false;
  grandTotalQty:number = 0;
  selectedReportName:string = '';
  //formGroup: FormGroup | undefined;
  showGrid2:boolean = false;
  //exportGrid2:string = "dt3.exportCSV()";
  showHideGrid:string = "style='display: none'";

  @ViewChild('#grid2') elementRef?: ElementRef<HTMLDivElement>;

  private tempData:any;
  //tablesize: string = 'p-datatable-gridlines'; //'p-datatable-sm'; //p-datatable-striped

   constructor(private router: Router, private dataService: DataService,
      private formBuilder: FormBuilder,public dialog: MatDialog,
      private dataFilter: DataFilterService, private sharedService: SharedService,
      private dateAdapter: DateAdapter<Date>)
    {
        const currentDate = new Date();
        const priorDate = new Date().setDate(currentDate.getDate() - 30);
        //console.log('previous month:', new Date(priorDate).toDateString());
        this.billDate1 = new FormControl(new Date(priorDate));

        this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy - to change date format for Mat datepicker
      }

      cols: Column[] = [];
      cols22: Column[] = [];
  exportColumns!: ExportColumn[];
  exportColumns22!: ExportColumn[];

  ngOnInit(): void {

   this.bindAreasList('lines');
   //this.bindShopNames(this.selectedArea);
   this.bindItemNames('all','all');
  //   this.form = this.formBuilder.group({
  //     Area: ['', Validators.required],
  //     Shop: ['', Validators.required],
  //     Item: ['', Validators.required],
  //     Date1: ['', Validators.required],
  //     Date2: ['', Validators.required]
  // });
  }
  //get frmReport() { return this.form.controls; }

  ngAfterViewInit() {  }

  formateMyDate(params:any) {
    return params.value.format('MM/DD/YYYY HH:mm');
  }

  unsorted(a: any, b: any): number { return 0; }

  getSelectedAreaNames()
  {
    this.selectedArea = 'all';
    if (this.selectedAreas)
    {
      if (this.selectedAreas.length == this.objAreas.length)
      {
        //alert('all areas selected');
        this.selectedArea = 'all';
      }
      else{
        console.log('selectedAreas.length= ',this.selectedAreas.length)
        for(var item in this.selectedAreas)
          {
            //console.log(this.selectedAreas[item].Area);
            if (item == "0")
            {
              this.selectedArea = '[' + this.selectedAreas[item].Line + ']';
            }
            else
            {
              this.selectedArea = this.selectedArea + ',' + '[' + this.selectedAreas[item].Line + ']';
            }
          }
        }
    }
    else
    {
      this.selectedArea = 'all';
    }
    return this.selectedArea;
  }
  ViewReturnPercentage(strType:any) {
    if (!this.selectedAreas || this.selectedAreas.length == 0)
      {
          alert('Please select one or few Line Name(s) for better result.');
          return;
      }
    this.selectedReportName = 'Weeek wise returns Percentage(%)';
    this.submitting4 = true;
    this.showGrid2 = false;
    this.showHideGrid = "none";
    this.ViewClicked(strType);
  }
  ViewByAreaClicked(strType:any) {
    this.selectedReportName = 'View by Area';
    this.submitting1 = true;
    this.showGrid2 = false;
    this.showHideGrid = "none";
    this.ViewClicked(strType);

  }
  ViewByShopClicked(strType:any) {
    this.selectedReportName = 'View by Shop';
    if (!this.selectedAreas)
    {
        alert('Please select one Line Name and click View by Shop.');
        return;
    }
    else if (this.selectedAreas.length == 0)
    {
        alert('Please select one Line Name and click View by Shop.');
        return;
    }
    if (this.selectedAreas && this.selectedAreas.length > 1)
    {
        alert('Please select only one Line Name for correct result.');
        return;
    }
    this.submitting2 = true;
    this.showGrid2 = false;
    this.showHideGrid = "none";
    this.ViewClicked(strType);
    //this.submitting2 = false;
  }
  ViewByDateClicked(strType:any) {
    this.selectedReportName = 'View by Date';
    if (this.selectedItem == '' || this.selectedItem == 'all')
    {
      alert('Please select Item name and click View by Date.');
      return;
    }
    this.submitting3 = true;
    this.ViewClicked(strType);
    //this.submitting3 = false;
    this.showGrid2 = true;
    this.showHideGrid = "block";
    this.ShowLinesWithNoSales();
  }

  ShowLinesWithNoSales()
  {
    this.grandTotalQty = 0;
    var totalQty:any;
    this.selectedArea = 'all';
    if (this.selectedAreas)
    {
      if (this.selectedAreas.length == this.objAreas.length)
      {
        this.selectedArea = 'all';
      }
      else{
        console.log('selectedAreas.length= ',this.selectedAreas.length)
        for(var item in this.selectedAreas)
          {
            //console.log(this.selectedAreas[item].Area);
            if (item == "0")
            {
              this.selectedArea = '[' + this.selectedAreas[item].Line + ']';
            }
            else
            {
              this.selectedArea = this.selectedArea + ',' + '[' + this.selectedAreas[item].Line + ']';
            }
          }
        }
    }
    else
    {
      this.selectedArea = 'all';
    }

    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');

      var objSearchVal = {
        reporttype: 'ShowLinesWithNoSales', area: this.selectedArea, shop: this.selectedShop,itemname:this.selectedItem,date1:this.date1,date2:this.date2
      };
      //console.log('request =', objSearchVal);
        this.sharedService.getBellWeeklyReportNew(objSearchVal).subscribe((response22: any[]) => {
      //console.log('ShowLinesWithNoSales response=', response22);
      //if (response22 === null ) {return;}
      if (!response22) {
        //console.log('request if null =', response22);
         this.submitting1 = false;
         this.submitting2 = false;
         this.submitting3 = false;
         this.submitting4 = false;
         this.dataTable22 = this.filteredItems22 = [];
         return;
      }
      {
          this.dataSource22 = <any>response22;
          this.dataTable22 = this.filteredItems22 = JSON.parse(this.dataSource22);
          //this.dataTable22 = this.filteredItems22 = this.dataSource22;
          //console.log('filteredItems22 = ', this.filteredItems22);
          //this.dynamicColumns22 = this.dataTable22[0];
          this.dynamicColumns22 = Object.keys(this.dataTable22[0]);
          let newCol22:any;
          this.cols22 = [];
          for(var item in this.dynamicColumns22){
              newCol22 = {field:this.dynamicColumns22[item],header:this.dynamicColumns22[item],customExportHeader:this.dynamicColumns22[item],isFrozenColumn:false};
              this.cols22.push(newCol22);
              //console.log('newcol22=',newCol22);
          }
          //console.log ('cols22=',this.cols22);
          this.exportColumns22 = this.cols22.map((col22) => ({ title: col22.header, dataKey: col22.field }));
      }
      this.submitting1 = false;
      this.submitting2 = false;
      this.submitting3 = false;
      this.submitting4 = false;
     },
     (err: any) => console.log(err),
     () => console.log('Error occured in sales-report-byitem at ViewClicked22() '));
  }

  ViewClicked(strType:any) {
    this.grandTotalQty = 0;
    var totalQty:any;
    //console.log('selected areas',this.selectedAreas);
    //alert(this.selectedAreas.length);
    this.selectedArea = 'all';
    if (this.selectedAreas)
    {
      if (this.selectedAreas.length == this.objAreas.length)
      {
        //alert('all areas selected');
        this.selectedArea = 'all';
      }
      else{
        console.log('selectedAreas.length= ',this.selectedAreas.length)
        for(var item in this.selectedAreas)
          {
            //console.log(this.selectedAreas[item].Area);
            if (item == "0")
            {
              this.selectedArea = '[' + this.selectedAreas[item].Line + ']';
            }
            else
            {
              this.selectedArea = this.selectedArea + ',' + '[' + this.selectedAreas[item].Line + ']';
            }
          }
        }
    }
    else
    {
      this.selectedArea = 'all';
    }
    if (strType == 'byarea')
    {
       console.log('calling bindShopNames',this.selectedArea);
       this.bindShopNames(this.selectedArea);
    }

    //this.date1 = this.range.controls.start.value;
    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');
    //debugger
    //this.sharedService.getBellWeeklyReportNew('Khammam','all','2024-05-01','2024-05-30').subscribe((response: any[]) => {

    // if (strArea=='' || (strArea=='all' && this.selectedShop=='all' && this.selectedItem=='all' ))
    //   {
    //       alert('Please select Area Name or Item Name');
    //       this.submitting = false;
    //       return;
    //   }
      var objSearchVal = {
        reporttype: strType, area: this.selectedArea, shop: this.selectedShop,itemname:this.selectedItem,date1:this.date1,date2:this.date2
      };
      //console.log('request =', objSearchVal);
      //this.sharedService.getBellWeeklyReportNew(strType,this.selectedArea,this.selectedShop,this.selectedItem,this.date1,this.date2).subscribe((response: any[]) => {
        this.sharedService.getBellWeeklyReportNew(objSearchVal).subscribe((response: any[]) => {
      //console.log('response=', response);
      //if (response === null ) {return;}
      if (!response) {
        //console.log('request if null =', response);
         this.submitting1 = false;
         this.submitting2 = false;
         this.submitting3 = false;
         this.submitting4 = false;
         this.dataTable = this.filteredItems = [];
         return;
      }
      {
          this.dataSource = <any>response;
          this.dataTable = this.filteredItems = JSON.parse(this.dataSource);
          //console.log('response = ', this.dataTable);
          //const obj = JSON.parse(this.dataSource);
          //this.dataTable = Object.values(obj);
          this.dynamicColumns = Object.keys(this.dataTable[0]);
          //let strCols:string = "";
          let newCol:any;
          this.cols = [];
          for(var item in this.dynamicColumns){
            if(this.dynamicColumns[item] == 'SHOPNAME' || this.dynamicColumns[item] == 'AREA')
              newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:true};
            else
              newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false};
            //console.log('newcol=',newCol);
            this.cols.push(newCol);
          }

          //To show Total Qty count for only if all Area selected.
          if (strType =='byarea') //this.selectedArea == 'all'
          {
            newCol = {field:"TOTAL",header:"TOTAL",customExportHeader:"TOTAL",isFrozenColumn:false};
            this.cols.push(newCol);
            //for (var row:number=0;row < this.dataTable.length;row++)
            for(var row in this.dataTable)
              {
              totalQty = 0;
              //for(var col:number=2; col<=this.dynamicColumns.length;col++)
              //for(var col in this.dataTable[row])
              for(var col in this.dynamicColumns)
              {
                //console.log('this.dynamicColumns[col]', this.dynamicColumns[col]);
                if( this.dynamicColumns[col] != 'SNO.' && this.dynamicColumns[col] != 'AREA' && this.dynamicColumns[col] != 'ITEMNAME' && this.dynamicColumns[col] != 'NAME')
                {
                  totalQty = totalQty + this.filteredItems[row][this.dynamicColumns[col]];
                  //totalQty = totalQty + Number(this.dataTable[row][col]);
                  //console.log('loop through rows & cols : ',this.dataTable[row][this.dynamicColumns[col]]);
                }
              }
              this.filteredItems[row]["TOTAL"] = totalQty;
              this.grandTotalQty = this.grandTotalQty + totalQty
            }
        }
        // else  //if Item name selected
        // {
        //   for(var row in this.dataTable)
        //     {
        //     totalQty = 0;
        //     //for(var col:number=2; col<=this.dynamicColumns.length;col++)
        //     //for(var col in this.dataTable[row])
        //     for(var col in this.dynamicColumns)
        //     {
        //       //console.log('this.dynamicColumns[col]', this.dynamicColumns[col]);
        //       if( this.dynamicColumns[col] != 'SHOPNAME' && this.dynamicColumns[col] != 'SNO.' && this.dynamicColumns[col] != 'ITEMNAME' && this.dynamicColumns[col] != 'NAME')
        //       {
        //         totalQty = totalQty + this.filteredItems[row][this.dynamicColumns[col]];
        //         //totalQty = totalQty + Number(this.dataTable[row][col]);
        //         //console.log('loop through rows & cols : ',this.dataTable[row][this.dynamicColumns[col]]);
        //       }
        //     }
        //     //this.filteredItems[row]["TOTAL"] = totalQty;
        //     this.grandTotalQty = this.grandTotalQty + totalQty
        //   }
        // }
          //this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
          //console.log('column names from loop =',this.cols);
          //console.log('datasource =',this.filteredItems);
      }
      this.submitting1 = false;
      this.submitting2 = false;
      this.submitting3 = false;
      this.submitting4 = false;
         //console.log('Column names =',this.dynamicColumns);
     },
     (err: any) => console.log(err),
     () => console.log('Error occured in sales-report-byitem at ViewClicked() '));
     //this.submitting = false;
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
      let props = ['ITEMNAME'];
      this.filteredItems = this.dataFilter.filter(this.dataTable, props, filterText);
    }
    else {
      this.filteredItems = this.dataTable;
    }
    //this.rowData = this.filteredItems;
  }

bindAreasList(strArea:string)
{
  //alert(strArea);
  if (strArea)
  {
    this.sharedService.getBellAreas(strArea,'n','n').subscribe((response: Areas[]) => {
      this.objAreas = response;
      //console.log(response);
    },
    (err: any) => console.log(err),
    () => console.log('BindAreasList() retrieved Areas'));
  }
}
bindItemNames(areaName:string,shopName:string)
{
    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');
    this.sharedService.getBellItems('all','all',this.date1,this.date2).subscribe((response: any[]) => {
      this.objItems = response;
      //console.log('All Items:',response);
    },
    (err: any) => console.log(err),
    () => console.log('getItems() retrieved Items'));
    //if (areaName && shopName)
    //{
    //}
}
bindShopNames(areaName:any)
{
  areaName = this.getSelectedAreaNames().replace('[','').replace(']','');
  console.log('Binding shopnames...', areaName);
  this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');
  if (areaName)
  {
    this.totalShops = 0;
    if (areaName=='all')
    {
      this.objShops = [];
    }
    else
    {
      this.sharedService.getBellAreas(areaName,this.date1,this.date2).subscribe((response: Areas[]) => {
        this.objShops = response;
        this.totalShops = response.length;
        //console.log(response);
      },
      (err: any) => console.log(err),
      () => console.log('bindShopNames() retrieved Shop names'));
    }
    //this will show all items under selected Area (since selectedShop = All)
    this.bindItemNames(areaName,this.selectedShop);
  }
}

}
