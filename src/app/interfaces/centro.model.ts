export class Centro{
    constructor(
        public nombre: string,
        public descripcion: string,
        public comuna: string,
        public region: string,
        public latitud: number,
        public longitud: number,
        public status: number,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public id_empresa: number,
        public id?: number
    ) {}
}