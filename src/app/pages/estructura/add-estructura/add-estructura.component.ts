import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Centro } from 'src/app/interfaces/centro.model';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { CentroService } from 'src/app/services/centro.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstructurasService } from 'src/app/services/estructuras.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-estructura',
  templateUrl: './add-estructura.component.html',
  styles: []
})
export class AddEstructuraComponent implements OnInit {

  constructor(public _user: UsuarioService, public _empresa: EmpresaService, public _centro: CentroService, public estructura: EstructurasService,
    private router: Router, private _fbuilder: FormBuilder, private location: Location) { }

    submitted = false;
    //@ts-ignore
    addForm: FormGroup;

    centroList: Centro[] = []
    empresaList: Empresa[] = []
    //@ts-ignore
    empresaUser: Empresa;

  perfilUser: any
  idEmpresa: any //id empresa del Logueado

  faSave = faSave
  faBack = faArrowLeft

  ngOnInit(): void {
    this.perfilUser = this._user.usuario.id_perfil
    this.idEmpresa = this._user.userIds.id_empresa
    this.nomEmpresa()
    this.nomCentro(this.idEmpresa)
    this.addForm = this._fbuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      empresa_id: ['', [Validators.required]],
      id_centro: ['', [Validators.required]],
    })

    this.addForm.controls['empresa_id'].setValue(this.idEmpresa)
    this.addForm.controls['id_centro'].setValue(this._user.usuario.id_centro) 
  }

  changeCentros(id: any){
    this._empresa.getCentros(id.target.value).subscribe(
      data => {
        this.centroList = data
        if(this.centroList.length > 0) {this.addForm.controls['id_centro'].setValue(this.centroList[0].id)}
        else { this.addForm.controls['id_centro'].setValue('')}
      },
      error => {
        console.log(error)
        this.centroList = []
        this.addForm.controls['id_centro'].setValue('')
      }
    )
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    if(this.addForm.valid){
      this.estructura.addEstructura(this.addForm.value).then(
        data => {
          Swal.fire({
            title: 'Listo!',
            text: 'Estación añadida correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok!'
          })
          this.volver()
        },
        error => {
          console.log(error)
        }
      )
    }
    }

    volver(){
      return this.location.back()
    }

    nomCentro(id: any){
      //admin
        this._empresa.getCentros(id).subscribe(
          (data) => {
            this.centroList = data
          }
        )}
    
    nomEmpresa(){
      this._empresa.getEmpresas().subscribe(
        data => this.empresaList = data
      )
    }
      
    nomEmpresaUser(id: any){
      this._empresa.getEmpresa(id).subscribe(
        data => this.empresaUser = data
      )
    }
  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
