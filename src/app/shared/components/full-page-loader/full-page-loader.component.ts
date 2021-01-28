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
    this.sneakerLoader();
  }
  sneakerLoader() {
    lootie.loadAnimation({
      container: document.querySelector('.loader'),
      path: '../../../../assets/sneaker-loader.json',
      renderer: 'svg',
      loop: true,
      autoplay: true
    });
  }
}
