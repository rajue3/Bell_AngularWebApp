import { Component, Input, OnInit, ChangeDetectionStrategy,ViewChild,Inject } from '@angular/core';
import { SharedService } from "src/app/shared.service";
//import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Sorter } from '../core/sorter';
import { TrackByService } from '../core/trackby.service';
import { AdminComponent } from '../customer/customer.component';
import {LiveAnnouncer} from '@angular/cdk/a11y';  //for sorting a table
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogConfig,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,} from '@angular/material/dialog';
//import { SharedService } from "src/app/shared.service";
import { ViewItemslistComponent } from './view-itemslist/view-itemslist.component';
import { ICustomer,BellAreaWiseOrders } from '../shared/interfaces';

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
  isFrozenColumn: boolean;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'show-customers',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomOrdersComponent implements OnInit {
//@Input() dataSource: BellAreaWiseOrders[];
@Input() dataSource: any[] = [];
//orderList: any = [];
modalTitle:any;
activateAddEditStuCom:boolean = false;
selectedItem: any;
orderid: any;
totalamt: any;
activateItemsList: boolean = false;
display = "none";
VarDisplayModelStatus = "none";
color = 'green' ;
sortedData: BellAreaWiseOrders[];
//showSpinner: boolean=true;
loading = false;

cols: Column[] = [];
exportColumns!: ExportColumn[];
//dataTable: any[] = [];
dynamicColumns: any[] = [];

//displayedColumns: string[] = ['Area','ShopName', 'TotalItems', 'TotalAmount'];
//displayedColumns: string[] = ['ID','Area','ShopName', 'CustomerName','Mobile','LANDMARK','SalesMan'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  //dataSource = new MatTableDataSource(this.dataSource);

  constructor(private service: SharedService,
    private ParentOrderslist: AdminComponent,public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer) {
      console.log('datasource from customer.component',this.dataSource);
      this.sortedData = this.dataSource.slice();
    }

  ngOnInit(): void {
    console.log('this.dataSource from ngOnInit:',this.dataSource);
    //this.dataTable = JSON.parse(this.dataSource);
      this.dynamicColumns = Object.keys(this.dataSource);
      console.log('this.dynamicColumns',this.dynamicColumns);
      let newCol:any;
      this.cols = [];
      for(var item in this.dynamicColumns){
         newCol = {field:this.dynamicColumns[item],header:this.dynamicColumns[item],customExportHeader:this.dynamicColumns[item],isFrozenColumn:false};
        //console.log('newcol=',newCol);
        this.cols.push(newCol);
      }
      console.log('this.cols=',this.cols);
      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

  }

  @ViewChild(MatSort) sort!: MatSort;
  clickedRows = new Set<SelectedRowDetails>();

  ngAfterViewInit() {
    //this.showSpinner = false;
    //this.dataSource.sort = this.sort;
    //this.customers.sort = this.sort;
    //this.dataSource = new MatTableDataSource(this.dataSource);
     //if (this.sort) // check it is defined.
     //{
          //this.dataSource.sort = this.sort;
      //}
  }

  onRowClicked(rowItem: any)
  {
    return;
    // //alert(rowItem.Area);
    // const dialogRef = this.dialog.open(ViewItemslistComponent, {
    //   data: {selectedID:rowItem.ID,selectedArea: rowItem.Area, selectedShopName: rowItem.ShopName,selectedLandMark:rowItem.LANDMARK},
    //   height: '500px',
	  //   width: '450px',
	  //   position: {left:'2px' }
    // });
  }
    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      //alert(sortState.direction);
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

   refreshOrderList() {
    //this.service.getStudentList().subscribe(data => { this.customers = data;});
    //this.ParentOrderslist.onRefreshClicked('all');
    //alert('refresh clicked on grid. count=' + this.customers.length);
  }

  // ViewOrderItems(item: any) {
  //   //alert(orderID);
  //   this.selectedItem = item;
  //   this.orderid = item.OrerID;
  //   this.totalamt = item.TotalAmount;
  //   this.activateItemsList = true;
  //   this.activateAddEditStuCom = false;
  //   //this.modalTitle = "Items for Order number: " + item.OrderID + " :: " + item.CustomerName + " :: " + item.Area;
  //   //this.display = "block";
  //   //this.VarDisplayModelStatus = "none";
  //   this.openDialog();
  // }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ViewItemslistComponent, {
  //     data: {selectedItem: this.selectedItem, totalamt: this.totalamt,modalTitle:this.modalTitle},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     //this.animal = result;
  //   });
  // }

  showCompletedOrders() {
    //this.ParentOrderslist.onRefreshClicked('completed');

  }
  showPendingOrders() {
    //this.ParentOrderslist.onRefreshClicked('pending');

  }

  EditOrderStatus(item: any) {
    this.selectedItem = item;
    this.activateAddEditStuCom = true;
    this.activateItemsList = false;
    this.modalTitle = "Update Status for Order# " + item.OrderID + " :: " + item.CustomerName + " :: " + item.Area;
    //alert(this.modalTitle);
    this.display = "none";
    this.VarDisplayModelStatus = "block";
  }

  deleteClick(del_orderid: any,del_cname:any){
    if (confirm('Are you sure??')) {
      var val = {
        id: del_orderid,
        customer: del_cname,
        status: 'deleted'
      };
      //alert(val.id);
      this.service.updateOrderStatus(val).subscribe(res => {
        //alert(res.toString());
      })
      ,(err: any) => console.log(err);

      //this.refreshOrderList();
    }
    this.refreshOrderList();
  }

  closeUpdateStatusModal(){
    this.activateAddEditStuCom = false;
    this.activateItemsList = false;
    this.display = "none";
    this.VarDisplayModelStatus = "none";
    this.refreshOrderList();
  }

  //openModal() {
  //  this.display = "block";
  //}

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ShopName':
          return compare(a.ShopName, b.ShopName, isAsc);
        case 'Area':
          return compare(a.Area, b.Area, isAsc);

        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
