import { Component, Input, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RadarService } from 'src/app/services/radar.service';
import { RdrAlertaService } from 'src/app/services/rdr-alerta.service';
import { SpotterService } from 'src/app/services/spotter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-alerts',
  templateUrl: './view-alerts.component.html',
  styles: [
  ]
})
export class ViewAlertsComponent implements OnInit {
  @Input() id: any

  constructor(public rdr_alertas: RdrAlertaService, public _radar: RadarService, public _spotter: SpotterService, private _modal: NgbModal) { }
  
  noVistos: any[] = []
  totalRecords = 0

  radar: any
  markers: any[] = []

  detalles: any

  faCheck = faCheck

  zoom = 18
  // @ts-ignore
  center: google.maps.LatLngLiteral

  options: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    streetViewControl: false,
    maxZoom: 20,
    minZoom: 16,
  }

  ngOnInit(): void {
    this.rdr_alertas.getAlertas(this.id).then(
      alertas => {
        this.noVistos = alertas
        this.totalRecords = alertas.length
      }
    )

    this._radar.getRadar(this.id).subscribe(radar => {
      this.radar = radar
    })
  }

  openDetalle(data: any, alert: any){
    this._modal.open(data, {size: 'lg'})
    this.details_header(alert.header)
    if(alert.visto == 0){
      this.setVisto(alert.id_alerta, alert)}
  }

  setVisto(id: any, alert: any){
    this.rdr_alertas.vistoAlerta(id, alert).subscribe(
      visto => {
        Swal.fire(
          'Visto',
        )
      }
    )
  }

  details_header(idHeader:any){
    this._spotter.getDetail(idHeader).subscribe(
      data => {
        console.log(data)
        this.detalles = data
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: data.latitud,
            lng: data.longitud,
          }
        })
        if(this.markers.length > 0){
          this.markers.splice(0, this.markers.length)
          this.addMarker(data)
        }else{
        this.addMarker(data)}
      })
  }

  addMarker(dato:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: `${dato.nombre}`,
      options: { animation: google.maps.Animation.BOUNCE }
    })
  }

}
