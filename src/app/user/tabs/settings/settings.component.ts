import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import swal from 'sweetalert2'
import { UserService } from '../../../core/services/http/api/user/user.service';
import { User } from '../../../shared/utilities/interfaces/user';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  deleteUser() {
    this.user = this.userService.loadPayload();
    swal.fire({
      title: '¿Estás seguro?',
      text: "Si eliminas tu cuenta no podras volver atras.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si,eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.user._id).pipe(
          catchError((err) => {
            if (!err.error.status) {
              // handle error
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Al parecer no se ha podido eliminar la cuenta',
                footer: '<a href>Reintenta más tarde</a>'
              }).then((dismiss) => {
                if (dismiss.isDismissed || dismiss.isConfirmed) {
                  window.location.reload();
                }
              })
            }
            return throwError(err);
          })
        ).subscribe((res: any) => {
          if (res.status) {
            swal.fire(
              {
                title: 'Eliminado',
                text: 'Tu cuenta ha sido eliminada correctamente',
                icon: 'success',
                timer: 1500
              }
            ).then((dismissed) => {
              this.userService.clearSession();
              window.location.reload();
            })
          }
        })
      }
    })

  }
  logOut() {
    swal.fire({
      title: '¿Estás seguro?',
      text: "Estas a punto de cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.clearSession();
        window.location.reload();
      }
    })
  }
}
