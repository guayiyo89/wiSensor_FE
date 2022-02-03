import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RadarService } from 'src/app/services/radar.service';
import { Location } from '@angular/common';
import { faArrowLeft, faEdit, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-radar',
  templateUrl: './edit-radar.component.html',
  styles: [
  ]
})
export class EditRadarComponent implements OnInit {

  constructor(public _radar: RadarService, public _empresa: EmpresaService, public _centro: CentroService, private _location: Location, private _fbuilder: FormBuilder,
    private _route: ActivatedRoute, private _modal: NgbModal, public _activeModal: NgbActiveModal) { }

  submitted = false;
  editForm: FormGroup;
  empresaList: Empresa[] = []
  centroList: any[] = []
  markers: any[] = []

  zonas: any[] = []

  radar: any

  faSave = faSave
  faBack = faArrowLeft
  faPlus = faPlus
  faTimes = faTimes
  faEdit = faEdit
  _id: any

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
    this._route.params.subscribe( params => {
      this._id = +params['id']
      this.editForm = this._fbuilder.group({
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
  
      this._radar.getRadar(this._id).subscribe(
        data => {
          this._centro.getCentro(data.id_centro).subscribe(
            centro => {
              this.editForm.controls['empresa_id'].setValue(centro.id_empresa)
              this.nomCentro(centro.id_empresa);
            })
          this.radar = data
          this.editForm.controls['codigo'].setValue(data.codigo)
          this.editForm.controls['nombre'].setValue(data.nombre)
          this.editForm.controls['descripcion'].setValue(data.descripcion)
          this.editForm.controls['marca'].setValue(data.marca)
          this.editForm.controls['modelo'].setValue(data.modelo)
          this.editForm.controls['status'].setValue(data.status)
          this.editForm.controls['url_video'].setValue(data.url_video)
          this.editForm.controls['latitud'].setValue(data.latitud)
          this.editForm.controls['longitud'].setValue(data.longitud)
          this.editForm.controls['id_centro'].setValue(data.id_centro)

          navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
              lat: data.latitud,
              lng: data.longitud,
            }
          })

          this._radar.getZonas(this._id).subscribe(
            data => {
              this.zonas = data
              console.log(this.zonas);
            })

          this.addNewMarker(data.latitud, data.longitud)
        }
      )

    })

  }

  onSubmit(){
    this.submitted = true;    
    
    if(this.editForm.valid){
      this._radar.editRadar(this.radar.id, this.editForm.getRawValue()).subscribe(
        data =>{
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Radar editado correctamente.',
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
        if(this.centroList.length > 0) {this.editForm.controls['id_centro'].setValue(this.centroList[0].id)}
        else { this.editForm.controls['id_centro'].setValue('')}
      },
      error => {
        console.log(error)
        this.centroList = []
        this.editForm.controls['id_centro'].setValue(this.centroList[0])
      }
    )
  }

  addNewMarker(latitud: any, longitud: any) {
    if(this.markers.length > 1){
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
    this.editForm.controls['latitud'].setValue(event.latLng.lat())
    this.editForm.controls['longitud'].setValue(event.latLng.lng())

    this.addNewMarker(event.latLng.lat(), event.latLng.lng())
  }

  delete(zona: any, id: any){

    Swal.fire({
      title: 'Eliminar',
      text: '¿Desea eliminar el item seleccionado?',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: `SI`,
      showCancelButton: true,
      cancelButtonText: `NO`
    }).then(result => {
      if(result.isConfirmed){
        this._radar.deleteZona(id, zona).subscribe(
          data => {
            this.zonas.splice(this.zonas.indexOf(zona), 1)
          })
          Swal.fire('Eliminado!', '', 'info');
      }
    })

  }

  //==============================================================================
  // Modals
  //==============================================================================

  //Temperatura
  openNew(addGen: any) {
    this._modal.open(addGen,{ size: 'lg' } )
  }

  openEdit(editGen: any) {
    this._modal.open(editGen,{ size: 'lg' } )
  }

  closeModal(){
    this._activeModal.close()
    this._radar.getZonas(this._id).subscribe(
      data => {
        this.zonas = data
        console.log(this.zonas);
      })
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}
