import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { IdPassService } from 'src/app/services/id-pass.service';
import { ModulosService } from 'src/app/services/modulos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-modulo',
  templateUrl: './add-modulo.component.html',
  styles: [
  ]
})
export class AddModuloComponent implements OnInit {
  @Input() _idEstructura: any

  constructor(public _user: UsuarioService, public _empresa: EmpresaService, public _centro: CentroService, public _modulo: ModulosService,
    private _fbuider: FormBuilder, private location: Location, private _idPass: IdPassService) { }

    submitted = false;
    //@ts-ignore
    addForm: FormGroup
    idEstructura: any

    centroList: any[] = [];
    empresaList: any[] = [];

    //@ts-ignore
    empresaUser: Empresa
    perfilUser: any
    idEmpresa: any

  faSave = faSave
  faBack = faArrowLeft
  faEdit = faEdit

  ngOnInit(): void {
    this.perfilUser = this._user.usuario.id_perfil
    this.idEmpresa = this._user.userIds.id_empresa
    this.getId()
    this.addForm = this._fbuider.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      id_et_estructura: ['', [Validators.required]],
    })

    this.addForm.controls['id_et_estructura'].setValue(this.idEstructura)


  }

  onSubmit() {
    this.submitted = true;
    if(this.addForm.valid){

      this._modulo.addModulo(this.addForm.value).subscribe(
        data => {
          Swal.fire({
            title: 'Modulo agregado',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        })
    }
  }

  volver(){
    return this.location.back()
  }


  getId(){
    this._idPass.bulma$.pipe(take(1)).subscribe(id => this.idEstructura = id)
  }

// get the form short name to access the form fields
get f() { return this.addForm.controls; }

}
