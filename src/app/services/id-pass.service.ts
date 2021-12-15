import { object } from '@amcharts/amcharts4/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdPassService {

  private bulma = new BehaviorSubject<any>(0)

  // recibe el id como observable
  bulma$ = this.bulma.asObservable()

  enviar(id: number, latitud: number, longitud: number) {

    let objecto = {id: id, latitud: latitud, longitud: longitud}
    // transmite el id
    console.log('ENVIADO!',id)
    this.bulma.next(objecto)
  }

  constructor() { }
}
