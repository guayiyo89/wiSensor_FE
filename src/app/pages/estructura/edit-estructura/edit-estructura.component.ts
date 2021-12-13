import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstructurasService } from 'src/app/services/estructuras.service';
import { IdPassService } from 'src/app/services/id-pass.service';
import { ModulosService } from 'src/app/services/modulos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-estructura',
  templateUrl: './edit-estructura.component.html',
  styles: [
  ]
})
export class EditEstructuraComponent implements OnInit {

  constructor(public _user: UsuarioService, public _empresa: EmpresaService, public _centro: CentroService, public estructura: EstructurasService, public _modulo: ModulosService,
     private _fbuilder: FormBuilder, private location: Location, private route: ActivatedRoute, private _idPass: IdPassService) { }

  submitted = false;
  //@ts-ignore
  editForm: FormGroup;
  estructuras: any[] = [];

  _id: any

  centroList: Centro[] = []
  empresaList: Empresa[] = []
  //@ts-ignore
  empresaUser: Empresa;

  perfilUser: any
  idEmpresa: any //id empresa del Logueado

  ponton: any
  modulosJaulas: any[] = []

  faSave = faSave
  faBack = faArrowLeft
  faTimes = faTimes
  faEdit = faEdit

  ngOnInit(): void {
    this.perfilUser = this._user.usuario.id_perfil
    this.idEmpresa = this._user.userIds.id_empresa
    this.nomEmpresa()
    this.nomCentro(this.idEmpresa)
    this.editForm = this._fbuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      empresa_id: ['', [Validators.required]],
      id_centro: ['', [Validators.required]],
    })

    this.route.params.subscribe(params => {
      this._id = params['id']
      this.estructura.getEstructura(params['id']).then(
        data => {
          this.editForm.patchValue(data)
          this._centro.getCentro(data.id_centro).subscribe(
            center => this.editForm.controls['empresa_id'].setValue(center.id_empresa)
          )
        }
      )

      this._modulo.getPonton(params['id']).then(
        data => {
          this.ponton = data[0]
        },
        error => {
          console.log(error)
        })

      this._modulo.getJaulas(params['id']).then(
        data => {
          this.modulosJaulas = data
        },
        error => {
          console.log(error)}
          )
    })
  }

  deletePonton(ponton:any, id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Desea eliminar el item seleccionado?'",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if(result.value){
        this._modulo.deleteModulo(id, ponton).then(
          res => {
            Swal.fire({
              title: 'Listo!',
              text: 'Item eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Ok!'
            })
            this.ponton = null
          })
      }
    })
  }

  delete(jaula:any, id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Desea eliminar el item seleccionado?'",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if(result.value){
        this._modulo.deleteModulo(id, jaula).then(
          res => {
            Swal.fire({
              title: 'Listo!',
              text: 'Item eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Ok!'
            })
            this.modulosJaulas.splice(this.modulosJaulas.indexOf(jaula), 1)
          })
      }
    })
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

  onSubmit() {
    this.submitted = true;

    if(this.editForm.valid){
      this.estructura.updateEstructura(this.editForm.value, this._id).then(
        data => {
          Swal.fire({
            title: 'Listo!',
            text: 'Estación añadida correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        },
        error => {
          console.log(error)
        }
      )
    } else {return}
    }

    volver(){
      return this.location.back()
    }

    nomCentro(id: any){
      //admin
        this._empresa.getCentros(id).subscribe(
          (data) => {
            this.centroList = data
          }
        )}
    
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

    enviarId(id: any){
      this._idPass.enviar(id)
    }
  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  

}
