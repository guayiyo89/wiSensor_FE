import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data_estacion_gm } from 'src/app/interfaces/data_estacion_gm.model';
import { Estacion } from 'src/app/interfaces/estacion.model';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { faCheckCircle, faCircle, faCloudShowersHeavy, faCompass, faExclamationTriangle, faSun, faTemperatureLow, faThermometer, faThermometerEmpty, faThermometerFull, faThermometerHalf, faThermometerQuarter, faThermometerThreeQuarters, faTint, faUmbrella, faWind } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GaugeComponent } from './gauge/gauge.component';
import { ApiWeatherService } from 'src/app/services/api-weather.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CentroService } from 'src/app/services/centro.service';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styles: [
  ]
})
export class EstacionComponent implements OnInit {
  @ViewChild(GaugeComponent) gauge:GaugeComponent


  constructor(public _dataGm: DataEstacionGmService, public _estacion: EstacionService, public _dataApi: ApiWeatherService, public _user: UsuarioService,
     public _centro: CentroService, private _route: ActivatedRoute, private _modal: NgbModal) { }

  //fakeData DESPUES BORRAR!
  private intervalUpdate: any
  private intervalSec: any
  private intervalDay: any
  private intervalMonth: any
  private intervalYear: any

  public fake: any

  _idPerfil: any
  _idCentroUser: any
  _idEmpresaUser: any

  _idEmpresaCenter: any

  dataEstGm: Data_estacion_gm[] = [];
  datosClima: any
  dataVelPre: any[] = []
  tempAnio: any[] = []
  _id: any;
  estacion: Estacion
  codigo: any
  tempActual: any

  fechaShow: any[] = []

  vel_Kmh: any
  vel_ms: any
  vel_knots: any
  vel_min: any
  vel_avg: any
  vel_max: any

  lluvia: any

  climaDay: any[] = []
  climaYear: any[] = []
  climaMonth: any[] = []
  latitud: any
  longitud: any

  novaFecha: string = ''

  dataRs: any[] = []
  dataRsNow: any
  
  predictedApi: any // forecast data from the API

  //loguitos
  faTvlow = faThermometerEmpty
  faTlow = faThermometerQuarter
  faTmed = faThermometerHalf
  faThigh = faThermometerThreeQuarters
  faTmax = faThermometerFull

  faWind = faWind
  faCompass = faCompass

  faRain = faCloudShowersHeavy
  faThermo = faThermometer
  faTint = faTint
  faSun = faSun

  // for alarms
  faDot = faCircle
  faAlert = faExclamationTriangle
  faOk = faCheckCircle
  

 
  ngOnInit(){
    this._idCentroUser = this._user.usuario.CENTRO_ID
    this._idPerfil = this._user.usuario.PERFIL_ID
    this._idEmpresaUser = this._user.usuario.EMPRESA_ID

    console.log('IDS', this._idEmpresaCenter, this._idEmpresaUser);

    let dateTime = new Date().toLocaleString('en-GB')
    
    this.novaFecha = this.fechaEnviar(dateTime)

    this._dataApi.getData5days().subscribe(
      dataApi => {
        this.predictedApi = dataApi
        console.log(this.predictedApi);
      }
    )
    
    this.intervalUpdate = setInterval(() => {
      this.showFecha()
    }, 900)

    //this._dataGm.getData(id).subscribe()
    this._route.params.subscribe(
      params => {
        this._id = +params['id'];
        this._estacion.getEstacion(this._id).subscribe(
          data => {
            this.estacion = data
            this.codigo = data.codigo;
            
            this.showClima(this.codigo, this.novaFecha)

            this.getRS(this.codigo)

            this.intervalUpdate = setInterval(() => {
              this.showClima(this.codigo, this.novaFecha)
              this.getRS(this.codigo)
            }, 5000)

            this._centro.getCentro(data.id_centro).subscribe(
              center => {
                this.latitud = center.latitud
                this.longitud = center.longitud
                this._idEmpresaCenter = center.id_empresa
              }
            )

          }// fin de getEstacion
        )
      }//fin del params
    )
  
  }

  formatoFecha(fecha:string){
    let splitted = fecha.split(' ');
    let fechaCal = splitted[0].split('-');
    let horaCal = splitted[1].split('.');

    let d = fechaCal[2]
    let m = fechaCal[1]
    let y = fechaCal[0]

    let newFecha = d + '/' + m + '/' + y + ' - ' + horaCal[0]
    return newFecha
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(',');
    let fechaCal = splitted[0].split('/');
    
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

  //==============================================================================
  // Modals
  //==============================================================================

  //Temperatura
  openTday(graphTdia: any) {
    this._modal.open(graphTdia,{ size: 'lg' } )
  }

  openTmes(graphTmes: any) {
    this._modal.open(graphTmes,{ size: 'lg' } )
  }

  openTanio(graphTanio: any){
    this._modal.open(graphTanio,{ size: 'lg' } )
  }

  // Presion
  openPSanio(graphPSanio: any){
    this._modal.open(graphPSanio, { size: 'lg' })
  }

  openPSmes(graphPSmes: any){
    this._modal.open(graphPSmes, { size: 'lg' })
  }

  openPSday(graphPSdia: any){
    this._modal.open(graphPSdia, { size: 'lg' })
  }

  // Lluvia
  openLlanio(graphLlanio: any){
    this._modal.open(graphLlanio, { size: 'lg' })
  }

  openLlmes(graphLlmes: any){
    this._modal.open(graphLlmes, { size: 'lg' })
  }

  openLlday(graphLldia: any){
    this._modal.open(graphLldia, { size: 'lg' })
  }

  // Radiacion
  openRDanio(graphRDanio: any){
    this._modal.open(graphRDanio, {size: 'lg'})
  }

  openRDmes(graphRDmes: any){
    this._modal.open(graphRDmes, {size: 'lg'})
  }

  openRDday(graphRDdia: any){
    this._modal.open(graphRDdia, {size: 'lg'})
  }


  showClima(codigo: any, fecha: any){
    this._dataGm.getClima(codigo, fecha).subscribe(
      dataClima => {
        this.datosClima = dataClima[0]
        this.tempActual = dataClima[0].temperatura_actual
        this.vel_ms = dataClima[0].velocidad_actual
        this.vel_Kmh = (this.vel_ms * 3.6).toFixed(2)
        this.vel_knots = (this.vel_Kmh / 1.852).toFixed(2)
        this.lluvia = (dataClima[0].precipitacion_actual).toFixed(2)

        this.vel_min = (dataClima[0].velocidad_min_hoy * 3.6).toFixed(2)
        this.vel_max = (dataClima[0].velocidad_max_hoy * 3.6).toFixed(2)
        this.vel_avg = (dataClima[0].velocidad_avg_hoy * 3.6).toFixed(2)
      }
    )

    this._dataGm.getSpeedPress(codigo).subscribe(
      dataVelc => {
        this.dataVelPre = dataVelc        
      }
    )

    this._dataGm.getFakeData().subscribe(
      val => {
        this.fake = val
      }
    )
  }

  getRS(codigo: any){
    this._dataGm.getRSdata(codigo).subscribe(
      dataRS => {
        this.dataRs = dataRS
        this.dataRsNow = dataRS[0]
      }
    )
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
    clearInterval(this.intervalSec)
  }

  showFecha(){
    let fecha = new Date().toDateString()
    let hour = new Date().toTimeString()
    let hora = hour.split(' ')
    this.fechaShow = fecha.split(' ')
    this.fechaShow.push(hora[0])
  }

}
