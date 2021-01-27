import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../api/user/user.service';
import { url } from 'inspector';
const URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) {
  }
  getToken() {
    const headers = this.userService.setHeaders();
    return this.http.get(`${URL}/orders/andreani/login`, { headers });
  }
}
