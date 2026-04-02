import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from "src/app/shared.service";
import { DataFilterService } from '../..//core/data-filter.service';
import { DataService } from '../../core/data.service';
import { ItemDetails, Areas, tblSalesReport } from '../../shared/interfaces';
import { AlertService } from '../../shared/_alert';
import { interval, Subscription } from 'rxjs';
// import * as _moment from 'moment';
//import { Moment } from 'moment';
import { formatDate } from "@angular/common";
import { DateAdapter } from '@angular/material/core';
//import { ItemsByCustIDComponent } from './itemslist.component';
import { MatDialog, } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../_services';
import { User } from '../../_models';

interface SalesmanPendings
{
    billdate: string;
    line: string;
    salesman: string;
    partyname: string;
    amount: string;
    received: string;
    id: number;
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
interface MasterData {
  filedtype: string;
  fieldvalue: string;
}
@Component({
  selector: 'app-update-pending-dues',
  standalone: false,
  templateUrl: './update-pending-dues.component.html',
  styleUrl: './update-pending-dues.component.css'
})
export class UpdatePendingDuesComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  dataSource: SalesmanPendings[] = [];
  filteredItems: SalesmanPendings[] = [];

  //dataSource2: any;
  //dataTable: any[] = [];
  //dynamicColumns: any[] = [];
  //dynamicTableRows?:string;

  totalRecords: number = 0;
  //pageSize: number = 10;
  showSpinner: boolean = false;
  value = 0;
  loading = false;
  date1: any;
  //pFromDate: any;
  //pToDate: any;  //Date | undefined;

  billDate1 = new FormControl(new Date());
  objLines!: MasterData[];
  objSalesman!: MasterData[];
  selectedLine: string = '';
  selectedSalesman: string = 'all';
//  clickedRows = new Set<SalesmanPendings>();
 // searchByBillDate: boolean = false;
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
  varTotalStock: number = 0;
  showGrid1:boolean = false;
  showGrid2:boolean = false;
  cols!: Column[];
  exportColumns!: ExportColumn[];

  objCategories!: Areas[];
  selectedCategories!:Areas[];
  user?: User | null;

  constructor(private router: Router, private dataService: DataService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private dataFilter: DataFilterService, private sharedService: SharedService,
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog,private accountService: AccountService) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy - to change date format for Mat datepicker
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.BindAllMasterDataItems();
    const varToday = new Date();
    //const isSunday = varToday.getDay() === 0;
    if (varToday.getDay() === 0 || varToday.getDay() === 1)
        varToday.setDate(varToday.getDate() - 2);

    this.billDate1 = new FormControl(varToday);
    this.ViewAllItemsClicked('all');
    //this.pFromDate = formatDate(yesterday,'dd-MMM-yyyy','en-US');
    //this.pToDate = formatDate(new Date(),'dd-MMM-yyyy','en-US');
    //alert(this.pFromDate);
    //this.BindAllUserNames();
    // if (sessionStorage.getItem('billDate1'))
    //   {
    //       let sessionDate1 = new Date(sessionStorage.getItem('billDate1')!)
    //       //let sessionDate2 = new Date(sessionStorage.getItem('billDate2')!)
    //       this.billDate1 = new FormControl(new Date(sessionDate1));
    //       //this.billDate2 = new FormControl(new Date(sessionDate2));
    //   }
  }

  ngAfterViewInit() {
    //alert(this.sharedService.ShowOutofStockAlert());
    //this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Few Items are running out of stock.View outof Stock Items and place an order...', sticky: true });
  }

  BindAllMasterDataItems()
  {
      //GET ALL LINE NAMES
      this.sharedService.getMasterDataItems('LINES').subscribe((response: MasterData[]) => {
        this.objLines = response;
        //console.log('BindAllMasterDataItems(): ', this.objCategories);
      },
      (err: any) => console.log(err),
      () => console.log('BindAllMasterDataItems() retrieved Line names'));

      //GET SALESMAN NAMES
      this.sharedService.getMasterDataItems('SMANLIST').subscribe((response: MasterData[]) => {
        this.objSalesman = response;
        //console.log('BindAllMasterDataItems(): ', this.objCategories);
      },
      (err: any) => console.log(err),
      () => console.log('BindAllMasterDataItems() retrieved Salesman list'));
  }

ViewAllItemsClicked(strOption: any) {
    this.showGrid1 = true;
    this.showGrid2 = false;

    this.submitting1 = false;
    this.submitting2 = true;
    this.submitting3 = false;
    this.date1 = this.billDate1.value;
    this.date1 = formatDate(this.date1,'yyyy-MMM-dd','en-US');
    console.log ('billdate1',this.date1)
    this.selectedCategory = JSON.stringify(this.date1); // '2025-Nov-07'
    console.log ('billdate',this.selectedCategory)
    //to get all Master Item details
    this.sharedService.GetSalesmanPendings(this.date1).subscribe((response: SalesmanPendings[]) => {
      //this.dataSource = response;
      console.log('ViewAllItems :',response);
      //console.log('selected Itemtype: ',this.selectedTransType);
      if (this.selectedTransType == 'all')
      {  this.dataSource = this.filteredItems = response; }
      else
      { this.dataSource = this.filteredItems = this.filterDataByItemType(response,this.selectedTransType);}

      this.reportHeader = "Total Items " + this.filteredItems.length;
      this.reportName = 'View Pending dues from Party';
      if (this.dataSource.length == 0) { this.submitting2 = false; }
      //sessionStorage.setItem('Report5_DataSource', JSON.stringify(this.filteredItems));
      this.cols = [
        { field: 'line', header: 'Line', customExportHeader: 'Line' },
        { field: 'salesman', header: 'Salesman', customExportHeader: 'Salesman' },
        { field: 'amount', header: 'Amount', customExportHeader: 'Amount' },
        //{ field: 'STOCK', header: 'STOCK', customExportHeader: 'STOCK' },
        { field: 'Paymode', header: 'Paymode' },
        { field: 'Received', header: 'Received' },
      ];
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    },
      (err: any) => console.log('Error occured at ViewAllItemsClicked:',err),
      () => this.submitting2 = false);
  }

  filterDataByItemType(data: any[], ItemType: string): any[] { return data.filter(item => item.Manufacture === ItemType); }

  SaveDetails()
  {
      console.log('final data to save',this.filteredItems)
      //alert('save completed')
      this.sharedService.UpdatePendingDuesReceived(this.filteredItems).subscribe((response: any) => {
      console.log('Pending dues updated response :', response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Successfull.' });
    },
    (err: any) => console.log('Error occured at SaveDetails :',err),
      () => this.submitting1 = false);
  }
}
