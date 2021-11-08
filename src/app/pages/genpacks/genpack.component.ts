import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBolt, faCheckCircle, faCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Genpack } from 'src/app/interfaces/generador.model';
import { GenpackService } from 'src/app/services/genpack.service';
import { GenpackdataService } from 'src/app/services/genpackdata.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-genpack',
  templateUrl: './genpack.component.html',
  styles: [
  ]
})
export class GenpackComponent implements OnInit {

  constructor(public _genpack: GenpackService, public _user: UsuarioService, public _route: ActivatedRoute, public _genpackdata: GenpackdataService) { }

  private intervalUpdate: any
  _idPerfil: any
  _idCentroUser: any
  _idEmpresaUser: any

  fechaShow:any[] = []

  dataGenpack: any[] = []
  dataGPnow: any
  
  // @ts-ignore
  genpack: Genpack

  generadores: any[] = []

  // for alarms
  faDot = faCircle
  faAlert = faExclamationTriangle
  faOk = faCheckCircle
  faBolt = faBolt

  id: any

  ngOnInit(): void {
    this._idCentroUser = this._user.usuario.id_centro
    this._idPerfil = this._user.usuario.id_perfil
    this._idEmpresaUser = this._user.userIds.id_empresa

    this.intervalUpdate = setInterval(() => {
      this.showFecha()
    }, 900)

    this._route.params.subscribe(
      params => {
        this.id = +params['id']
        this._genpack.getGenpack(this.id).subscribe(
          data => {
            this.genpack = data
            this.getdata_gp(data.codigo)

            this.intervalUpdate = setInterval(() => {
              this.getdata_gp(data.codigo)
            }, 5000)
          }
        )
        this._genpack.getGeneradores(this.id).subscribe(
          data => {
            console.log(this.id)
            this.generadores = data
            console.log(data)
          }
        )
      }//params
    )

  }

  showFecha(){
    let fecha = new Date().toDateString()
    let hour = new Date().toTimeString()
    let hora = hour.split(' ')
    this.fechaShow = fecha.split(' ')
    this.fechaShow.push(hora[0])
  }

  getdata_gp(cod: any){
    this._genpackdata.getDataGP(cod).subscribe(
      dataGP => {
        this.dataGenpack = dataGP
        this.dataGPnow = dataGP[0]
        console.log(dataGP)
      })
  }

}
