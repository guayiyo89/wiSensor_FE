export class Rdr_alerta{
    constructor(
        public codigo: string,
        public descripcion: string,
        public severidad: string,
        public visto: number,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public id_cabecera: number,
        public id_incidentes: number,
        public id?: number
    ){}
}