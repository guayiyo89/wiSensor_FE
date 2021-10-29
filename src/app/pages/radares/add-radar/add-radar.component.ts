import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { comunasChile } from 'src/app/config/chile';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RadarService } from 'src/app/services/radar.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-radar',
  templateUrl: './add-radar.component.html',
  styles: [
  ]
})
export class AddRadarComponent implements OnInit {

  constructor(public _radar: RadarService, public _empresa: EmpresaService, public _centro: CentroService, private _location: Location, private _fbuilder: FormBuilder) { }

  submitted = false;
  addForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: Centro[] = []

  faSave = faSave
  faBack = faArrowLeft

  ngOnInit(){
    this.nomEmpresa()
    this.nomCentro(1); //rescato AST

    this.addForm = this._fbuilder.group({
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

    this.addForm.controls['estado'].setValue(1)
    this.addForm.controls['empresa_id'].setValue(1)

  }

  onSubmit(){
    this.submitted = true;    
    
    if(this.addForm.valid){
      this._radar.addRadar(this.addForm.value).subscribe(
        data =>{
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Radar añadido correctamente.',
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
        this.addForm.controls['id_centro'].setValue('')
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
