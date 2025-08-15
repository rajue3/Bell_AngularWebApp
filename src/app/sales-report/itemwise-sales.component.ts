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
import { ChartModule } from 'primeng/chart';

import { ItemDetails,BellCustDetails,BellAreaWiseOrders,Areas,Shops, IOrder, IPagedResults } from '../shared/interfaces';
import { ChartDataset } from 'chart.js';
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
    isFrozen: string;
}
interface ExportColumn {
    title: string;
    dataKey: string;
}
 interface objChartData {
    labels: string[];
    //datasets:string[];
    datasets:objChartDatasets[];
  }
interface objChartDatasets {
    label: string;
    data:string[];
    borderColor: string;
    backgroundColor:string;
  }

  @Component({
    selector: 'itemwise-sales',
    templateUrl: './itemwise-sales.component.html',
    styleUrl: './weekly-report.component.css',
    styles: [
        `:host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }
        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }`
    ],
  })

export class  ItemWiseSalesComponent {

  //objSearch!: searchRequest[];
  //selectedCities!: City[];
  chartdata!: objChartData;
  chartdatasets!: objChartDatasets[];
  dynamicBGColor!:string;
  dynamicBorderColor!:string;

  ChartData: any;
  ChartOptions: any;

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
  selectedItems!:any[];
  objShops!: Areas[];
  objItems!: any[];
  totalShops:any = 0;
  date1:any;
  date2:any;
  form!: FormGroup;
  submitting0:boolean = false;
  submitting1:boolean = false;
  submitting2:boolean = false;
  submitting3:boolean = false;
  submitting4:boolean = false;
  grandTotalQty:number = 0;
  selectedReportName:string = '';
  //formGroup: FormGroup | undefined;
  //showGrid2:boolean = false;
  showHideGrid:string = "style='display: none'";

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
      //cols22: Column[] = [];
  exportColumns!: ExportColumn[];
  //exportColumns22!: ExportColumn[];

  ngOnInit(): void {
   //this.BindChartData(this.chartdata);
   this.bindAreasList('lines');
   //this.bindShopNames(this.selectedArea);
   this.bindItemNames('all','all');
  }

  ngAfterViewInit() {  }

