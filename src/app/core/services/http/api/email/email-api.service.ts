import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../../../../../shared/utilities/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class EmailApiService {
  constructor(private http: HttpClient) { }
  sendTransactionAcceptedEmail(order: Order) {
    return this.http.post(`${environment.apiUrl}/email/transaction-accepted`, { order })
  }
  updateOrderStatus(order: Order) {
    return this.http.post(`${environment.apiUrl}/email/update-order-status`, { order })
  }
}
