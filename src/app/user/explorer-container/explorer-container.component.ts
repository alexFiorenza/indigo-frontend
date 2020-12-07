import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-explorer-container',
  templateUrl: './explorer-container.component.html',
  styleUrls: ['./explorer-container.component.scss']
})
export class ExplorerContainerComponent implements OnInit, AfterViewInit {

  constructor(@Inject(DOCUMENT) private document, private r: Renderer2) { }
  ngAfterViewInit() {
    this.addClass(document.querySelectorAll('.link'));

  }
  ngOnInit(): void {
    this.r.setStyle(document.body, 'background-color', '#F3F3F3')
  }
  addClass(elem: NodeListOf<Element>) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener('click', function (e) {
        const current = this;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < elem.length; i++) {
          if (current !== elem[i]) {
            elem[i].classList.remove('isActive');
            elem[i].classList.add('notActive');
          } else {
            current.classList.add('isActive');
            current.classList.remove('notActive');
          }
        }
        e.preventDefault();
      });
    }
  }
}

