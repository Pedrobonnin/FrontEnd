export class ExperienciaLB {
    idExp? : number;
    puesto : string;
    empresa : string;
    tiempo : string;
    contacto : string;
    
    constructor(puesto:string,empresa:string,tiempo:string,contacto:string){
        this.puesto = puesto;
        this.empresa = empresa;
        this.tiempo = tiempo;
        this.contacto = contacto;
    }

}
