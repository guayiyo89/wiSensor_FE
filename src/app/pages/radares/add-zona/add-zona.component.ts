import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RadarService } from 'src/app/services/radar.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-zona',
  templateUrl: './add-zona.component.html',
  styles: [
  ]
})
export class AddZonaComponent implements OnInit {
  @Input() id_rdr: any;
  @Output() myEvent = new EventEmitter();

  constructor(public _radar: RadarService, private fbuilder: FormBuilder, public _activemodal: NgbActiveModal, public _modal: NgbModal) { }

  submitted = false;
  //@ts-ignore
  addForm: FormGroup;

  faSave = faSave

  ngOnInit(){
    this.addForm = this.fbuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      cod_zona: ['', [Validators.required]],
      id_radar: ['', [Validators.required]]
    })

    this.addForm.controls['id_radar'].setValue(this.id_rdr);
  }

  onSubmit(){
    this.submitted = true;

    if (this.addForm.valid) {
      this._radar.addZona(this.addForm.value).subscribe( data => {

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
    this.addForm.reset()
    this.addForm.controls['id_radar'].setValue(this.id_rdr);
    this._activemodal.close()
  }

  get f() { return this.addForm.controls; }

}
