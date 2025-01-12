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
import { AlertService } from '../../_services';
//import { AlertComponent } from '../../_components';

export interface DialogData {
  selectedID: any;
  selectedArea: any;
  selectedShopName: any;
  //selectedTotalAmt:any;
  selectedLandMark:any;
}
 export interface Position  {
   LAT: any;
   LNG: any;
 }
@Component({
  selector: 'app-view-itemslist',
  templateUrl: './view-itemslist.component.html',
  styleUrls: ['./view-itemslist.component.css'],
  standalone:true,
  imports:[CommonModule,MatToolbarModule,MatIconModule,MatButtonModule,FormsModule],
})
export class ViewItemslistComponent implements OnInit {

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

  constructor(private service: SharedService,@Inject(DOCUMENT)
    private document: Document,
    public dialogRef: MatDialogRef<ViewItemslistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertService,    )
    {
    //alert(data.selectedArea);
    //this.modalTitle = data.modalTitle;
    this.landmark=data.selectedLandMark;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      //this.service.getItemsbyOrderID(this.data.selectedID).subscribe(data => {
      this.service.getBellItemsbyShop(this.data.selectedArea,this.data.selectedShopName).subscribe(data => {
      this.lisfofItems = data;
      this.itemsCount=this.lisfofItems.length;
      //alert('total items count=' + this.lisfofItems.length);
      //alert('first item name= ' + this.lisfofItems[0].ItemName);
    });
  }

  NavigatetLoation(){
    this.service.getLSCustomerDetails(this.data.selectedID).subscribe(data => {
      this.objPosition = data;
      //console.log(data);
      if (this.objPosition.LAT == '')
      {
        alert('Location not available, Please update the location');
      }
      else
      {
        //this.userLocation = 'https://maps.google.com/maps?q=17.48812756435186,78.42240109156442';
        this.userLocation = 'https://maps.google.com/maps?q=' + this.objPosition.LAT + ',' + this.objPosition.LNG;
        //alert(this.userLocation);
        //this.document.location.href = this.userLocation;
        //window.open(this.userLocation, "_blank");
        window.open(this.userLocation, '_system', 'location=yes');
        //return false;
      }
    });
}

  updateCurrentLoation()
  {
      //alert('updating location for ID = ' + this.data.selectedID);
      // this.getGeoLocation();
      //this.service.getCurrentLocation();

      this.getGeoPosition().then(pos=>
        {
           //console.log('Positon: ${pos.lng} ${pos.lat}');
           console.log('Latitude: ' + pos.lat + ' - Longitude: ' + pos.lng );
           //this.lat = pos.lat;
           //this.lng = pos.lng;
           var objVal = {
            ID: this.data.selectedID,
            Area: this.data.selectedArea,
            CustomerName: this.data.selectedShopName,
            LAT:pos.lat,
            LNG: pos.lng,
            LANDMARK:this.landmark
          };
          //alert(pos.lat);
          this.service.updateCustomerLocation(objVal).subscribe(res =>{
              alert(res.toString());  //Landmark updated successfully. comming from AP
              //this.alertService.clear();
              //this.alertService.success('Land mark saved.', { keepAfterRouteChange: true });
            })
            //,(err: any) => console.log(err);
        });
  }

  getGeoPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  onCloseViewItemsModal() {
    this.dialogRef.close();
  }

}

