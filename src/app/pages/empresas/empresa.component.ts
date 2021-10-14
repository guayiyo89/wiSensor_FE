import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { Estacion } from 'src/app/interfaces/estacion.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: [
  ]
})
export class EmpresaComponent implements OnInit {

  listCentro: Centro[] = []
  listEstacion: Estacion[] = []
  empresa: Empresa
  _id: any

  faEdit = faEdit
  faBack = faArrowLeft

  constructor(public _empresa: EmpresaService, private _route: ActivatedRoute) { }

  ngOnInit(){
    this._route.params.subscribe(
      params =>{
        this._id = +params['id']
        this._empresa.getEmpresa(this._id).subscribe(
          data => this.empresa = data
        )
        this._empresa.getCentros(this._id).subscribe(
          data => this.listCentro = data
        )
        this._empresa.getEstaciones(this._id).then(
          data => this.listEstacion = data
        )
      }
    )
  }


}
