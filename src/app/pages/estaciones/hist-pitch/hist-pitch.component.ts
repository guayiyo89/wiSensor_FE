import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-hist-pitch',
  templateUrl: './hist-pitch.component.html',
  styles: [
  ]
})
export class HistPitchComponent implements OnInit {
  @Input() dataPitch: any 

  private intervalUpdate: any

  constructor(public _dataGm: DataEstacionGmService, public _user: UsuarioService, public _estacion: EstacionService,
    private _route: ActivatedRoute) { }

  _id: any
  _codigo: any
  novaFecha: string = ''

  public chartPitchDataY: ChartDataSets[] = [
    {data: [], label: 'Pitch'}
  ];
  public chartPitchOptY: ChartOptions = {
    responsive: true
  };
  public chartPitchLabelY: Label[] = [];
  public chartPitchTypeY: ChartType = 'line';
  public chartPitchLegendY = true;
  public chartPitchPluginsY = [];
  public chartPitchColorY: Color[] = [{
    backgroundColor: 'rgba(148,159,177,0.25)',
    borderColor: 'rgb(102, 164, 203)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#304f82',
    pointHoverBackgroundColor: '#304f82',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  ngOnInit(){
    console.log('PITCH', this.dataPitch)
    for(let dato of this.dataPitch.reverse()){
      this.rellenar(dato)
    }

    this.intervalUpdate = setInterval(() => {
      //add the element to the end of the array
      if(this.chartPitchLabelY.length > 100){
        this.chartPitchDataY[0].data?.shift()
        this.chartPitchLabelY.shift()
      } else {
        this.rellenar(this.dataPitch[0])
      }
    }, 30000)
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(',');
    let fechaCal = splitted[0].split('/');
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

  rellenar(dato:any){
    this.chartPitchDataY[0].data?.push(dato.pitch)
    this.chartPitchLabelY.push(dato.hora)
  }

}
