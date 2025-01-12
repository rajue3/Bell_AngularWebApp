import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { SharedService } from "src/app/shared.service";

import { environment } from '../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    strURL? : string;

    constructor(private router: Router,private http: HttpClient, private sharedService: SharedService
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string,usertype:string) {
        //return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
          return this.http.get<User>(`${this.sharedService.APIUrl}/bell/authenticate/` + username + '/' + password+'/'+usertype, { })
            .pipe(map(user => {
                if (!user)
                  {
                    return throwError(() => ({ error: 'Invalid username or password!' }))
                      .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
                  }
                user.token = 'fake-jwt-token'
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                //sessionStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                //console.log("Logged in User details :");
                //console.log(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        //sessionStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        //return this.http.post(`${environment.apiUrl}/users/register`, user);
        //need to write actual api call to store user details.
        //console.log(user);
        return this.http.post<any>(`${this.sharedService.APIUrl}bell/saveuserdetails`, user)
            .pipe(map(user => {
                console.log(user);
                return User;
            }));
    }

    getAll() {
        //return this.http.get<User[]>(`${environment.apiUrl}/users`);
        //alert(`${environment.APIUrl}/bell/getallusers/0`);
        return this.http.get<User[]>(`${this.sharedService.APIUrl}/bell/getallusers/0`, { })
            .pipe(map(User => {
                //console.log(User);
                return User;
            }));
    }

    getById(selectedID: string) {
        //return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
        return this.http.get<any[]>(`${this.sharedService.APIUrl}/bell/getallusers/${selectedID}`, { })
        .pipe(map(userdetails => {
          //console.log(userdetails);
          //return userdetails;
          //const user = userdetails.find(x => x.id === selectedID);
          //alert(userdetails[0].firstname);
          //const { id, username, firstname, lastname } = userdetails[0];
          //return { id, username, firstname, lastname };
          return { id:selectedID, username:userdetails[0].username, firstName:userdetails[0].firstname, lastName:userdetails[0].firstname };

      }));
    }

    update(id: string, params: any) {
        //return this.http.put(`${environment.apiUrl}/users/${id}`, params)
        params.id = id;
        //console.log(params);
        //alert(params.id);
        return this.http.post<any>(`${this.sharedService.APIUrl}bell/saveuserdetails`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    //sessionStorage.setItem('user', JSON.stringify(user));
                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        //return this.http.delete(`${environment.apiUrl}/users/${id}`)
        return this.http.delete<any>(`${this.sharedService.APIUrl}bell/deleteuser/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
