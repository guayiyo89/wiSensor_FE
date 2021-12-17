import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RadarService } from 'src/app/services/radar.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-zona',
  templateUrl: './edit-zona.component.html',
  styles: [
  ]
})
export class EditZonaComponent implements OnInit {

  @Input() zona: any;
  @Output() myEvent = new EventEmitter

  constructor(public _radar: RadarService, private fbuilder: FormBuilder, public _modal: NgbActiveModal) { }

  submitted = false;
  //@ts-ignore
  editForm: FormGroup;
  faSave = faSave

  ngOnInit(){
    this.editForm = this.fbuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cod_zona: ['', [Validators.required]],
      id_radar: ['', [Validators.required]]
    })

    this.editForm.patchValue(this.zona)
    
  }

  onSubmit(){
    this.submitted = true;

    if (this.editForm.valid) {
      this._radar.editZona(this.zona.id ,this.editForm.value).subscribe( data => {

          Swal.fire({
            title: 'Zona agregada',
            text: 'Zona agregada con éxito',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.volver()

      })
    } else(console.log('Culpa de David!'))
  }

  volver(){
    this.myEvent.emit()
    this._modal.dismiss()
  }

  get f() { return this.editForm.controls; }

}
