import { Component, OnInit } from '@angular/core';
import { faHandHoldingWater, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { ProduccionService } from 'src/app/services/produccion.service';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styles: [
  ]
})
export class ProduccionComponent implements OnInit {

  constructor(public _produccion: ProduccionService) { }

  tempPonton = 0
  humedadPonton = 0
  bateriaPonton = 0

  faTemp = faTemperatureLow
  faHumedad = faHandHoldingWater

  ngOnInit(){
    this._produccion.getLht65Lux('HT001').subscribe(
      data =>{
        this.tempPonton = data[0].temperature_amb
        this.humedadPonton = data[0].humidity_amb
        this.bateriaPonton = data[0].battery_volt
      }
    )
  }

}
