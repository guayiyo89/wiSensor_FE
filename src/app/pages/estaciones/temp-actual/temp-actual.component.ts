import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp-actual',
  templateUrl: './temp-actual.component.html',
  styles: [
  ]
})
export class TempActualComponent implements OnInit {
  @Input() temp = 0

  value =  0
  intervalUpdate: any

  constructor() { }

  ngOnInit(): void {
    this.value = this.temp
    this.intervalUpdate = setInterval(() => {
      this.value = this.temp
    }, 5000)
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

}
