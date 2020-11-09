import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../utilities/interfaces/user';
import { UserService } from './../../core/services/http/api/user/user.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebar') private sidebarComponent: ElementRef;
  @ViewChild('singleProduct') private singleProduct: ElementRef;
  @ViewChild('hamburguerMenu') private hamburguerMenu: ElementRef;
  public userLogedIn: User;
  constructor(private userService: UserService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.userLogedIn = this.userService.loadPayload();
  }
  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.singleProduct.nativeElement.classList.remove('hidden');
        this.hamburguerMenu.nativeElement.classList.add('hidden');
      }
    });
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
  redirectToProducts() {
    this.route.navigate(['/productos'])
  }
}
