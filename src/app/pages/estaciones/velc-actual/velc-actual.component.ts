import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-velc-actual',
  templateUrl: './velc-actual.component.html',
  styles: [
  ]
})
export class VelcActualComponent implements OnInit {
  @Input() velc = 0

  intervalUpdate: any

  value = 0

  constructor() { }

  ngOnInit(){
    this.value = this.velc * 3.6

    this.intervalUpdate = setInterval(() => {
      this.value = this.velc * 3.6
    }, 5000)
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

}
