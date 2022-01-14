import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-actividad-hora',
  templateUrl: './actividad-hora.component.html',
  styles: [
  ]
})
export class ActividadHoraComponent implements OnInit {

  constructor() { }

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 33, 24], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90, 35, 23], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400, 177, 280], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['17.54', '17.56', '17.58', '18.00', '18.02', '18.04', '18.06', '18,08', '18.10'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(191, 235, 19,0.2)',
          },
          ticks: {
            fontColor: '#ffffff',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // orange
      backgroundColor: 'rgba(245, 89, 22, 0)',
      borderColor: '#f55916',
      pointBackgroundColor: '#f77234',
      pointBorderColor: '#f55916',
      pointHoverBackgroundColor: '#f55916',
      pointHoverBorderColor: '#f57316'
    },
    { // yellow
      backgroundColor: 'rgba(77,83,96,0)',
      borderColor: '#f5bf0c',
      pointBackgroundColor: '#e4f734',
      pointBorderColor: '#f5bf0c',
      pointHoverBackgroundColor: '#f5bf0c',
      pointHoverBorderColor: '#ed8a09'
    },
    { // green
      backgroundColor: 'rgba(77,83,96,0)',
      borderColor: '#4cd113',
      pointBackgroundColor: '#8cf734',
      pointBorderColor: '#7ed406',
      pointHoverBackgroundColor: '#7ed406',
      pointHoverBorderColor: '#3d9c11'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  ngOnInit(): void {
  }

}
