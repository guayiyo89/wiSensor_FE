import { Component, Input, OnInit } from '@angular/core';
import { SpotterService } from 'src/app/services/spotter.service';

@Component({
  selector: 'app-tray-event',
  templateUrl: './tray-event.component.html',
  styles: [
  ]
})
export class TrayEventComponent implements OnInit {
  @Input() id_header: any
  @Input() detail: any
  
  constructor(public _spotter: SpotterService) { }
  trayectoria: any[] = []
  markers: any[] = []

  zoom = 17
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
    minZoom: 11,
  }

  ngOnInit(): void {
    
    this._spotter.getTrayectoria(this.id_header).subscribe( (resp:any) => {
      this.trayectoria = resp
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: resp[0].latitud,
          lng: resp[0].longitud,
        }
      })
      resp.forEach((dato:any) => {
        this.addMarker(dato, 'green')
      })
    })
  }

  addMarker(dato:any, clase:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { icon: './assets/img/dot_tray.png' },
      info: `${dato.fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}/${clase}`,
    })
  }

  fechaGraph(fecha:string){
    let fecha_graph = fecha.split('T')[0].split('-')
    let dia_graph = fecha_graph[2]
    let mes_graph = fecha_graph[1]
    let hora_graph = fecha.split('T')[1].split('.')[0].split(':')
    let hora_graph_h = hora_graph[0]
    let hora_graph_m = hora_graph[1]

    return hora_graph_h + ':' + hora_graph_m
  }

}
