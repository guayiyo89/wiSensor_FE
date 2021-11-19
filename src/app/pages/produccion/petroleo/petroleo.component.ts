import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-petroleo',
  templateUrl: './petroleo.component.html',
  styles: [
  ]
})
export class PetroleoComponent implements OnInit {

  constructor() { }

  valor = 0

  value: any
  capacidad = 5000
  total: any

  ngOnInit(): void {
    this.valor = this.getRandomArbitrary(0,100)
    let tot = this.getTotal(this.valor, this.capacidad)
    this.value = (this.valor).toFixed(2)
    this.total = tot.toFixed(0)
  }

  getTotal(val: number, cap: number){
    let tot = cap * val / 100
    return tot
  }

  getRandomArbitrary(min:number, max:number) {
    return Math.random() * (max - min) + min;
  }

}
