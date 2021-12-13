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
  @Output() myEvent = new EventEmitter

  constructor(public _gpsModule: GpsModulosService, private fbuilder: FormBuilder, private location: Location) { }

  submitted = false
  //@ts-ignore
  addForm: FormGroup
  faSave = faSave
  faBack = faArrowLeft


  ngOnInit(): void {
    this.addForm = this.fbuilder.group({
      id: [''],
      orden: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      id_et_modulo: ['', [Validators.required]],
    })

    this.addForm.controls['id_et_modulo'].setValue(this.id_modulo)
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

  get f() { return this.addForm.controls; }

}
