import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { UserService } from './../api/user/user.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  credentials;
  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) { }
  costShipping(cp: number, packages, shipping_office?): Observable<any> {
    if (this.credentials) {
      let shippingInfo = {
        cp,
        packages,
      }
      if (shipping_office) {
        Object.assign(shippingInfo, shipping_office)
      }
      return this.http.post(`${environment.apiUrl}/andreani/shipping`, {
        credentials: this.credentials,
        shippingInfo: shippingInfo
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
  createOrder(origin, destination, receiver, packages) {
    return new Observable((observer) => {
      this.authService.getCredentials().subscribe((credentials) => {
        this.http.post(`${environment.apiUrl}/andreani/order`, {
          credentials: credentials.response,
          origin,
          destination,
          receiver,
          packages
        }).subscribe((res) => {
          observer.next(res);
        })
      })
    })
  }
  getPdfOrderState(id: string) {
    return this.http.get(`${environment.apiUrl}/andreani/orderPdfState/${id}`)
  }
  getCurrenOrderState(id) {
    return this.http.get(`${environment.apiUrl}/andreani/orderState/${id}`,)
  }
}
