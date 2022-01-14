import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styles: [
  ]
})
export class PositionComponent implements OnInit {
  @Input() lat1: any
  @Input() lon1: any
  @Input() lat2: any
  @Input() lon2: any
  //@ts-ignore;
  chupalo 
  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) { }

  private intervalUpdate: any

  distances: any[] = []

  dx = 0
  dy = 0
  dt = 0

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(){
    this.lat2 = parseFloat(this.lat2)
    this.lon2 = parseFloat(this.lon2)
    this.haversin(this.lat1, this.lon1, this.lat2, this.lon2)

    console.log(this.distances);

    this.intervalUpdate = setInterval(() => {
      this.haversin(this.lat1, this.lon1, this.lat2, this.lon2)
    }, 5000)

    if(this.lat1 > this.lat2){
      this.dx = parseFloat((this.distances[1] * (-1000)).toFixed(2))
    } else {
      this.dx = parseFloat((this.distances[1] * 1000).toFixed(2))
    }

    if(this.lon1 > this.lon2){
      this.dy = parseFloat((this.distances[2] * (-1000)).toFixed(2))
    } else {
      this.dy = parseFloat((this.distances[2] * 1000).toFixed(2))
    }
    this.dt = parseFloat((this.distances[0] * 1000).toFixed(2))

    let datos = [{
      "ax": 0,
      "ay": 0,
      "bx": this.dx,
      "by": this.dy,
      "cx": -this.dx,
      "cy": -this.dy
    }];

    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_dark);

      let chart = am4core.create("chartPosition", am4charts.XYChart);

      chart.data = datos

      let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxisX.title.text = 'Distancia X (m)';
      valueAxisX.renderer.minGridDistance = 20;

      // Create value axis
      let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = 'Distancia Y (m)';
      valueAxisY.renderer.minGridDistance = 20;

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.valueY = "ay";
      lineSeries.dataFields.valueX = "ax";
      lineSeries.strokeOpacity = 0;

      let lineSeries2 = chart.series.push(new am4charts.LineSeries());
      lineSeries2.dataFields.valueY = "by";
      lineSeries2.dataFields.valueX = "bx";
      lineSeries2.strokeOpacity = 0;

      let lineSeries3 = chart.series.push(new am4charts.LineSeries());
      lineSeries3.dataFields.valueY = "cy";
      lineSeries3.dataFields.valueX = "cx";
      lineSeries3.strokeOpacity = 0;

      // Add a bullet
      let bullet = lineSeries.bullets.push(new am4charts.Bullet());

      // Add a triangle to act as am arrow
      let arrow = bullet.createChild(am4core.Triangle);
      arrow.horizontalCenter = "middle";
      arrow.verticalCenter = "middle";
      arrow.strokeWidth = 0;
      arrow.fill = chart.colors.getIndex(0);
      arrow.direction = "top";
      arrow.width = 15;
      arrow.height = 15;

      // Add a bullet
      let bullet2 = lineSeries2.bullets.push(new am4charts.Bullet());

      // Add a triangle to act as am arrow
      let arrow2 = bullet2.createChild(am4core.Triangle);
      arrow2.horizontalCenter = "middle";
      arrow2.verticalCenter = "middle";
      arrow2.rotation = 0;
      arrow2.strokeWidth = 0;
      arrow2.fill = chart.colors.getIndex(3);
      arrow2.direction = "top";
      arrow2.width = 15;
      arrow2.height = 15;

      // Add a bullet
      let bullet3 = lineSeries2.bullets.push(new am4charts.Bullet());

      // Add a triangle to act as am arrow
      // its utility is center the graph in the origin.
      let arrow3 = bullet3.createChild(am4core.Triangle);
      arrow3.horizontalCenter = "middle";
      arrow3.verticalCenter = "middle";
      arrow3.rotation = 0;
      arrow3.strokeWidth = 0;
      arrow3.fill = chart.colors.getIndex(3);
      arrow3.direction = "top";
      arrow3.width = 15;
      arrow3.height = 15;
    })
    
  }

  haversin(lat1: any, lon1: any, lat2: any, lon2: any){
    // convert to radians
    this.distances = []

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

    this.distances.push(d_tot, d_x, d_y)
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

}
