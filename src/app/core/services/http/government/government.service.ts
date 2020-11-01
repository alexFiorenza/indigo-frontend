import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GovernmentService {

  constructor(private _http: HttpClient) { }

  getAllProvinces(): Observable<any> {
    return this._http.get('https://apis.datos.gob.ar/georef/api/provincias').pipe(
      map((p: any) => p.provincias)
    );
  }
  getDepartment(id: string): Observable<any> {
    return this._http.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${id}&campos=id,nombre&max=150`).pipe(
      map((p: any) => p.departamentos)

    )
  }
}
