import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationGuard implements CanActivate {
  constructor(private router: Router) {
    console.log();
  }

  canActivate() {
    const data = this.router.getCurrentNavigation().extras.state;
    if (data) {
      return true;
    } else {
      this.router.navigate(['/registro/datos']);
      return false;
    }

  }

}
