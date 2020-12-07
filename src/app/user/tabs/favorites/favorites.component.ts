import { Component, OnInit } from '@angular/core';
import lootie from 'lottie-web';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.chargeLoader();
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
}
