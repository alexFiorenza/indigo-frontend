import { ManageComponentsService } from './../../shared/components/manageComponents/manage-components.service';
import { UserService } from './../../core/services/http/api/user/user.service';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  @ViewChild('textBtn') public textBtn: ElementRef;
  @ViewChild('loader', { read: ViewContainerRef }) loader;
  public status = 'progress';

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private loaders: ManageComponentsService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(12)]]
    });

  }

  ngOnInit(): void {

  }
  onSubmit() {
    const dataToSend = this.form.value;
    const componentRef = this.loaders.instantiateBtnLoader(this.loader, this.textBtn, this.status);
    this.userService.logIn(dataToSend).subscribe(data => {
      this.userService.saveUserSession(data.response.payload, data.response.token);
      if (data.status) {
        this.status = 'completed';
        componentRef.instance.status = this.status;
        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      }
    });
  }

}
