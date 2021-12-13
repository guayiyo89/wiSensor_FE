import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenpackService } from 'src/app/services/genpack.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editgenerador',
  templateUrl: './editgenerador.component.html',
  styles: [
  ]
})
export class EditgeneradorComponent implements OnInit {
  @Input() id: any //id del generador
  @Output() myEvent = new EventEmitter

  constructor(public _genpack: GenpackService, private _fbuilder: FormBuilder, public _user: UsuarioService, public _active: NgbActiveModal) { }

  submitted = false;
  editForm: FormGroup;

  generador: any

  faSave = faSave

  ngOnInit(){
    this.editForm = this._fbuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      capacidad: ['', Validators.required],
      potencia: ['', Validators.required],
      codigo: ['', Validators.required],
      estado: ['', Validators.required],
      id_genpack: [{disabled: true}, Validators.required]
    })

    this._genpack.getGenerador(this.id).subscribe(
      data => {
        this.generador = data
        this.editForm.patchValue(this.generador)
        console.log(data)
        
      }
    )
  }

  onSubmit(){
    this.submitted = true;    
    
    if(this.editForm.valid){
      this._genpack.editGenerador(this.id , this.editForm.value).subscribe(
        data =>{
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Generador editado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        }
        )
      } else(console.log('Culpa de David!'))
    }

  volver(){
    this.myEvent.emit()
  }

  get f() { return this.editForm.controls; }

}
