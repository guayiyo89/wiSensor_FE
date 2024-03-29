import { Component, OnInit } from '@angular/core';
import { faBell, faBolt, faCarBattery, faChartLine, faCloudSunRain, faCog, faExclamationTriangle, faFish, faMapMarkerAlt, faPowerOff, faSearch, faShieldAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Usuario } from 'src/app/interfaces/usuario.model';
import { CentroService } from 'src/app/services/centro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor( public _user: UsuarioService, public _centro: CentroService) { }
  
  usuario!: Usuario;

  centro!: Centro;

  _idPerfil: any
  _idCentro: any
  _idEmpresa: any

  _idEstacion: any
  _idGenpack: any

  itemCentro: any[] = []

  faFish = faFish
  faChartLine = faChartLine
  faUsers = faUsers
  faMapMarker = faMapMarkerAlt
  faSearch = faSearch
  faBell = faBell

  faBolt = faBolt
  faWeather = faCloudSunRain
  faBattery = faCarBattery
  faShield = faShieldAlt
  faAlert = faExclamationTriangle
  faLogout = faPowerOff
  faCog = faCog

  ngOnInit(){
    this._idCentro = this._user.usuario.CENTRO_ID
    this._idEmpresa = this._user.usuario.EMPRESA_ID
    this._idPerfil = this._user.usuario.PERFIL_ID

    this.loadCentro(this._idCentro)
    this.loadItems(this._idCentro)
    console.log(this.itemCentro);
    
  }

  loadCentro(id:any){
    this._centro.getCentro(id).subscribe(
      data => this.centro = data
    )
  }

  loadItems(id:any){
    this._centro.getItems(id).subscribe(
      items => {
        this.itemCentro = items[0]
      }
    )
  }

  logOut(){
    this._user.logout()
  }



}
