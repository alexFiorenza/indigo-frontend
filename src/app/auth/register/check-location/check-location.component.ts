import { GovernmentService } from './../../../core/services/http/government/government.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-location',
  templateUrl: './check-location.component.html',
  styleUrls: ['./check-location.component.scss']
})
export class CheckLocationComponent implements OnInit {
  public form: FormGroup;
  public provinces: Array<any>;
  private defaultProvince: string;
  constructor(private router: Router, private formBuilder: FormBuilder, private government: GovernmentService) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.government.getAllProvinces().subscribe((p: any) => {
      this.provinces = p;
      this.defaultProvince = p[21].nombre;
      console.log(this.provinces);
    });
    this.form = this.formBuilder.group({
      province: ['', [Validators.required]],
      town: ['', [Validators.required]],
      street: ['', [Validators.required]],
      numberStreet: ['', [Validators.required]],
      instructions: [''],
      building: [''],
      cp: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {

  }
}
