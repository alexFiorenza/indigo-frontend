import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, AfterContentInit, Input, Inject } from '@angular/core';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterContentInit {
  @Input() public price: Number = 100;
  constructor(private r: Renderer2, @Inject(DOCUMENT) public document) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');

  }
  ngOnInit(): void {
  }
  ngAfterContentInit() {
  }
  onBuy() {

  }
  async generateBtn() {
    const s = this.r.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';
    s.text = ``;
    this.r.appendChild(document.body, s);
    // window.Mercadopago.setPublishableKey("TEST-670fd7e7-cb6d-4220-944e-95c0e38825cd");
    // console.log(window.Mercadopago)


  }
}
