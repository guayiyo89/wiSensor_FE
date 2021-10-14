import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Color } from 'ng2-charts/lib/color';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';

@Component({
  selector: 'app-temp-dia',
  templateUrl: './temp-dia.component.html',
  styles: [
  ]
})
export class TempDiaComponent implements OnInit {
  @Input() codigo: any

  constructor(public _dataGm: DataEstacionGmService, public _estacion: EstacionService, private _route: ActivatedRoute, private _fbuilder: FormBuilder) { }

  _id: any

  fechaForm: FormGroup;
  submitted = false;

  novaFecha: string = ''
  tempDay: any[] = []

  fecha_data: any

  //temperatura Day
  public chartTempDataD: ChartDataSets[] = [
    {data: [], label: 'Promedio'},
    {data: [], label: 'Mínima'},
    {data: [], label: 'Máxima'},
  ];
  public chartTempOptD: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {beginAtZero: true}
      }]
    }
  };
  public chartTempLabelD: Label[] = [];
  public chartTempTypeD: ChartType = 'line';
  public chartTempLegendD = true;
  public chartTempPluginsD = [];
  public chartTempColorD: Color[] = [{
    backgroundColor: 'rgba(148,159,177,0.25)',
    borderColor: '#304f82',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#304f82',
    pointHoverBackgroundColor: '#304f82',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  ngOnInit(){
    let dateTime = new Date().toLocaleString('en-GB')
    this.novaFecha = this.fechaEnviar(dateTime)

    this.fechaForm = this._fbuilder.group({
      fecha: ['', Validators.required],
    })

    this.fechaForm.controls['fecha'].setValue(this.novaFecha)

    this.getDataChart(this.novaFecha, this.codigo)
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(',');
    let fechaCal = splitted[0].split('/');
    
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

  getDataChart(fecha:any, codigo:any){

    this._dataGm.getWeatherDay(fecha, codigo).subscribe(
      data => {
        for(let s of data.reverse()){
        this.chartTempDataD[0].data?.push(s.temperature_AVG)
        this.chartTempDataD[1].data?.push(s.temperature_MIN)
        this.chartTempDataD[2].data?.push(s.temperature_MAX)
        this.chartTempLabelD.push(s.hora)
        }
      }
    )
  }

  addDays(dias: number){
    var futureDay = new Date()
    futureDay.setDate(futureDay.getDate() + dias)
    let fecha = (futureDay.toLocaleString('en-GB')).split(',')
    return fecha[0]
  }

  onSubmit(){
    this.submitted = true;
    this.fecha_data = this.fechaForm.value.fecha

    console.log(this.fecha_data)

    if(this.fechaForm.valid){
      this.chartTempDataD[0].data = []
      this.chartTempDataD[1].data = []
      this.chartTempDataD[2].data = []
      this.chartTempLabelD = []
      this._dataGm.getWeatherDay(this.fecha_data, this.codigo).subscribe(
        data => {
          for(let s of data.reverse()){
          this.chartTempDataD[0].data?.push(s.temperature_AVG)
          this.chartTempDataD[1].data?.push(s.temperature_MIN)
          this.chartTempDataD[2].data?.push(s.temperature_MAX)
          this.chartTempLabelD.push(s.hora)}
        })
    }
  }

}
