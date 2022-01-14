import { Component, Input, OnInit } from '@angular/core';
import { RadarService } from 'src/app/services/radar.service';
import { SpotterService } from 'src/app/services/spotter.service';

@Component({
  selector: 'app-evento-total',
  templateUrl: './evento-total.component.html',
  styles: [
  ]
})
export class EventoTotalComponent implements OnInit {
  @Input() zonas: any[] = [];
  @Input() serial: any

  valTotalhora = 0
  valTotaldia = 0

  intervalUpdate: any;

  constructor(public _spotter: SpotterService) { }

  ngOnInit(): void {
    this.getDatos(this.zonas, this.serial)
    
    this._spotter.getByHour(this.serial).then(data => {
      this.valTotalhora  = data[0].contador
    })

    this.intervalUpdate = setInterval(() => {
      this.getDatos(this.zonas, this.serial)
    }, 5000)
    
  }

  getDatos(zonas: any[], serial: any){
    this.valTotalhora = 0
    this.valTotaldia = 0
    this._spotter.getByHour(serial).then(data => {
      this.valTotalhora  = data[0].contador
    })
    zonas.forEach(zona => {

      this._spotter.getByDia(zona.cod_zona).then(data => {
        let val_aux1 = data[0].contador
        this.valTotaldia  = val_aux1 + this.valTotaldia
      })

    })
  }

}
