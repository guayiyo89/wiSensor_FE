import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LazyLoadEvent } from 'primeng/api'
import { PrimeNGConfig } from 'primeng/api';
import { faArrowLeft, faEdit, faTimes, faUserPlus, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  userList: any[];
  datasource: any[]

  idEmpresaUser: any
  perfilUser: any

  totalRecords: number;

  cols: any[];

  loading: boolean;

  //iconos
  faEdit = faEdit;
  faTimes = faTimes;
  faUser = faUserPlus;
  faBack = faArrowLeft

  //pagination
  pageOfItems: Array<any>;

  constructor(public _user: UsuarioService, public _empresa: EmpresaService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(){
    this.idEmpresaUser = this._user.usuario.EMPRESA_ID
    this.perfilUser = this._user.usuario.PERFIL_ID

    if(this.perfilUser == 1){
      this._user.getUsuarios().then(data => {
        this.userList = data
        this.totalRecords = data.length;
        console.log(this.userList)
      })
    } else{
      this._empresa.getUsers(this.idEmpresaUser).then(data => {
        this.userList = data
        this.totalRecords = data.length;
        console.log(this.userList)
      })
    }


    this.loading = true;
    this.primengConfig.ripple = true;
  }

  delete(usuario: Usuario){
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
        this._user.deleteUser(usuario.ID).subscribe(
          resp => {
            if(!resp.err){
              this.userList.splice(this.userList.indexOf(usuario),1)
            }
          }
        )
        Swal.fire('Eliminado!', '', 'info');
      }
    })
  }

  loadUsers(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
        if(this.datasource){
          this.userList = this.datasource.slice(event.first, event.rows)
          console.log(this.userList);
          
          this.loading = false
        }
    }, 1000);
  }

  //pagination
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
