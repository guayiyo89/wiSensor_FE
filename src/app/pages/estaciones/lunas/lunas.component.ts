import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';

@Component({
  selector: 'app-lunas',
  templateUrl: './lunas.component.html',
  styles: [
  ]
})
export class LunasComponent implements OnInit {

  constructor(public _luna: DataEstacionGmService) { }

  lunas: any[] = []
  tipoLuna: any
  luzLuna = 0

  faDot = faCircle

  ngOnInit(){
    let dateTime = new Date().toLocaleString('en-GB')
    let novaFecha = this.fechaEnviar(dateTime)
    this._luna.getLunas(novaFecha).subscribe(
      moons => {
        this.lunas = moons
        this.getLuna(moons)
        this.luzLuna = moons[1].luminosidad
      }
    )
  }

  fechaEnviar(fecha:string){
    let splitted = fecha.split(',');
    let fechaCal = splitted[0].split('/');
    
    let newFecha = fechaCal[2] + '-' + fechaCal[1] + '-' + fechaCal[0];
    return newFecha
  }

  getLuna(lunas: any[]){
    let luz = lunas[1].luminosidad
    if(luz < 20){
      this.tipoLuna = 'Nueva'
    }
    else if(luz > 80){
      this.tipoLuna = 'Llena'
    } else {
      if(lunas[0].luminosidad < luz < lunas[2].luminosidad){
        this.tipoLuna = 'Creciente'
      }
      if(lunas[0].luminosidad > luz > lunas[2].luminosidad){
        this.tipoLuna = 'Menguante'
      }
    }
  }

}
