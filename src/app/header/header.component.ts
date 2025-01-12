import { Component, Input, OnInit} from '@angular/core';
//import { AccountService } from '../_services';
//import { User } from '../_models';

  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })

export class HeaderComponent {
  title = 'Bhavani Sales';
//   user?: User | null;

//   constructor(private accountService: AccountService) {
//     this.accountService.user.subscribe(x => this.user = x);
// }

// logout() {
//     this.accountService.logout();
// }

}
