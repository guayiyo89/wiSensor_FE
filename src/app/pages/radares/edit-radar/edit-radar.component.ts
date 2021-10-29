import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RadarService } from 'src/app/services/radar.service';
import { Location } from '@angular/common';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-radar',
  templateUrl: './edit-radar.component.html',
  styles: [
  ]
})
export class EditRadarComponent implements OnInit {

  constructor(public _radar: RadarService, public _empresa: EmpresaService, public _centro: CentroService, private _location: Location, private _fbuilder: FormBuilder,
    private _route: ActivatedRoute) { }

  submitted = false;
  editForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: Centro[] = []

  radar: any

  faSave = faSave
  faBack = faArrowLeft
  _id: any

  ngOnInit(){
    this.nomEmpresa()
    this._route.params.subscribe( params => {
      this._id = +params['id']
      this.editForm = this._fbuilder.group({
        id: [''],
        codigo: ['', Validators.required],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        marca: ['', Validators.required],
        modelo: ['', Validators.required],
        status: ['', Validators.required],
        empresa_id: ['', Validators.required],
        id_centro: ['', Validators.required]
      })
  
      this._radar.getRadar(this._id).subscribe(
        data => {
          this._centro.getCentro(data.id_centro).subscribe(
            centro => {
              this.editForm.controls['empresa_id'].setValue(centro.id_empresa)
              this.nomCentro(centro.id_empresa);
            })
          this.radar = data
          this.editForm.controls['codigo'].setValue(data.codigo)
          this.editForm.controls['nombre'].setValue(data.nombre)
          this.editForm.controls['descripcion'].setValue(data.descripcion)
          this.editForm.controls['marca'].setValue(data.marca)
          this.editForm.controls['modelo'].setValue(data.modelo)
          this.editForm.controls['status'].setValue(data.status)
          this.editForm.controls['id_centro'].setValue(data.id_centro)
        }
      )

    })

  }

  onSubmit(){
    this.submitted = true;    
    
    if(this.editForm.valid){
      this._radar.editRadar(this.radar.id, this.editForm.getRawValue()).subscribe(
        data =>{
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Radar editado correctamente.',
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
        this.editForm.controls['id_centro'].setValue('')
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
