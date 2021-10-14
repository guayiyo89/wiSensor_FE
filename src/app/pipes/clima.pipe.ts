import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'clima'
})

export class ClimaPipe implements PipeTransform {
    constructor() {}
    transform(valor: string): string{
        if(valor == "Cielo cubierto" ){
            return 'Cubierto'
        }
        if(valor == "Parcialmente nublado" ){
            return 'Parcial'
        }
        if(valor == "Lluvia  moderada a intervalos"){
            return 'Lluvia Parcial'
        }
        if(valor == "Niebla moderada"){
            return 'Neblina'
        }
        if(valor == "Ligeras precipitaciones"){
            return 'Lluvia ligera'
        }else{
            return valor
        }
    }
}