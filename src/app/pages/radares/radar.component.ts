import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBolt, faCheckCircle, faCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styles: [
  ]
})
export class RadarComponent implements OnInit {

  constructor( public _user: UsuarioService, public _route: ActivatedRoute) { }

  // for alarms
  faDot = faCircle
  faAlert = faExclamationTriangle
  faOk = faCheckCircle
  faBolt = faBolt

  fechaShow:any[] = []

  id: any

  private intervalUpdate: any

  
  ngOnInit(){
    this.intervalUpdate = setInterval(() => {
      this.showFecha()
    }, 900)
    
    this._route.params.subscribe(
      params => {
        this.id = +params['id']
      }
      )
  }
    
  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }
  
  showFecha(){
    let fecha = new Date().toDateString()
    let hour = new Date().toTimeString()
    let hora = hour.split(' ')
    this.fechaShow = fecha.split(' ')
    this.fechaShow.push(hora[0])
  }
    

}
