import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { comunasChile } from 'src/app/config/chile';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-addestacion',
  templateUrl: './addestacion.component.html',
  styles: [
  ]
})
export class AddestacionComponent implements OnInit {

  constructor(public _estacion: EstacionService, public _empresa: EmpresaService, private router: Router, private _location: Location,
     private _fbuilder: FormBuilder, public _user: UsuarioService, public _centro: CentroService) { }

  submitted = false;
  addForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: Centro[] = []

  empresaUser: Empresa

  selectedEmp: number = 0

  latMap: any
  longMap: any
  marker1 = { position: { lat: -41.46529, lng: -77.2538699 } };

  perfilUser: any
  idEmpresa: any //id empresa del Logueado

  faSave = faSave
  faBack = faArrowLeft

  // regiones-comunas dropdown
  regionesList: any[] = comunasChile.regiones
  comunasList: Array<any> = []

  //--------------------------------------------------------MAPA
  zoom = 12
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

  markers = []
  infoContent = ''


  ngOnInit(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    this.nomEmpresa()
    this.perfilUser = this._user.usuario.PERFIL_ID;
    this.idEmpresa = this._user.usuario.EMPRESA_ID;
    this.selectedEmp = this._user.usuario.EMPRESA_ID;
    this.nomCentro(this.idEmpresa);
    this.nomEmpresaUser(this.idEmpresa);
    console.log(this.perfilUser);

    this.addForm = this._fbuilder.group({
      id: [''],
      empresa_id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      estado: ['', Validators.required],
      codigo: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      comuna: ['', Validators.required],
      region: ['', Validators.required],
      centro_id: ['', Validators.required]
    })

    this.addForm.controls['estado'].setValue(1)
    this.addForm.controls['empresa_id'].setValue(this.idEmpresa)

  }
  
  onSubmit(){
    this.submitted = true;    
    
    if(this.addForm.valid){
      this._estacion.addEstacion(this.addForm.value).subscribe(
        data =>{
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Estación añadida correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
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
        (data) => {
          this.centroList = data
        }
      )

  }

  zoomIn() {
    if (this.zoom < 15) this.zoom++
  }

  zoomOut() {
    if (this.zoom > 8) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    this.latMap = event.latLng.lat()
    this.longMap = event.latLng.lng()
    this.addForm.controls['latitud'].setValue(this.latMap)
    this.addForm.controls['longitud'].setValue(this.longMap)
    console.log(this.latMap)
    console.log(this.longMap)
  }

  changeComuna(region: any) { //Angular 11
		//this.states = this.Countries.find(cntry => cntry.name == country).states; //Angular 8
		this.comunasList = this.regionesList.find( (regs:any) => regs.region == region.target.value! ).comunas
	}

  changeCentros(id: any){
    this._empresa.getCentros(id.target.value).subscribe(
      data => {
        this.centroList = data
        this.addForm.controls['centro_id'].setValue('')
      },
      error => {
        console.log(error)
        this.centroList = []
        this.addForm.controls['centro_id'].setValue('')
      }
    )
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
