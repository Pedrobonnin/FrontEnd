import { Component } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  persona: persona = null;
  isLogged = false;

  constructor(public personaService: PersonaService,private tokenService: TokenService){

  }
  ngOnInit():void{
    this.cargarPersona();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }


  cargarPersona(){
    this.personaService.detail(1).subscribe(data => 
      {this.persona = data}
      )
  }


  public isCursorOnDeleteButton = false;
}
