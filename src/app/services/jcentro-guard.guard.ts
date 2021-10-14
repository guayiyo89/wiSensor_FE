import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class JCentroGuardGuard implements CanActivate {
  
  constructor( public _userSvc: UsuarioService, public router: Router ) {}

  canActivate() {
    if(this._userSvc.isLogin()){
      console.log('Paso la Guardia!');
      console.log(this._userSvc.usuario);
      
      if(this._userSvc.usuario.PERFIL_ID == 1 || this._userSvc.usuario.PERFIL_ID == 2 || this._userSvc.usuario.PERFIL_ID == 3){
        console.log('Admin!');
        return true;
      } else {
        console.log('user!');
        Swal.fire({
          title: 'Acceso denegado!',
          text: 'No tienes los permisos requeridos.',
          icon: 'warning'
        })
        this.router.navigate(['/welcome']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
