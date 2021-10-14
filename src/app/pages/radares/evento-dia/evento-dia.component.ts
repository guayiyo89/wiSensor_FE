import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-evento-dia',
  templateUrl: './evento-dia.component.html',
  styles: [
  ]
})
export class EventoDiaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks: {beginAtZero: true}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['28-sep', '29-sep', '30-sep', '01-oct', '02-oct', '03-oct', '04-oct', '05-oct', '06-oct'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartColor: Color[] = [{
    backgroundColor: 'rgba(16, 181, 159, 0.55)',
  }];

  public barChartData: ChartDataSets[] = [
    { data: [205, 149, 180, 171, 126, 155, 140, 133, 162], label: 'Eventos' }
  ];

}
