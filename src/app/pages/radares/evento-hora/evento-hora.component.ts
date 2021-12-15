import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { SpotterService } from 'src/app/services/spotter.service';

@Component({
  selector: 'app-evento-hora',
  templateUrl: './evento-hora.component.html',
  styles: [
  ]
})
export class EventoHoraComponent implements OnInit {
  @Input() zonas: any[] = []
  listEventos: any[] = []
  eventosFinal: any[] = []
  fechaza: any

  valor_bandera = 0

  intervalUpdate:any
  
  constructor(public _spotter: SpotterService) { }

  ngOnInit(): void {
    let num = 0
    let fechaHoy = new Date().toLocaleString('en-GB')
    console.log(fechaHoy,'ddd', this.convertFecha(fechaHoy));
    this.valor_bandera = this.zonas.length

    this.zonas.forEach(zona => {
      this._spotter.getByHora(zona.cod_zona).then(data => {
        this.rellenar(data, num)
        this.barChartData[num].label = zona.nombre
        num = num + 1
      })
    })

    // this.intervalUpdate = setInterval(() => {
    //   let val = 0
    //   this.zonas.forEach(zona => {
    //     this._spotter.getByHora(zona.cod_zona).then(data => {
    //       this.rellenarNuevo(data[0], val)
    //     })
    //     val++
    //   })
    // }, 5000)
 
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
    let hora = laFecha[1].split(':')

    return `${anio}-${mes}-${dia}${hora[0]}`
  }


  rellenar(data: any[], num: number) {
    let count = 0
    for(let i = 0; i < 24; i++){
      const fechaHoyHoy = new Date()
      //formateo de fecha
      let miliseconds = fechaHoyHoy.getTime() - i*(60*60000)

      let novaFecha = this.convertFecha(new Date(fechaHoyHoy.getTime() - i*(60*60000)).toLocaleString('en-GB'))

      if(num == 0){
        this.barChartLabels.push(novaFecha)
      }
      if(data[count].fecha != novaFecha){

        let d1 = new Date(novaFecha + ':00')
        let d2 = new Date(data[count].fecha + ':00')
        let dif = Math.abs(d1.getTime() - d2.getTime() )/(60000*60)
        this.barChartData[num].data?.push(0)
        for(let j = 0; j < dif-1; j++){
          let novaFecha = this.convertFecha(new Date(fechaHoyHoy.getTime() - (i+1)*(60*60000)).toLocaleString('en-GB'))
          console.log(novaFecha, 'MIFECHA');
          if(num == 0){
            this.barChartLabels.push(novaFecha)
          }
          this.barChartData[num].data?.push(0)
          i = i + 1
        }
        // this.barChartData[num].data?.push(data[count].contador)
        // //novaFecha = this.convertFecha(new Date(fechaHoyHoy.getTime() - (i+1)*(60*60000)).toLocaleString('en-GB'))
        //count = count + 1
      } else {
        this.barChartData[num].data?.push(data[count].contador)
        count = count + 1
      }
    }
  }

  rellenarNuevo(dato: any, num: number) {
    
    let count = 0

    let novaFecha = this.convertFecha(new Date().toLocaleString('en-GB'))

    if(num == 0){
      this.barChartLabels.push(novaFecha)
      this.barChartLabels.pop()
    }
    if(dato.fecha != novaFecha){
      this.barChartData[num].data?.unshift(0)
      this.barChartData[num].data?.pop()
    } else {
      this.barChartData[num].data?.unshift(dato.contador)
      this.barChartData[num].data?.pop()
      count = count + 1
    }

  }

}
