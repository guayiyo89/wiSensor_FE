import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  _opened: boolean = false;

  constructor(public _user: UsuarioService, private router: Router, private navService: NavigationService) { }

  usuario:any

  faMenu = faBars

  ngOnInit(){
    this.usuario = this._user.usuario
  }

  logOut(){
    this._user.logout()
  }

  toggleSidebar() {
    this._opened = !this._opened;
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }

}
