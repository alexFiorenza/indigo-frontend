import { Product } from './../../../../../shared/utilities/interfaces/product';
import { Observable } from 'rxjs';
import { environment } from './../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private userService: UserService) { }
  getProducts(actualPage, limit): Observable<any> {
    return this.http.get<Array<Product>>(
      `${environment.apiUrl}/product/${actualPage}?limit=${limit}`
    );
  }
  editProduct(body, id, image) {
    const headers = this.userService.setHeaders();
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i]);
    }
    return this.http.put(`${environment.apiUrl}/product/${id}`, formData, { headers })
  }
  getSingleProduct(id) {
    return this.http.get<Product>(`${environment.apiUrl}/product/getOne/${id}`);
  }
  deleteSingleProduct(id) {
    const headers = this.userService.setHeaders();
    return this.http.delete(`${environment.apiUrl}/product/${id}`, { headers });
  }
  createProduct(data, image) {
    const headers = this.userService.setHeaders();
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i]);
    }
    return this.http.post(`${environment.apiUrl}/product/`, formData, { headers })
  }
  getHomeViewProducts() {
    const headers = this.userService.setHeaders();
    return this.http.get<Product[]>(`${environment.apiUrl}/product/homeView`, { headers });
  }
}
