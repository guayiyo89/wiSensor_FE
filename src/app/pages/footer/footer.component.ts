import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  constructor(public _userSvc: UsuarioService) { }

  ngOnInit(){
  }

  logout(){
    this._userSvc.logout();
  }

}
