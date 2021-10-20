import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { Usuario } from 'src/app/interfaces/usuario.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editusuario',
  templateUrl: './editusuario.component.html',
  styles: [
  ]
})
export class EditusuarioComponent implements OnInit {

  constructor(public _user: UsuarioService, public _empresa: EmpresaService, public _centro: CentroService,
    private router: Router, private _fbuilder: FormBuilder, private _route: ActivatedRoute, private _location: Location) { }

  // variables de entrada
  idEmpresa: any
  perfilUser: any

  //id del user a editar
  _id: any;
  usuario: Usuario

  faSave = faSave
  faBack = faArrowLeft

  //llamada para los forms
  empresaList: Empresa[] = []
  centroList: Centro[] = []
  empresaUser: Empresa

  editForm: FormGroup;
  submitted = false;

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

    this.nomEmpresaUser(this.idEmpresa);
    this.nomEmpresa();

    this._route.params.subscribe( params =>{
      this._id = +params['id'];
      this.editForm = this._fbuilder.group({
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

      this._user.getUser(this._id).subscribe(
        data => {
          this._centro.getCentro(data.id_centro).subscribe(
            centro => {
              this.editForm.controls['empresa_id'].setValue(centro.id_empresa)
              this.nomCentro(centro.id_empresa)
            }
          )
          this.usuario = data
          this.editForm.controls['email'].setValue(data.email)
          this.editForm.controls['password'].setValue('')
          this.editForm.controls['nombre'].setValue(data.nombre)
          this.editForm.controls['apellido'].setValue(data.apellido)
          this.editForm.controls['status'].setValue(data.status)
          this.editForm.controls['id_perfil'].setValue(data.id_perfil)
          this.editForm.controls['id_centro'].setValue(data.id_centro)
        }
      )


    })
    
  }

  onSubmit(){
    this.submitted = true;

    if(this.editForm.valid){
      this._user.editUser(this.usuario.id, this.editForm.getRawValue()).subscribe(
        (data) => {
          console.log(data)
          Swal.fire({
            title: 'Listo!',
            text: 'Usuario editado correctamente.',
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
        }
      )

  }

  changeCentros(id: any){
    this._empresa.getCentros(id.target.value).subscribe(
      data => {
        this.centroList = data
        this.editForm.controls['centro_id'].setValue('')
      },
      error => {
        console.log(error)
        this.centroList = []
        this.editForm.controls['centro_id'].setValue('')
      }
    )
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

}
