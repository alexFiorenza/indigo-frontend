import { User } from './../../../shared/utilities/interfaces/user';
import { UserService } from './../../../core/services/http/api/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-user-data',
  templateUrl: './cart-user-data.component.html',
  styleUrls: ['./cart-user-data.component.scss']
})
export class CartUserDataComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.loadPayload();
  }

}
