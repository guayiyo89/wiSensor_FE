import { Component, OnInit } from '@angular/core';
import { sum } from 'd3';
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

  cantidad: number = 0

  acumByHora: any[] = []
  acumByDia: any[] = []

  constructor(public _rdrEmpresa: EmpresaService, public _user: UsuarioService, public _rdr: RadarService, public spotter: SpotterService) { }

  ngOnInit(): void {
    this._idEmpresa = this._user.userIds.id_empresa

    this._rdrEmpresa.getRadares(this._idEmpresa).subscribe(radares => {
      this.radarList = radares
      console.log(this.radarList)
      this.cantidad = radares.length
      radares.forEach((radar:any) => {
        this.addMarker(radar)
        this._rdr.getZonas(radar.id_Radar).subscribe(zonas => {
          let valorHora: any[] = []
          let valorDia: any[] = []
          let i = 0
          zonas.forEach(zona => {
            this.spotter.getByDia(zona.cod_zona).then(data => {
              valorDia.push(data[0].contador)
            })
            this.spotter.getByHora(zona.cod_zona).then(data => {
              valorHora.push(data[0].contador)
            })
            console.log(i, 'Aqui', valorHora, valorDia)
            i = i + 1

            this.acumByHora.push(sum(valorHora))
            this.acumByDia.push(sum(valorDia))
          })
        })

      })
     
    })
  }

  getDatos(radares: any[]) {
    radares.forEach((radar:any) => {
      this.addMarker(radar)
      this._rdr.getZonas(radar.id_radar).subscribe(zonas => {
        let valorHora = 0
        let valorDia = 0
        zonas.forEach(zona => {
          this.spotter.getByDia(zona.cod_zona).then(data => valorDia = valorDia + data[0].contador)
          this.spotter.getByHora(zona.cod_zona).then(data => valorHora = valorHora + data[0].contador)
        })
        this.acumByHora.push(valorHora)
        this.acumByDia.push(valorDia)
      })
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
      info: `${dato.nombre}`,
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }



}
