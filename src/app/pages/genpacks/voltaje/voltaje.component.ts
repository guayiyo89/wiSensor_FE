import { Component, Input, OnInit } from '@angular/core';
import { faBolt, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-voltaje',
  templateUrl: './voltaje.component.html',
  styles: [
  ]
})
export class VoltajeComponent implements OnInit {
  @Input() dataVolt: any

  private intervalUpdate: any

  constructor() { }

  faDot = faCircle
  faBolt = faBolt

  public chartVoltDataY: ChartDataSets[] = [
    {data: [], label: 'Voltaje (V)'}
  ];
  public chartVoltOptY: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {beginAtZero: true, max: 25}
      }]
    },
    maintainAspectRatio: false
  };
  public chartVoltLabelY: Label[] = [];
  public chartVoltTypeY: ChartType = 'line';
  public chartVoltLegendY = true;
  public chartVoltPluginsY = [];
  public chartVoltColorY: Color[] = [{
    backgroundColor: 'rgb(186, 247, 17, 0.3)',
    borderColor: '#8cd10a',
    pointBackgroundColor: 'rgb(186, 247, 17, 0.7)',
    pointBorderColor: '#8cd10a',
    pointHoverBackgroundColor: '#8cd10a',
    pointHoverBorderColor: '#49b81a'
  }];

  public chartPotDataY: ChartDataSets[] = [
    {data: [], label: 'Potencia (W)'}
  ];
  public chartPotOptY: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {beginAtZero: true, max: 2}
      }]
    },
    maintainAspectRatio: false
  };
  public chartPotLabelY: Label[] = [];
  public chartPotTypeY: ChartType = 'line';
  public chartPotLegendY = true;
  public chartPotPluginsY = [];
  public chartPotColorY: Color[] = [{
    backgroundColor: 'rgb(47, 81, 173, 0.3)',
    borderColor: '#5999e3',
    pointBackgroundColor: 'rgb(47, 81, 173, 0.7)',
    pointBorderColor: '#5999e3',
    pointHoverBackgroundColor: '#4281c9',
    pointHoverBorderColor: '#4281c9'
  }];

  count = 0

  ngOnInit(){
    console.log('VOLTAJES',this.dataVolt);
    
    for(let dato of this.dataVolt.reverse()){
      this.rellenar(dato)
    }

    this.intervalUpdate = setInterval(() => {
      //add the element to the end of the array
      if(this.chartPotLabelY.length > 50){
        this.chartPotDataY[0].data?.shift()
        this.chartPotLabelY.shift()
        this.chartVoltDataY[0].data?.shift()
        this.chartVoltLabelY.shift()
      } else {
        this.rellenar(this.dataVolt[0])
      }
    }, 5000)

  }

  hora(fecha:any){
    let arrayfecha = fecha.split('T')
    let arrayhora = arrayfecha[1].split('.')

    let hora = arrayhora[0]
    return hora
  }

  rellenar(dato: any){
    let voltaje = Number.parseFloat(dato.battery_volt)
    this.chartVoltDataY[0].data?.push(voltaje)
    let time = this.hora(dato.data_time)
    this.chartVoltLabelY.push(time)
    let pot = Math.pow(voltaje,2)/132.304
    this.chartPotDataY[0].data?.push(pot)
    this.chartPotLabelY.push(time)
  }

}
