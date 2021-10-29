import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ActivatedRoute } from '@angular/router';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bateria',
  templateUrl: './bateria.component.html',
  styles: [
  ]
})
export class BateriaComponent implements OnInit {
  @Input() voltaje: any

  public intervalUpdate: any

  constructor(public _user: UsuarioService, public _estacion: EstacionService,
    private _route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) { }


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

  voltMax = 88

  ngOnInit(){

    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);

    let valor = this.porcentaje(this.voltaje)

    this.intervalUpdate = setInterval(() => {
      valor = this.porcentaje(this.voltaje)
    }, 5000)

    let color: any

    if (valor < 0){
      valor = 0
    }

    if(valor < 25){
      color = '#f0410c'
    } if (valor >= 25 && valor < 50){
      color = '#f0be0c'
    } if (valor >= 50 && valor < 75){
      color = '#83d115'
    } if (valor >= 75){
      color = '#0fa814'
    }

    let chart = am4core.create("chartBatt", am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);
    chart.padding(0,0,0,0)

    let axis = chart.xAxes.push(new am4charts.ValueAxis<any>());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = false;
    axis.renderer.line.strokeOpacity = 0;
    axis.renderer.ticks.template.disabled = false
    axis.renderer.ticks.template.strokeOpacity = 0;
    axis.renderer.ticks.template.length = 5;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 20;
    axis.renderer.labels.template.opacity = 0

    let colorSet = new am4core.ColorSet();

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis<any>());
    axis2.min = 0;
    axis2.max = 100;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    let range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = am4core.color(color)

    let range1 = axis2.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color('#111111')

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 45;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "50%";

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(20);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.opacity = 0
    hand.value = 50;

    hand.events.on("propertychanged", function(ev) {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
      axis2.invalidate();
    });

    setInterval(function() {
      let value = valor;
      range0.axisFill.fill = am4core.color(color)
      let animation = new am4core.Animation(hand, {
        property: "value",
        to: value
      }, 1000, am4core.ease.cubicOut).start();
    }, 2000);


  }

  porcentaje(volt: any){
    // calculate the zero level, in volts, in the battery
    let valMin = this.voltMax * 0.667
    let totVolt = this.voltMax - valMin
    let valAct = parseFloat(volt) - valMin

    let porcentaje = (valAct * 100) / totVolt

    if(porcentaje < 0){
      porcentaje = 0
    }

    return porcentaje
  }

}
