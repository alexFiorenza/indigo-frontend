import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('filters') private filters: ElementRef;
  @ViewChild('icon') private icon: ElementRef;
  private opened = false;
  constructor(@Inject(DOCUMENT) private document, private r: Renderer2) {
    this.r.addClass(document.body, 'bodyBackground');
  }

  ngOnInit(): void {
  }
  toggleMenu() {
    if (!this.opened) {
      this.icon.nativeElement.classList.remove('defaultRotationArrow');
      this.opened = true;
      this.filters.nativeElement.classList.add('normalizeHeight');
      this.icon.nativeElement.classList.add('rotateArrow90');
    } else {
      this.filters.nativeElement.classList.remove('normalizeHeight');
      setTimeout(() => {
        this.icon.nativeElement.classList.remove('rotateArrow90');
      }, 400);
      this.filters.nativeElement.classList.add('h-24');
      this.icon.nativeElement.classList.add('defaultRotationArrow');

      this.opened = false;
    }
  }
}
