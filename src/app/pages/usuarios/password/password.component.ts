import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { validateEqual } from 'validation-utils';
import Swal from 'sweetalert2';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styles: [
  ]
})
export class PasswordComponent implements OnInit {

  constructor(public _user: UsuarioService, private router: Router, private _fbuilder: FormBuilder, private _location: Location) { }

  userPwd: Usuario
  userId: any
  idEmpresa: any
  editForm: FormGroup;
  submitted = false

  faSave = faSave
  faBack = faArrowLeft

  perfilesAST = [
    {id: 1, nombre: 'Administrador AST'},
    {id: 2, nombre: 'Admin Empresa'},
    {id: 3, nombre: 'Jefe Centro'},
    {id: 4, nombre: 'Operario Centro'}
  ]

  ngOnInit(){
    this.userPwd = this._user.usuario
    this.userId = this._user.usuario.ID
    this.idEmpresa = this._user.userIds.id_empresa

    this.editForm = this._fbuilder.group({
        id: [],
        email: [{value: '', disabled: true}, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPwd: ['', [Validators.required, Validators.minLength(8)]],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        empresa_id: [{value: '', disabled: true}, Validators.required],
        id_centro: ['', Validators.required],
        id_perfil: ['', Validators.required],
        status: ['', Validators.required],
        //validators: [validateEqual('password','confirmPwd', 'Los password no coinciden')]
    })

    this.editForm.controls['empresa_id'].setValue(this.idEmpresa)
    this.editForm.controls['id_perfil'].setValue(this.userPwd.id_perfil)
    this.editForm.controls['correo'].setValue(this.userPwd.email)
    this.editForm.controls['password'].setValue('')
    this.editForm.controls['status'].setValue(this.userPwd.status)
    this.editForm.controls['nombre'].setValue(this.userPwd.nombre)
    this.editForm.controls['apellido'].setValue(this.userPwd.apellido)
    this.editForm.controls['id_centro'].setValue(this.userPwd.id_centro)


  }


  onSubmit(){
    this.submitted = true;

    
    if(this.editForm.valid){
      if(this.editForm.controls['password'].value != this.editForm.controls['confirmPwd'].value){
        Swal.fire({
          title: 'Error.',
          text: 'Las contraseñas no coinciden.',
          icon: 'error',
          confirmButtonText: 'Ok!'
        })
        return
      }
      this._user.editUser(this.userPwd.id, this.editForm.getRawValue()).subscribe(
        (data) => {
          console.log(data)
          Swal.fire({
            title: 'Listo!',
            text: 'La contraseña se ha actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
          
        },
        (error) => {
          console.log(error)
          Swal.fire({
            title: 'Hubo algún error.',
            text: 'Algo falló en el camino.',
            icon: 'error',
            confirmButtonText: 'Ok!'
          })
        }
      )
    }
  }

  volver() {
    return this._location.back();
  }

  get f() { return this.editForm.controls; }

}
