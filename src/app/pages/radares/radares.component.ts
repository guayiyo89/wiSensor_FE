import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RadarService } from 'src/app/services/radar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-radares',
  templateUrl: './radares.component.html',
  styles: [
  ]
})
export class RadaresComponent implements OnInit {

  radarList: any[] = []
  
  idEmpresaUser: any
  perfilUser: any
  totalRecords = 0
  
  //iconos
  faEdit = faEdit;
  faTimes = faTimes;
  faBack = faArrowLeft
  faPlus = faPlus
  
  constructor(public _radar: RadarService, public _user: UsuarioService, public _empresa: EmpresaService) { }

  ngOnInit(){
    this.idEmpresaUser = this._user.userIds.id_empresa
    this.perfilUser = this._user.usuario.id_perfil
    if(this.perfilUser == 1){
      this._radar.getRadares().subscribe(
        radares => {
          this.radarList = radares
          console.log(this.radarList);
        })
    } else{
      this._radar.getRadares().subscribe(
        radares => {
          this.radarList = radares
          console.log(this.radarList);
        })
    }
  }

  delete(radar: any){
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
        this._radar.deleteRadar(radar.id).subscribe(
          resp => {
            if(!resp.err){
              this.radarList.splice(this.radarList.indexOf(radar), 1)
            }
          }
        )
        Swal.fire('Eliminado!', '', 'info');
      }
    })
  }

}
