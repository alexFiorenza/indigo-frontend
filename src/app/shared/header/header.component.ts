import { user } from './../../utilities/interfaces/user';
import { mocks } from './../../utilities/mocks/user';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidebar') private sidebarComponent: ElementRef;
  public userLogedIn: user;
  constructor() {
    this.userLogedIn = mocks.user1;
  }

  ngOnInit(): void {
  }
  openSidebar() {

    this.sidebarComponent.nativeElement.classList.remove('slide-out-left');
    this.sidebarComponent.nativeElement.classList.remove('hidden');
  }
  closeSidebar() {
    this.sidebarComponent.nativeElement.classList.add('slide-out-left');
    setTimeout(() => {
      this.sidebarComponent.nativeElement.classList.add('hidden');
    }, 500);
  }
}
