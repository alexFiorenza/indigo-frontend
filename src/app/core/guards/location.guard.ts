import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

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
