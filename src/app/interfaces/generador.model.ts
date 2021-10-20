export class Genpack{
    constructor(
        public nombre: string,
        public descripcion: string,
        public marca: string,
        public modelo: string,
        public codigo: string,
        public status: number,
        public volt_bateria: number,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public id_centro: number,
        public id?: number
    ) {}
}