import { user } from './../../../../../utilities/interfaces/user';
import { environment } from './../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  logIn(dataToSend): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/login`, dataToSend).pipe(
      map((r: any) => {
        return r.response;
      })
    );
  }
  loadToken(): string {
    return localStorage.getItem('token');
  }
  loadPayload(): user {
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
}
