import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBolt, faCheck, faCheckCircle, faCircle, faExclamationTriangle, faFileDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { RadarService } from 'src/app/services/radar.service';
import { SpotterService } from 'src/app/services/spotter.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MapInfoWindow, MapMarker, GoogleMap, MapPolygon } from '@angular/google-maps'
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import Swal from 'sweetalert2';
import { CentroService } from 'src/app/services/centro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
     private _excel: ExcelServiceService, private renderer2: Renderer2, public _centro: CentroService, private _fbuilder: FormBuilder, private _modal: NgbModal) { }


  // for alarms
  faDot = faCircle
  faAlert = faExclamationTriangle
  faOk = faCheck
  faBolt = faBolt
  faExcel = faFileDownload
  faInfo = faInfoCircle

  urlBase = 'http://wisensor.cl:7000/stream/player/'

  urlVideo: string = ''


  // for the historical data
  submitted = false
  fechaForm: FormGroup;
  fecha_data: any

  radar: any
  trayectoria: any[] = []
  zona_rdr: any

  fechaShow:any[] = []

  id: any
  id_cent_est: any
  _idCentroUser: any
  _idPerfil: any
  _idEmpresaUser: any
  _idEmpresaCenter: any
  
  latitud = -41.46223461126455
  longitud = -72.98739194869995
  
  markers: any[] = []
  lastMarkers: any[] = []

  trayMarkers: any[] = []
  
  private intervalUpdate: any
  private intervalData: any
  totalRecords = 0
  
  clases: any[] = []
  headers: any[] = []
  detalles: any[] = []
  zonasRdr: any[] = []
 
  //--------------------------------------------------------MAPA
  zoom = 16
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
    minZoom: 14,
  }

  velContent: number = 0
  distContent: number = 0
  timeContent: any
  claseContent: any
  fechaContent = ''
  latCont: any
  lonCont: any
  id_header: any


  flag = 1

  
  ngOnInit(){
    this._idCentroUser = this._user.usuario.id_centro
    this._idPerfil = this._user.usuario.id_perfil
    this._idEmpresaUser = this._user.userIds.id_empresa

    
    this.intervalUpdate = setInterval(() => {
      this.showFecha()
    }, 900)
    
    this.fechaForm = this._fbuilder.group({
      fecha: ['', Validators.required],
    })
    
    this._route.params.subscribe(
      
      params => {
        this.id = +params['id']

        this._radar.getFlag(this.id).subscribe(resp =>{
          this.flag = resp.bandera
          console.log(this.flag)
        })
        
        if(this.flag == 1){
          this._radar.getRadar(this.id).subscribe(
            rdr => {
              this.radar = rdr
              this.urlVideo = this.urlBase + rdr.url_video
              navigator.geolocation.getCurrentPosition((position) => {
                this.center = {
                  lat: rdr.latitud,
                  lng: rdr.longitud,
                }
              })
              this.addRadar()
              this._radar.getZonas(this.id).subscribe(
                zonas => {
                  this.zonasRdr = zonas
                  this.rellenar(zonas)
                })
                
              this.intervalUpdate = setInterval(() => {
                this.markers = []
                this.lastMarkers = []
                this.rellenar(this.zonasRdr)

              }, 95000)

              this._centro.getCentro(rdr.id_centro).subscribe(
                data => {
                  this.id_cent_est = data.id
                  this._idEmpresaCenter = data.id_empresa
                }
              )
  
            })
        }


      })
      
  }
  
  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

  rellenar(zonas: any[]){
    zonas.forEach(zona => {
      this.putMarkers(zona.cod_zona)
    })
  }

  putMarkers(zona:any){
    //fecha hora actual
    this._spotter.getMarkers(zona, 5, 15).then(
      marks => {
        console.log(marks)
        for(let dato of marks){
          this._spotter.getDetail(dato.id).subscribe(
            details => {
              this.addMarker(details, dato.clasificacion, dato.updated_at)
            })
        }
      })

    this._spotter.getMarkers(zona, 15, 30).then(
      marks => {
        console.log(marks)
        for(let dato of marks){
          this._spotter.getDetail(dato.id).subscribe(
            details => {
              this.addMarker2(details, dato.clasificacion, dato.updated_at)
            })
        }
      })

    this._spotter.getMarkers(zona, 30, 60).then(
      marks => {
        console.log(marks)
        for(let dato of marks){
          this._spotter.getDetail(dato.id).subscribe(
            details => {
              this.addMarker3(details, dato.clasificacion, dato.updated_at)
            })
        }
      })

    this._spotter.getLastTime(zona).then(
      marks => {
        console.log(marks)
        for(let dato of marks){
          this._spotter.getDetail(dato.id).subscribe(
            details => {
              console.log(details)
              this.addLastMarker(details, dato.clasificacion, dato.updated_at)
            })
        }
      })

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

  addMarker(dato:any, clase:any, fecha:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: `${fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}/${clase}/${dato.sp_cabecera_id}`,
      options: { icon: './assets/img/ptoNaranjo.png' }
    })
  }

  addMarker2(dato:any, clase:any, fecha:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: `${fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}/${clase}/${dato.sp_cabecera_id}`,
      options: { icon: './assets/img/ptoAmarillo.png' }
    })
  }

  addMarker3(dato:any, clase:any, fecha:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: `${fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}/${clase}/${dato.sp_cabecera_id}`,
      options: { icon: './assets/img/ptoVerde.png' }
    })
  }

  addLastMarker(dato:any, clase: any, fecha: any) {
    this.lastMarkers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: `${fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}/${clase}/${dato.sp_cabecera_id}`,
      options: { animation: google.maps.Animation.BOUNCE, 
        icon: './assets/img/ptoRojo.png'
      },
      
    })
  }

  addTrayMarker(dato:any, clase:any, fecha:any) {
    this.trayMarkers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: `${fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}/${clase}`,
      options: { icon: './assets/img/dot_tray.png' },
    })
  }

  drawTray(idHead: any){
    this._spotter.getTrayectoria(idHead).subscribe(resp => {
      console.log(resp)
      this.trayMarkers = []
      resp.forEach(row => {
        this.addTrayMarker(row, this.claseContent, this.fechaContent)
      })
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
        if(header[0].track_id != this.headers[0].track_id){
          this.headers.unshift(header[0])
          this.headers.pop()
          console.log(this.headers)
          this.detalles.pop()
  
          this._spotter.getDetail(header[0].id).subscribe(
            details => {
              this.detalles.unshift(details)
            })
          
        }
        
      })
  }

  clickedMarker(position: any, info: any) {

    this.latCont = position.lat
    this.lonCont = position.lng
    this.renderer2.setStyle(this.iconData.nativeElement, 'display', 'block')
    let infoContent = info.split('/')
    this.fechaContent = infoContent[0]
    this.velContent = parseFloat(infoContent[1])
    this.distContent = parseFloat(infoContent[2])
    this.timeContent = infoContent[3]
    this.claseContent = infoContent[4]
    this.id_header = infoContent[5]
  }

  onSubmit(){
    this.submitted = true

    if(this.fechaForm.valid){
      console.log('abrir modal', this.zonasRdr)
    }
  }

  convertFecha(fecha: string) {
    let laFecha = fecha.split(',')
    let fechas = laFecha[0].split('/')
    let dia = fechas[0]
    let mes = fechas[1]
    let anio = fechas[2]
    let hora = laFecha[1].split(':')[0]

    return `${anio}-${mes}-${dia}${hora}`
  }

  convertFechaForm(fecha:any){
    let new_fecha = fecha.split('T')
    let hora = new_fecha[1].split(':')

    return new_fecha[0] + ' ' + hora[0]
  }

  openTable(dataNode: any){
    this._modal.open(dataNode, {size: 'lg'})
    this.fecha_data = this.convertFechaForm(this.fechaForm.value.fecha)
  }

  openZone(dataZone: any){
    this._modal.open(dataZone, {size: 'lg'})
  }

  miVideo(){
    window.open(this.urlVideo, '_blank')
  }

    

}

//Posicion: (${dato.latitud},${dato.longitud}), Fecha: ${dato.fecha}, Distancia: ${dato.distancia}
