import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentroService } from 'src/app/services/centro.service';
import { EstructurasService } from 'src/app/services/estructuras.service';
import { ModulosService } from 'src/app/services/modulos.service';

@Component({
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styles: [
  ]
})
export class EstructuraComponent implements OnInit {
  @Input() _idModulo: any
  @Input() _lat: number = 0
  @Input() _lng: number = 0

  constructor(public _modulo: ModulosService, private route: ActivatedRoute, public _estructura: EstructurasService, public _centro: CentroService) { }

  _id: any

  ponton: any
  modulos: any[] = []
  estructura: any
  latitud: any
  longitud: any


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._id = params['id']
      this._modulo.getPonton(this._id).then(res => {
        this.ponton = res
      })

      this._modulo.getJaulas(this._id).then(res => {
        this.modulos = res
      })
    })

    this._estructura.getEstructura(this._id).then(res => {
      console.log(res)
      this.estructura = res
      this._centro.getCentro(res.id_centro).subscribe(res => {
        console.log(res)
        this.latitud = res.latitud
        this.longitud = res.longitud
      })
    })

  }

}
