import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { GenpackService } from 'src/app/services/genpack.service';
import { IncidenteService } from 'src/app/services/incidente.service';
import { RadarService } from 'src/app/services/radar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-addincidente',
  templateUrl: './addincidente.component.html',
  styles: [
  ]
})
export class AddincidenteComponent implements OnInit {

  constructor(public _user: UsuarioService, public _incidente: IncidenteService, public _centro: CentroService, public _estacion: EstacionService,
     public _empresa: EmpresaService, public _genpack: GenpackService, public _radar: RadarService, private _fbuilder: FormBuilder, private _location: Location) { }

    perfil_user: any
    empresa_user: any
    centro_user: any

    centroList: any[] = []
    itemList: any

    addForm: FormGroup;
    submitted = false;

    codigo_est: any
    codigo_rdr: any
    codigo_gp: any

    tipos: any[] = []

    faSave = faSave
    faBack = faArrowLeft

  ngOnInit(){
    this.perfil_user = this._user.usuario.id_perfil
    this.centro_user = this._user.usuario.id_centro
    this.empresa_user = this._user.userIds.id_empresa

    this.addForm = this._fbuilder.group({
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

    this.addForm.controls['evaluacion'].setValue("mayor")
    this.addForm.controls['severidad'].setValue("error")

    if(this.perfil_user == 2){
      this.getCentros(this.empresa_user)
      this.getItemList(this.centro_user)
    } else {
      this.addForm.controls['centro'].setValue(this.centro_user)
      this.getItemList(this.centro_user)
    }

  }

  getCentros(id:any){
    this._empresa.getCentros(id).subscribe(
      centros => { 
        this.centroList = centros
        this.addForm.controls['centro'].setValue(centros[0].id)
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

  getCodeStation(tipo: any){
    switch(tipo.target.value){
      case 'Clima':
        this.tipos = ['Temperatura', 'Velocidad Viento']
        this.addForm.controls['cod_estacion'].setValue(this.codigo_est)
        this.addForm.controls['destino_id'].setValue(this.itemList.id_estacion)
        this.addForm.controls['destino'].setValue('estacion')
        break
      case 'Energia':
        this.tipos = ['Nivel Bateria']
        this.addForm.controls['cod_estacion'].setValue(this.codigo_gp)
        this.addForm.controls['destino_id'].setValue(this.itemList.id_genpack)
        this.addForm.controls['destino'].setValue('genpack')
        break
      case 'Radar':
        this.tipos = ['Numero Eventos']
        this.addForm.controls['cod_estacion'].setValue(this.codigo_rdr)
        this.addForm.controls['destino_id'].setValue(this.itemList.id_radar)
        this.addForm.controls['destino'].setValue('radar')
        break
    }
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

  changeItems(id: any){
    this._centro.getItems(id.target.value).subscribe(
      data => {
        this.itemList = data
        this.addForm.controls['tipo'].setValue('')
      },
      error => {
        console.log(error)
        this.centroList = []
        this.addForm.controls['tipo'].setValue('')
      }
    )
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
