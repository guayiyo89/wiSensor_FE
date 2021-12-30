import { Component, Inject, OnInit, NgZone, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import type { RadarChart } from "@amcharts/amcharts4/charts";
import { isPlatformBrowser } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grafico-d3',
  templateUrl: './grafico-d3.component.html',
  styles: [
  ]
})
export class GraficoD3Component implements OnInit {

  // Themes begin
  //am4core.useTheme(am4themes_animated);
  // Themes end
  chart: RadarChart;

  constructor(public _dataGm: DataEstacionGmService, public _user: UsuarioService, public _estacion: EstacionService,
    private _route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any, private zone: NgZone, private _modal: NgbModal) { }

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

  valAngles: any[] = []

  ngOnInit(){
    let dateTime = new Date().toLocaleString()
    this.novaFecha = this.fechaEnviar(dateTime)
    //this.angles = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345]
    this._route.params.subscribe(
      params => {
        this._id =+ params['id']
        this._estacion.getEstacion(this._id).subscribe(
          data => {
            this._codigo = data.codigo
            console.log(this.novaFecha)
            this._dataGm.getWinds(this._codigo, this.novaFecha).subscribe(
              winds => {
                this.valAngles = winds

                this.browserOnly(() => {
                  console.log(this._codigo);
                  
                  am4core.useTheme(am4themes_animated)
                  am4core.useTheme(am4themes_dataviz);
                  let chart = am4core.create("chartdiv", am4charts.RadarChart);
                  chart.hiddenState.properties.opacity = 0;      
            
                  let data = this.valAngles
            
                  console.log(data);
                  
            
                  chart.data = data
            
                  chart.padding(10, 10, 10, 10);
            
                  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis<any>());
                  categoryAxis.dataFields.category = "angulo";
                  categoryAxis.renderer.labels.template.location = 0.5;
                  categoryAxis.renderer.tooltipLocation = 0.5;
            
                  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis<any>());
                  //valueAxis.tooltip.disabled = true;
                  valueAxis.renderer.labels.template.horizontalCenter = "left";
                  valueAxis.min = 0;
            
                  let series1 = chart.series.push(new am4charts.RadarColumnSeries());
                  series1.columns.template.tooltipText = "{name}: {valueY.value}";
                  series1.columns.template.width = am4core.percent(90);
                  series1.name = "Vel1";
                  series1.dataFields.categoryX = "angulo";
                  series1.dataFields.valueY = "val1";
                  series1.stacked = true;
            
                  let series2 = chart.series.push(new am4charts.RadarColumnSeries());
                  series2.columns.template.tooltipText = "{name}: {valueY.value}";
                  series2.columns.template.width = am4core.percent(90);
                  series2.name = "Vel2";
                  series2.dataFields.categoryX = "angulo";
                  series2.dataFields.valueY = "val2";
                  series2.stacked = true;
            
                  let series3 = chart.series.push(new am4charts.RadarColumnSeries());
                  series3.columns.template.tooltipText = "{name}: {valueY.value}";
                  series3.columns.template.width = am4core.percent(90);
                  series3.name = "Vel3";
                  series3.dataFields.categoryX = "angulo";
                  series3.dataFields.valueY = "val3";
                  series3.stacked = true;
            
                  let series4 = chart.series.push(new am4charts.RadarColumnSeries());
                  series4.columns.template.tooltipText = "{name}: {valueY.value}";
                  series4.columns.template.width = am4core.percent(90);
                  series4.name = "Vel4";
                  series4.dataFields.categoryX = "angulo";
                  series4.dataFields.valueY = "val4";
                  series4.stacked = true;
            
                  let series5 = chart.series.push(new am4charts.RadarColumnSeries());
                  series5.columns.template.tooltipText = "{name}: {valueY.value}";
                  series5.columns.template.width = am4core.percent(90);
                  series5.name = "Vel5";
                  series5.dataFields.categoryX = "angulo";
                  series5.dataFields.valueY = "val5";
                  series5.stacked = true;
            
                  let series6 = chart.series.push(new am4charts.RadarColumnSeries());
                  series6.columns.template.tooltipText = "{name}: {valueY.value}";
                  series6.columns.template.width = am4core.percent(90);
                  series6.name = "Vel6";
                  series6.dataFields.categoryX = "angulo";
                  series6.dataFields.valueY = "val6";
                  series6.stacked = true;
            
                  chart.cursor = new am4charts.RadarCursor();
                  chart.cursor.xAxis = categoryAxis;
                  chart.cursor.fullWidthLineX = true;
                  //chart.cursor.lineX.strokeOpacity = 0;
                  chart.cursor.lineX.fillOpacity = 0.1;
                  chart.cursor.lineX.fill = am4core.color("#000000");
                })

              }
            )

          })
      }// fin params
    ) 
  }

  ngAfterViewInit(){
   
    
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(' ');
    let fechaCal = splitted[0].split('/');
    
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

  // Radiacion
  openTable(tableWind: any){
    this._modal.open(tableWind, {size: 'lg'})
  }

}