  generateChartDataFromDataTable()
  {
    this.dataTable = JSON.parse(this.dataSource);
    //const obj = JSON.parse(this.dataSource);
    //this.dataTable = Object.values(obj);

    this.chartdatasets = [];
    this.dynamicColumns = Object.keys(this.dataTable[0]);
    let coldata : string[];
    let colname : string;
    let categories:string[];
    let varChartdataset : objChartDatasets;
    categories = [];
    console.log('this.dynamicColumns.length',this.dynamicColumns.length)
    for(var col=2;col<this.dynamicColumns.length;col++){
        coldata = [];
        categories = [];
        for(var item in this.dataTable){
          categories.push(this.dataTable[item]["NAME"]);
          colname = this.dynamicColumns[col];
          coldata.push(this.dataTable[item][colname])
          //console.log('Dynamic table rows =', this.dataTable[item][row]); //is working
        }
        this.getRandomRGB();
        varChartdataset = {label:this.dynamicColumns[col],data:coldata,borderColor:this.dynamicBorderColor,backgroundColor:this.dynamicBGColor}
        this.chartdatasets.push(varChartdataset);
      }
    this.chartdata = {labels:categories,datasets:this.chartdatasets};
    console.log('Chart datasets =', this.chartdata);
    this.BindChartData(this.chartdata);

      //<td *ngFor="let item of row | keyvalue">{{item.value}}</td>
    //for(let row=0;row<this.dataTable.length;row++){
  }
  getRandomRGB() {
  const r = Math.floor(Math.random() * 256);  // Red (0–255)
  const g = Math.floor(Math.random() * 256);  // Green (0–255)
  const b = Math.floor(Math.random() * 256);  // Blue (0–255)
  const op = 1;
  //return `rgb(${r}, ${g}, ${b},1)`;
  this.dynamicBorderColor = `rgb(${r}, ${g}, ${b})`;
  this.dynamicBGColor=`rgba(${r}, ${g}, ${b},${op})`;
  console.log('getRandomRGB called.',this.dynamicBorderColor)
}

BindChartData(varChartdata:objChartData) {
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.ChartData = varChartdata;

        this.ChartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
        };
  }

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
    console.log("selected Area/Line : ",this.selectedArea);
    //return this.selectedArea;
  }

  getSelectedItemNames()
  {
    //alert(this.selectedItems);
    this.selectedItem = 'all';
    if (this.selectedItems)
    {
      if (this.selectedItems.length == this.objItems.length)
      {
        //alert('all areas selected');
        this.selectedItem = 'all';
      }
      else{
        console.log('selectedItems.length= ',this.selectedItems.length)
        for(var item in this.selectedItems)
          {
            console.log('item = ', item);
            console.log(this.selectedItems[item].ItemName);
            if (item == "0")
            {
              this.selectedItem = '[' + this.selectedItems[item].ItemName + ']';
            }
            else
            {
              this.selectedItem = this.selectedItem + ',' + '[' + this.selectedItems[item].ItemName + ']';
            }
          }
        }
    }
    else
    {
      this.selectedItem = 'all';
    }
    console.log("selected ItemNames : ",this.selectedItem);
    //return this.selectedItem;
  }

  ItemWiseSalesClicked(strType:any) {
    if (this.ValidateInput())
    {
        this.selectedReportName = 'Item Wise Sales';
        this.submitting3 = true;
        //this.showGrid2 = false;
        //this.showHideGrid = "none";
        this.ViewClicked(strType);
    }
  }
  WeeklyItemWiseSalesClicked(strType:any) {
    if (this.ValidateInput())
    {
        this.selectedReportName = 'Weekly Item Wise Sales';
        this.submitting1 = true;
        //this.showGrid2 = false;
        //this.showHideGrid = "none";
        this.ViewClicked(strType);
    }
    // if (!this.selectedAreas)
    // {
    //     alert('Please select one Line/Area Name(s)...');
    //     return;
    // }
    // else if (this.selectedAreas.length == 0)
    // {
    //     alert('Please select one Line/Area Name(s).');
    //     return;
    // }
    // if (this.selectedItem == '' || this.selectedItems.length==0)
    // {
    //   alert('Please select Item name(s)...');
    //   return;
    // }
  }
  MonthlyItemWiseSalesClicked(strType:any) {
    if (this.ValidateInput())
    {
      this.selectedReportName = 'Monthly Item Wise Sales';
      this.submitting2 = true;
      //this.showGrid2 = false;
      this.showHideGrid = "none";
      this.ViewClicked(strType);
    }
  }
  ValidateInput() : boolean
  {
    if (!this.selectedAreas)
    {
        alert('Please select Line/Area Name(s)...');
        return false;
    }
    else if (this.selectedAreas.length == 0)
    {
        alert('Please select Line/Area Name(s).');
        return false;
    }
    // if (this.selectedAreas && this.selectedAreas.length > 1)
    // {
    //     alert('Please select only one Line Name for correct result.');
    //     return false;
    // }
    if (this.selectedItem == '')
    {
      alert('Please select Item name(s)...');
      return false;
    }
    return true;
  }
  ViewClicked(strType:any) {
    this.grandTotalQty = 0;
    var totalQty:number;
    //alert(this.selectedAreas.length);
    this.getSelectedItemNames();
    //console.log('selected Item names',this.selectedItem);
    //this.selectedArea = 'all';
    // if (strType === 'returns' && this.selectedArea === 'all' && this.selectedItem === 'all')
    // {
    //     alert('You have selected All Lines and All Items, this will take long time to get result, Please select few Lines or few Item Names and try.');
    //     this.HideLoader('all');
    //     return;
    // }
    // if (this.selectedAreas)
    // {
    //   if (this.selectedAreas.length == this.objAreas.length)
    //   {
    //     //alert('all areas selected');
    //     this.selectedArea = 'all';
    //   }
    //   else{
    //     //console.log('selectedAreas.length= ',this.selectedAreas.length)
    //     for(var item in this.selectedAreas)
    //       {
    //         //console.log(this.selectedAreas[item].Area);
    //         if (item == "0")
    //         {
    //           this.selectedArea = '[' + this.selectedAreas[item].Line + ']';
    //         }
    //         else
    //         {
    //           this.selectedArea = this.selectedArea + ',' + '[' + this.selectedAreas[item].Line + ']';
    //         }
    //       }
    //     }
    // }
    // else
    // {
    //   this.selectedArea = 'all';
    // }
    
    //this.date1 = this.range.controls.start.value;
    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'dd-MMM-yyyy','en-US');
    this.date2 = this.billDate2.value;
    this.date2 = formatDate(this.date2,'dd-MMM-yyyy','en-US');
    //debugger
    
      var objSearchVal = {
        reporttype: strType, area: this.selectedArea, shop: this.selectedShop,itemname:this.selectedItem,date1:this.date1,date2:this.date2
      };
      console.log('request payload =', objSearchVal);
        this.sharedService.getBellWeeklyReportNew(objSearchVal).subscribe((response: any[]) => {
      //console.log('response=', response);
      //if (response === null ) {return;}
      if (!response) {
        //console.log('request if null =', response);
         this.HideLoader('all');
         this.dataTable = this.filteredItems = [];
         return;
      }
      {
          this.dataSource = <any>response;
          this.dataTable = this.filteredItems = JSON.parse(this.dataSource);
          console.log('response = ', this.filteredItems);
          //const obj = JSON.parse(this.dataSource);
          //this.dataTable = Object.values(obj);
          this.dynamicColumns = Object.keys(this.dataTable[0]);
          //let strCols:string = "";
          let newCol:any;
          this.cols = [];
          for(var item in this.dynamicColumns){
            if(this.dynamicColumns[item] == 'SHOPNAME' || this.dynamicColumns[item] == 'AREA' ) //|| this.dynamicColumns[item] == 'NAME'
              newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:true,isFrozen:'pFrozenColumn'};
            else
              newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false,isFrozen:''};
            //console.log('newcol=',newCol);
            this.cols.push(newCol);
          }
          //this.generateChartDataFromDataTable();

          //To show Total Qty count 
          if (strType !='')
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
                if( this.dynamicColumns[col] != 'SNO.' && this.dynamicColumns[col] != 'AREA' && this.dynamicColumns[col] !='ITEMCODE' && this.dynamicColumns[col] != 'ITEMNAME' && this.dynamicColumns[col] != 'NAME')
                {
                  totalQty = totalQty + Number(this.filteredItems[row][this.dynamicColumns[col]]);
                  //totalQty = totalQty + Number(this.dataTable[row][col]);
                  //console.log('loop through rows & cols : ',this.dataTable[row][this.dynamicColumns[col]]);
                }
              }
              this.filteredItems[row]["TOTAL"] = totalQty.toFixed(2);
              this.grandTotalQty = this.grandTotalQty + totalQty
            }
        }
      }
      this.HideLoader('all');
         //console.log('Column names =',this.dynamicColumns);
     },
     (err: any) => console.log('Error occured in sales-report-byitem at ViewClicked()',err),
     () => this.HideLoader(strType));
  }

formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

  HideLoader(strReportName:any)
  {
      this.submitting1 = false;
      this.submitting2 = false;
      this.submitting3 = false;
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
      console.log(response);
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
      console.log('All Items:',response);
    },
    (err: any) => console.log(err),
    () => console.log('getItems() retrieved Items'));
    //if (areaName && shopName)
    //{
    //}
}


}
