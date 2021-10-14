import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Data_estacion_gm } from 'src/app/interfaces/data_estacion_gm.model';
import { Estacion } from 'src/app/interfaces/estacion.model';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styles: [
  ]
})
export class EstacionComponent implements OnInit {

  constructor(public _dataGm: DataEstacionGmService, public _estacion: EstacionService, private _route: ActivatedRoute) { }

  dataEstGm: Data_estacion_gm[] = [];
  _id: any;
  estacion: Estacion
  code: any
  aTemp: any[] = []
  aGps_long: any[] = []
  aFechas: any[] = []

  chart: any
  

  ngOnInit(){
    //this._dataGm.getData(id).subscribe()
    this._route.params.subscribe(
      params => {
        this._id = +params['id'];
        this._estacion.getEstacion(this._id).subscribe(
          data =>{
            this.code = data.CODIGO        
            this._dataGm.getData(this.code).subscribe(
              res => {
                console.log(res);
                
                this.dataEstGm = res;
                res.forEach(data => {
                  this.aTemp.push(data.temperature)
                  this.aGps_long.push(data.gps_longitude)
                  this.aFechas.push(data.data_time)
                })

              console.log(this.aTemp);
              
              const horaClima: Date[] = [];
              this.aFechas.forEach(result =>{
                let jsDate = new Date(result*1000);
                
                horaClima.push(jsDate);
                //Chart.register(...registerables);
                
                if(this.chart){
                  this.chart.destroy()
                }
                
                this.chart = new Chart("canvas",{
                  type: 'line',
                  data: {
                    labels: horaClima,
                    datasets:[{
                      label: 'Temperatura',
                      data: this.aTemp,
                      fill: true,
                      tension: 0,
                      borderColor: 'green'
                      }]
                  }
                })


                //this.chart.push(grafico)
                  

              })
                
              }
            )
          }
          )
      }
    )

  
    
  }

}
