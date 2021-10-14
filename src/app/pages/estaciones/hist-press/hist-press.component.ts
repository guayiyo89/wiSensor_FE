import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-hist-press',
  templateUrl: './hist-press.component.html',
  styles: [
  ]
})
export class HistPressComponent implements OnInit {
  @Input() dataPres: any 
  private intervalUpdate: any

  constructor() { }

  public chartPresDataY: ChartDataSets[] = [
    {data: [], label: 'Presion'}
  ];
  public chartPresOptY: ChartOptions = {
    responsive: true
  };
  public chartPresLabelY: Label[] = [];
  public chartPresTypeY: ChartType = 'line';
  public chartPresLegendY = true;
  public chartPresPluginsY = [];
  public chartPresColorY: Color[] = [{
    backgroundColor: 'rgb(186, 247, 17, 0.3)',
    borderColor: '#8cd10a',
    pointBackgroundColor: 'rgb(186, 247, 17, 0.7)',
    pointBorderColor: '#8cd10a',
    pointHoverBackgroundColor: '#8cd10a',
    pointHoverBorderColor: '#49b81a'
  }];

  ngOnInit(){
    for(let dato of this.dataPres){
      this.chartPresDataY[0].data?.push(dato.presion)
      this.chartPresLabelY.push(dato.hora)
    }
    this.intervalUpdate = setInterval(() => {
      //add the element to the end of the array
      this.chartPresDataY[0].data?.push(this.dataPres[0].presion)
      this.chartPresLabelY.push(this.dataPres[0].hora)
      //delete the first element of the data array
      this.chartPresDataY[0].data?.shift()
      this.chartPresLabelY.shift()
    }, 300000)
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

}
