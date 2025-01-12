import { Component, Input, OnInit,ViewChild} from '@angular/core';
import { SharedService } from "src/app/shared.service";
//import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Sorter } from '../core/sorter';
import { TrackByService } from '../core/trackby.service';
import { AdminComponent } from '../customer/customer.component';
import {LiveAnnouncer} from '@angular/cdk/a11y';  //for sorting a table
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

interface City {
  name: string,
  code: string
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

  @Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
  })

export class DemoComponent {
  title = 'bhavani-entrysheet';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  //dataSource = new MatTableDataSource(customers);
  @ViewChild(MatSort) sort!: MatSort;

  cities!: City[];
  selectedCities!: City[];

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

    // const position: any = await this.locationService.getCurrentLocation();
    // console.log(position);

    //maps.google.com/maps?q=17.48812756435186,78.42240109156442


    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (position) {
                console.log(
                  'Latitude: ' +
                    position.coords.latitude +
                    ' - Longitude: ' +
                    position.coords.longitude
                );
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                const location = {
                  lat,
                  lng,
                };
                resolve(location);
              }
            },
            (error) => console.log(error)
          );
        } else {
          reject('Geolocation is not supported by this browser.');
        }
      });
    }
  }

