import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { GenpackService } from 'src/app/services/genpack.service';
import { IncidenteService } from 'src/app/services/incidente.service';
import { RadarService } from 'src/app/services/radar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editincidente',
  templateUrl: './editincidente.component.html',
  styles: [
  ]
})
export class EditincidenteComponent implements OnInit {

  constructor(public _user: UsuarioService, public _incidente: IncidenteService, public _centro: CentroService, public _estacion: EstacionService,
    public _empresa: EmpresaService, public _genpack: GenpackService, public _radar: RadarService, private _fbuilder: FormBuilder, private _location: Location,
    private _route: ActivatedRoute) { }

   perfil_user: any
   empresa_user: any
   centro_user: any

   centroList: any[] = []
   itemList: any

   editForm: FormGroup;
   submitted = false;

   codigo_est: any
   codigo_rdr: any
   codigo_gp: any

   tipos: any[] = []

   faSave = faSave
   faBack = faArrowLeft

   id_inc: any

  ngOnInit(){
    this.perfil_user = this._user.usuario.id_perfil
    this.centro_user = this._user.usuario.id_centro
    this.empresa_user = this._user.userIds.id_empresa

    this.editForm = this._fbuilder.group({
      id: [],
      codigo: ['', Validators.required],
      valor: ['', Validators.required],
      centro: ['', Validators.required],
      tipo: ['', Validators.required],
      tipoEstacion: ['', Validators.required],
      cod_estacion: ['', Validators.required],
      descripcion: ['', Validators.required],
      severidad: ['', Validators.required],
      evaluacion: ['', Validators.required],
      destino_id: ['', Validators.required],
      destino: ['', Validators.required]
    })

    this._route.params.subscribe(
      params => {
        this.id_inc = +params['id']
        this._incidente.getIncidente(this.id_inc).subscribe(
          incident => {
            this.editForm.controls['codigo'].setValue(incident.codigo)
            this.editForm.controls['valor'].setValue(incident.valor)
            this.editForm.controls['tipo'].setValue(incident.tipo)
            this.editForm.controls['cod_estacion'].setValue(incident.cod_estacion)
            this.editForm.controls['descripcion'].setValue(incident.descripcion)
            this.editForm.controls['severidad'].setValue(incident.severidad)
            this.editForm.controls['evaluacion'].setValue(incident.evaluacion)
            this.editForm.controls['destino_id'].setValue(incident.destino_id)
            this.editForm.controls['destino'].setValue(incident.destino)

            let sub = incident.cod_estacion.substring(0,2)
            console.log('Q PASA',sub)

            switch(sub){
              case 'EC':
                this.editForm.controls['tipoEstacion'].setValue('Clima')
                break;
              case 'GP':
                this.editForm.controls['tipoEstacion'].setValue('Energía')
                break;
              case 'RD':
                this.editForm.controls['tipoEstacion'].setValue('Radar')
                break;
            }

            this._estacion.getEstacion(incident.destino_id).subscribe(
              st => this.editForm.controls['centro'].setValue(st.id_centro)
            )
          }
        )//end getIncidente
      }
    )

    if(this.perfil_user == 2){
      this.getCentros(this.empresa_user)
      this.getItemList(this.centro_user)
    } else {
      this.editForm.controls['centro'].setValue(this.centro_user)
      this.getItemList(this.centro_user)
    }
  }

  getCentros(id:any){
    this._empresa.getCentros(id).subscribe(
      centros => { 
        this.centroList = centros
      })
  }

  getItemList(id:any){
    this._centro.getItems(id).subscribe(
      items => {
        this.itemList = items[0]
        if(items[0].id_estacion != null){
          this._estacion.getEstacion(items[0].id_estacion).subscribe(
            est => this.codigo_est = est.codigo
          )
        }
        if(items[0].id_genpack != null){
          this._genpack.getGenpack(items[0].id_genpack).subscribe(
            gp => this.codigo_gp = gp.codigo
          )
        }
        if(items[0].id_radar != null){
          this._radar.getRadar(items[0].id_radar).subscribe(
            rdr => this.codigo_rdr = rdr.codigo
          )
        }
        console.log(items[0])
      })
  }

  onSubmit(){
    this.submitted = true;
    console.log('Q sucede!')
    
    if(this.editForm.valid){
      this._incidente.editIncidente(this.id_inc, this.editForm.value).subscribe(
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

  getCodeStation(tipo: any){
    switch(tipo.target.value){
      case 'Clima':
        this.tipos = ['Temperatura', 'Velocidad Viento']
        this.editForm.controls['cod_estacion'].setValue(this.codigo_est)
        this.editForm.controls['destino_id'].setValue(this.itemList.id_estacion)
        this.editForm.controls['destino'].setValue('estacion')
        break
      case 'Energia':
        this.tipos = ['Nivel Bateria']
        this.editForm.controls['cod_estacion'].setValue(this.codigo_gp)
        this.editForm.controls['destino_id'].setValue(this.itemList.id_genpack)
        this.editForm.controls['destino'].setValue('genpack')
        break
      case 'Radar':
        this.tipos = ['Numero Eventos']
        this.editForm.controls['cod_estacion'].setValue(this.codigo_rdr)
        this.editForm.controls['destino_id'].setValue(this.itemList.id_radar)
        this.editForm.controls['destino'].setValue('radar')
        break
    }
  }

  changeItems(id: any){
    this._centro.getItems(id.target.value).subscribe(
      data => {
        this.itemList = data
        this.editForm.controls['tipo'].setValue(this.tipos[0])
      },
      error => {
        console.log(error)
        this.centroList = []
      }
    )
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

}
