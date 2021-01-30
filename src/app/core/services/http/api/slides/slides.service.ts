import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {
  constructor(private userService: UserService, private http: HttpClient) { }
  createSlide(body, image) {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }
    formData.append('image', image);
    const headers = this.userService.setHeaders();
    return this.http.post(`${environment.apiUrl}/slides`, formData, { headers })
  }
  getAllSlides() {
    return this.http.get(`${environment.apiUrl}/slides`);
  }
  updateSlides(id, body, image = undefined) {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }
    if (image) {
      formData.append('image', image);
    }
    const headers = this.userService.setHeaders();
    return this.http.put(`${environment.apiUrl}/slides/${id}`, formData, { headers })
  }
}
