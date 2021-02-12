import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
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
  costShipping(cp: number, packages, shipping_office: string): Observable<any> {
    if (this.credentials) {
      return this.http.post(`${environment.apiUrl}/andreani/shipping`, {
        credentials: this.credentials,
        shippingInfo: {
          cp,
          packages,
          shipping_office
        }
      })
    } else {
      console.error('credentials were not provided');
    }
  }
  getCredentials() {
    return new Observable((suscriber) => {
      this.authService.getCredentials().subscribe((credentials: any) => {
        this.credentials = credentials.response;
        suscriber.next(this.credentials);
      }
      )

    })

  }
  createOrder() {
    return new Observable((observer) => {
      this.authService.getCredentials().subscribe((credentials) => {
        this.http.post(`${environment.apiUrl}/andreani/order`, {
          credentials: credentials.response,

        }).subscribe((res) => {
          observer.next(res);
        })
      })
    })
  }
}
