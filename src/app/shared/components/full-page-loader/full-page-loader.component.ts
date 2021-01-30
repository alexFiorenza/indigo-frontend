import { Component, OnInit } from '@angular/core';
import lootie from 'lottie-web';
@Component({
  selector: 'app-full-page-loader',
  templateUrl: './full-page-loader.component.html',
  styleUrls: ['./full-page-loader.component.scss']
})
export class FullPageLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.sneakerLoaderDesktop();
    this.sneakerLoaderMobile();
  }
  sneakerLoaderDesktop() {
    lootie.loadAnimation({
      container: document.querySelector('.loader-desktop'),
      path: '../../../../assets/sneaker-loader.json',
      renderer: 'svg',
      loop: true,
      autoplay: true
    })
  }
  sneakerLoaderMobile() {
    lootie.loadAnimation({
      container: document.querySelector('.loader-mobile'),
      path: 'https://assets9.lottiefiles.com/packages/lf20_vlZ09F.json',
      renderer: 'svg',
      loop: true,
      autoplay: true
    });
  }
}
