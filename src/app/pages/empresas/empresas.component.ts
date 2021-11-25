import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PrimeNGConfig } from 'primeng/api';
import { Empresa } from 'src/app/interfaces/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
  ]
})
export class EmpresasComponent implements OnInit {

  empresaList: any[] = [];
  totalRecords: number;
  //iconos
  faEdit = faEdit;
  faTimes = faTimes;
  faBack = faArrowLeft
  faPlus = faPlus

  //pagination
  pageOfItems: Array<any>;

  constructor(public _empresa: EmpresaService, private router: Router, private _route: ActivatedRoute, private primengConfig: PrimeNGConfig) { }

  ngOnInit(){

    this._empresa.getCompanies().then( (data:any)=> {
      this.empresaList = data
      this.totalRecords = data.length
      console.log(this.empresaList)
    })

    this.primengConfig.ripple = true;
  }

  storageID(id:any){
    localStorage.setItem('empresaID', id);
  }

  delete(empresaDel:Empresa){
    Swal.fire({
      title: '¿Desea eliminar el item seleccionado?',
      text: 'Alerta: Eliminará a la vez todas las estaciones y centros asociados',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: `SI`,
      showCancelButton: true,
      cancelButtonText: `NO`
    }).then((result)=>{
      if(result.isConfirmed){
        this._empresa.deleteEmpresa(empresaDel.id, empresaDel).subscribe(
          resp => {
              this.empresaList.splice(this.empresaList.indexOf(empresaDel),1)
          }
        )
        Swal.fire('Eliminado!', '', 'info');
      }
    })
  }

  volver(){
    return this.router.navigate(['/empresas'])
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
