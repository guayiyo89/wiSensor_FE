import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data_estacion_gm } from 'src/app/interfaces/data_estacion_gm.model';
import { Estacion } from 'src/app/interfaces/estacion.model';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { faCheckCircle, faCircle, faCloudShowersHeavy, faCompass, faExclamationTriangle, faFileDownload, faSun, faTemperatureLow, faThermometer, faThermometerEmpty, faThermometerFull, faThermometerHalf, faThermometerQuarter, faThermometerThreeQuarters, faTint, faUmbrella, faWind } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GaugeComponent } from './gauge/gauge.component';
import { ApiWeatherService } from 'src/app/services/api-weather.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CentroService } from 'src/app/services/centro.service';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { IncidenteService } from 'src/app/services/incidente.service';
import { Alerta } from 'src/app/interfaces/alerta.model';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styles: [
  ]
})
export class EstacionComponent implements OnInit {

  excel_anio: any[] = []
  excel_2anio: any[] = []
  excel_3mes: any[] = []
  excel_6mes: any[] = []

  excel_rs_anio: any[] = []
  excel_rs_2anio: any[] = []
  excel_rs_6mes: any[] = []
  excel_rs_3mes: any[] = []

  constructor(public _dataGm: DataEstacionGmService, public _estacion: EstacionService, public _dataApi: ApiWeatherService, public _user: UsuarioService,
     public _centro: CentroService, private _route: ActivatedRoute, private _modal: NgbModal, private _excel: ExcelServiceService, public _incidente: IncidenteService,
     public _alerta: AlertasService) { 
      let dateTime = new Date().toLocaleString('en-GB')
      let fecha = this.fechaEnviar(dateTime)

      this._route.params.subscribe(
        params => {
          this._id = +params['id'];
          this._estacion.getEstacion(this._id).subscribe(
            est => {
              this._dataGm.getData(est.codigo, 105000).subscribe( data => {
                data.forEach((row:any) => {
                  this.excel_2anio.push(row)
                });
              })
              this._dataGm.getData(est.codigo, 52500).subscribe( data => {
                data.forEach((row:any) => {
                  this.excel_anio.push(row)
                });
              })
              this._dataGm.getData(est.codigo, 26250).subscribe( data => {
                data.forEach((row:any) => {
                  this.excel_6mes.push(row)
                });
              })
              this._dataGm.getData(est.codigo, 13125).subscribe( data => {
                data.forEach((row:any) => {
                  this.excel_3mes.push(row)
                });
              })

              this._dataGm.getRSlimit(est.codigo, 13125).subscribe( data => {
                data.forEach((row:any) => {
                  this.excel_rs_3mes.push(row)
                });
              })
              this._dataGm.getRSlimit(est.codigo, 26250).subscribe( data => {
                data.forEach((row:any) => {
                  this.excel_rs_6mes.push(row)
                });
              })
              this._dataGm.getRSlimit(est.codigo, 52500).subscribe( data => {
                data.forEach((row:any) => {
                  this.excel_rs_anio.push(row)
                });
              })
              this._dataGm.getRSlimit(est.codigo, 105000).subscribe( data => {
                data.forEach((row:any) => {
                  this.excel_rs_2anio.push(row)
                });
              })
            })
        }
      )


     }

  //fakeData DESPUES BORRAR!
  private intervalUpdate: any
  private intervalSec: any

  public fake: any

  horaRegistro_clima: any

  _idPerfil: any
  _idCentroUser: any
  _idEmpresaUser: any

  _idEmpresaCenter: any

  dataEstGm: Data_estacion_gm[] = [];
  datosClima: any
  dataVelPre: any[] = []
  tempAnio: any[] = []
  _id: any;
  // @ts-ignore
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
  maxPitch: any
  maxRoll: any
  minPitch: any
  minRoll: any
  
  predictedApi: any // forecast data from the API

  //loguitos
  faTvlow = faThermometerEmpty
  faTlow = faThermometerQuarter
  faTmed = faThermometerHalf
  faThigh = faThermometerThreeQuarters
  faTmax = faThermometerFull

