import { environment } from './../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
interface Card {
  data: number,
  text: string,
  icon: string,
  color: string
}
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }
  getCardsData(date) {
    return this.http.get(`${environment.apiUrl}/analytics/general-data/${date}`)
  }
}
