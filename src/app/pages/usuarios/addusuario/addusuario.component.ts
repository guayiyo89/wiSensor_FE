import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.component.html',
  styles: [
  ]
})
export class AddusuarioComponent implements OnInit {

  constructor(public _user: UsuarioService, public _empresa: EmpresaService, public _centro: CentroService,
    private router: Router, private _fbuilder: FormBuilder, private _location: Location) { }

  // variables de entrada
  userGod: any
  idEmpresa: any
  perfilUser: any

  //llamada para los forms
  empresaList: Empresa[] = []
  centroList: Centro[] = []
  empresaUser: Empresa

  addForm: FormGroup;
  submitted = false;

  faSave = faSave
  faBack = faArrowLeft

  perfilesAST = [
    {id: 1, nombre: 'Administrador AST'},
    {id: 2, nombre: 'Admin Empresa'},
    {id: 3, nombre: 'Jefe Centro'},
    {id: 4, nombre: 'Operario Centro'}
  ]
  
  perfiles = [
    {id: 2, nombre: 'Admin Empresa'},
    {id: 3, nombre: 'Jefe Centro'},
    {id: 4, nombre: 'Operario Centro'}
  ]

  ngOnInit(){
    let user = this._user.usuario;
    this.idEmpresa = this._user.userIds.id_empresa;
    this.perfilUser = user.id_perfil;

    this.nomCentro(this.idEmpresa);
    this.nomEmpresaUser(this.idEmpresa);
    this.nomEmpresa();
    console.log(this.perfilUser, this.empresaUser);

    this.addForm = this._fbuilder.group({
      id: [],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      status: ['', Validators.required],
      empresa_id: ['', Validators.required],
      id_perfil: ['', Validators.required],
      id_centro: ['', Validators.required]
    })

    this.addForm.controls['status'].setValue(1)
    this.addForm.controls['empresa_id'].setValue(this.idEmpresa)

  }

  onSubmit(){
    this.submitted = true;

    if(this.addForm.valid){
      this._user.addUser(this.addForm.value).subscribe(
        (data) => {
          console.log(data)
          Swal.fire({
            title: 'Listo!',
            text: 'Usuario añadido correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
          
        },
        (error) => {
          console.log(error)
          Swal.fire({
            title: 'Hubo algún error.',
            text: 'El usuario o contraseña ya existen. Intente de nuevo.',
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

  nomEmpresa(){
    this._empresa.getEmpresas().subscribe(
      data => this.empresaList = data
    )
  }

  nomEmpresaUser(id: any){
    this._empresa.getEmpresa(id).subscribe(
      data => this.empresaUser = data
    )
  }

  nomCentro(id: any){
    //admin
      this._empresa.getCentros(id).subscribe(
        (data) => {
          this.centroList = data
        })
  }

  changeCentros(id: any){
    this._empresa.getCentros(id.target.value).subscribe(
      data => {
        this.centroList = data
        this.addForm.controls['centro_id'].setValue('')
      },
      error => {
        console.log(error)
        this.centroList = []
        this.addForm.controls['centro_id'].setValue('')
      }
    )
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
