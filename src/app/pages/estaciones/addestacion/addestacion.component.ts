import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { comunasChile } from 'src/app/config/chile';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-addestacion',
  templateUrl: './addestacion.component.html',
  styles: [
  ]
})
export class AddestacionComponent implements OnInit {

  constructor(public _estacion: EstacionService, public _empresa: EmpresaService, private router: Router, private _location: Location,
     private _fbuilder: FormBuilder, public _user: UsuarioService, public _centro: CentroService) { }

  submitted = false;
  addForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: Centro[] = []

  empresaUser: Empresa

  selectedEmp: number = 0

  latMap: any
  longMap: any
  marker1 = { position: { lat: -41.46529, lng: -77.2538699 } };

  perfilUser: any
  idEmpresa: any //id empresa del Logueado

  faSave = faSave
  faBack = faArrowLeft

  // regiones-comunas dropdown
  regionesList: any[] = comunasChile.regiones
  comunasList: Array<any> = []

  markers = []
  infoContent = ''


  ngOnInit(){
    this.nomEmpresa()
    this.perfilUser = this._user.usuario.id_perfil;
    this.idEmpresa = this._user.userIds.id_empresa;
    this.selectedEmp = this._user.userIds.id_empresa;
    this.nomCentro(this.idEmpresa);
    this.nomEmpresaUser(this.idEmpresa);
    console.log(this.perfilUser);

    this.addForm = this._fbuilder.group({
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

    this.addForm.controls['status'].setValue(1)
    this.addForm.controls['empresa_id'].setValue(this.idEmpresa)
    this.addForm.controls['id_centro'].setValue(this._user.userIds.id_centro) 

  }
  
  onSubmit(){
    this.submitted = true;    
    
    if(this.addForm.valid){
      this._estacion.addEstacion(this.addForm.value).subscribe(
        data =>{
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Estación añadida correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
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
        (data) => {
          this.centroList = data
        }
      )}


  changeCentros(id: any){
    this._empresa.getCentros(id.target.value).subscribe(
      data => {
        this.centroList = data
        if(this.centroList.length > 0) {this.addForm.controls['id_centro'].setValue(this.centroList[0].id)}
        else { this.addForm.controls['id_centro'].setValue('')}
      },
      error => {
        console.log(error)
        this.centroList = []
        this.addForm.controls['id_centro'].setValue('')
      }
    )
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
