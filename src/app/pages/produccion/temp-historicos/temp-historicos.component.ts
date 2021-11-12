import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-temp-historicos',
  templateUrl: './temp-historicos.component.html',
  styles: [
  ]
})
export class TempHistoricosComponent implements OnInit {

  constructor() { }

  public lineChartData: ChartDataSets[] = [
    { data: [-3, -4, -2,  0, -1, -1.4, -2, -2, -3, -3.4, -3, -3.2], label: '5 m' },
    { data: [-4, -5, -2.6,  -1.6, -2, -2.4, -2.7, -3, -3.7, -3.9, -4, -5.2], label: '10 m' },
    { data: [-4.3, -5.1, -2.4,  -1.8, -2.3, -2.8, -3.4, -3, -3.5, -3.9, -4.3, -5.7], label: '20 m'}
  ];
  public lineChartLabels: Label[] = ['17.54', '17.56', '17.58', '18.00', '18.02', '18.04', '18.06', '18,08', '18.10', '18.12', '18,14', '18.16'];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{gridLines: { color: "rgba(73, 147, 204, 0.2)" }, 
      ticks: {
        fontColor: "rgba(73, 147, 204, 0.8)",
        fontSize: 12
       }}],
      yAxes: [{gridLines: { color: "rgba(73, 147, 204, 0.25)" },
      ticks: {
        fontColor: "rgba(73, 147, 204, 0.8)" ,
        fontSize: 12
       }
    }]
    }
  };

  public lineChartColors: Color[] = [
    { // orange
      backgroundColor: 'rgba(73, 147, 204, 0)',
      borderColor: '#4993cc',
      pointBackgroundColor: '#79d4cb',
      pointBorderColor: '#4993cc',
      pointHoverBackgroundColor: '#4993cc',
      pointHoverBorderColor: '#79d4cb'
    },
    { // yellow
      backgroundColor: 'rgba(77,83,96,0)',
      borderColor: '#426fa6',
      pointBackgroundColor: '#133d70',
      pointBorderColor: '#426fa6',
      pointHoverBackgroundColor: '#426fa6',
      pointHoverBorderColor: '#133d70'
    },
    { // green
      backgroundColor: 'rgba(77,83,96,0)',
      borderColor: '#121f5c',
      pointBackgroundColor: '#37468a',
      pointBorderColor: '#121f5c',
      pointHoverBackgroundColor: '#121f5c',
      pointHoverBorderColor: '#37468a'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  ngOnInit(): void {
  }

}
