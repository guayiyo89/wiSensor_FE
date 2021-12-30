import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { SpotterService } from 'src/app/services/spotter.service';

@Component({
  selector: 'app-evento-dia',
  templateUrl: './evento-dia.component.html',
  styles: [
  ]
})
export class EventoDiaComponent implements OnInit {
  @Input() zonas: any[] = []

  constructor(public _spotter: SpotterService) { }

  listEventos: any[] = []
  eventosFinal: any[] = []
  fechaza: any

  valor_bandera = 0


  ngOnInit(): void {
    let num = 0
    console.log(this.zonas);

    this.valor_bandera = this.zonas.length

    let fechaHoy = new Date().toLocaleString('en-GB')
    console.log(fechaHoy,'ddd', this.convertFecha(fechaHoy));
    this.fechaza = this.convertFecha(fechaHoy)

    this.zonas.forEach(zona => {
      this._spotter.getByDia(zona.cod_zona).then(data => {
        let eventos:any[] = []
        let count = 0
        for(let i=0; i<15; i++){
          let fechaHoyHoy = new Date()
          //formateo de fecha
          let fechaDato = fechaHoyHoy.setDate(fechaHoyHoy.getDate() - i)
          let novaFecha = this.convertFecha(new Date(fechaDato).toLocaleString('en-GB'))
          //console.log(novaFecha, 'fecha', data[count].fecha, data[count].contador)
          if(num == 0){this.barChartLabels.push(novaFecha)}

          if(count < data.length){
            if(data[count].fecha != novaFecha){
              let d1 = new Date(novaFecha)
              let d2 = new Date(data[count].fecha)
              let dif = Math.abs(d1.getTime() - d2.getTime() )/(60000*60*24)
              console.log(dif, 'Diferencia');
              this.barChartData[num].data?.push(0)
              
              for(let j = 0; j < dif-1; j++){
                let novaFecha = this.convertFecha(new Date(fechaHoyHoy.getTime() - (i+1)).toLocaleString('en-GB'))
                console.log(novaFecha, 'MIFECHA');
                if(num == 0){
                  this.barChartLabels.push(novaFecha)
                }
                this.barChartData[num].data?.push(0)
                i = i + 1
              }
            } else {
              this.barChartData[num].data?.push(data[count].contador)
              count = count + 1
            }
          } else{
            this.barChartData[num].data?.push(0)
          }

        }
        this.listEventos.push(eventos)
        this.barChartData[num].label = zona.nombre
        num = num + 1
      })
      console.log(num, '-----------------------')
    })

    console.log(this.listEventos, 'AQUI');
    let largo = this.listEventos.length

    for (let i = 0; i < largo; i++) {
      let evento = this.listEventos[0][i]
      let evento2 = this.listEventos[1][i]
      let fecha = evento.fecha
      let contador1 = evento.contador
      let contador2 = evento2.contador
      let aux = {fecha: fecha, eventos1: contador1, eventos2: contador2}
      this.eventosFinal.push(aux)
    }

    console.log(this.eventosFinal, 'EVENTOS FINAL');
    
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks: {beginAtZero: true}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartColor: Color[] = [{
    backgroundColor: 'rgba(16, 181, 159, 0.55)',
  }];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Eventos' },
    { data: [], label: '2' },
    { data: [], label: '3' },
    { data: [], label: '4' }
  ];

  convertFecha(fecha: string) {
    let laFecha = fecha.split(',')
    let fechas = laFecha[0].split('/')
    let dia = fechas[0]
    let mes = fechas[1]
    let anio = fechas[2]

    return `${anio}-${mes}-${dia}`
  }
}

