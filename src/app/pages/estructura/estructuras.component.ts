import { Component, OnInit } from '@angular/core';
import { CentroService } from 'src/app/services/centro.service';
import { EstructurasService } from 'src/app/services/estructuras.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faArrowLeft, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estructuras',
  templateUrl: './estructuras.component.html',
  styles: [
  ]
})
export class EstructurasComponent implements OnInit {

  constructor(public estrucutra: EstructurasService, public _user: UsuarioService, public centro: CentroService) { }

  estructuras: any[] = []

  idEmpresaUser: any
  perfilUser: any
  totalRecords = 0

  //iconos
  faEdit = faEdit;
  faTimes = faTimes;
  faBack = faArrowLeft
  faPlus = faPlus

  ngOnInit(){
    this.idEmpresaUser = this._user.usuario.id_empresa
    this.perfilUser = this._user.usuario.id_perfil

    if(this.perfilUser == 1){
      this.estrucutra.getEstructuras().then(
        (res: any) => {
          this.estructuras = res
          this.totalRecords = res.length
        })
    }else{
      this.estrucutra.getEstructurasByEmpresa(this.idEmpresaUser).then(
        (res: any) => {
          this.estructuras = res.estructuras
          this.totalRecords = res.total
        })
    }
  }

  delete(estructura: any, id:any){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Desea eliminar el item seleccionado?'",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.value) {
        this.estrucutra.deleteEstructura(id, estructura).then(
          (res: any) => {
            Swal.fire(
              'Eliminado',
              'El item ha sido eliminado',
              'success'
            )
            this.estructuras.splice(this.estructuras.indexOf(estructura), 1)
          }
        )
      }
    })
  }
  

}
