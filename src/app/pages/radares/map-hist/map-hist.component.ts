import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SpotterService } from 'src/app/services/spotter.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-map-hist',
  templateUrl: './map-hist.component.html',
  styles: [
  ]
})
export class MapHistComponent implements OnInit {
  @ViewChild('dataMarker') iconData: ElementRef;
  @Input() zonas: any[] = []
  @Input() fecha: any
  @Input() latitud: any
  @Input() longitud: any

  constructor(private renderer2: Renderer2, public _spotter: SpotterService) { }

  markers: any[] = []

  velContent: number = 0
  distContent: number = 0
  timeContent: any
  fechaContent = ''
  latCont: any
  lonCont: any


  zoom = 17
  // @ts-ignore
  center: google.maps.LatLngLiteral

  options: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    streetViewControl: false,
    maxZoom: 17,
    minZoom: 9,
  }

  ngOnInit(): void {

    console.log('DATA MARKER', this.zonas)

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: this.latitud,
        lng: this.longitud,
      }
    })

    if(this.fecha){
      this.zonas.forEach(zona => {
        this._spotter.getMarkersHist(zona.cod_zona, this.fecha).then(resp => {
          console.log(this.fecha)
          resp.forEach(header => {
            this._spotter.getDetail(header.id).subscribe(det => {
              this.addMarker(det)
              this.barChartData[0].data?.push(det.distancia)
              this.barChartData[1].data?.push(det.duracion)
              let fecha_aux = this.fechaGraph(det.fecha)
              this.barChartLabels.push(fecha_aux)
            })
          })
        })
      })
    }


  }

  clickedMarker(position: any, info: any) {
    console.log(position.lat, info)
    console.log(this.iconData.nativeElement.id)
    this.latCont = position.lat
    this.lonCont = position.lng
    this.renderer2.setStyle(this.iconData.nativeElement, 'display', 'block')
    let infoContent = info.split('/')
    this.fechaContent = infoContent[0]
    this.velContent = parseFloat(infoContent[1])
    this.distContent = parseFloat(infoContent[2])
    this.timeContent = infoContent[3]
  }

  addMarker(dato:any) {
    this.markers.push({
      position: {
        lat: dato.latitud,
        lng: dato.longitud,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: `${dato.fecha}/${dato.velocidad}/${dato.distancia}/${dato.duracion}`,
      options: { animation: google.maps.Animation.BOUNCE },
    })
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

    return hora_graph_h + ':' + hora_graph_m
  }


}