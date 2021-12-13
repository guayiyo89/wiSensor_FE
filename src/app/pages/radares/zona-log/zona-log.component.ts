import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { SpotterService } from 'src/app/services/spotter.service';

@Component({
  selector: 'app-zona-log',
  templateUrl: './zona-log.component.html',
  styles: [
  ]
})
export class ZonaLogComponent implements OnInit {
  @Input() id_zona: any

  constructor(public _spotter: SpotterService, private _excel: ExcelServiceService) { }
  faExcel = faFileDownload
  faOk = faCheck

  intervalUpdate: any
  totalRecords = 0

  radar: any
  trayectoria: any[] = []

  headers: any[] = []
  detalles: any[] = []

  ngOnInit(): void {
    this._spotter.getHeaders(this.id_zona).then(
      (res: any) => {
        this.headers = res
        this.totalRecords = this.headers.length
        this.headers.forEach((row:any) => {
          this._spotter.getDetail(row.id).subscribe(
            data => {
              this.detalles.push(data)
            })
        })
      })

    this.intervalUpdate = setInterval(() => {
      this.updateDetails(this.id_zona)
    }, 90000)
    

  }

  rellenarExcel(id_head: any){
    this._spotter.getTrayectoria(id_head).subscribe(
      tray => {
        tray.forEach((row:any) => this.trayectoria.push(row))
      })
  }

  exportasXLSX(id_head: any){
    this.rellenarExcel(id_head)
    this._excel.exportAsExcelFile(this.trayectoria, `trayectoria${id_head}`)
  }

  updateDetails(zona: any){
    this._spotter.getHeaders(zona).then(
      header => {
        if(header[0].track_id != this.headers[0].track_id){
          this.headers.unshift(header[0])
          this.headers.pop()
          this.detalles.pop()
  
          this._spotter.getDetail(header[0].id).subscribe(
            details => {
              this.detalles.unshift(details)
            })
          
        }
        
      })
  }

  ngOnDestroy(){
    clearInterval(this.intervalUpdate)
  }

}
