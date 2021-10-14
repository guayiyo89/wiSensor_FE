export class Estacion{
    constructor(
        public EMPRESA_ID: number,
        public NOMBRE: string,
        public DESCRIPCION: string,
        public MODELO: string,
        public MARCA: string,
        public ESTADO: number,
        public FECHA_CREACION: string,
        public CODIGO: string,
        public LATITUD: number,
        public LONGITUD: number,
        public COMUNA: string,
        public REGION: string,
        public CENTRO_ID: string,
        public ID?: string
    ) {}
}