import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';

import { AccountService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users?: any[];

    constructor(private accountService: AccountService,private router: Router) {
    }

    public redirect(userdetails:any) {
       //alert(userdetails.username);
      //this.router.navigateByUrl('/edit/'+userdetails);
      this.router.navigate(['/edit'], { state: { id: userdetails.id,username:userdetails.username,password:userdetails.password,firstname:userdetails.firstname,lastname:userdetails.lastname } });
    }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }
}
