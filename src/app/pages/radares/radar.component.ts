import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBolt, faCheck, faCheckCircle, faCircle, faExclamationTriangle, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { RadarService } from 'src/app/services/radar.service';
import { SpotterService } from 'src/app/services/spotter.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styles: [
  ]
})
export class RadarComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  @ViewChild('dataMarker') iconData: ElementRef;

  constructor( public _user: UsuarioService, public _route: ActivatedRoute, public _radar: RadarService, public _spotter: SpotterService,
     private _excel: ExcelServiceService, private renderer2: Renderer2) { }

  // for alarms
  faDot = faCircle
  faAlert = faExclamationTriangle
  faOk = faCheck
  faBolt = faBolt
  faExcel = faFileDownload

  radar: any
  trayectoria: any[] = []
  zona_rdr: any

  fechaShow:any[] = []

  id: any

  headers: any[] = []

  latitud = -41.46223461126455
  longitud = -72.98739194869995

  markers: any[] = []

  private intervalUpdate: any
  private intervalData: any
  totalRecords = 0

  clases: any[] = []
  detalles: any[] = []
 
  //--------------------------------------------------------MAPA
  zoom = 14
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
    minZoom: 9,
  }

  velContent: number = 0
  distContent: number = 0
  timeContent: any
  fechaContent = ''
  latCont: any
  lonCont: any

  
  ngOnInit(){
    this.intervalUpdate = setInterval(() => {
      this.showFecha()
    }, 900)
    
    this._route.params.subscribe(
      params => {
        this.id = +params['id']

        this._radar.getRadar(this.id).subscribe(
          rdr => {
            this.radar = rdr
            navigator.geolocation.getCurrentPosition((position) => {
              this.center = {
                lat: rdr.latitud,
                lng: rdr.longitud,
              }
              this.addRadar()

              this.cargaDetails(rdr.zona)
              
              this.putMarkers(rdr.zona)

              this.intervalUpdate = setInterval(() => {
                this.updateDetails(rdr.zona)
                this.markers = []
                this.putMarkers(rdr.zona)
                this.addRadar()
              }, 10000)
              
            })

          })


      }
      )
  }
    
  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

  putMarkers(zona:any){
    this._spotter.getMarkers(zona).then(
      marks => {
        for(let dato of marks){
          this._spotter.getDetail(dato.id).subscribe(
            details => {
              this.addMarker(details)
            })
        }
      }
    )
  }
  
  showFecha(){
    let fecha = new Date().toDateString()
    let hour = new Date().toTimeString()
    let hora = hour.split(' ')
    this.fechaShow = fecha.split(' ')
    this.fechaShow.push(hora[0])
  }

  addRadar(){
    const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    this.markers.push({
      position: {
        lat: this.latitud,
        lng: this.longitud,
      },
      label: {
        color: '#f0ae07',
        text: 'Spotter',
      },
      title: 'Spotter',
      options: { icon: './assets/img/radarMarker.png' },
    })
  }

  addMarker(dato:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: `${dato.fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}`,
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

  addNewMarker(dato:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Evento ' + (this.markers.length + 1),
      info: `${dato.fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}`
    })
  }

  openInfo(marker: MapMarker, content: string) {
    this.info.open(marker)
  }

  rellenarExcel(id_head: any){
    this._spotter.getTrayectoria(id_head).subscribe(
      tray => {
        tray.forEach((row:any) => this.trayectoria.push(row))
      })
  }

  exportasXLSX(id_head: any){
    this.rellenarExcel(id_head)
    this._excel.exportAsExcelFile(this.trayectoria, `trayectoria${id_head}`)
  }

  detalleView(id_head:any){
    this._spotter.getDetail(id_head).subscribe(
      detalles => {
        this.addNewMarker(detalles)
        
        if(detalles.visto == 0){
          this._spotter.getVisto(id_head, detalles).subscribe(
            data => {
              Swal.fire({
                position: 'top-end',
                title: 'Alerta Revisada',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              })
            })
        }
      })
  }

  cargaDetails(zona: any){
    this._spotter.getHeaders(zona).then(
      header => {
        this.totalRecords = header.length
        console.log(this.totalRecords)
        this.headers = header

        for(let dato of this.headers){
          this.clases.push(dato.clasificacion)
          this._spotter.getDetail(dato.id).subscribe(
            details => {
              this.detalles.push(details)
            })
        }
      })
  }

  updateDetails(zona: any){
    this._spotter.getHeaders(zona).then(
      header => {
        this.headers.unshift(header[0])
        this.headers.pop()

        console.log(this.headers)
        this.detalles.pop()

        this._spotter.getDetail(header[0].id).subscribe(
          details => {
            this.detalles.unshift(details)
          })
      })
  }

  clickedMarker(position: any, info: any) {
    console.log(position.lat, info)
    console.log(this.iconData.nativeElement.id)
    this.latCont = position.lat
    this.lonCont = position.lng
    this.renderer2.setStyle(this.iconData.nativeElement, 'display', 'block')
    let infoContent = info.split('/')
    this.fechaContent = infoContent[0]
    this.velContent = parseFloat(infoContent[1])
    this.distContent = parseFloat(infoContent[2])
    this.timeContent = infoContent[3]
  }
    

}

//Posicion: (${dato.latitud},${dato.longitud}), Fecha: ${dato.fecha}, Distancia: ${dato.distancia}
