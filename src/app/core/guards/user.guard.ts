import { UserService } from './../services/http/api/user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../../shared/utilities/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  public user: User;
  constructor(private userService: UserService, private router: Router) {
  }
  canActivate() {
    this.user = this.userService.loadPayload();
    const token = this.userService.getToken();
    if (this.user) {
      this.userService.refreshToken(token)
      return true;
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }

}
