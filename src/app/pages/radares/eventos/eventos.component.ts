import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styles: [
  ]
})
export class EventosComponent implements OnInit {

  constructor() { }

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
  public barChartLabels: Label[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartColor: Color[] = [{
    backgroundColor: 'rgba(77, 181, 16, 0.55)',
  }];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 33,22], label: 'Eventos' }
  ];

  ngOnInit(): void {
  }

}
