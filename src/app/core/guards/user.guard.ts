import { UserService } from './../services/http/api/user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    if (this.user) {
      return true;
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }

}
