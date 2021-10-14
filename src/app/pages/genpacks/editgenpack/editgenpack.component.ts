import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faEdit, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { Generador } from 'src/app/interfaces/generador.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { GenpackService } from 'src/app/services/genpack.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editgenpack',
  templateUrl: './editgenpack.component.html',
  styles: [
  ]
})
export class EditgenpackComponent implements OnInit {

  constructor(public _genpack: GenpackService, public _empresa: EmpresaService, private _location: Location, private _modal: NgbModal, public _activeModal: NgbActiveModal,
    private _fbuilder: FormBuilder, public _user: UsuarioService, public _centro: CentroService, private _route: ActivatedRoute) { }

    submitted = false;
    editForm: FormGroup;
    empresaList: Empresa[] = []
    centroList: Centro[] = []
    generadores: any[] = []
    genpack: any

    empresaUser: Empresa


    selectedEmp: number = 0
    _id: any //id del generador (BD)
    codigo: any //codigo generador(data)

    idEmpresa: any //id empresa del Logueado

    faSave = faSave
    faBack = faArrowLeft
    faPlus = faPlus
    faEdit = faEdit
    faTimes = faTimes

  ngOnInit(){
    this.idEmpresa = this._user.usuario.EMPRESA_ID
    this.selectedEmp = this._user.usuario.EMPRESA_ID;
    this.nomCentro(this.idEmpresa);
    this.nomEmpresa()
    
    this._route.params.subscribe(
      params => {
        this._id = +params['id'];

        this.editForm = this._fbuilder.group({
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
        
        this._genpack.getGenpack(this._id).subscribe(
          data => {
            this.genpack = data
            this.codigo = data.CODIGO;

            this.editForm.controls['nombre'].setValue(data.NOMBRE)
            this.editForm.controls['descripcion'].setValue(data.DESCRIPCION)
            this.editForm.controls['marca'].setValue(data.MARCA)
            this.editForm.controls['modelo'].setValue(data.MODELO)
            this.editForm.controls['estado'].setValue(data.ESTADO)
            this.editForm.controls['codigo'].setValue(data.CODIGO)
            this.editForm.controls['empresa_id'].setValue(data.EMPRESA_ID)
            this.editForm.controls['centro_id'].setValue(data.CENTRO_ID)
            this.editForm.controls['volt_bateria'].setValue(data.VOLT_BATERIA)

            this.nomCentro(data.EMPRESA_ID);
            this.selectedEmp = data.EMPRESA_ID
          }
        )
        
        this._genpack.getGeneradores(this._id).subscribe(
          data => {
            this.generadores = data
            console.log(this.generadores);
            
          }
        )

      }// fin params
    )
  }

  onSubmit(){
    this.submitted = true;    
    
    if(this.editForm.valid){
      this._genpack.editGenpack(this._id, this.editForm.value).subscribe(
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
        this.editForm.controls['centro_id'].setValue('')
      },
      error => {
        console.log(error)
        this.centroList = []
        this.editForm.controls['centro_id'].setValue('')
      }
    )
  }

  delete(generador: any){
    Swal.fire({
      title: 'Eliminar',
      text: '¿Desea eliminar el item seleccionado?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: `SI`,
      showCancelButton: true,
      cancelButtonText: `NO`
    }).then((result) => {
      if(result.isConfirmed){
        this._genpack.deleteGenerador(generador.ID).subscribe(
          resp => {
            if(!resp.err){
              this.generadores.splice(this.generadores.indexOf(generador), 1)
            }
          }
        )
        Swal.fire('Eliminado!', '', 'info');
      }
    })
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  //==============================================================================
  // Modals
  //==============================================================================

  //Temperatura
  openNew(addGen: any) {
    this._modal.open(addGen,{ size: 'lg' } )
  }

  openEdit(editGen: any) {
    this._modal.open(editGen,{ size: 'lg' } )
  }

  closeModal(){
    this._activeModal.close()
    this._genpack.getGeneradores(this._id).subscribe(
      data => {
        this.generadores = data
        console.log(this.generadores);
      })
  }

}
