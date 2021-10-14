import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  userGod: any
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
    this.userGod = (localStorage.getItem('usuario'));
    let user = JSON.parse(this.userGod);
    this.idEmpresa = user.EMPRESA_ID;
    this.perfilUser = user.PERFIL_ID;

    this.nomEmpresaUser(this.idEmpresa);
    this.nomEmpresa();

    this._route.params.subscribe( params =>{
      this._id = +params['id'];
      this.editForm = this._fbuilder.group({
        id: [],
        empresa_id: [{value: '', disabled: true}, Validators.required],
        perfil_id: ['', Validators.required],
        usuario: ['', Validators.required],
        correo: [{value: '', disabled: true}, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', Validators.required],
        estado: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        centro_id: ['', Validators.required]
      })

      this._user.getUser(this._id).subscribe(
        data => {
          this.usuario = data
          this.editForm.controls['empresa_id'].setValue(data.EMPRESA_ID)
          this.editForm.controls['perfil_id'].setValue(data.PERFIL_ID)
          this.editForm.controls['usuario'].setValue(data.USUARIO)
          this.editForm.controls['correo'].setValue(data.CORREO)
          this.editForm.controls['password'].setValue('')
          this.editForm.controls['estado'].setValue(data.ESTADO)
          this.editForm.controls['nombre'].setValue(data.NOMBRE)
          this.editForm.controls['apellido'].setValue(data.APELLIDO)
          this.editForm.controls['centro_id'].setValue(data.CENTRO_ID)

          this.nomCentro(data.EMPRESA_ID);
        }
      )


    })
    
  }

  onSubmit(){
    this.submitted = true;

    if(this.editForm.valid){
      this._user.editUser(this.usuario.ID, this.editForm.getRawValue()).subscribe(
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
