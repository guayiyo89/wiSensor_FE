import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addempresa',
  templateUrl: './addempresa.component.html',
  styles: [
  ]
})
export class AddempresaComponent implements OnInit {

  constructor(public _empresaSvc: EmpresaService, private router: Router, private _fbuilder: FormBuilder, private _location: Location) { }

  submitted = false;
  addForm: FormGroup;

  faSave = faSave
  faBack = faArrowLeft

  ngOnInit(){
    this.addForm = this._fbuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      status: ['', Validators.required],
      logo: []
    })
    
    this.addForm.controls['status'].setValue(1)
  }

  onSubmit(){
    this.submitted = true;

    if(this.addForm.valid){
      this.addForm.value.logo = [];
      this._empresaSvc.addEmpresa(this.addForm.value).subscribe(
        data => {console.log(data)}        
      )
      Swal.fire({
        title: 'Listo!',
        text: 'Empresa añadida correctamente.',
        icon: 'success',
        confirmButtonText: 'Ok!'
      })
      this.volver()
    }
  }

  volver(){
    return this._location.back()
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
