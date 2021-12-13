import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChartLine, faFish, faMapMarkerAlt, faUsers, faSearch, faBell, faPowerOff, faExclamationTriangle, faShieldAlt, faCloudSunRain, faBolt, faCog, faCarBattery, faShip } from '@fortawesome/free-solid-svg-icons';
import { CentroService } from '../services/centro.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [
  ]
})
export class WelcomeComponent implements OnInit {

  username: any
  _perfil: any
  _centroId: any

  itemCentro: any

  faFish = faFish
  faChartLine = faChartLine
  faUsers = faUsers
  faMapMarker = faMapMarkerAlt
  faSearch = faSearch
  faBell = faBell

  faBolt = faBolt
  faWeather = faCloudSunRain
  faShield = faShieldAlt
  faAlert = faExclamationTriangle
  faLogout = faPowerOff
  faCog = faCog
  faBattery = faCarBattery
  faShip = faShip

  constructor(private _route: ActivatedRoute, public _user: UsuarioService, public _centro: CentroService) { }

  ngOnInit(){
    this.username = this._user.usuario.nombre
    this._centroId = this._user.usuario.id_centro
    this._perfil = this._user.usuario.id_perfil

    if(this._perfil >= 3){
      this.loadItems(this._centroId)
    }

  }

  loadItems(id:any){
    this._centro.getItems(id).subscribe(
      items => {
        this.itemCentro = items[0]
        console.log(this.itemCentro)
      })
  }

}
