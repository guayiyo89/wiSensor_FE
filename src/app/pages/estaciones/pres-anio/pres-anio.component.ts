import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EstacionService } from 'src/app/services/estacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pres-anio',
  templateUrl: './pres-anio.component.html',
  styles: [
  ]
})
export class PresAnioComponent implements OnInit {
  @Input() codigo: any

  constructor(public _dataGm: DataEstacionGmService, public _estacion: EstacionService, private _route: ActivatedRoute, private _fbuilder: FormBuilder) { }

  _id: any
  fechaForm: FormGroup;
  submitted = false;

  novaFecha: string = ''
  dataPres: any[] = []

  fecha_data: any

  public chartPresDataY: ChartDataSets[] = [
    {data: [], label: 'Promedio'},
    {data: [], label: 'Mínima'},
    {data: [], label: 'Máxima'},
  ];
  public chartPresOptY: ChartOptions = {
    responsive: true
  };
  public chartPresLabelY: Label[] = [];
  public chartPresTypeY: ChartType = 'line';
  public chartPresLegendY = true;
  public chartPresPluginsY = [];
  public chartPresColorY: Color[] = [{
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

  getMes(s:any){
    let mes = 'mes'
    if (s == '01'){mes = 'Enero'}
    if (s == '02'){mes = 'Febrero'}
    if (s == '03'){mes = 'Marzo'}
    if (s == '04'){mes = 'Abril'}
    if (s == '05'){mes = 'Mayo'}
    if (s == '06'){mes = 'Junio'}
    if (s == '07'){mes = 'Julio'}
    if (s == '08'){mes = 'Agosto'}
    if (s == '09'){mes = 'Septiembre'}
    if (s == '10'){mes = 'Octubre'}
    if (s == '11'){mes = 'Noviembre'}
    if (s == '12'){mes = 'Diciembre'}

    return mes
  }

  getDataChart(fecha:any, codigo:any){
    this._dataGm.getWeatherYear(fecha, codigo).subscribe(
      data => {
        for(let s of data.reverse()){
        this.chartPresDataY[0].data?.push(s.pressure_AVG)
        this.chartPresDataY[1].data?.push(s.pressure_MIN)
        this.chartPresDataY[2].data?.push(s.pressure_MAX)
        let mes = this.getMes(s.mes)
        this.chartPresLabelY.push(mes)
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
      this.chartPresDataY[0].data = []
      this.chartPresDataY[1].data = []
      this.chartPresDataY[2].data = []
      this.chartPresLabelY = []
      this._dataGm.getWeatherYear(this.fecha_data, this.codigo).subscribe(
        data => {
          for(let s of data.reverse()){
          this.chartPresDataY[0].data?.push(s.pressure_AVG)
          this.chartPresDataY[1].data?.push(s.pressure_MIN)
          this.chartPresDataY[2].data?.push(s.pressure_MAX)
          let mes = this.getMes(s.mes)
          this.chartPresLabelY.push(mes)}
        })
    }
  }

}
