import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Genpack } from 'src/app/interfaces/generador.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { GenpackService } from 'src/app/services/genpack.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genpacks',
  templateUrl: './genpacks.component.html',
  styles: [
  ]
})
export class GenpacksComponent implements OnInit {

  genpacksList: any[] = []
  totalRecords = 0

  idEmpresaUser: any
  perfilUser: any

  //iconos
  faEdit = faEdit;
  faTimes = faTimes;
  faBack = faArrowLeft
  faPlus = faPlus

  constructor( public _empresa: EmpresaService, public _user: UsuarioService, public _genpack: GenpackService) { }

  ngOnInit(){
    this.idEmpresaUser = this._user.userIds.id_empresa
    this.perfilUser = this._user.usuario.id_perfil

    if(this.perfilUser == 1){
      this._genpack.getGenpackes().subscribe(
        (data:any )=> {
        this.genpacksList = data
        }
      )
    }
  }

  delete(genpack: Genpack, id:any){
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
        this._genpack.deleteGenpack(id, genpack).subscribe(
          resp => {
              this.genpacksList.splice(this.genpacksList.indexOf(genpack), 1)
          }
        )
        Swal.fire('Eliminado!', '', 'info');
      }
    })
  }

}
