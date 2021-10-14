import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'estado'
})

export class EstadoPipe implements PipeTransform {
    constructor() {}
    transform(valor: any): any{
        if(valor == 1 ){
            return 'ACTIVO'
        } else{
            return 'INACTIVO'
        }
    }
}