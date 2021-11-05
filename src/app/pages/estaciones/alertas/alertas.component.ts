import { Component, Input, OnInit } from '@angular/core';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertasService } from 'src/app/services/alertas.service';
import { EstacionService } from 'src/app/services/estacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alertas-est',
  templateUrl: './alertas.component.html',
  styles: [
  ]
})
export class AlertasComponent implements OnInit {
  @Input() codigo: any

  constructor(public _estacion: EstacionService, private _modal: NgbModal, public _alerta: AlertasService) { }

  faAlert = faExclamationTriangle
  faOk = faCheckCircle

  alertasList_nv: any[] = []
  total_alertas_nv = 0

  ngOnInit(){
    //review for each alert
    this.cargaAlertas(this.codigo)
  }

  // Radiacion
  openModal(tableAlerta: any){
    this._modal.open(tableAlerta, {size: 'lg'})
  }

  cambiarVisto(id:any){
    this._alerta.getAlerta(id).subscribe(
      alert => {
        this._alerta.vistoAlerta(id, alert).subscribe(
          data => {
            Swal.fire({
              position: 'top-end',
              title: 'Alerta Revisada',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            }).then(result => {
              this.alertasList_nv.splice(this.alertasList_nv.indexOf(alert), 1)
              this.cargaAlertas(this.codigo)
            })
          }
        )}
    )}

  cargaAlertas(cod: any){
    this._estacion.getAlertasbySt(cod).subscribe(
      alertas => {
        this.alertasList_nv = alertas
        this.total_alertas_nv = alertas.length
      }
    )
  }

}
