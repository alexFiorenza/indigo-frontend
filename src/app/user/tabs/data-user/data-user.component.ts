import { UserService } from './../../../core/services/http/api/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/utilities/interfaces/user';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss']
})
export class DataUserComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.loadPayload();
  }

}
