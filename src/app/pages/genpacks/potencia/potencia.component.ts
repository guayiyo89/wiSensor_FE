import { Component, Input, OnInit } from '@angular/core';
import { faBolt, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-potencia',
  templateUrl: './potencia.component.html',
  styles: [
  ]
})
export class PotenciaComponent implements OnInit {
  @Input() dataEst: any

  constructor() { }

  faDot = faCircle
  faBolt = faBolt

  public intervalUpdate: any

  public chartStateDataY: ChartDataSets[] = [
    {data: [], label: 'Estado' }
  ];
  public chartStateOptY: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {beginAtZero: true, max: 2}
      }]
    },
    maintainAspectRatio: false
  };
  public chartStateLabelY: Label[] = [];
  public chartStateTypeY: ChartType = 'line';
  public chartStateLegendY = true;
  public chartStatePluginsY = [];
  public chartStateColorY: Color[] = [{
    backgroundColor: 'rgb(24, 115, 29, 0.3)',
    borderColor: '#8cd10a',
    pointBackgroundColor: '#32e33b',
    pointBorderColor: '#8cd10a',
    pointHoverBackgroundColor: '#8cd10a',
    pointHoverBorderColor: '#32e33b'
  }];

  public chartState1DataY: ChartDataSets[] = [
    {data: [], label: 'Estado' }
  ];
  public chartState1OptY: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {beginAtZero: true, max: 2}
      }]
    },
    maintainAspectRatio: false
  };
  public chartState1LabelY: Label[] = [];
  public chartState1TypeY: ChartType = 'line';
  public chartState1LegendY = true;
  public chartState1PluginsY = [];
  public chartState1ColorY: Color[] = [{
    backgroundColor: 'rgb(24, 115, 29, 0.3)',
    borderColor: '#8cd10a',
    pointBackgroundColor: '#32e33b',
    pointBorderColor: '#8cd10a',
    pointHoverBackgroundColor: '#8cd10a',
    pointHoverBorderColor: '#32e33b'
  }];

  ngOnInit(){
    for(let dato of this.dataEst.reverse()){
      this.rellenar(dato)
    }

    this.intervalUpdate = setInterval(() => {
      //add the element to the end of the array
      if(this.chartStateLabelY.length > 50){
        this.chartStateDataY[0].data?.shift()
        this.chartStateLabelY.shift()
        this.chartState1DataY[0].data?.shift()
        this.chartState1LabelY.shift()
      } else {
        this.rellenar(this.dataEst[0])
      }
    }, 60000)
  }

  hora(fecha:any){
    let arrayfecha = fecha.split('T')
    let arrayhora = arrayfecha[1].split('.')

    let hora = arrayhora[0]
    return hora
  }

  rellenar(dato: any){
    this.chartStateDataY[0].data?.push(dato.in_gp)
    let time = this.hora(dato.data_time)
    this.chartStateLabelY.push(time)

    this.chartState1DataY[0].data?.push(dato.out_gp)
    this.chartState1LabelY.push(time)
  }

}
