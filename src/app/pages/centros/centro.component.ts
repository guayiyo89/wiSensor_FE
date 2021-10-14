import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentroService } from 'src/app/services/centro.service';
import { DataEstacionGmService } from 'src/app/services/data-estacion-gm.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styles: [
  ]
})
export class CentroComponent implements OnInit {

  constructor(public _dataGM: DataEstacionGmService, public _centro: CentroService, public _user: UsuarioService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
