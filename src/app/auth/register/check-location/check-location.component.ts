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

  constructor(private router: Router, private formBuilder: FormBuilder, private government: GovernmentService) {
    mapbox.accessToken = 'pk.eyJ1IjoiYWxleC1maW9yZW56YSIsImEiOiJja2dyYmlyazYwMHkwMnRtdG9jdHl6c2l5In0.um6LLxRsN4HofOHuPCvQNA';
    this.government.getAllProvinces().subscribe((p: any) => {
      this.provinces = p;
      this.defaultProvince = p[4]
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
