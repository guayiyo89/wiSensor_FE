import { Component, Input, OnInit } from '@angular/core';
import { RadialGauge } from '@biacsics/ng-canvas-gauges';
import { faCheckCircle, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styles: [
  ]
})
export class OrientationComponent implements OnInit {
@Input() yaw: any
@Input() inicial: any

value = 0

resto = 0

faAlert = faExclamationCircle
faOk = faCheckCircle

private intervalUpdate: any

  constructor() { }

  ngOnInit(){
    this.value = parseFloat(this.yaw)
    this.resto = parseFloat((this.inicial - this.yaw).toFixed(2))

    this.intervalUpdate = setInterval(() => {
      this.value = parseFloat(this.yaw)
      this.resto = parseFloat((this.inicial - this.yaw).toFixed(2))
    }, 5000)
  }

}
