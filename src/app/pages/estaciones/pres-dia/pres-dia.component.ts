import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EstacionService } from 'src/app/services/estacion.service';

@Component({
  selector: 'app-pres-dia',
  templateUrl: './pres-dia.component.html',
  styles: [
  ]
})
export class PresDiaComponent implements OnInit {
  @Input() dataClima: any[] = []

  constructor(public _dataGm: DataEstacionGmService, public _estacion: EstacionService, private _route: ActivatedRoute) { }

  _id: any
  _codigo: any

  novaFecha: string = ''
  dataPres: any[] = []

  public chartPresDataY: ChartDataSets[] = [
    {data: [], label: 'Promedio'},
    {data: [], label: 'Mínima'},
    {data: [], label: 'Máxima'},
  ];
  public chartPresOptY: ChartOptions = {
    responsive: true
  };
  public chartPresLabelY: Label[] = [];
  public chartPresTypeY: ChartType = 'line';
  public chartPresLegendY = true;
  public chartPresPluginsY = [];
  public chartPresColorY: Color[] = [{
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
            this._dataGm.getPresDia(this.novaFecha, this._codigo).subscribe(
              res => {
                console.log(res);
                
                this.dataPres = res
                for (let s of this.dataPres){
                  this.chartPresDataY[0].data?.push(s.presion_min)
                  this.chartPresDataY[1].data?.push(s.presion_avg)
                  this.chartPresDataY[2].data?.push(s.presion_max)

                  this.chartPresLabelY.push(s.hora)
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

}
