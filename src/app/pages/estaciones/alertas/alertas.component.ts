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
    this._estacion.getAlertasbySt(this.codigo).subscribe(
      alertas => {
        this.alertasList_nv = alertas
        this.total_alertas_nv = alertas.length
      }
    )
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
              title: 'Alerta Revisada',
              icon: 'success',
              timer: 2000
            })
          }
        )}
    )}

}
