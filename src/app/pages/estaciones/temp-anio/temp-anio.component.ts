import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EstacionService } from 'src/app/services/estacion.service';

@Component({
  selector: 'app-temp-anio',
  templateUrl: './temp-anio.component.html',
  styles: [
  ]
})
export class TempAnioComponent implements OnInit {
  @Input() dataClima: any[] = []

  constructor(public _dataGm: DataEstacionGmService, public _estacion: EstacionService, private _route: ActivatedRoute) { }

  _id: any
  _codigo: any

  novaFecha: string = ''
  tempDay: any[] = []

  public chartTempDataY: ChartDataSets[] = [
    {data: [], label: 'Promedio'},
    {data: [], label: 'Mínima'},
    {data: [], label: 'Máxima'},
  ];
  public chartTempOptY: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {beginAtZero: true}
      }]
    }
  };
  public chartTempLabelY: Label[] = [];
  public chartTempTypeY: ChartType = 'line';
  public chartTempLegendY = true;
  public chartTempPluginsY = [];
  public chartTempColorY: Color[] = [{
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
            this._codigo = data.CODIGO
            this._dataGm.getTempYear(this.novaFecha, this._codigo).subscribe(
              res => {
                console.log(res);
                
                this.tempDay = res
                for (let s of this.tempDay){
                  this.chartTempDataY[0].data?.push(s.temperatura_min)
                  this.chartTempDataY[1].data?.push(s.temperatura_avg)
                  this.chartTempDataY[2].data?.push(s.temperatura_max)
                  let myMes = this.getMes(s.mes)

                  this.chartTempLabelY.push(myMes)
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
