import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  public form: FormGroup;
  public repeatedPassword;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      repeatedPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(12)]],
      phone: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.router.navigateByUrl('registro/ubicacion', { state: this.form.value });
  }
}
