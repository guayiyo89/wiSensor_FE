import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { comunasChile } from 'src/app/config/chile';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcentro',
  templateUrl: './editcentro.component.html',
  styles: [
  ]
})
export class EditcentroComponent implements OnInit {

  constructor(public _centro: CentroService, public _empresa: EmpresaService, public _user: UsuarioService, private _location: Location,
     private router: Router, private _fbuilder: FormBuilder, private _route: ActivatedRoute) { }

  submitted = false;
  // @ts-ignore
  editForm: FormGroup;
  empresaList: Empresa[] = [];
  // @ts-ignore
  centro: Centro;
  _id: any;
  // @ts-ignore
  empresaUser: Empresa

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
  // @ts-ignore
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
    this.perfilUser = this._user.usuario.id_perfil;
    this.idEmpresa = this._user.userIds.id_empresa;
    this.nomEmpresaUser(this.idEmpresa);

    this._id = this._route.params.subscribe(params => {
      this._id = +params['id'];
      this.editForm = this._fbuilder.group({
        id: [],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        comuna: ['', Validators.required],
        region: ['', Validators.required],
        latitud: ['', Validators.required],
        longitud: ['', Validators.required],
        status: ['', Validators.required],
        id_empresa: ['', Validators.required]
      })
   
      this._centro.getCentro(this._id).subscribe(
        data =>{
          this.centro = data
          this.editForm.controls['nombre'].setValue(data.nombre)
          this.editForm.controls['descripcion'].setValue(data.descripcion)
          this.editForm.controls['comuna'].setValue(data.comuna)
          this.editForm.controls['region'].setValue(data.region)
          this.editForm.controls['latitud'].setValue(data.latitud)
          this.editForm.controls['longitud'].setValue(data.longitud)
          this.editForm.controls['status'].setValue(data.status)
          this.editForm.controls['id_empresa'].setValue(data.id_empresa)

          this.selectedRegion = data.region
          this.comunasList = this.regionesList.find( (regs:any) => regs.region == data.region ).comunas

          navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
              lat: data.latitud,
              lng: data.longitud,
            }
          })
        }
      )
   });
  
  }

  onSubmit(){
    this.submitted = true;

    if(this.editForm.valid){
      this._centro.editCentro(this.centro.id, this.editForm.value).subscribe(
        data => console.log(data)
        )
        Swal.fire({
          title: 'Listo!',
          text: 'Centro editado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok!'
        })
        this.volver();
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

  click(event: google.maps.MapMouseEvent) {
    //this.latMap = event.latLng.lat()
    //this.longMap = event.latLng.lng()
    this.editForm.controls['latitud'].setValue(event.latLng.lat())
    this.editForm.controls['longitud'].setValue(event.latLng.lng())
  }

  changeComuna(region: any) { //Angular 11
		//this.states = this.Countries.find(cntry => cntry.name == country).states; //Angular 8
		this.comunasList = this.regionesList.find( (regs:any) => regs.region == region.target.value! ).comunas
	}

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
  

}
