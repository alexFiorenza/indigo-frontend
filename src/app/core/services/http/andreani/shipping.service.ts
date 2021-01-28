import { UserService } from './../api/user/user.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  credentials;
  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) { }
  costShipping(cp: number, packages, shipping_office: string) {
    this.authService.getCredentials().subscribe((res: any) => {
      this.credentials = res.response;
    })
  }
}
