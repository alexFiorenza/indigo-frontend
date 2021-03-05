import { ManageComponentsService } from './../../shared/components/manageComponents/manage-components.service';
import { UserService } from './../../core/services/http/api/user/user.service';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2'
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
  ngOnInit() {

  }
  onSubmit() {
    const dataToSend = this.form.value;
    const componentRef = this.loaders.instantiateBtnLoader(this.loader, this.textBtn, this.status);
    this.userService.logIn(dataToSend).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!err.error.status) {
          // handle error
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Al parecer la contraseña o email son incorrectos',
            footer: '<a href>Reintenta con otra contraseña o email</a>'
          }).then((dismiss) => {
            if (dismiss.isDismissed || dismiss.isConfirmed) {
              window.location.reload();
            }
          })
        }
        return throwError(err);
      })
    ).subscribe(data => {
      if (data.status) {
        this.userService.saveUserSession(data.response.payload, data.response.token);
        this.status = 'completed';
        componentRef.instance.status = this.status;
        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      } else {
        this.status = 'error';
        componentRef.instance.status = this.status;
        // window.location.reload();
      }
    });
  }
}
