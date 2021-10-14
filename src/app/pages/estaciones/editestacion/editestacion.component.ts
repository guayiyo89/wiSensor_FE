import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { Estacion } from 'src/app/interfaces/estacion.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { comunasChile } from 'src/app/config/chile';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-editestacion',
  templateUrl: './editestacion.component.html',
  styles: [
  ]
})
export class EditestacionComponent implements OnInit {

  constructor(public _estacion: EstacionService, public _empresa: EmpresaService, private router: Router, private _location: Location,
    private _fbuilder: FormBuilder, public _user: UsuarioService, public _centro: CentroService, private _route: ActivatedRoute) { }

  submitted = false;
  editForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: Centro[] = []
  empresaUser: Empresa

  selectedEmp: number = 0
  
  //id de la estacion a editar
  _id: any;
  estacion: Estacion
  
  perfilUser: any
  idEmpresa: any //id empresa del Logueado

  faSave = faSave
  faBack = faArrowLeft
  
  // regiones-comunas dropdown
  regionesList: any[] = comunasChile.regiones
  comunasList: Array<any> = []
  selectedRegion: String = "--Elegir Region--";

  //--------------------------------------------------------MAPA
  zoom = 14
  center: google.maps.LatLngLiteral

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    streetViewControl: false,
    maxZoom: 17,
    minZoom: 9,
  }

  ngOnInit(){

    this.nomEmpresa()
    this.perfilUser = this._user.usuario.PERFIL_ID;
    this.idEmpresa = this._user.usuario.EMPRESA_ID;
    this.selectedEmp = this._user.usuario.EMPRESA_ID;
    this.nomEmpresaUser(this.idEmpresa);
    console.log(this.perfilUser);

    this._route.params.subscribe( params => {
      this._id = +params['id']
      if(this.perfilUser == 1){
        this.editForm = this._fbuilder.group({
          id: [''],
          empresa_id: ['', Validators.required],
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required],
          modelo: ['', Validators.required],
          marca: ['', Validators.required],
          estado: ['', Validators.required],
          codigo: ['', Validators.required],
          latitud: ['', Validators.required],
          longitud: ['', Validators.required],
          comuna: ['', Validators.required],
          region: ['', Validators.required],
          centro_id: ['', Validators.required]
        })
      } else {
        this.editForm = this._fbuilder.group({
          id: [''],
          empresa_id: [{value: '', disabled: true}, Validators.required],
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required],
          modelo: [{value: '', disabled: true}, Validators.required],
          marca: [{value: '', disabled: true}, Validators.required],
          estado: [{value: '', disabled: true}, Validators.required],
          codigo: [{value: '', disabled: true}, Validators.required],
          latitud: ['', Validators.required],
          longitud: ['', Validators.required],
          comuna: ['', Validators.required],
          region: ['', Validators.required],
          centro_id: [{value: '', disabled: true}, Validators.required]
        })
      }

      this._estacion.getEstacion(this._id).subscribe(
        data => {
          this.estacion = data
          this.editForm.controls['empresa_id'].setValue(data.EMPRESA_ID)
          this.editForm.controls['nombre'].setValue(data.NOMBRE)
          this.editForm.controls['descripcion'].setValue(data.DESCRIPCION)
          this.editForm.controls['modelo'].setValue(data.MODELO)
          this.editForm.controls['marca'].setValue(data.MARCA)
          this.editForm.controls['estado'].setValue(data.ESTADO)
          this.editForm.controls['codigo'].setValue(data.CODIGO)
          this.editForm.controls['latitud'].setValue(data.LATITUD)
          this.editForm.controls['longitud'].setValue(data.LONGITUD)
          this.editForm.controls['region'].setValue(data.REGION)
          this.editForm.controls['comuna'].setValue(data.COMUNA)
          this.editForm.controls['centro_id'].setValue(data.CENTRO_ID)

          navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
              lat: data.LATITUD,
              lng: data.LONGITUD,
            }
          })

          this.selectedRegion = data.REGION
          this.comunasList = this.regionesList.find( (regs:any) => regs.region == data.REGION ).comunas
          this.nomCentro(data.EMPRESA_ID);
        }
        
      )

    })
  }


  onSubmit(){
    this.submitted = true;
    if(this.editForm.valid){
      this._estacion.editEstacion(this.estacion.ID, this.editForm.getRawValue()).subscribe(
        (data) => {
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Estación editada correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        },
        (error) => {
          console.log(error)
          Swal.fire({
            title: 'Hubo algún error.',
            text: 'Falta asignar valor a un campo.',
            icon: 'error',
            confirmButtonText: 'Ok!'
          })
        }
      )
    }
  }

  volver(){
    return this._location.back()
  }
  
  nomEmpresa(){
    this._empresa.getEmpresas().subscribe(
      data => this.empresaList = data
    )
  }
    
  nomEmpresaUser(id: any){
    this._empresa.getEmpresa(id).subscribe(
      data => this.empresaUser = data
    )
  }

  nomCentro(id: any){
    //admin
      this._empresa.getCentros(id).subscribe(
        data => this.centroList = data
      )
  }

  click(event: google.maps.MouseEvent) {
    //this.latMap = event.latLng.lat()
    //this.longMap = event.latLng.lng()
    this.editForm.controls['latitud'].setValue(event.latLng.lat())
    this.editForm.controls['longitud'].setValue(event.latLng.lng())
  }

  changeComuna(region: any) { //Angular 11
		//this.states = this.Countries.find(cntry => cntry.name == country).states; //Angular 8
		this.comunasList = this.regionesList.find( (regs:any) => regs.region == region.target.value! ).comunas
	}

  changeCentros(id: any){
    this._empresa.getCentros(id.target.value).subscribe(
      data => {
        this.centroList = data
        this.editForm.controls['centro_id'].setValue('')
      },
      error => {
        console.log(error)
        this.centroList = []
        this.editForm.controls['centro_id'].setValue('')
      }
    )
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

}
