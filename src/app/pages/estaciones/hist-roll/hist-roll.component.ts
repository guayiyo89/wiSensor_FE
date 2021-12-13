import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-hist-roll',
  templateUrl: './hist-roll.component.html',
  styles: [
  ]
})
export class HistRollComponent implements OnInit {
  @Input() dataRoll: any 

  public intervalUpdate: any

  constructor(private _route: ActivatedRoute) { }

  _id: any
  _codigo: any

  public chartRollDataY: ChartDataSets[] = [
    {data: [], label: 'Roll'}
  ];
  public chartRollOptY: ChartOptions = {
    responsive: true
  };
  public chartRollLabelY: Label[] = [];
  public chartRollTypeY: ChartType = 'line';
  public chartRollLegendY = true;
  public chartRollPluginsY = [];
  public chartRollColorY: Color[] = [{
    backgroundColor: 'rgba(148,159,177,0.25)',
    borderColor: 'rgb(102, 164, 203)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#304f82',
    pointHoverBackgroundColor: '#304f82',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  ngOnInit(){
    for(let dato of this.dataRoll.reverse()){
      this.rellenar(dato)
    }

    this.intervalUpdate = setInterval(() => {
      //add the element to the end of the array
      if(this.chartRollLabelY.length > 100){
        this.chartRollDataY[0].data?.shift()
        this.chartRollLabelY.shift()
      } else {
        this.rellenar(this.dataRoll[0])
      }
    }, 300000)
  }

  rellenar(dato:any){
    this.chartRollDataY[0].data?.push(dato.roll)
    this.chartRollLabelY.push(dato.hora)
  }

}
