import { environment } from './../../../../environments/environment';
import { UserService } from './../../../core/services/http/api/user/user.service';
import { Component, OnInit } from '@angular/core';
import lootie from 'lottie-web';
import { Observable } from 'rxjs';
import { Order } from '../../../shared/utilities/interfaces/order';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favorites: any[] = [];
  public loading = true;
  public uploadUrl = environment.uploadsUrl;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.chargeLoader();
    this.userService.getFavorites().subscribe((value) => {
      this.loading = false;
      this.favorites = value.response.favorites;
    });
  }
  chargeLoader() {
    lootie.loadAnimation({
      container: document.getElementById('loader'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/hourglass/hourglass.json'
    });
  }
  clickedFavorite(id, overlay: HTMLElement) {
    const overlayClasses = overlay.classList;
    if (!overlayClasses.contains('hidden')) {
      overlayClasses.add('fade-out-bck');
      setTimeout(() => {
        overlayClasses.toggle('hidden');
      }, 700);
    } else {
      overlayClasses.remove('fade-out-bck');
      overlayClasses.toggle('hidden');
    }

  }
  deleteFavorite(order: Order) {
    this.userService.deleteFavorite(order).subscribe((res: any) => {
      if (res.status) {
        window.location.reload();
      }
    })
  }
}
