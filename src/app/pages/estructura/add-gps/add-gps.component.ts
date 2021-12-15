import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { GpsModulosService } from 'src/app/services/gps-modulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-gps',
  templateUrl: './add-gps.component.html',
  styles: [
  ]
})
export class AddGpsComponent implements OnInit {
  @Input() id_modulo: any;
  @Input() coordenadas: any
  @Output() myEvent = new EventEmitter

  constructor(public _gpsModule: GpsModulosService, private fbuilder: FormBuilder, private location: Location) { }

  submitted = false
  //@ts-ignore
  addForm: FormGroup
  faSave = faSave
  faBack = faArrowLeft

  zoom = 14

  markers: any[] = []
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


  ngOnInit(): void {
    console.log(this.coordenadas)
    this.addForm = this.fbuilder.group({
      id: [''],
      orden: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      id_et_modulo: ['', [Validators.required]],
    })

    this.addForm.controls['id_et_modulo'].setValue(this.id_modulo)
    this.addForm.controls['latitud'].setValue(this.coordenadas.latitud)
    this.addForm.controls['longitud'].setValue(this.coordenadas.longitud)

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: this.coordenadas.latitud,
        lng: this.coordenadas.longitud,
      }
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.addForm.valid) {
      this._gpsModule.addGpsModulo(this.addForm.value).subscribe(
        data => {
          Swal.fire({
            title: 'Modulo agregado',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        }
      )
    }
  }

  volver(){
    this.myEvent.emit()
    this.addForm.reset()
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

  get f() { return this.addForm.controls; }

}
