import { Component, OnInit } from '@angular/core';
import lootie from 'lottie-web';
interface Date {
  name: string,
  code: number
}
interface Card {
  data: number,
  text: string,
  icon: string,
  color: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dates: Date[];
  selectedDate: Date;
  cards: Card[] = [{
    data: 1000,
    text: 'Usuarios registrados',
    icon: 'person',
    color: '#B6DBFB'
  },
  {
    data: 200,
    text: 'Pedidos registrados',
    icon: 'bag',
    color: '#FACCB6'
  },
  {
    data: 150.3,
    text: 'Renumeración',
    icon: 'card',
    color: '#B6FBD6'
  }]
  constructor() {
    this.dates = [
      { name: 'Hoy', code: 1 },
      { name: '7 dias', code: 7 },
      { name: '2 semanas', code: 14 },
      { name: '1 mes', code: 30 },
    ];
  }
  loadBus() {
    lootie.loadAnimation({
      container: document.querySelector('#delivery'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets10.lottiefiles.com/packages/lf20_RJRDWS.json' // the path to the animation json
    });
  }
  loadWallet() {
    lootie.loadAnimation({
      container: document.querySelector('#wallet'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets6.lottiefiles.com/datafiles/GIJ8cxBxDJ2Bwhy/data.json' // the path to the animation json
    });
  }
  loadAnalytics() {
    lootie.loadAnimation({
      container: document.querySelector('#analytics'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets8.lottiefiles.com/packages/lf20_DaD4lb.json' // the path to the animation json
    });
  }
  ngOnInit(): void {
    this.loadBus();
    this.loadWallet();
    this.loadAnalytics();
  }

}
