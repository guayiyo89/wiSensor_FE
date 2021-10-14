import { Component, Input, OnInit } from '@angular/core';
import { GenpackService } from 'src/app/services/genpack.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-generador',
  templateUrl: './generador.component.html',
  styles: [
  ]
})
export class GeneradorComponent implements OnInit {
  @Input() id_generador: any

  constructor( public _genpack: GenpackService) { }

  generador: any

  odometro = 0
  horas = 0

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
    backgroundColor: 'rgba(77, 181, 16, 0.55)',
  }];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Combustible' }
  ];

  ngOnInit(){
    this._genpack.getGenerador(this.id_generador).subscribe(
      data => this.generador = data
    )

    for(let i = 0; i < 30; i++){
      let numero = this.getRandomInt(9,24)
      this.barChartData[0].data?.push(numero)
    }

    this.horas = this.getRandomInt(9,24)
    this.odometro = this.getRandomInt(188, 280)
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
