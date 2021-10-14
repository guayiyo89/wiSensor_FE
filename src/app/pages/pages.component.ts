import { Component, OnInit } from '@angular/core';
import { faBell, faChartLine, faFish, faMapMarkerAlt, faSearch, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from '../services/navigation.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  faFish = faFish
  faChartLine = faChartLine
  faUsers = faUsers
  faMapMarker = faMapMarkerAlt
  faSearch = faSearch
  faAlert = faBell
  faExit = faSignOutAlt

  constructor( private navService: NavigationService, public _user: UsuarioService) { }

  usuario = this._user.usuario

  _perfilId: any

  ngOnInit(){
    this._perfilId = this.usuario.PERFIL_ID
  }

  logOut(){
    this._user.logout()
  }


}
