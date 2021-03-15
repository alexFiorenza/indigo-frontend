import { User } from './../../../../../shared/utilities/interfaces/user';
import { environment } from './../../../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Order } from '../../../../../shared/utilities/interfaces/order';
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  addToFavorites(product: Partial<Order>) {
    const headers = this.setHeaders();
    return this.http.post(`${environment.apiUrl}/user/addFavorite`, { product }, { headers });
  }
  getFavorites(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<Order>(`${environment.apiUrl}/user/getFavorites`, { headers });
  }
  deleteFavorite(product: Order) {
    const headers = this.setHeaders();
    return this.http.put(`${environment.apiUrl}/user/deleteFavorite`, product, { headers });
  }
  getToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      return token.replace(/['"]+/g, '');
    } else {
      return null;
    }
  }
  setHeaders() {
    const token = this.loadToken();
    if (token) {
      this.refreshToken(token)
      const headers = new HttpHeaders().set('Authorization', token);
      return headers;
    } else {
      throw new Error('Token not provided');
    }
  }
  logIn(dataToSend): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/login`, dataToSend);
  }
  loadToken(): string {
    return localStorage.getItem('token');
  }
  loadPayload(): User {
    return JSON.parse(localStorage.getItem('payload'));
  }
  saveUserSession(payload, token) {
    const userString = JSON.stringify(payload);
    localStorage.setItem('token', token);
    localStorage.setItem('payload', userString);
  }
  clearSession() {
    localStorage.clear();
  }
  registerUser(userData: User) {
    return this.http.post(`${environment.apiUrl}/user/register`, userData);
  }
  refreshToken(token: string) {
    const helper = new JwtHelperService();
    console.log(helper.isTokenExpired(token))
    if (!helper.isTokenExpired(token)) {
      const payload = this.loadPayload();
      this.http.put(`${environment.apiUrl}/user/updateToken`, payload).pipe(
        catchError((err: HttpErrorResponse) => {
          if (!err.error.status) {
            // handle error
            this.clearSession();
            window.location.reload();
          }
          return throwError(err);
        })
      ).subscribe((res: any) => {
        if (res.response.payload || res.response.token) {
          this.saveUserSession(res.response.payload, res.response.token);
        }
      })
    }
  }
  deleteUser(id) {
    return this.http.delete(`${environment.apiUrl}/user/deleteUser/${id}`)
  }
}
