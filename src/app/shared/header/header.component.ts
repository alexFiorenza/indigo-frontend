import { User } from './../utilities/interfaces/user';
import { UserService } from './../../core/services/http/api/user/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidebar') private sidebarComponent: ElementRef;
  public userLogedIn: User;
  constructor(private userService: UserService) {
    this.userLogedIn = this.userService.loadPayload();
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
  logOut() {
    this.userService.clearSession();
    window.location.reload();
  }
}
