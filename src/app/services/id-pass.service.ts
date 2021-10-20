import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdPassService {

  private bulma = new BehaviorSubject<number>(0)

  // recibe el id como observable
  bulma$ = this.bulma.asObservable()

  enviar(id: number){
    // transmite el id
    console.log('ENVIADO!',id)
    this.bulma.next(id)
  }

  constructor() { }
}
