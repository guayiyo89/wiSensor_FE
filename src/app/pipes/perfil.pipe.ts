import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'perfil'
})

export class PerfilPipe implements PipeTransform {
    constructor() {}
    transform(valor: any): any{
        if(valor == 1){
            return 'Admin AST'
        } if(valor == 2){
            return 'Admin Empresa'
        } if(valor == 3){
            return 'Jefe Centro'
        } if(valor == 4){
            return 'Operador Centro'
        }
    }
}