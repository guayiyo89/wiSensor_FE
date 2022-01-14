import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RadarService } from 'src/app/services/radar.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-radar',
  templateUrl: './add-radar.component.html',
  styles: [
  ]
})
export class AddRadarComponent implements OnInit {

  constructor(public _radar: RadarService, public _empresa: EmpresaService, public _centro: CentroService, private _location: Location, private _fbuilder: FormBuilder, 
    public _user: UsuarioService) { }

  submitted = false;
  addForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: Centro[] = []

  markers: any[] = []

  faSave = faSave
  faBack = faArrowLeft

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
    this.nomCentro(1); //rescato AST

    this.addForm = this._fbuilder.group({
      id: [''],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      status: ['', Validators.required],
      empresa_id: ['', Validators.required],
      url_video: [''],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      id_centro: ['', Validators.required]
    })

    this.addForm.controls['status'].setValue(1)
    this.addForm.controls['empresa_id'].setValue(this._user.userIds.id_empresa)
    this.addForm.controls['id_centro'].setValue(this._user.userIds.id_centro)

  }

  onSubmit(){
    this.submitted = true;    
    
    if(this.addForm.valid){
      this._radar.addRadar(this.addForm.value).subscribe(
        data =>{
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Radar añadido correctamente.',
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

  nomCentro(id: any){
    //admin
      this._empresa.getCentros(id).subscribe(
        (data) => {
          this.centroList = data
        }
      )

  }

  changeCentros(id: any){
    this._empresa.getCentros(id.target.value).subscribe(
      data => {
        this.centroList = data
        if(this.centroList.length > 0) {
          this.addForm.controls['id_centro'].setValue(this.centroList[0].id)
          this.addForm.controls['latitud'].setValue(this.centroList[0].latitud)
          this.addForm.controls['longitud'].setValue(this.centroList[0].longitud)

          navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
              lat: this.centroList[0].latitud,
              lng: this.centroList[0].longitud,
            }
          })
        }
        else { this.addForm.controls['id_centro'].setValue('')}
      },
      error => {
        console.log(error)
        this.centroList = []
        this.addForm.controls['id_centro'].setValue('')
      }
    )
  }

  getCoordenadas(id: any){
    this._centro.getCentro(id.target.value).subscribe(
      (data) => {
        this.addForm.controls['latitud'].setValue(data.latitud)
        this.addForm.controls['longitud'].setValue(data.longitud)

        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: data.latitud,
            lng: data.longitud,
          }
        })
        
      }
    )
  }
  
  addNewMarker(latitud: any, longitud: any) {
    if(this.markers.length > 0){
      this.markers.pop()
    }
    this.markers.push({
      position: {
        lat: latitud,
        lng: longitud,
      },
      title: 'CENTRO' + (this.markers.length + 1)
    })
  }

  click(event: google.maps.MapMouseEvent) {
    //this.latMap = event.latLng.lat()
    //this.longMap = event.latLng.lng()
    this.addForm.controls['latitud'].setValue(event.latLng.lat())
    this.addForm.controls['longitud'].setValue(event.latLng.lng())

    this.addNewMarker(event.latLng.lat(), event.latLng.lng())
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
