import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faCheck, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styles: [
  ]
})
export class AlertsComponent implements OnInit {

  constructor(public _alert: AlertasService, public _user: UsuarioService) { }

  centro_user: any
  perfil_user: any

  alertList: any[] = []
  totalRecords = 0

  faEdit = faEdit
  faBack = faArrowLeft
  faTimes = faTimes;

  faCheck = faCheck

  ngOnInit(){
    this.centro_user = this._user.usuario.id_centro
    this.perfil_user = this._user.usuario.id_perfil

    this._alert.getAlertas(this.centro_user).then(
      data => {
        this.alertList = data
        this.totalRecords = data.length
        console.log(data)
      })
      
  }

  cambiarVisto(id:any){
    this._alert.getAlerta(id).subscribe(
      alert => {
        if(alert.visto == 0){
          this._alert.vistoAlerta(id, alert).subscribe(
            data => {
              Swal.fire({
                position: 'top-end',
                title: 'Alerta Revisada',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              }).then( result => {
                this._alert.getAlertas(this.centro_user).then(
                  data => {
                    this.alertList = data
                    this.totalRecords = data.length
                    console.log(data)
                  })
              })
            }
          )}
        }
    )}

}
