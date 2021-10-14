import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/interfaces/centro.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faArrowLeft, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styles: [
  ]
})
export class CentrosComponent implements OnInit {

  listCentro: any[] = []
  nameEmpresa: string = ''

  idEmpresaUser: any
  perfilUser: any

  //iconos
  faEdit = faEdit;
  faTimes = faTimes;
  faBack = faArrowLeft
  faPlus = faPlus
  
  totalRecords = 0

  constructor(public _centro: CentroService, private _route: ActivatedRoute, private router: Router, public _empresa: EmpresaService,
    public _user: UsuarioService) { }

  ngOnInit(){
    this.perfilUser = this._user.usuario.PERFIL_ID
    this.idEmpresaUser = this._user.usuario.EMPRESA_ID
    if(this.perfilUser === 1){
      this._centro.getCentros().then(
        data => {
          this.listCentro = data;
          this.totalRecords = data.length
        }
      )
    } else {
      this._empresa.getCenters(this.idEmpresaUser).then(
        data => {
          this.listCentro = data
          this.totalRecords = data.length
        }
      )
    }

  }

  storageID(id:any){
    localStorage.setItem('centroID', id);
  }

  delete(centro:Centro){
    Swal.fire({
      title: 'Eliminar',
      text: '¿Desea eliminar el item seleccionado?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: `SI`,
      showCancelButton: true,
      cancelButtonText: `NO`
    }).then((result)=>{
      if(result.isConfirmed){
        this._centro.deleteCentro(centro.ID).subscribe(
          resp => {
            if(!resp.err){
              this.listCentro.splice(this.listCentro.indexOf(centro),1)
            }
          }
        )
        Swal.fire('Eliminado!', '', 'info');

      }
    })
  }


  volver(){
    return this.router.navigate(['/empresas'])
  }


}
