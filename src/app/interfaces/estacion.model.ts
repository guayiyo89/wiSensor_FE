export class Estacion{
    constructor(
        public nombre: string,
        public descripcion: string,
        public modelo: string,
        public marca: string,
        public codigo: string,
        public status: number,
        public pos_inicial: number,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public id_centro: number,
        public id?: number
    ) {}
}