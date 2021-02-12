import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../api/user/user.service';
import { Observable } from 'rxjs';
const URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) {
  }
  getCredentials(): Observable<any> {
    const headers = this.userService.setHeaders();
    return this.http.get(`${URL}/andreani/login`, { headers });
  }
}
