import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    isAdmin: boolean = false;
    usertype?: string;
    user?:any;

    constructor(private messageService: MessageService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    usertypeclicked()
    {
        this.isAdmin = !this.isAdmin;
    }
    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        if (this.isAdmin)
          this.usertype='admin';
        else
          this.usertype='user';

          return this.accountService.login(this.f['username'].value, this.f['password'].value,this.usertype)
          .subscribe((response: any) => {
            //alert(response);
            //console.log(response);
            this.user = response;
            if (this.user.id > 0)
            {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful...' });
              //this.user.userType = 'admin';
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigateByUrl(returnUrl);
            }
            //console.log(response);
          //alert('refresh clicked on main page. count=' + this.customers.length);
          //alert(this.customers[0].AREA);
          this.loading = false;
        },
          (err: any) => console.log(err),
          () => console.log('getCustomersPage() retrieved customers'));
    }

    onSubmit_TEMP() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      this.loading = true;
      if (this.isAdmin)
        this.usertype='admin';
      else
        this.usertype='user';

        this.accountService.login(this.f['username'].value, this.f['password'].value,this.usertype)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from query parameters or default to home page

                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
}
