import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RadarService } from 'src/app/services/radar.service';
import { RdrAlertaService } from 'src/app/services/rdr-alerta.service';
import { SpotterService } from 'src/app/services/spotter.service';

@Component({
  selector: 'app-view-no-views',
  templateUrl: './view-no-views.component.html',
  styles: [
  ]
})
export class ViewNoViewsComponent implements OnInit {
  @Input() id: any

  constructor(public rdr_alertas: RdrAlertaService, public _radar: RadarService, public _spotter: SpotterService, private _modal: NgbModal) { }

  noVistos: any[] = []

  radar: any
  markers: any[] = []

  detalles: any

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
    this.rdr_alertas.getNoVistos(this.id).then(
      alertas => this.noVistos = alertas
    )

    this._radar.getRadar(this.id).subscribe(radar => {
      this.radar = radar
    })
  }

  openDetalle(data: any, alert: any){
    this._modal.open(data, {size: 'lg'})
    this.setVisto(alert.id_alerta, alert)
    this.details_header(alert.header)
  }

  setVisto(id: any, alert: any){
    this.rdr_alertas.vistoAlerta(id, alert).subscribe(
      visto => {
        this.noVistos.splice(this.noVistos.indexOf(alert), 1)
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
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

}
