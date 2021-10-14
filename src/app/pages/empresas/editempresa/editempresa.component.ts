import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editempresa',
  templateUrl: './editempresa.component.html',
  styles: [
  ]
})
export class EditempresaComponent implements OnInit {

  constructor(public _empresaSvc: EmpresaService, private router: Router, private _fbuilder: FormBuilder,
     private _route: ActivatedRoute, private _location: Location) { }

  editForm: FormGroup;
  empresa: Empresa
  submitted = false;
  _id: any

  faSave = faSave
  faBack = faArrowLeft

  ngOnInit(){
    this._id = this._route.params.subscribe(params =>{
      this._id = +params['id'];
      this.editForm = this._fbuilder.group({
        id: [],
        nombre: ['', Validators.required],
        categoria: ['', Validators.required],
        estado: ['', Validators.required],
        logo: []
      })
      this._empresaSvc.getEmpresa(this._id).subscribe(
        data =>{
          this.empresa = data;
          this.editForm.controls['nombre'].setValue(data.NOMBRE)
          this.editForm.controls['categoria'].setValue(data.CATEGORIA)
          this.editForm.controls['estado'].setValue(data.ESTADO)
          
        }
      )
    })
    

  }

  onSubmit(){
    this.submitted = true;

    if(this.editForm.valid){
      this.editForm.value.archivos = [];
      this._empresaSvc.editEmpresa(this.empresa.ID ,this.editForm.value).subscribe(
        data => {
          console.log(data)
          Swal.fire({
            title: 'Listo!',
            text: 'Empresa editada correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver();
        }        
        )
    }


  }

  volver(){
    return this.router.navigate(['/empresas'])
  }
  

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

}
