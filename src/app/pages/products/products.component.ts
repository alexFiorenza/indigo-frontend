import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document, private r: Renderer2) {
    this.r.addClass(document.body, 'bodyBackground');

  }

  ngOnInit(): void {
  }

}
