import { Component, Input, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { SharedService } from "src/app/shared.service";
//import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ItemDetailsComponent } from "../itemslist.component";
import { ICustomer } from '../../shared/interfaces';
import { Sorter } from '../../core/sorter';
import { TrackByService } from '../../core/trackby.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showitems',
  templateUrl: './showitems.component.html',
  styleUrls: ['./showitems.component.css'],
})
export class ShowitemsComponent implements OnInit {

  //@Input() customers: ICustomer[] = [];
  @Input() objItemsList: any = [];
  //orderList: any = [];
  modalTitle: any;
  activateAddEditStuCom: boolean = false;
  selectedItem: any;
  orderid: any;
  totalamt: any;
  activateItemsList: boolean = false;
  display = "none";
  VarDisplayModelStatus = "none";
  
  rowsPerPage = 10;
  currentPage = 0;
  pagedItems: any[] = [];

  constructor(private sorter: Sorter, public trackby: TrackByService, private service: SharedService, 
    private ParentOrderslist: ItemDetailsComponent,public route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

    ngOnChanges(changes: SimpleChanges) {
    if (changes['objItemsList'] && this.objItemsList?.length) {
        this.route.queryParams.subscribe(params => {
        this.currentPage = +params['page'] || 0;
        //console.log('ngOnInit: Current page from query params:', this.currentPage);
        this.updatePagedItems();
      });
    }
  }
  ngOnInit(): void {    
     this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'] || 0;
      console.log('ngOnInit: Current page from query params:', this.currentPage);
      this.updatePagedItems();
    });
    //this.orderList = this.objItemsList;
    //alert('orderlist count=' + this.orderList.length);
    //alert('objItemsListcount=' + this.objItemsList.length);
    //this.refreshStudentList();
  }

paginate(event: any) {
  this.currentPage = event.page;
  this.rowsPerPage = event.rows;
  this.updatePagedItems();
}

updatePagedItems() {
  const start = this.currentPage * this.rowsPerPage;
  const end = start + this.rowsPerPage;
  //console.log('updatePagedItems: start and end :', start + ', ' + end);
  this.pagedItems = this.objItemsList.slice(start, end);
}
formatNumber(colValue: any): string {
  return Number(colValue).toFixed(2);
  //return colValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}   
getSafeUrl(url: string) {
  return this.sanitizer.bypassSecurityTrustUrl(url.trim());
}

  sort(prop: string) {
    this.sorter.sort(this.objItemsList, prop);
  }

  refreshOrderList() {
    //this.service.getStudentList().subscribe(data => { this.objItemsList = data;});
    this.ParentOrderslist.onRefreshClicked();
    //alert('refresh clicked on grid. count=' + this.objItemsList.length);
  }

  //AddStudent(){
  //  this.student={
  //    StudentId:0,
  //    FullName:"",
  //    Class:""
  //  }
  //  this.modalTitle = "Add New Order";
  //  this.activateAddEditStuCom = true;
  //  this.activateItemsList = false;
  //}

  ViewOrderItems(item: any) {
    //alert(orderID);
    this.selectedItem = item;
    this.orderid = item.OrerID;
    this.totalamt = item.TotalAmount;
    this.activateItemsList = true;
    this.activateAddEditStuCom = false;
    this.modalTitle = "Items for Order number: " + item.OrderID + " :: " + item.CustomerName + " :: " + item.Area;
    this.display = "block";
    this.VarDisplayModelStatus = "none";

  }
  showCompletedOrders() {
    this.ParentOrderslist.onRefreshClicked();

  }
  showPendingOrders() {
    this.ParentOrderslist.onRefreshClicked();

  }

  EditItemsDetails(item: any) {
    this.selectedItem = item;
    this.activateAddEditStuCom = true;
    this.activateItemsList = false;
    this.modalTitle = "Update Item details for ID# " + item.ID + " :: " + item.ItemName;
    //alert(this.modalTitle);
    this.display = "none";
    this.VarDisplayModelStatus = "block";
  }

  deleteClick(del_orderid: any, del_cname: any) {
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
        , (err: any) => console.log(err);

      //this.refreshOrderList();
    }
    this.refreshOrderList();
  }

  closeUpdateStatusModal() {
    this.activateAddEditStuCom = false;
    this.activateItemsList = false;
    this.display = "none";
    this.VarDisplayModelStatus = "none";
    this.refreshOrderList();
  }

  //openModal() {
  //  this.display = "block";
  //}
  onCloseViewItemsModal() {
    this.display = "none";
    this.VarDisplayModelStatus = "none";
    this.activateItemsList = false;
    this.activateAddEditStuCom = false;
    //this.refreshOrderList();
  }
}
