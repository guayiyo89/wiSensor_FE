import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ActivatedRoute } from '@angular/router';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { isPlatformBrowser } from '@angular/common';
import type { GaugeChart } from "@amcharts/amcharts4/charts";
import { Data_estacion_gm } from 'src/app/interfaces/data_estacion_gm.model';


@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styles: [
  ]
})
export class GaugeComponent implements OnInit {

  @Input() radiacion = 0
  hand: any

  constructor(public _dataGm: DataEstacionGmService, public _user: UsuarioService, public _estacion: EstacionService,
    private _route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) { }

  private intervalUpdate: any

  chart: GaugeChart

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  dataEstGm: Data_estacion_gm[] = [];
  datosClima: any

  _id: any
  _codigo: any
  novaFecha: string = ''

  ngOnInit(){
    let dateTime = new Date().toLocaleString('en-GB')
    this.novaFecha = this.fechaEnviar(dateTime)
    this._route.params.subscribe(
      params => {
        this._id =+ params['id']
        this._estacion.getEstacion(this._id).subscribe(
          data => {
            this._codigo = data.codigo
            
            this.browserOnly( () => {
              am4core.useTheme(am4themes_animated)
              am4core.useTheme(am4themes_dark);
              
              let chart = am4core.create("radiationChart2", am4charts.GaugeChart)
              
              chart.hiddenState.properties.opacity = 0 

              chart.innerRadius = -25;

              let axis = chart.xAxes.push(new am4charts.ValueAxis<any>());
              axis.min = 0;
              axis.max = 1500;
              axis.strictMinMax = true;
              axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
              axis.renderer.grid.template.strokeOpacity = 0.3;

              let range0 = axis.axisRanges.create();
              range0.value = 0;
              range0.endValue = 250;
              range0.axisFill.fillOpacity = 1;
              range0.axisFill.fill = am4core.color('#0fa814')
              range0.axisFill.zIndex = - 1;

              let range1 = axis.axisRanges.create();
              range1.value = 250;
              range1.endValue = 500;
              range1.axisFill.fillOpacity = 1;
              range1.axisFill.fill = am4core.color('#72de0d')
              range1.axisFill.zIndex = -1;

              let range2 = axis.axisRanges.create();
              range2.value = 500;
              range2.endValue = 750;
              range2.axisFill.fillOpacity = 1;
              range2.axisFill.fill = am4core.color('#dedb0d')
              range2.axisFill.zIndex = -1;

              let range3 = axis.axisRanges.create();
              range3.value = 750;
              range3.endValue = 1000;
              range3.axisFill.fillOpacity = 1
              range3.axisFill.fill = am4core.color('#de8a0d')
              range3.axisFill.zIndex = -1;

              let range4 = axis.axisRanges.create();
              range4.value = 1000;
              range4.endValue = 1250;
              range4.axisFill.fillOpacity = 1
              range4.axisFill.fill = am4core.color('#de4c0d')
              range4.axisFill.zIndex = -1;

              let range5 = axis.axisRanges.create();
              range5.value = 1250;
              range5.endValue = 1500;
              range5.axisFill.fillOpacity = 1
              range5.axisFill.fill = am4core.color('#7d52c7')
              range5.axisFill.zIndex = -1;

              let hand = chart.hands.push(new am4charts.ClockHand());
              
              this.showRad()
              let val = this.radiacion
              console.log('VAAAAL',val);
              
              this.intervalUpdate = setInterval(() => {
                val = this.radiacion
              }, 5000)

              chart.setTimeout(myValue, 5000)

              function myValue() {            
                hand.showValue(val, 800, am4core.ease.cubicOut)
                chart.setTimeout(myValue, 5000);
              }
              val = this.radiacion
            })


          }
        )// fin getStation
      }
    )// fin del params
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(',');
    let fechaCal = splitted[0].split('/');
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

  showRad(){
    this.radiacion
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

}
