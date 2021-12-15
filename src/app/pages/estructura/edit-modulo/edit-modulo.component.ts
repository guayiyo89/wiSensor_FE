import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { GpsModulosService } from 'src/app/services/gps-modulos.service';
import { IdPassService } from 'src/app/services/id-pass.service';
import { ModulosService } from 'src/app/services/modulos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-modulo',
  templateUrl: './edit-modulo.component.html',
  styles: [
  ]
})
export class EditModuloComponent implements OnInit {
  @Input() _Estructura: any

  constructor(public _user: UsuarioService, public _empresa: EmpresaService, public _centro: CentroService, public _modulo: ModulosService, public _gps: GpsModulosService,
    private _fbuider: FormBuilder, private location: Location, private _idPass: IdPassService, private route: ActivatedRoute, private _modal: NgbModal, public _activeModal: NgbActiveModal) { }

    submitted = false;
    //@ts-ignore
    editForm: FormGroup
    _idModulo: any

    gpsList: any[] = []

    centroList: any[] = [];
    empresaList: any[] = [];

    //@ts-ignore
    empresaUser: Empresa
    perfilUser: any
    idEmpresa: any

  faSave = faSave
  faBack = faArrowLeft
  faEdit = faEdit
  faTrash = faTrash

  ngOnInit(): void {
    this.perfilUser = this._user.usuario.id_perfil
    this.idEmpresa = this._user.userIds.id_empresa
    this.getId()
    console.log(this._Estructura);
    this.editForm = this._fbuider.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      id_et_estructura: ['', [Validators.required]],
    })

    this.route.params.subscribe(params => {
      this._modulo.getModulo(params.id).then(res => {
        this._idModulo = res.id
        this.editForm.patchValue(res)

        this._gps.getGpsModulos(this._idModulo).then(
          data => {
            this.gpsList = data
          })
      })
    })

    
  }

  onSubmit(){
    this.submitted = true;
    if(this.editForm.valid){

      this._modulo.updateModulo(this.editForm.value, this._idModulo).subscribe(
        data => {
          Swal.fire({
            title: 'Modulo agregado',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        },
        error => {console.log('No hay Datos que mostrar', error)})
    }
  }

  delete(gps: any, id: any){
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
        this._gps.deleteGpsModulo(id,gps).then(
          data => {
            this.gpsList.splice(this.gpsList.indexOf(gps), 1)
          }
        )
        //aqui va el eliminar
        Swal.fire('Eliminado!', '', 'info');
      }
    })
  }

  volver(){
    return this.location.back()
  }


  getId(){
    this._idPass.bulma$.pipe(take(1)).subscribe(id => this._Estructura = id)
  }

  //Temperatura
  openNew(addGen: any) {
    this._modal.open(addGen,{ size: 'lg' } )
  }

  openEdit(editGen: any) {
    this._modal.open(editGen,{ size: 'lg' } )
  }

  closeModal(){
    this._activeModal.close()
    this._gps.getGpsModulos(this._idModulo).then(
      data => {
        this.gpsList = data
        console.log(this.gpsList);
      })
  }

  get f() { return this.editForm.controls; }

}
