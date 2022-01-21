import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RadarService } from 'src/app/services/radar.service';
import { SpotterService } from 'src/app/services/spotter.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-radar-empresa',
  templateUrl: './radar-empresa.component.html',
  styles: [
  ]
})
export class RadarEmpresaComponent implements OnInit {

  _idEmpresa: any
  radarList: any[] = []
  markers: any[] = []

  interval: any

  cantidad: number = 0

  acumByHora: any[] = []
  acumByDia: any[] = []
  acumBy15: any[] = []

  //--------------------------------------------------------MAPA
  zoom = 10
  // @ts-ignore
  center: google.maps.LatLngLiteral

  options: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    streetViewControl: false,
    maxZoom: 17,
    minZoom: 7,
  }

  constructor(public _rdrEmpresa: EmpresaService, public _user: UsuarioService, public _rdr: RadarService, public spotter: SpotterService) { }

  ngOnInit(): void {
    this._idEmpresa = this._user.userIds.id_empresa

    this._rdrEmpresa.getRadares(this._idEmpresa).subscribe(radares => {
      this.radarList = radares
      console.log(this.radarList)
      this._rdr.getRadar(this.radarList[0].id_Radar).subscribe(radar => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: radar.latitud,
            lng: radar.longitud,
          }
        })

      })

      this.rellenaTabla(radares)
      radares.forEach((radar:any) => {
        this._rdr.getRadar(radar.id_Radar).subscribe(radar => {
          this.addMarker(radar)
        })

      })

      this.cantidad = radares.length

      this.interval = setInterval(() => {
        this.rellenaTabla(radares)
      }, 55000)

     
    })
  }


  rellenaTabla(radares: any[]) {
    radares.forEach((radar: any) => {
      this.spotter.getByMinutes(radar.codigo, 60).then(data => {
        this.acumByHora.push(data[0].valor)
      }).catch(err => console.log(err))
      this.spotter.getByMinutes(radar.codigo, 1440).then(data => {
        this.acumByDia.push(data[0].valor)
      }).catch(err => console.log(err))
      this.spotter.getByMinutes(radar.codigo, 15).then(data => {
        this.acumBy15.push(data[0].valor)
      }).catch(err => console.log(err))
    })

  }

  convertFecha(fecha: string) {
    let laFecha = fecha.split(',')
    let fechas = laFecha[0].split('/')
    let dia = fechas[0]
    let mes = fechas[1]
    let anio = fechas[2]
    let hora = laFecha[1].split(':')

    return {hora: `${anio}-${mes}-${dia}${hora[0]}`, fecha: `${anio}-${mes}-${dia}`}
  }

  addMarker(dato:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      label: {
        color: '#ffffff',
        FontFace: 'Arial',
        fontWeight: 'bold',
        borderColor: '#ffffff',
        borderWeight: '4px',
        text: dato.nombre,
      },
      info: `${dato.nombre}`,
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }



}
