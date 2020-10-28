import { GovernmentService } from './../../core/services/http/government/government.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public repeatedPassword;
  constructor(private formBuilder: FormBuilder, private location: GovernmentService,
    // tslint:disable-next-line: align
    @Inject(DOCUMENT) private document, private renderer: Renderer2) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      repeatedPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(12)]],
      phone: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-indigoBlack-300');
  }
  onSubmit() {
    this.location.getAllProvinces().subscribe(data => {
      console.log(data);
    });
  }
}
