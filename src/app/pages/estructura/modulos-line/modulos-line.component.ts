import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-modulos-line',
  templateUrl: './modulos-line.component.html',
  styles: [
  ]
})
export class ModulosLineComponent implements OnInit {

  constructor() { }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{ticks:{fontColor: '#CCCCCC'}}],
     yAxes: [{ticks: { fontColor: '#CCCCCC'}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartColor: Color[] = [{
  
  }];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Nodo 1', borderColor: '#23eb23' },
    { data: [], label: 'Nodo 2', borderColor: '#1d9cdb', backgroundColor: 'rgba(0, 0, 0, 0)' },
    { data: [], label: 'Nodo 3', borderColor: '#fabf0f', backgroundColor: 'rgba(0, 0, 0, 0)' },
    { data: [], label: 'Nodo 4', borderColor: '#9a44ad', backgroundColor: 'rgba(0, 0, 0, 0)' },
    { data: [], label: 'Nodo 5', borderColor: '#fa0a3e', backgroundColor: 'rgba(0, 0, 0, 0)' },
  ];

  ngOnInit(): void {
    for(let i = 0; i < 30; i++){
      let numero = this.getRandomInt(80,97)
      this.barChartData[0].data?.push(numero)

      let numero1 = this.getRandomInt(82,98)
      this.barChartData[1].data?.push(numero1)

      numero = this.getRandomInt(78,94)
      this.barChartData[2].data?.push(numero)

      numero = this.getRandomInt(85,95)
      this.barChartData[3].data?.push(numero)

      numero = this.getRandomInt(85,96)
      this.barChartData[4].data?.push(numero)
    }
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
