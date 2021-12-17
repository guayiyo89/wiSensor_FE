import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GpsModulosService } from 'src/app/services/gps-modulos.service';
import { MapInfoWindow, MapMarker, GoogleMap, MapPolygon, } from '@angular/google-maps'

@Component({
  selector: 'app-modulos-line',
  templateUrl: './modulos-line.component.html',
  styles: [
  ]
})
export class ModulosLineComponent implements OnInit {
  @Input() _idModulo: any
  @Input() _lat: number = 0
  @Input() _lng: number = 0

  constructor(public _gps: GpsModulosService) { }

  gpsList: any[] = []
  markers: any[] = []

  coordenadas: any[] = []
  deformacion: any[] = []

  zoom = 17
  // @ts-ignore
  center: google.maps.LatLngLiteral

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    streetViewControl: false,
    maxZoom: 20,
    minZoom: 9,
  }

  pol_options: google.maps.PolygonOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#f0db22',
    fillOpacity: 0.35,
    clickable: false
  }

  pol_options2: google.maps.PolygonOptions = {
    strokeColor: '#f0db22',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#f0db22',
    fillOpacity: 0.35,
    clickable: false
  }

  ngOnInit(): void {
    console.log(this._lat, this._lng)

    this._gps.getGpsModulos(this._idModulo).then((resp: any) => {
      this.gpsList = resp.data
      console.log(this.gpsList)
      resp.forEach((gps:any) => {
        this.addNewMarker(gps)
        let coords = {lat: gps.latitud, lng: gps.longitud}
        this.coordenadas.push(coords)
        //re-calculate gps
        this._gps.getFakeData(gps.latitud, gps.longitud).then((resp: any) => {
          this.addMarkers(resp.data.lat, resp.data.lng)
          let coords2 = {lat: resp.data.lat, lng: resp.data.lng}
          this.deformacion.push(coords2)
        })
      });
    })
    
    console.log(this.coordenadas)
    //draw the polygon which rounds the module
    this.pol_options.paths = this.coordenadas
    this.pol_options2.paths = this.deformacion

    if(this._lat != 0 && this._lng != 0){
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: this._lat,
          lng: this._lng,
        }
      })
    }
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  addNewMarker(gps: any) {
    this.markers.push({
      position: {
        lat: gps.latitud,
        lng: gps.longitud,
      },
      title: 'CENTRO' + (this.markers.length + 1),
      options: { icon: './assets/img/dot.png' },
      label: {text: ' ' + gps.orden, color: '#FFFFFF', backgroundColor: '#000000'}
    })
  }

  addMarkers(latitud: any, longitud: any) {
    this.markers.push({
      position: {
        lat: latitud,
        lng: longitud,
      }
    })
  }

}
