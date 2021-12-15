import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GpsModulosService } from 'src/app/services/gps-modulos.service';
import { Location } from '@angular/common';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-gps',
  templateUrl: './edit-gps.component.html',
  styles: [
  ]
})
export class EditGpsComponent implements OnInit {
  @Input() id_modulo: any;
  @Input() coordenadas: any
  @Output() myEvent = new EventEmitter

  constructor(public _gpsModule: GpsModulosService, private fbuilder: FormBuilder, private location: Location) { }

  submitted = false
  //@ts-ignore
  editForm: FormGroup
  faSave = faSave
  faBack = faArrowLeft


  zoom = 18

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
    this.editForm = this.fbuilder.group({
      id: [''],
      orden: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      id_et_modulo: ['', [Validators.required]],
    })

    this._gpsModule.getGpsModulo(this.id_modulo).then((res: any) => {
      this.editForm.controls['orden'].setValue(res.orden)
      this.editForm.controls['latitud'].setValue(res.latitud)
      this.editForm.controls['longitud'].setValue(res.longitud)
      this.editForm.controls['id_et_modulo'].setValue(res.id_et_modulo)
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: res.latitud,
          lng: res.longitud,
        }
      })

      this.addNewMarker(res.latitud, res.longitud)
    })

  }

  onSubmit() {
    this.submitted = true
    if (this.editForm.valid) {
      this._gpsModule.updateGpsModulo(this.editForm.value, this.id_modulo).subscribe(
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
    this.editForm.reset()
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

  get f() { return this.editForm.controls; }

}
