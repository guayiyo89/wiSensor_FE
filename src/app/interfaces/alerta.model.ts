export class Alerta{
    constructor(
        public tipo: string,
        public severidad: string,
        public codigo: string,
        public descripcion: string,
        public visto: number,
        public cod_estacion: string,
        public estacion_id: number,
        public created_at?: string,
        public updated_at?: string,
        public deleted_at?: string,
        public id?: number
    ){}
}