export class Centro{
    constructor(
        public NOMBRE: string,
        public DESCRIPCION: string,
        public COMUNA: string,
        public REGION: string,
        public LATITUD: number,
        public LONGITUD: number,
        public ESTADO: number,
        public FECHA_CREACION: string,
        public EMPRESA_ID: number,
        public CODIGO: number,
        public ID?: string
    ) {}
}