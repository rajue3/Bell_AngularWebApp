import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from "src/app/shared.service";
import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { ICustomer, IOrder, IPagedResults } from '../shared/interfaces';

@Component({
  selector: 'app-itemslist',
  templateUrl: './itemslist.component.html'
})
export class ItemDetailsComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  title = '';
  items: any[] = [];
  filteredItems: any[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;
  constructor(private router: Router,
    private dataService: DataService,
    private dataFilter: DataFilterService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.title = 'Zion Wellmark :: All Master Items';
    //this.getAllItems(1);
    this.onRefreshClicked();
  }
  onRefreshClicked() {
    this.getAllItems();
    //this.filterChanged("");
  }
  filterChanged(filterText: string) {
    if (filterText && this.items) {
      let props = ['ItemName', 'CATEGORY','Rate'];
      this.filteredItems = this.dataFilter.filter(this.items, props, filterText);
    }
    else {
      this.filteredItems = this.items;
    }
  }

  pageChanged(page: number) {
    //this.getitemsPage();
  }

  showCompletedOrders() {
    this.onRefreshClicked();

  }
  showPendingOrders() {
    this.onRefreshClicked();

  }
  getAllItems() {
    //alert('calling..');
    this.sharedService.getAllItems().subscribe((response: ICustomer[]) => {
        this.items = this.filteredItems = response;
        console.log('getAllItems() ->',response);
        //alert('refresh clicked on main page. count=' + this.items.length);
        //alert(this.filteredItems[0].MOBILE);
      },
        (err: any) => console.log(err),
        () => console.log('getAllItemsPage() retrieved Master Items'));
  }

  //TestGet working after adding CORS in web.config and controller header.
  getCustomersPage_working(strStatus: any): void {
    this.sharedService.testGet()
      .subscribe(
        responseData => {
          this.items = responseData;
          //alert(responseData);
          //console.log(responseData);
        },
        error => {
          console.log(error);
        });
  }
}




