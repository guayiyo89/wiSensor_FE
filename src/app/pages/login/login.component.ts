import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public _user: UsuarioService) { }

  email: any;
  password: any;

  ngOnInit() {
  }

  ingresar(forma: NgForm){
    if(forma.valid){
      let usuario = new Usuario(forma.value.email, forma.value.password, '', '', 1, '','', '', 0, 0);

      this._user.login(usuario, forma.value.recuerdame)
        .subscribe(resp => {          
          this.router.navigate(['/welcome']);
          
        }, error =>{
          console.log('falle');
          Swal.fire({
            title: 'Intente otra vez.',
            text: 'Email y/o contraseña incorrectos',
            icon: 'warning'
          })
          return
        })
      
    }

  
}

}