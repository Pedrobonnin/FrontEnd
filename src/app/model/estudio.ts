export class Estudio {
    idStudy?:number;
    titulo:string;
    escuela:string;
    tiempo:string;
    nivel:string;
    localidad:string;


    constructor( titulo:string, escuela:string, tiempo:string, nivel:string, localidad:string){
    this.titulo = titulo;
    this.escuela = escuela;
    this.tiempo = tiempo;
    this.nivel = nivel;
    this.localidad = localidad;
    }
}
