export class Empresa{
    constructor(
        public nombre: string,
        public categoria: string,
        public status: number,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public id?: string
    ) {}
}