import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GpsModulosService } from 'src/app/services/gps-modulos.service';


@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styles: [
    '.circle{border-radius: 50%; border: 6px solid #f5b609; padding: 8px; font-size: 2.5em; width: 2.1em; height: 2.1em; vertical-align: middle; cursor:pointer}'
  ]
})
export class ModulosComponent implements OnInit {
  @Input() _idModulo: any
  @Input() _lat: number = 0
  @Input() _lng: number = 0

  pitch = 3.2
  roll = -4.5

  gpsList: any[] = []
  coordenadas: any[] = []
  deformacion: any[] = []

  desplazamientos: any[] = []

  flowChart: any;
  stringFlowChart: any = "";
  constructor(private _modal: NgbModal, public _gps: GpsModulosService) {
  }

  ngOnInit(){
    if(this._idModulo){
      this._gps.getGpsModulos(this._idModulo).then((resp: any) => {
        this.gpsList = resp
        console.log(resp)
        resp.forEach((gps:any) => {
          let coords = {lat: gps.latitud, lng: gps.longitud}
          this.coordenadas.push(coords)
          //re-calculate gps
          this._gps.getFakeData(gps.latitud, gps.longitud).then((resp: any) => {
            let coords2 = {lat: resp.data.lat, lng: resp.data.lng}
            this.deformacion.push(coords2)
            this.desplazamientos.push(this.haversin(coords.lat, coords.lng, coords2.lat, coords2.lng))
          })
          
        });
      })

    }


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


  // Radiacion
  openTable(dataNode: any){
    this._modal.open(dataNode, {size: 'lg'})
  }

  getRandomInt(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  haversin(lat1: any, lon1: any, lat2: any, lon2: any){

    let R = 6365
    let deltaLon = (lon1 - lon2) * Math.PI / 180
    let deltaLat  = (lat1 - lat2) * Math.PI / 180
    let h = (1 - Math.cos(deltaLat))/2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos(deltaLon))/2
    // distance x. DeltaLat must be equal to zero
    let h_x = Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos(deltaLon))/2
    // distance y. DeltaLon must be equal to zero
    let h_y = (1 - Math.cos(deltaLat))/2

    let d_tot = 2 * R * Math.asin(Math.sqrt(h))
    let d_x = 2 * R * Math.asin(Math.sqrt(h_x))
    let d_y = 2 * R * Math.asin(Math.sqrt(h_y))

    return {total: parseFloat((d_tot).toFixed(3))*1000, dx: d_x, dy: d_y}
  }


}