  faWind = faWind
  faCompass = faCompass
  faExcel = faFileDownload

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

            this.getRS(this.codigo, this.novaFecha)

            this.intervalUpdate = setInterval(() => {
              this.showClima(this.codigo, this.novaFecha)
              this.getRS(this.codigo, this.novaFecha)

              //review for each incident
              this._incidente.getIncidentesbyEstacion(data.codigo).subscribe(
                items => {
                  for(let incidente of items){
                    if(incidente.tipo == 'Temperatura'){
                      if(incidente.evaluacion == 'mayor'){
                        if(this.tempActual > incidente.valor){
                          this.generarAlerta(incidente)}
                      }
                      if(incidente.evaluacion == 'menor'){
                        if(this.tempActual < incidente.valor){
                          this.generarAlerta(incidente)}
                      }
                    }

                    if(incidente.tipo == 'Velocidad Viento'){
                      if(incidente.evaluacion == 'mayor'){
                        if(this.vel_Kmh > incidente.valor){
                          this.generarAlerta(incidente)}
                        }
                      if(incidente.evaluacion == 'menor'){
                        if(this.vel_Kmh < incidente.valor){
                          this.generarAlerta(incidente)}
                      }
                    }
                  }
                }
              )

            }, 125000)

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
    let splitted = fecha.split('T');
    let fechaCal = splitted[0].split('-');
    let horaCal = splitted[1].split('.');

    let d = fechaCal[2]
    let m = fechaCal[1]
    let y = fechaCal[0]

    let newFecha = d + '/' + m + '/' + y + ' - ' + horaCal[0]
    return horaCal[0]
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
        console.log(dataClima[0], 'VER HORAAA')
        this.horaRegistro_clima = this.formatoFecha(dataClima[0].data_time)
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
        console.log('DATARELOJ:', this.dataVelPre)        
      }
    )

    this._dataGm.getFakeData().subscribe(
      val => {
        this.fake = val
      }
    )
  }

  getRS(codigo: any, fecha:any){
    this._dataGm.getRSdata(codigo).subscribe(
      dataRS => {
        this.dataRs = dataRS
        this.dataRsNow = dataRS[0]
      }
    )
    this._dataGm.getRSmaxMin(codigo, fecha).subscribe(
      maxminRS => {
        this.minRoll = maxminRS[0][0].roll_MIN
        this.maxRoll = maxminRS[0][0].roll_MAX
        this.minPitch = maxminRS[0][0].pitch_MIN
        this.maxPitch = maxminRS[0][0].pitch_MAX
      })
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

  generarAlerta(incidente: any){
    let newAlerta = new Alerta(incidente.tipo, incidente.severidad, incidente.codigo, incidente.descripcion, 0, incidente.cod_estacion, incidente.destino_id, incidente.destino)
    this._alerta.addAlerta(newAlerta).subscribe(
      alert => console.log(alert)
    )
  }

  //---------------------------EXPORT TO XLSX--------------------------------------//
  exportasXLSX_anio(){
    this._excel.exportAsExcelFile(this.excel_anio, 'Clima_anio')
  }

  exportasXLSX_3mes(){
    this._excel.exportAsExcelFile(this.excel_3mes, 'Clima_3meses')
  }

  exportasXLSX_6mes(){
    this._excel.exportAsExcelFile(this.excel_6mes, 'Clima_6meses')
  }

  exportasXLSX_2anio(){
    this._excel.exportAsExcelFile(this.excel_2anio, 'Clima_2anio')
  }

  exportasXLSX_rs_anio(){
    this._excel.exportAsExcelFile(this.excel_rs_anio, 'RS_anio')
  }

  exportasXLSX_rs_2anio(){
    this._excel.exportAsExcelFile(this.excel_rs_2anio, 'RS_2anio')
  }

  exportasXLSX_rs_3mes(){
    this._excel.exportAsExcelFile(this.excel_rs_3mes, 'RS_3mes')
  }

  exportasXLSX_rs_6mes(){
    this._excel.exportAsExcelFile(this.excel_rs_6mes, 'RS_6mes')
  }

}
