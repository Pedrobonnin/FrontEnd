export class JwtDto {
    token!:string;
    type!:string;
    nombreUsuario!:string;
    password!:string;
    authorities!: string[];
}
