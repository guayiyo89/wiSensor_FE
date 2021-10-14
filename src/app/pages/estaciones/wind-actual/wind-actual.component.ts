import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-wind-actual',
  templateUrl: './wind-actual.component.html',
  styles: [
  ]
})
export class WindActualComponent implements OnInit {
  @Input() angle: any
  private intervalUpdate: any

  value = 0

  constructor() { }

  ngOnInit(){

    this.value = parseFloat((this.angle).toFixed(2))

    this.intervalUpdate = setInterval(() => {
      this.value = parseFloat((this.angle).toFixed(2))
    }, 5000)

    
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(',');
    let fechaCal = splitted[0].split('/');
    
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

}
