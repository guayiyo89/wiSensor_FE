import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { SpotterService } from 'src/app/services/spotter.service';

@Component({
  selector: 'app-evento-hora-total',
  templateUrl: './evento-hora-total.component.html',
  styles: [
  ]
})
export class EventoHoraTotalComponent implements OnInit {
  @Input() serial: any
  listEventos: any[] = []
  eventosFinal: any[] = []
  fechaza: any

  valor_bandera = 0

  intervalUpdate:any
  
  constructor(public _spotter: SpotterService) { }

  ngOnInit(): void {
    let num = 0
    let fechaHoy = new Date().toLocaleString('en-GB')

    this._spotter.getByHour(this.serial).then( (resp: any) => {
      this.rellenar(resp)
    }).catch( (err) => {console.log(err)})

    this.intervalUpdate = setInterval(() => {
      this._spotter.getByHour(this.serial).then( (resp: any) => {
        this.rellenarNuevo(resp)
      }).catch( (err) => {console.log(err)})
    }, 60000 * 20)

 
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
      ticks: {fontColor: '#e1e1e1'},
    }], 
    yAxes: [{ticks: {
      beginAtZero: true,
      fontColor: '#e1e1e1'
    }}] },
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
    backgroundColor: 'rgba(250, 185, 5, 0.66)',
  }];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Zona 1' }
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


  rellenar(data: any[]) {
    let count = 0
    for(let i = 0; i < 24; i++){
      const fechaHoyHoy = new Date()
      //formateo de fecha
      let miliseconds = fechaHoyHoy.getTime() - i*(60*60000)

      let novaFecha = this.convertFecha(new Date(fechaHoyHoy.getTime() - i*(60*60000)).toLocaleString('en-GB'))


      let fechaLabel = novaFecha.split(' ')
      this.barChartLabels.push(fechaLabel[1]+':00')

      if(data[count].fecha != novaFecha){

        let d1 = new Date(novaFecha + ':00')
        let d2 = new Date(data[count].fecha + ':00')
        let dif = Math.abs(d1.getTime() - d2.getTime() )/(60000*60)
        this.barChartData[0].data?.push(0)
        for(let j = 0; j < dif-1; j++){
          let novaFecha = this.convertFecha(new Date(fechaHoyHoy.getTime() - (i+1)*(60*60000)).toLocaleString('en-GB'))
          console.log(novaFecha, 'MIFECHA');
          let fechaLabel = novaFecha.split(' ')
          this.barChartLabels.push(fechaLabel[1]+':00')
          
          this.barChartData[0].data?.push(0)
          i = i + 1
        }
        // this.barChartData[num].data?.push(data[count].contador)
        // //novaFecha = this.convertFecha(new Date(fechaHoyHoy.getTime() - (i+1)*(60*60000)).toLocaleString('en-GB'))
        //count = count + 1
      } else {
        this.barChartData[0].data?.push(data[count].contador)
        count = count + 1
      }
    }
  }

  rellenarNuevo(data: any[]) {
    this._spotter.getByHour(this.serial).then( (resp: any) => {
      this.rellenar(resp)
    }).catch( (err) => {console.log(err)})
    this.barChartData[0].data?.splice(0, this.barChartData[0].data?.length)
    this.barChartLabels.splice(0, this.barChartLabels.length)


  }

  // rellenarNuevo(dato: any) {
    
  //   let count = 0

  //   let novaFecha = this.convertFecha(new Date().toLocaleString('en-GB'))

  //   this.barChartLabels.push(novaFecha)
  //   this.barChartLabels.pop()

  //   if(dato.fecha != novaFecha){
  //     this.barChartData[0].data?.unshift(0)
  //     this.barChartData[0].data?.pop()
  //   } else {
  //     this.barChartData[0].data?.unshift(dato.contador)
  //     this.barChartData[0].data?.pop()
  //     count = count + 1
  //   }

  // }

}
