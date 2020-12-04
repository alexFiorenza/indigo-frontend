import { UserService } from './../user/user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private userService: UserService) { }
  processPayment(orderInfo, installments, paymentMethodId, price): Observable<any> {
    const headers = this.userService.setHeaders();
    const body = {
      orderInfo,
      installments,
      paymentMethodId,
      price
    };
    return this.http.post(`${this.apiUrl}/orders/proccess_payment`, body, { headers });
  }

}
