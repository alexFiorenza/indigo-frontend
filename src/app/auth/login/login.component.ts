import { UserService } from './../../core/services/http/api/user/user.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  @ViewChild('btnSubmit') private btnSubmit: ElementRef;
  @ViewChild('loader') private loader: ElementRef;
  @ViewChild('textBtn') private textBtn: ElementRef;
  @ViewChild('sucessCheck') private sucessCheck: ElementRef;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(12)]]
    });

  }

  ngOnInit(): void {
  }
  onSubmit() {
    const dataToSend = this.form.value;
    this.textBtn.nativeElement.classList.add('hidden');
    this.loader.nativeElement.classList.remove('hidden');
    this.btnSubmit.nativeElement.classList.add('changeWidth');
    this.userService.logIn(dataToSend).subscribe(data => {
      this.userService.saveUserSession(data.response.payload, data.response.token);
      if (data.status) {
        this.loader.nativeElement.classList.add('hidden');
        this.sucessCheck.nativeElement.classList.remove('hidden');
        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      }
    });



  }
}
