import { Component, OnInit } from '@angular/core';
import { faBell, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RadarService } from 'src/app/services/radar.service';
import { RdrAlertaService } from 'src/app/services/rdr-alerta.service';
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

  faAlert = faExclamationTriangle
  faBell = faBell

  cantidad: number = 0

  numNoVistos: any[] = []

  acumByHora: any[] = []
  acumByDia: any[] = []
  acumBy15: any[] = []

  datosRdr: any[] = []

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

  constructor(public _rdrEmpresa: EmpresaService, public _user: UsuarioService, public _rdr: RadarService, public spotter: SpotterService,
    public _rdralerta: RdrAlertaService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this._idEmpresa = this._user.userIds.id_empresa

    this._rdrEmpresa.getRadares(this._idEmpresa).subscribe(radares => {
      this.radarList = radares
      this.rellenaTabla(radares)
      console.log(this.radarList)
      this._rdr.getRadar(this.radarList[0].id_Radar).subscribe(radar => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: radar.latitud,
            lng: radar.longitud,
          }
        })

      })

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
      this.datosRdr = []
      this._rdralerta.getResumen(radar.id_Radar, radar.codigo).then(
        resumen => {
          console.log(resumen)
          this.datosRdr.push(resumen[0])
        }).catch(
          err => {
            console.log(err)
          }
        )
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

  openNoVistos(dataVistos: any){
    this._modal.open(dataVistos, {size: 'lg'})
  }

  openTodos(data: any){
    this._modal.open(data, {size: 'lg'})
  }



}
