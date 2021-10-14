import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { GenpackService } from 'src/app/services/genpack.service';

@Component({
  selector: 'app-addgenpack',
  templateUrl: './addgenpack.component.html',
  styles: [
  ]
})
export class AddgenpackComponent implements OnInit {

  constructor(public _genpack: GenpackService, public _empresa: EmpresaService, private _location: Location,
    private _fbuilder: FormBuilder, public _user: UsuarioService, public _centro: CentroService) { }

  submitted = false;
  addForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: Centro[] = []

  empresaUser: Empresa

  selectedEmp: number = 0

  idEmpresa: any //id empresa del Logueado

  faSave = faSave
  faBack = faArrowLeft
  faPlus = faPlus


  ngOnInit(){
    this.idEmpresa = this._user.usuario.EMPRESA_ID

    this.selectedEmp = this._user.usuario.EMPRESA_ID;
    this.nomCentro(this.idEmpresa);
    this.nomEmpresa()
    
    this.addForm = this._fbuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      estado: ['', Validators.required],
      codigo: ['', Validators.required],
      empresa_id: ['', Validators.required],
      centro_id: ['', Validators.required],
      volt_bateria: ['', Validators.required]
    })

    this.addForm.controls['estado'].setValue(1)
    this.addForm.controls['empresa_id'].setValue(this.idEmpresa)
  }

  onSubmit(){
    this.submitted = true;    
    
    if(this.addForm.valid){
      this._genpack.addGenpack(this.addForm.value).subscribe(
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
      } else(console.log('Culpa de David!'))
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
