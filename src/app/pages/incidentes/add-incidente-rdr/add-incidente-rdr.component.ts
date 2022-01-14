import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroService } from 'src/app/services/centro.service';
import { RadarService } from 'src/app/services/radar.service';
import { RdrIncidenteService } from 'src/app/services/rdr-incidente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-incidente-rdr',
  templateUrl: './add-incidente-rdr.component.html',
  styles: [
  ]
})
export class AddIncidenteRdrComponent implements OnInit {

  constructor(public _user: UsuarioService, public _incidente: RdrIncidenteService, private _location: Location, private _fbuilder: FormBuilder,
    public _radar: RadarService, public _centro: CentroService) { }

  perfil_user: any
  empresa_user: any
  centro_user: any

  faSave = faSave
  faBack = faArrowLeft

  radarList: any[] = []
  radarId: any
  itemList: any

  addForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.perfil_user = this._user.usuario.id_perfil
    this.empresa_user = this._user.userIds.id_empresa
    this.centro_user = this._user.usuario.id_centro

    this.addForm = this._fbuilder.group({
      id: [],
      codigo: ['', Validators.required],
      severidad: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_final: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_radar: ['', Validators.required]
    })

    if(this.perfil_user > 2){
      this._centro.getItems(this.centro_user).subscribe(
        res => {
          this.radarId = res[0].id_radar
          this._radar.getRadar(this.radarId).subscribe(
            rdr => this.addForm.controls['id_radar'].setValue(rdr.id)
          )
        })
    } else {
      this._radar.getByEmpresa(this.empresa_user).subscribe(
        res => {  
          this.radarList = res
          this.addForm.controls['id_radar'].setValue(this.radarList[0].id_Radar)
        } )
    }

    this.addForm.controls['severidad'].setValue("error")
  }

  onSubmit(){
    this.submitted = true;
    console.log('Q sucede!')
    
    if(this.addForm.valid){
      this._incidente.addIncidente(this.addForm.value).subscribe(
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
    } else{console.log(this.addForm.controls)}
  }

  volver() {
    return this._location.back();
  }

  get f() { return this.addForm.controls; }

}
