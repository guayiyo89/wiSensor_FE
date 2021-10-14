import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _userSvc: UsuarioService, public router: Router){}

  canActivate() {
    if(this._userSvc.isLogin()){
      console.log('Paso la Guardia!');
      return true;
    } else {
      console.log('Bloqueado!');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
