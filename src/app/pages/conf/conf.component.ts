import {Component, OnInit} from '@angular/core';
import {Centro} from "../../interfaces/centro.model";
import {Estacion} from "../../interfaces/estacion.model";
import {Empresa} from "../../interfaces/empresa.model";
import {EmpresaService} from "../../services/empresa.service";
import {ActivatedRoute} from "@angular/router";
import {faArrowLeft, faEdit, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from "../../services/usuario.service";
import {IncidenteService} from "../../services/incidente.service";
import { RdrIncidenteService } from 'src/app/services/rdr-incidente.service';
import { CentroService } from 'src/app/services/centro.service';
import Swal from 'sweetalert2';

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

  RdrIncidentes: any[] = []


  constructor(public _empresa: EmpresaService, private _route: ActivatedRoute, public _usuario: UsuarioService, public _incidentes: IncidenteService, 
    public _incidenteRdr: RdrIncidenteService, public _centro: CentroService) {
  }

  totalRecords = 0

  ngOnInit(): void {
    let CentroUsuario = this._usuario.usuario.id_centro;
    let perfil_user = this._usuario.usuario.id_perfil;

    this._incidentes.GetIncidenteCentrosEmpresa(CentroUsuario).then(data => {
      this.ListIncidentes = data;
      this.totalRecords = data.length
      console.log(data);
    });

    this._centro.getItems(CentroUsuario).subscribe(
      res => {
        this._incidenteRdr.getIncidentes(res[0].id_radar).then(data => {
          this.RdrIncidentes = data;
          console.log(data);
        })
      })

    //this._incidenteRdr.getIncidentes().then(data => {})

    console.log(this.totalRecords)
  }

  delete(incidente: any, id: any){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Desea borrar el incidente seleccionado",
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this._incidenteRdr.deleteIncidente(id, incidente).subscribe(data => {
          this.RdrIncidentes.splice(this.listCentro.indexOf(incidente),1)
        })
        Swal.fire('Eliminado!', '', 'info');
      }
    })
  }

}
