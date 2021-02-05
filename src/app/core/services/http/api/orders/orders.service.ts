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
  getOrdersPerUserId(id) {
    const headers = this.userService.setHeaders();
    return this.http.get(`${this.apiUrl}/orders/userOrder/${id}`, { headers })
  }
  getOrders() {
    const headers = this.userService.setHeaders();
    return this.http.get(`${this.apiUrl}/orders/`, { headers })
  }
  updateOrder(id: string, status: string) {
    const headers = this.userService.setHeaders();
    return this.http.put(`${this.apiUrl}/orders/update/${id}`, {
      status
    }, { headers })
  }
}
