import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estacion } from 'src/app/interfaces/estacion.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faArrowLeft, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styles: [
  ]
})
export class EstacionesComponent implements OnInit {

  estacionList: any[] = [];

  idEmpresaUser: any
  perfilUser: any
  totalRecords = 0

  //iconos
  faEdit = faEdit;
  faTimes = faTimes;
  faBack = faArrowLeft
  faPlus = faPlus

  //pagination
  pageOfItems: Array<any>;

  constructor(public _estacion: EstacionService, public _empresa: EmpresaService, public _user: UsuarioService,
     private _route: ActivatedRoute) { }

  ngOnInit(){
    this.idEmpresaUser = this._user.usuario.EMPRESA_ID
    this.perfilUser = this._user.usuario.PERFIL_ID
    if(this.perfilUser == 1){
      this._estacion.getEstaciones().then(
        data => {
          this.estacionList = data
          this.totalRecords = data.length
          console.log(this.estacionList)
        }
      )
    } else {
      this._empresa.getEstaciones(this.idEmpresaUser).then(
        data => {
          this.estacionList = data
          this.totalRecords = data.length
        }
      )
    }

  }

  delete(estacion: Estacion){
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
        this._estacion.deleteEstacion(estacion.ID).subscribe(
          resp => {
            if(!resp.err){
              this.estacionList.splice(this.estacionList.indexOf(estacion), 1)
            }
          }
        )
        Swal.fire('Eliminado!', '', 'info');
      }
    })
  }



}
