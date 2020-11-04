import { UserService } from './../../../core/services/http/api/user/user.service';
import { user } from './../../../utilities/interfaces/user';
import { GovernmentService } from './../../../core/services/http/government/government.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as mapbox from 'mapbox-gl';
@Component({
  selector: 'app-check-location',
  templateUrl: './check-location.component.html',
  styleUrls: ['./check-location.component.scss']
})
export class CheckLocationComponent implements OnInit {
  public step = 'location';
  public form: FormGroup;
  public provinces: Array<any>;
  public defaultProvince;
  public towns: Array<any>;
  public userData;
  public user: user;
  constructor(private router: Router, private formBuilder: FormBuilder, private government: GovernmentService,
    private userService: UserService) {
    mapbox.accessToken = 'pk.eyJ1IjoiYWxleC1maW9yZW56YSIsImEiOiJja2dyYmlyazYwMHkwMnRtdG9jdHl6c2l5In0.um6LLxRsN4HofOHuPCvQNA';
    this.userData = this.router.getCurrentNavigation().extras.state;
    this.government.getAllProvinces().subscribe((p: any) => {
      this.provinces = p;
      this.defaultProvince = p[4];
      this.form = this.formBuilder.group({
        province: [this.defaultProvince.nombre, [Validators.required]],
        town: ['', [Validators.required]],
        street: ['', [Validators.required]],
        numberStreet: ['', [Validators.required]],
        instructions: [''],
        building: [''],
        cp: ['', [Validators.required]]
      });
      this.government.getDepartment(this.defaultProvince.id).subscribe(departaments => {
        this.towns = departaments;
      });
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.user = this.userData;
    Object.assign(this.user, this.form.value);
    this.userService.registerUser(this.user).subscribe((res: any) => {
      console.log(res);
    });
  }
  selectedProvince(province) {
    const selectedProvince: any = this.provinces.filter((p: any) => {
      if (p.nombre === province) {
        return p;
      }
    });
    this.government.getDepartment(selectedProvince[0].id).subscribe(departaments => {
      this.towns = departaments;
    });
  }
}
