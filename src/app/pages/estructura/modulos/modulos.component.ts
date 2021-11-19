import { Component, OnInit } from '@angular/core';
import mermaid from 'mermaid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styles: [
    '.circle{border-radius: 50%; border: 6px solid #f5b609; padding: 8px; font-size: 2.5em; width: 2.1em; height: 2.1em; vertical-align: middle; cursor:pointer}'
  ]
})
export class ModulosComponent implements OnInit {

  pitch = 3.2
  roll = -4.5

  flowChart: any;
  stringFlowChart: any = "";
  constructor(private _modal: NgbModal) {
    this.createFlowchart();
  }

  ngOnInit(){
    mermaid.initialize({})
    for(let i = 0; i < 30; i++){
      let numero = this.getRandomInt(1,5)
      this.barChartData[0].data?.push(numero)
    }
  }

  valores = [85,93,67,55,94,67,88,79,90]

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
  public barChartLabels: Label[] = ['10:15', '10:18', '10:21', '10:24', '10:27', '10:30', '10:33', '10:36', '10:39', '10:42', '10:45', '10:48', '10:51', '10:54', '10:57', '11:00', '11:03', '11:06', '11:09', '11:12','11:15', '11:18', '11:21', '11:24', '11:27', '11:30', '11:33', '11:36', '11:39', '11:42'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartColor: Color[] = [{
  
  }];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Nodo 1', borderColor: '#73e600' }
  ];

  guayo = 25

  createFlowchart() {
    this.flowChart = [
       "graph LR",
        `id1((Start)) --- id2((${this.guayo}))`,
        "id2 --- id3((Ques 3))",
        "id1 --> id4((Ques 4))",
        "id4 --> id5((Ques 55))",
        "id3 --- id6((Ques 6))",
        "id6 --- id9((Ques 9))",
        "id9 --- id8((Ques 8))",
        "id8 --> id7((Ques 7))",
        "id5 --> id6",
        "id5 --> id2",
        "id5 --> id8",
        "id4 --> id7",
    ];
    this.stringFlowChart = this.flowChart.join("\n");
  }

  // Radiacion
  openTable(dataNode: any){
    this._modal.open(dataNode, {size: 'lg'})
  }

  getRandomInt(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }


}
