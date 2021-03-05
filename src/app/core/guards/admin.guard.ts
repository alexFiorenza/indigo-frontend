import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/http/api/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }
  canActivate() {
    const user = this.userService.loadPayload();
    if (user) {
      if (user.role === 'admin') {
        return true;
      } else {
        this.router.navigate(['/inicio'])
        return false;
      }
    } else {
      this.router.navigate(['/inicio'])
      return false;
    }

  }

}
