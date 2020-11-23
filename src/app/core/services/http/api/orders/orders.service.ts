import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  processPayment(orderInfo, installments, paymentMethodId): Observable<any> {
    const body = {
      orderInfo,
      installments,
      paymentMethodId
    };
    return this.http.post(`${this.apiUrl}/proccess_payment`, body);
  }

}
