import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SpotterService } from 'src/app/services/spotter.service';


@Component({
  selector: 'app-evento-duracion',
  templateUrl: './evento-duracion.component.html',
  styles: [
  ]
})
export class EventoDuracionComponent implements OnInit {
  @Input() id_data: any

  constructor(public _spotter: SpotterService) { }

  intervalUpdate: any
  cabeceraLast: any

  ngOnInit(): void {
    this._spotter.getByDist(this.id_data).subscribe(
      datos => {
        this.cabeceraLast = datos[0].sp_cabecera_id
        datos.reverse().forEach(element => {
          this.rellenar(element)
        })
      }
    )

    this.intervalUpdate = setInterval(() => {
      if(this.barChartLabels.length > 30){
        this.barChartLabels.shift()
        this.barChartData[0].data?.shift()
        this.barChartData[1].data?.shift()
      }else {
        this._spotter.getByDist(this.id_data).subscribe(
          datos => {
            if(datos[0].sp_cabecera_id != this.cabeceraLast){
              this.rellenar(datos[0])
              this.cabeceraLast = datos[0].sp_cabecera_id
            }
          }
        )
      }

    }, 95000)
  }

  rellenar(dato: any){
    this.barChartData[0].data?.push(dato.dist)
    this.barChartData[1].data?.push(dato.duracion)
    let fecha_aux = this.fechaGraph(dato.fecha)
    this.barChartLabels.push(fecha_aux)

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalUpdate)
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{ticks:{fontSize: 9, fontColor: 'rgba(255,255,255,0.5)'}}], yAxes: [{ticks: {beginAtZero: true}, id: 'y-axis-1', position: 'left'}, {ticks: {beginAtZero: true}, id: 'y-axis-2', position: 'right'}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartColor: Color[] = [{
    backgroundColor: 'rgba(255, 192, 18,0.25)',
    borderColor: '#ffc012',
    pointBackgroundColor: 'rgba(255, 192, 18,1)',
    pointBorderColor: '#ffffff',
    pointHoverBackgroundColor: '#fca50f',
    pointHoverBorderColor: 'rgba(255, 192, 18,0.8)'
  }];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Distancia', yAxisID: 'y-axis-1' },
    { data: [], label: 'Duración', yAxisID: 'y-axis-2' }
  ];


  fechaGraph(fecha:string){
    let fecha_graph = fecha.split('T')[0].split('-')
    let dia_graph = fecha_graph[2]
    let mes_graph = fecha_graph[1]
    let hora_graph = fecha.split('T')[1].split('.')[0].split(':')
    let hora_graph_h = hora_graph[0]
    let hora_graph_m = hora_graph[1]

    return dia_graph + '-' + mes_graph + '  ' + hora_graph_h + ':' + hora_graph_m
  }

}
