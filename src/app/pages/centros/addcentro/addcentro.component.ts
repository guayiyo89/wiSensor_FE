import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { comunasChile } from 'src/app/config/chile';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcentro',
  templateUrl: './addcentro.component.html',
  styles: [
  ]
})
export class AddcentroComponent implements OnInit {

  constructor(public _centro: CentroService, public _empresa: EmpresaService, public _user: UsuarioService,
     private router: Router, private _fbuilder: FormBuilder) { }

  submitted = false;
  addForm: FormGroup;
  empresaList: Empresa[] = []

  empresaUser: Empresa

  perfilUser: any
  idEmpresa: any //id empresa del Logueado

  // regiones-comunas dropdown
  regionesList: any[] = comunasChile.regiones
  comunasList: Array<any> = []

  faSave = faSave
  faBack = faArrowLeft

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
    this.nomEmpresaUser(this.idEmpresa);
 
    this.addForm = this._fbuilder.group({
      id: [],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      comuna: ['', Validators.required],
      region: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      estado: ['', Validators.required],
      empresa_id: ['', Validators.required],
      codigo: ['', Validators.required]
    })

    this.addForm.controls['empresa_id'].setValue(this.idEmpresa)
    this.addForm.controls['estado'].setValue(1)
    
  }

  onSubmit(){
    this.submitted = true;

    if(this.addForm.valid){
      this._centro.addCentro(this.addForm.value).subscribe(
        data => {
          console.log(data)
          Swal.fire({
            title: 'Listo!',
            text: 'Centro añadido correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        }
      )
    }
  }

  volver(){
    return this.router.navigate(['/centros'])
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

  click(event: google.maps.MouseEvent) {
    this.addForm.controls['latitud'].setValue(event.latLng.lat())
    this.addForm.controls['longitud'].setValue(event.latLng.lng())
  }

  changeComuna(region: any) { //Angular 11
		//this.states = this.Countries.find(cntry => cntry.name == country).states; //Angular 8
		this.comunasList = this.regionesList.find( (regs:any) => regs.region == region.target.value! ).comunas
	}

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
