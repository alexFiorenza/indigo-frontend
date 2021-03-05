import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject, Renderer2, AfterContentInit, OnDestroy } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { UserService } from '../../core/services/http/api/user/user.service';

@Component({
  selector: 'app-explorer-container',
  templateUrl: './explorer-container.component.html',
  styleUrls: ['./explorer-container.component.scss']
})
export class ExplorerContainerComponent implements OnInit, AfterContentInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private document, private r: Renderer2, private router: ActivatedRoute, private userService: UserService) { }
  ngAfterContentInit() {
    this.addClass(document.querySelectorAll('.link'));
  }
  ngOnInit(): void {
    this.r.setStyle(document.body, 'background-color', '#F3F3F3');
  }
  ngOnDestroy() {
    this.r.setStyle(document.body, 'background-color', 'white');
  }
  addClass(elem) {
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

