export class Incidente{
    constructor(
        public codigo: string,
        public valor: number,
        public tipo: string,
        public cod_estacion: string,
        public descripcion: string,
        public severidad: string,
        public evaluacion: string,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public estacion_id: number,
        public id?: number
    ){}
}