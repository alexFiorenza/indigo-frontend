import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovernmentService {

  constructor(private _http: HttpClient) { }

  getAllProvinces(): Observable<any> {
    return this._http.get('https://apis.datos.gob.ar/georef/api/provincias');
  }
}
