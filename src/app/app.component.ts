import { Component} from '@angular/core';
//import {AgmMap, MouseEvent,MapsAPILoader  } from '@agm/core';
import { User } from './_models';
import { AccountService } from './_services';
import { ItemDetails} from './shared/interfaces';
import { SharedService } from "src/app/shared.service";
//import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
//import { Ripple } from 'primeng/ripple';
//import { AvatarModule } from 'primeng/avatar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //isSticky: boolean = false;
  title = 'bhavani-entrysheet';
  user?: User | null;
  visible: boolean = false;
  //currentRoute?: string;
 
  constructor(private accountService: AccountService, private messageService: MessageService
    ,private sharedService: SharedService,private router: Router,private activatedRoute: ActivatedRoute) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  ngOnInit(): void {
    //console.log('Current Route:', this.router.url);
    }

  ngAfterViewInit() {    
  }

  // showConfirm() {
  //   if (!this.visible) {
  //       this.messageService.add({ key: 'confirm', sticky: true, severity: 'success', summary: 'Can you send me the report?' });
  //       this.visible = true;
  //   }
  // }
  onConfirm() {
    this.messageService.clear('confirm');
    this.visible = false;    
    this.router.navigate(['/stockdetails']);
  }
  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

  ShowOutofStockAlert() {    
    console.log('Current Route:', this.router.url);
    if (this.router.url != '/stockdetails')
    {
      this.sharedService.GetStockDetails('MinOrder','all').subscribe((response: ItemDetails[]) => {
        if (response && response.length > 0) {
          //console.log('Stock Details :', response);
          //for sticky
          //this.messageService.add({ severity: 'error', summary: 'Alert', detail: response.length + ' Item(s) running out of stock... View Stock details for more details and place an order.', sticky: true });
          //this.messageService.add({ severity: 'error', summary: 'Alert', detail: response.length + ' Item(s) running out of stock... View Stock details for more details and place an order.<a href=/stockdetails>Click here</a>' });
          if (!this.visible) {
            this.messageService.add({ key: 'confirm', sticky: false, severity: 'error', summary: ' Few item(s) running out of stock... \n Please click on \'View Stock\' to navigate to Stock details.' });
            this.visible = true;
           }

        }
        else {
          
        }
      },
        (err: any) => console.log(err),
        () => console.log('Retrieved Stock details using GetStockDetails() ')
      );
    }
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.accountService.logout();
  }
  // constructor(private accountService: AccountService) {
  //     this.user = this.accountService.userValue;
  // }

  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 250;
  // }
}
