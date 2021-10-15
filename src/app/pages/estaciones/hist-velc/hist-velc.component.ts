import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-hist-velc',
  templateUrl: './hist-velc.component.html',
  styles: [
  ]
})
export class HistVelcComponent implements OnInit {
  @Input() dataVelc: any 
  @Input() lastVel: any
  private intervalUpdate: any

  constructor() { }

  public chartVelcDataY: ChartDataSets[] = [
    {data: [], label: 'Velocidad'}
  ];
  public chartVelcOptY: ChartOptions = {
    responsive: true
  };
  public chartVelcLabelY: Label[] = [];
  public chartVelcTypeY: ChartType = 'line';
  public chartVelcLegendY = true;
  public chartVelcPluginsY = [];
  public chartVelcColorY: Color[] = [{
    backgroundColor: 'rgb(186, 247, 17, 0.3)',
    borderColor: '#8cd10a',
    pointBackgroundColor: 'rgb(186, 247, 17, 0.7)',
    pointBorderColor: '#8cd10a',
    pointHoverBackgroundColor: '#8cd10a',
    pointHoverBorderColor: '#49b81a'
  }];

  ngOnInit(){
    for(let dato of this.dataVelc.reverse()){
      let vel = Number.parseFloat((dato.velc * 3.6).toFixed(2))
      this.chartVelcDataY[0].data?.push(vel)
      this.chartVelcLabelY.push(dato.hora)
    }
    this.intervalUpdate = setInterval(() => {

      if(this.chartVelcLabelY.length > 50){
        //delete the first element of the data array
        this.chartVelcDataY[0].data?.shift()
        this.chartVelcLabelY.shift()
      } else {
        this.rellenar(this.dataVelc[0])
      }
    }, 300000)
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

  rellenar(dato: any){
    let vel = Number.parseFloat((dato.velc * 3.6).toFixed(2))
    this.chartVelcDataY[0].data?.push(vel)
    this.chartVelcLabelY.push(dato.hora)
  }

}
