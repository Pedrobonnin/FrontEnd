export class persona{
    id?: number;
    nombre: string;
    apellido: String;
    imglogo:string;
    descripcion: string;
    profesion: String;
    cv:string;

    constructor(nombre:string, apellido:string, imglogo:string, descripcion:string, profesion:string, cv:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.imglogo = imglogo;
        this.profesion = nombre;
        this.descripcion = apellido;
        this.cv = cv;
    }
}
        