import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-silos-pie',
  templateUrl: './silos-pie.component.html',
  styles: [
  ]
})
export class SilosPieComponent implements OnInit {

  constructor() { }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales']];
  public pieChartData: number[] = [44, 66];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['#4d66b3', '#7ac41a'],
      borderColor: 'rgba(0,0,0,0)'
    },
  ];

  ngOnInit(): void {
  }

}
