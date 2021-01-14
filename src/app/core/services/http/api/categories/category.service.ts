import { environment } from './../../../../../../environments/environment';
import { UserService } from './../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private userService: UserService) { }
  getAllCategories() {
    return this.http.get(`${environment.apiUrl}/categories/`);
  }
  getCategoryById(id) {
    return this.http.get(`${environment.apiUrl}/categories/${id}`);
  }
  createCategory(body) {
    const headers = this.userService.setHeaders();
    return this.http.post(`${environment.apiUrl}/categories`, body, { headers });
  }
  updateCategoriesOnProduct(id, body) {
    const headers = this.userService.setHeaders();
    return this.http.put(`${environment.apiUrl}/categories/${id}`, body, { headers });
  }
  deleteCategoryOnProduct(id, body) {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`, body);
  }
  updateSubCategory(data, id) {
    const headers = this.userService.setHeaders();
    return this.http.put(`${environment.apiUrl}/categories/subcategory/${id}`, data, { headers })
  }
  deleteSubCategory(data, id) {
    return this.http.put(`${environment.apiUrl}/categories/subcategory/delete/${id}`, data);
  }
  deleteCategory(id) {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
