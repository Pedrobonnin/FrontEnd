import { Component } from '@angular/core';
import { Contacto } from 'src/app/model/contacto';
import { persona } from 'src/app/model/persona.model';
import { ContactoService } from 'src/app/service/contacto.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contacto: Contacto = null;
  isLogged = false;
  public showPhone: boolean;

  constructor(public sContacto: ContactoService,private tokenService: TokenService){

  }
  ngOnInit():void{
    this.cargarContacto();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }


  cargarContacto(){
    this.sContacto.detail(1).subscribe(data => 
      {this.contacto = data}
      )
  }

  togglePhoneVisibility(): void {
    this.showPhone = !this.showPhone;
  }

  public isCursorOnDeleteButton = false;
}
