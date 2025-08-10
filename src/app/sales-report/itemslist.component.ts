import { Component, OnInit, Input,Inject } from '@angular/core';
import { SharedService } from "src/app/shared.service";
//import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
//import { Sorter } from '../core/sorter';
//import { TrackByService } from '../core/trackby.service';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,} from '@angular/material/dialog';
import {DOCUMENT, CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../_services';
//import { AlertComponent } from '../../_components';

export interface DialogData {
  selectedID: any;
  selectedArea: any;
  selectedShop:any;
  totalBills: any;
  selectedDate:any;
  reportName:any;
}
 export interface Position  {
   LAT: any;
   LNG: any;
 }
@Component({
  selector: 'itemslist',
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.css'],
  standalone:true,
  imports:[CommonModule,MatToolbarModule,MatIconModule,MatButtonModule,FormsModule],
})
export class ItemsByCustIDComponent implements OnInit {

  //@Input() selectedItem: any;
  //@Input() totalamt: any;
  //itemsList: any = [];  //** it is not showing data if we use [] in variable declaration. */
  //lisfofItems!: any[];
  lisfofItems:any;
  itemsCount:number=0;
  customername: string = "";
  status: string = "";
  //constructor(private service: SharedService) { }
  modalTitle: any;
  lat:any;
  lng:any;
  objPosition: any;
  userLocation:any;
  landmark:any;
  TotalAmt:any;
  private tempData:any;

  constructor(private service: SharedService,@Inject(DOCUMENT)
    private document: Document,
    public dialogRef: MatDialogRef<ItemsByCustIDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertService,    )
    {
    //alert(data.selectedArea);
    //this.modalTitle = data.modalTitle;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      //this.service.getItemsbyOrderID(this.data.selectedID).subscribe(data => {
      //console.log('selected values: ', this.data )
    if (this.data.reportName == "itemsbyareadate")
    {
      //this.service.getBellItemsbyCustIDWeekly(this.data.selectedID,this.data.selectedArea,this.data.selectedShop,this.data.selectedDate)
      this.service.getBellItemsbyAreaDate(this.data.reportName,this.data.selectedArea,'na',this.data.selectedDate)
      .subscribe(items => {
      this.lisfofItems = items;
      this.findTotals(items);
      this.itemsCount=this.lisfofItems.length;
      //console.log('selected list of items: ', items )
      });
    }
    if (this.data.reportName == "ShopWiseTotalSales")
      {
        this.service.getBellItemsbyAreaDate(this.data.reportName,this.data.selectedArea,this.data.selectedShop,this.data.selectedDate)
        .subscribe(items => {
        this.lisfofItems = items;
        this.findTotals(items);
        this.itemsCount=this.lisfofItems.length;
        //console.log('selected list of items: ', items )
        });
      }
  }

  findTotals(data:any){
    //debugger
    //console.log('items list',data);
    this.TotalAmt=0;
    this.tempData=data;
    for(let j=0;j<data.length;j++){
      //console.log(Number(this.tempData[j].Week1));
        this.TotalAmt += Number(this.tempData[j].Amount)
    }
  }

  onCloseViewItemsModal() {
    this.dialogRef.close();
  }

}

