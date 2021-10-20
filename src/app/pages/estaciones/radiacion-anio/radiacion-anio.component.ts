import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EstacionService } from 'src/app/services/estacion.service';

@Component({
  selector: 'app-radiacion-anio',
  templateUrl: './radiacion-anio.component.html',
  styles: [
  ]
})
export class RadiacionAnioComponent implements OnInit {

  constructor(public _dataGm: DataEstacionGmService, public _estacion: EstacionService, private _route: ActivatedRoute) { }

  _id: any
  _codigo: any

  novaFecha: string = ''
  dataRadiacion: any[] = []

  public chartRadiacionDataY: ChartDataSets[] = [
    {data: [], label: 'Promedio'},
    {data: [], label: 'Mínima'},
    {data: [], label: 'Máxima'},
  ];
  public chartRadiacionOptY: ChartOptions = {
    responsive: true
  };
  public chartRadiacionLabelY: Label[] = [];
  public chartRadiacionTypeY: ChartType = 'line';
  public chartRadiacionLegendY = true;
  public chartRadiacionPluginsY = [];
  public chartRadiacionColorY: Color[] = [{
    backgroundColor: 'rgba(148,159,177,0.25)',
    borderColor: '#304f82',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#304f82',
    pointHoverBackgroundColor: '#304f82',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  ngOnInit(){
    let dateTime = new Date().toLocaleString('en-GB')
    this.novaFecha = this.fechaEnviar(dateTime)

    this._route.params.subscribe(
      params => {
        this._id = +params['id'];
        this._estacion.getEstacion(this._id).subscribe(
          data => {
            this._codigo = data.codigo
            this._dataGm.getLluviaYear(this.novaFecha, this._codigo).subscribe(
              res => {
                console.log(res);
                
                this.dataRadiacion = res
                for (let s of this.dataRadiacion){
                  this.chartRadiacionDataY[0].data?.push(s.radiacion_solar_min)
                  this.chartRadiacionDataY[1].data?.push(s.radiacion_solar_avg)
                  this.chartRadiacionDataY[2].data?.push(s.radiacion_solar_max)
                  let myMes = this.getMes(s.mes)

                  this.chartRadiacionLabelY.push(myMes)
                }
              }
            )
          }// fin getStation
        )
      }// fin params
    )
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(',');
    let fechaCal = splitted[0].split('/');
    
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

  getMes(s:any){
    let mes = 'mes'
    if (s == '01'){mes = 'Enero'}
    if (s == '02'){mes = 'Febrero'}
    if (s == '03'){mes = 'Marzo'}
    if (s == '04'){mes = 'Abril'}
    if (s == '05'){mes = 'Mayo'}
    if (s == '06'){mes = 'Junio'}
    if (s == '07'){mes = 'Julio'}
    if (s == '08'){mes = 'Agosto'}
    if (s == '09'){mes = 'Septiembre'}
    if (s == '10'){mes = 'Octubre'}
    if (s == '11'){mes = 'Noviembre'}
    if (s == '12'){mes = 'Diciembre'}

    return mes
  }

}
