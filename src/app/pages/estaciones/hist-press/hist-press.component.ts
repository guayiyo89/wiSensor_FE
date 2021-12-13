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
    elements: {line: {tension: 0}},
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
      this.rellenar(dato)
    }
    this.intervalUpdate = setInterval(() => {
      if(this.chartPresLabelY.length > 50){
        //add the element to the end of the array
        this.chartPresDataY[0].data?.shift()
        this.chartPresLabelY.shift()
      } else{
        this.rellenar(this.dataPres[0])
      }
    }, 300000)
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

  rellenar(dato: any){
    this.chartPresDataY[0].data?.push(dato.presion)
    this.chartPresLabelY.push(dato.hora)
  }

}
