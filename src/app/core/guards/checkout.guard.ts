import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  private price;
  constructor(private router: Router) {
  }
  canActivate() {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state !== undefined) {
      this.price = state.price;
    }
    if (this.price) {
      return true;
    } else {
      this.router.navigate(['inicio']);
      return false;
    }
  }
}
