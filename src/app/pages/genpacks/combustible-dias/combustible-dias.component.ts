import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-combustible-dias',
  templateUrl: './combustible-dias.component.html',
  styles: [
  ]
})
export class CombustibleDiasComponent implements OnInit {

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
  public barChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartColor: Color[] = [{
    backgroundColor: 'rgba(87, 150, 217, 0.75)',
  }];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Eventos' }
  ];

  ngOnInit(): void {

    for(let i = 0; i < 30; i++){
      let numero = this.getRandomInt(173,285)
      this.barChartData[0].data?.push(numero)
    }
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
