//objeto de usuario para la NGTable
export class User{
    constructor(
        public NOMBRE: string,
        public APELLIDO: string,
        public CORREO: string,
        public EMPRESA: string,
        public ESTADO: number,
        public USUARIO: string,
        public FECHA_CREACION: string,
        public PERFIL_ID: number,
        public ID: number
    ){}
}