export class Empresa{
    constructor(
        public NOMBRE: string,
        public CATEGORIA:string,
        public ESTADO: number,
        public FECHA_CREACION: string,
        public LOGO: string,
        public ID?: string
    ) {}
}