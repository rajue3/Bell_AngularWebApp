import { Component, OnInit } from '@angular/core';
//import { Router} from '@angular/router';
import { User } from '../_models';
import { AccountService } from '../_services';
/*import { MessageService } from 'primeng/api';*/

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
    user?: User | null;

  constructor(private accountService: AccountService) {
         this.user = this.accountService.userValue;
         //alert(this.user?.usertype);
     }
     ngOnInit(): void {
       this.user = this.accountService.userValue;
      // if (this.user) {
      //     this.router.navigate(['/account/login']);
      // }
  }
  ngAfterViewInit() {
       //alert('Hi from ngoninit');
      //this.messageService.add({ severity: 'warn', summary: 'Alert', detail: 'Stock is low...' });
  }
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.accountService.logout();
    }
  show() {
    //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Welcome to Bellbrand...' });
  }
}
