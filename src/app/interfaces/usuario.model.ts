export class Usuario{
    constructor(
        public email: string,
        public password: string,
        public nombre: string,
        public apellido: string,
        public status: number,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public id_centro: number,
        public id_perfil: number,
        public id?: string
    ) {}
}
// export class Usuario{
//     constructor(
//         public empresa_id: number,
//         public perfil_id: number,
//         public usuario: string,
//         public correo: string,
//         public password: string,
//         public estado: number,
//         public fecha_creacion: string,
//         public nombre: string,
//         public apellido:string,
//         public id?: string
//     ) {}
// }




