import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: string): any {
    if(fecha){
      let splitted = fecha.split('T');
      let fechaCal = splitted[0].split('-');
      let horaCal = splitted[1].split('.');

      let d = fechaCal[2]
      let m = fechaCal[1]
      let y = fechaCal[0]
      let newFecha = d + '/' + m + '/' + y + ' - ' + horaCal[0]
      return newFecha
    }
  }

}
