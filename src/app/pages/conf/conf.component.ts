import {Component, OnInit} from '@angular/core';
import {Centro} from "../../interfaces/centro.model";
import {Estacion} from "../../interfaces/estacion.model";
import {Empresa} from "../../interfaces/empresa.model";
import {EmpresaService} from "../../services/empresa.service";
import {ActivatedRoute} from "@angular/router";
import {faArrowLeft, faEdit, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from "../../services/usuario.service";
import {IncidenteService} from "../../services/incidente.service";

@Component({
  selector: 'app-conf',
  templateUrl: './conf.component.html',
  styles: []
})
export class ConfComponent implements OnInit {
  listCentro: Centro[] = []
  listEstacion: Estacion[] = []
  // @ts-ignore
  empresa: Empresa
  _id: any

  // @ts-ignore
  faEdit = faEdit
  faBack = faArrowLeft
  faTimes = faTimes;
  ListIncidentes: any[] = [];


  constructor(public _empresa: EmpresaService, private _route: ActivatedRoute, public _usuario: UsuarioService, public _incidentes: IncidenteService) {
  }

  totalRecords = 0

  ngOnInit(): void {
    let CentroUsuario = this._usuario.usuario.id_centro;

    this._incidentes.GetIncidenteCentrosEmpresa(CentroUsuario).then(data => {
      this.ListIncidentes = data;
      this.totalRecords = data.length
      console.log(data);
    });


    console.log(this.totalRecords)
  }

}
