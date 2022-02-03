import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { Estacion } from 'src/app/interfaces/estacion.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { comunasChile } from 'src/app/config/chile';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-editestacion',
  templateUrl: './editestacion.component.html',
  styles: [
  ]
})
export class EditestacionComponent implements OnInit {

  constructor(public _estacion: EstacionService, public _empresa: EmpresaService, private router: Router, private _location: Location,
    private _fbuilder: FormBuilder, public _user: UsuarioService, public _centro: CentroService, private _route: ActivatedRoute) { }

  submitted = false;
  editForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: any[] = []
  empresaUser: Empresa

  selectedEmp: number = 0
  
  //id de la estacion a editar
  _id: any;
  estacion: Estacion
  
  perfilUser: any
  idEmpresa: any //id empresa del Logueado

  faSave = faSave
  faBack = faArrowLeft
  
  // regiones-comunas dropdown
  regionesList: any[] = comunasChile.regiones
  comunasList: Array<any> = []
  selectedRegion: String = "--Elegir Region--";

  ngOnInit(){
    this.nomEmpresa()
    this.perfilUser = this._user.usuario.id_perfil;
    this.idEmpresa = this._user.userIds.id_empresa;
    
    this.nomEmpresaUser(this.idEmpresa);
    console.log(this.perfilUser);

    this._route.params.subscribe( params => {
      this._id = +params['id']
      if(this.perfilUser == 1){
        this.editForm = this._fbuilder.group({
          id: [''],
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required],
          modelo: ['', Validators.required],
          marca: ['', Validators.required],
          codigo: ['', Validators.required],
          status: ['', Validators.required],
          pos_inicial: ['', Validators.required],
          empresa_id: ['', Validators.required],
          id_centro: ['', Validators.required]
        })
      }

      this._estacion.getEstacion(this._id).subscribe(
        data => {
          this._centro.getCentro(data.id_centro).subscribe(
            centro => {
              this.editForm.controls['empresa_id'].setValue(centro.id_empresa)
              this.nomCentro(centro.id_empresa);
            }
          )
          this.estacion = data
          this.editForm.controls['nombre'].setValue(data.nombre)
          this.editForm.controls['descripcion'].setValue(data.descripcion)
          this.editForm.controls['modelo'].setValue(data.modelo)
          this.editForm.controls['marca'].setValue(data.marca)
          this.editForm.controls['codigo'].setValue(data.codigo)
          this.editForm.controls['status'].setValue(data.status)
          this.editForm.controls['pos_inicial'].setValue(data.pos_inicial)
          this.editForm.controls['id_centro'].setValue(data.id_centro)
        }
        
      )

    })
  }


  onSubmit(){
    this.submitted = true;
    if(this.editForm.valid){
      this._estacion.editEstacion(this.estacion.id, this.editForm.getRawValue()).subscribe(
        (data) => {
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Estación editada correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        },
        (error) => {
          console.log(error)
          Swal.fire({
            title: 'Hubo algún error.',
            text: 'Falta asignar valor a un campo.',
            icon: 'error',
            confirmButtonText: 'Ok!'
          })
        }
      )
    }
  }

  volver(){
    return this._location.back()
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
        data => this.centroList = data
      )
  }

  changeCentros(id: any){
    this._empresa.getCentros(id.target.value).subscribe(
      data => {
        this.centroList = data
        if(this.centroList.length > 0) {this.editForm.controls['id_centro'].setValue(this.centroList[0].id)}
        else { this.editForm.controls['id_centro'].setValue('')}
      },
      error => {
        console.log(error)
        this.centroList = []
        this.editForm.controls['id_centro'].setValue('')
      }
    )
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

}
