import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface User {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export interface UserDetails {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) { }

  /**
   * Make request to register api
   * @param user information of user to save
   */
  public register(user: UserDetails): Observable<any> {
    return this.request('register', user);
  }

  /**
   * Make request to login
   * @param user credentials of user
   */
  public login(user: UserDetails): Observable<any> {
    return this.request('login', user);
  }

  /**
   * Retrieve the details of a user from the user-token
   */
  public getUserDetails(): User {
    const token = this.getToken();
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /**
   * Logout user by removing token from local storage
   */
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('user-token');
    this.router.navigateByUrl('/');
  }

  /**
   * Check if a user is logged in
   */
  public isLoggedIn(): boolean {
    const user: User = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('user-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('user-token');
    }
    return this.token;
  }

  private request(type: 'login'|'register', user?: UserDetails): Observable<any> {
    let jwt: Observable<any>;
    jwt = this.http.post(`http://localhost:8000/users/${type}`, user, {responseType: 'text'});
    const request = jwt.pipe(
      map((token: string) => {
        if (token) {
          this.saveToken(token);
        }
        return token;
      })
    );
    return request;
  }

}
