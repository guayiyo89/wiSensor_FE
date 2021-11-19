import { Component, OnInit } from '@angular/core';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inundacion',
  templateUrl: './inundacion.component.html',
  styles: [
  ]
})
export class InundacionComponent implements OnInit {

  constructor() { }

  faOk = faCheck
  faAlert = faExclamationTriangle

  ngOnInit(): void {
  }

}
