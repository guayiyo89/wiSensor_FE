import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenpackService } from 'src/app/services/genpack.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addgenerador',
  templateUrl: './addgenerador.component.html',
  styles: [
  ]
})
export class AddgeneradorComponent implements OnInit {
  @Input() id_gp: any
  @Output() myEvent = new EventEmitter

  constructor(public _genpack: GenpackService, private _fbuilder: FormBuilder, public _user: UsuarioService, public _active: NgbActiveModal) { }

  submitted = false;
  addForm: FormGroup;

  faSave = faSave

  ngOnInit(){
    this.addForm = this._fbuilder.group({
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

    this.addForm.controls['estado'].setValue(1)
    this.addForm.controls['id_genpack'].setValue(this.id_gp)
  }

  onSubmit(){
    this.submitted = true;    
    
    if(this.addForm.valid){
      this._genpack.addGenerador(this.addForm.value).subscribe(
        data =>{
          console.log(data);
          Swal.fire({
            title: 'Listo!',
            text: 'Generador añadido correctamente.',
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
    this.addForm.controls['nombre'].setValue('')
    this.addForm.controls['marca'].setValue('')
    this.addForm.controls['modelo'].setValue('')
    this.addForm.controls['capacidad'].setValue('')
    this.addForm.controls['potencia'].setValue('')
    this.addForm.controls['estado'].setValue(1)
    this.addForm.controls['id_genpack'].setValue(this.id_gp)
    this.addForm.controls['codigo'].setValue('')
  }

  get f() { return this.addForm.controls; }

}
