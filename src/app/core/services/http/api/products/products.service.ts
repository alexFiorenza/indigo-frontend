import { Product } from "./../../../../../shared/utilities/interfaces/product";
import { Observable } from "rxjs";
import { environment } from "./../../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getProducts(actualPage, limit): Observable<any> {
    return this.http.get<Array<Product>>(
      `${environment.apiUrl}/product/${actualPage}?limit=${limit}`
    );
  }
  getSingleProduct(id) {
    return this.http.get<Product>(`${environment.apiUrl}/product/getOne/${id}`);
  }
}
