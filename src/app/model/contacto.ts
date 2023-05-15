export class Contacto {
    idCont?: number;
    desCont: String;
    email:string;
    phone:string;
    phoneVista:boolean;

    constructor(desCont:string, email:string, phone:string, phoneVista:boolean){
        this.desCont = desCont;
        this.email = email;
        this.phone = phone;
        this.phoneVista = phoneVista;
    }
}
