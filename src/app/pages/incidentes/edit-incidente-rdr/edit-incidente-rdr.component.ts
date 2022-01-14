import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroService } from 'src/app/services/centro.service';
import { RadarService } from 'src/app/services/radar.service';
import { RdrIncidenteService } from 'src/app/services/rdr-incidente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-incidente-rdr',
  templateUrl: './edit-incidente-rdr.component.html',
  styles: [
  ]
})
export class EditIncidenteRdrComponent implements OnInit {

  constructor(public _user: UsuarioService, public _incidente: RdrIncidenteService, private _location: Location, private _fbuilder: FormBuilder,
    public _radar: RadarService, public _centro: CentroService, private route: ActivatedRoute) { }

  perfil_user: any
  empresa_user: any
  centro_user: any

  faSave = faSave
  faBack = faArrowLeft

  radarList: any[] = []
  radarId: any
  itemList: any

  idIncidente: any

  editForm: FormGroup;
  submitted = false;

  ngOnInit(){
    this.perfil_user = this._user.usuario.id_perfil
    this.empresa_user = this._user.userIds.id_empresa
    this.route.params.subscribe(params => {
      this.idIncidente = params['id']

      this.editForm = this._fbuilder.group({
        id: [],
        codigo: ['', Validators.required],
        severidad: ['', Validators.required],
        hora_inicio: ['', Validators.required],
        hora_final: ['', Validators.required],
        descripcion: ['', Validators.required],
        id_radar: ['', Validators.required]
      })

      this._incidente.getIncidente(this.idIncidente).subscribe(
        res => {
          this.editForm.patchValue(res)
        })
    })

    if(this.perfil_user = 2){
      this._radar.getByEmpresa(this.empresa_user).subscribe(
        res => {  
          this.radarList = res
        } )
    }
  }

  onSubmit(){
    this.submitted = true;
    console.log('Q sucede!')
    
    if(this.editForm.valid){
      this._incidente.editIncidente(this.idIncidente,this.editForm.value).subscribe(
        (data) => {
          console.log(data)
          Swal.fire({
            title: 'Listo!',
            text: 'Incidente añadido correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
          
        },
        (error) => {
          console.log(error)
          Swal.fire({
            title: 'Hubo algún error.',
            text: 'El usuario o contraseña ya existen. Intente de nuevo.',
            icon: 'error',
            confirmButtonText: 'Ok!'
          })
        }
      )
    } else{console.log(this.editForm.controls)}
  }

  volver() {
    return this._location.back();
  }

  get f() { return this.editForm.controls; }

}
