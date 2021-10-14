import { Component, Input, OnInit } from '@angular/core';
import { RadialGauge } from '@biacsics/ng-canvas-gauges';

@Component({
  selector: 'app-presion-actual',
  templateUrl: './presion-actual.component.html',
  styles: [
  ]
})
export class PresionActualComponent implements OnInit {
  @Input() presion: any
  intervalUpdate: any

  value = 0

  constructor() { }

  ngOnInit(): void {
    this.value = parseFloat(this.presion)

    this.intervalUpdate = setInterval(() => {
      this.value = parseFloat(this.presion)
    }, 5000)
  }


}
