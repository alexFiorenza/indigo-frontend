import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, AfterContentInit, Input, Inject, DoCheck } from '@angular/core';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input() public price: Number = 100;
  public mp;
  private mpPublickKey: string = 'TEST-670fd7e7-cb6d-4220-944e-95c0e38825cd';
  constructor(private r: Renderer2, @Inject(DOCUMENT) public document) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');

  }
  ngOnInit(): void {
    this.generateScript();
  }

  generateScript() {
    const script: HTMLScriptElement = this.r.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';
    script.text = ``;
    this.r.appendChild(document.body, script);
    script.onload = () => {
      this.mp = (window as any).Mercadopago;
      this.mp.setPublishableKey(this.mpPublickKey);
      this.mp.getIdentificationTypes();
    };
  }
}
