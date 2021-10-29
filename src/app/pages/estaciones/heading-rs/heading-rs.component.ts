import { GaugeChart } from '@amcharts/amcharts4/charts';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

@Component({
  selector: 'app-heading-rs',
  templateUrl: './heading-rs.component.html',
  styles: [
  ]
})
export class HeadingRSComponent implements OnInit {
  @Input() heading: any
  @Input() minPitch: number = 0
  @Input() maxPitch: number = 0

  constructor(public _dataGm: DataEstacionGmService, public _user: UsuarioService, public _estacion: EstacionService,
    private _route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) { }

  
  private intervalUpdate: any

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  _id: any
  _codigo: any
  novaFecha: string = ''

  angulo: any

  ngOnInit(){
    let dateTime = new Date().toLocaleString('en-GB')
    this.novaFecha = this.fechaEnviar(dateTime)
    this._route.params.subscribe(
      params => {
        this._id =+ params['id']
        this.browserOnly( () => {
          am4core.useTheme(am4themes_animated);
          am4core.useTheme(am4themes_dark);
          // Themes end

          // create chart
          let chart = am4core.create("chartHeading", am4charts.GaugeChart);
          chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

          chart.innerRadius = -25;

          let axis = chart.xAxes.push(new am4charts.ValueAxis<any>());
          axis.min = -45;
          axis.max = 45;
          axis.strictMinMax = true;
          axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
          axis.renderer.grid.template.strokeOpacity = 0.3;

          let range0 = axis.axisRanges.create();
          range0.value = -45;
          range0.endValue = -30;
          range0.axisFill.fillOpacity = 1;
          range0.axisFill.fill = am4core.color("#e83200");
          range0.axisFill.zIndex = - 1;

          let range1 = axis.axisRanges.create();
          range1.value = -30;
          range1.endValue = -15;
          range1.axisFill.fillOpacity = 1;
          range1.axisFill.fill = am4core.color("#e8c500");
          range1.axisFill.zIndex = -1;

          let range2 = axis.axisRanges.create();
          range2.value = -15;
          range2.endValue = 15;
          range2.axisFill.fillOpacity = 1;
          range2.axisFill.fill = am4core.color("#009c3c");
          range2.axisFill.zIndex = -1;

          let range3 = axis.axisRanges.create();
          range3.value = 15;
          range3.endValue = 30;
          range3.axisFill.fillOpacity = 1;
          range3.axisFill.fill = am4core.color("#e8c500");
          range3.axisFill.zIndex = -1;

          let range4 = axis.axisRanges.create();
          range4.value = 30;
          range4.endValue = 45;
          range4.axisFill.fillOpacity = 1;
          range4.axisFill.fill = am4core.color("#e83200");
          range4.axisFill.zIndex = -1;

          let val = parseFloat(this.heading)
          let hand = chart.hands.push(new am4charts.ClockHand());
          hand.fill = am4core.color("#999");
          hand.stroke = am4core.color("#AAA");
          
          this.intervalUpdate = setInterval(() => {
            val = parseFloat(this.heading)
            hand.showValue(val, 1000, am4core.ease.cubicOut);
          }, 5000)          

        })
      }
    )
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(',');
    let fechaCal = splitted[0].split('/');
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

  convertAngle(val:number){
    let angle
    if(val > 180){
      angle = val - 360
    }else angle = val

    return angle
  }

}
